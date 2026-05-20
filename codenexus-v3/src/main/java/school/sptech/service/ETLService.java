package school.sptech.service;

import software.amazon.awssdk.services.s3.model.S3Object;

import java.io.File;
import java.util.List;

public class ETLService {

    private final ExtractService extractService;
    private final TransformService transformService;
    private final LoadService loadService;
    private final LogService logService;

    public ETLService(ExtractService extractService, TransformService transformService, LoadService loadService,
            LogService logService) {
        this.extractService = extractService;
        this.transformService = transformService;
        this.loadService = loadService;
        this.logService = logService;
    }

    public void executar() {
        // EXTRACT (S3)
        logService.sucesso("INFO", "Extração de dados do S3 iniciada", "ETLService");
        System.out.println("[INFO] Extração de dados do S3 iniciada");

        String nomeBucket = "s3-codenexus";

        List<S3Object> listaObjetos = extractService.listarObjetos(nomeBucket);

        if (listaObjetos.isEmpty()) {
            logService.sucesso("INFO", "Nenhum arquivo para extração", "ETLService");
            System.out.println("[INFO] Nenhum arquivo para extração");
            return;
        }

        List<File> arquivos = extractService.extrairObjetos(listaObjetos, nomeBucket);

        logService.sucesso("SUCESSO", "Extração de Dados Concluída (1/3)", "ETLService");
        System.out.println("[SUCESSO] Extração de Dados Concluída (1/3)");

        // TRANSFORM (Apache POI)
        logService.sucesso("INFO", "Transformação de dados via Apache POI iniciada", "ETLService");
        System.out.println("[INFO] Transformação de dados via Apache POI iniciada");

        if (arquivos.isEmpty()) {
            logService.sucesso("INFO", "Nenhum arquivo para transformação", "ETLService");
            System.out.println("[INFO] Nenhum arquivo para transformação");
            return;
        }

        try {
            loadService.clean();
            transformService.processarArquivos(arquivos, loadService);
            logService.sucesso("SUCESSO", "Transformação de dados finalizada com sucesso (2/3)", "ETLService");
            System.out.println("[SUCESSO] Transformação de dados finalizada com sucesso (2/3)");
            logService.sucesso("SUCESSO", "Carregamento de dados finalizado com sucesso (3/3)", "ETLService");
            System.out.println("[SUCESSO] Carregamento de dados finalizado com sucesso (3/3)");
        } catch (Exception e) {
            logService.erro("ERRO", "Erro durante transformação/carga", "ETLService", e.getMessage(), e.toString());
            System.out.println("[ERRO] Erro durante transformação/carregamento");
        }
    }
}
