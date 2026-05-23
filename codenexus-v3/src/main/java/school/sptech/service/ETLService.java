package school.sptech.service;

import software.amazon.awssdk.services.s3.model.S3Object;

import java.io.File;
import java.util.List;

public class ETLService {

    private final ExtractService extractService;
    private final TransformService transformService;
    private final LoadService loadService;
    private final LogService logService;
    private final EmailService emailService;

    public ETLService(ExtractService extractService, TransformService transformService, LoadService loadService, LogService logService, EmailService emailService) {
        this.extractService = extractService;
        this.transformService = transformService;
        this.loadService = loadService;
        this.logService = logService;
        this.emailService = emailService;
    }

    public void executar() {
        try {
            logService.sucesso("INFO", "Processo ETL Iniciado", "ETLService");
            System.out.println("[INFO] Processo ETL Iniciado");

            // EXTRACT (S3)

            String nomeBucket = "s3-codenexus";

            List<S3Object> listaObjetos = extractService.listarObjetos(nomeBucket);

            if (listaObjetos.isEmpty()) {
                logService.sucesso("INFO", "Nenhum arquivo para extração", "ETLService");
                System.out.println("[INFO] Nenhum arquivo para extração");
                return;
            }

            List<File> arquivos = extractService.extrairObjetos(listaObjetos, nomeBucket);

            // TRANSFORM (Apache POI) & LOAD (JDBC)

            if (arquivos.isEmpty()) {
                logService.sucesso("INFO", "Nenhum arquivo para transformação", "ETLService");
                System.out.println("[INFO] Nenhum arquivo para transformação");
                return;
            }

            loadService.clean();
            transformService.processarArquivos(arquivos, loadService);

            String assunto = "ETL concluído com sucesso";
            String mensagem = """
            Olá,

            O processo de atualização dos dados da plataforma foi concluído com sucesso.

            As informações provenientes dos arquivos processados já foram carregadas no banco de dados e as dashboards encontram-se atualizadas para consulta.

            Nenhuma inconsistência crítica foi identificada durante a execução do ETL.

            Atenciosamente,
            Equipe CodeNexus
            """;
            
            emailService.enviarEmailsCoaches(loadService, assunto, mensagem);

            logService.sucesso("SUCESSO", "Processo ETL Concluído", "ETLService");
            System.out.println("[SUCESSO] Processo ETL Concluído");

        } catch (Exception e) {
            logService.erro("ERRO", "Erro durante processo ETL", "ETLService", e.getMessage(), e.toString());
            System.out.println("[ERRO] Erro durante processo ETL");

            String assunto = "Falha durante execução do ETL";
            String mensagem = """
            Olá,

            Foi identificada uma falha durante a execução do processo ETL da plataforma.

            O processamento foi interrompido antes da conclusão e pode ter causado inconsistências na atualização dos dados utilizados pelas dashboards.

            Recomenda-se verificar os logs da aplicação para identificar a etapa afetada e analisar os detalhes do erro ocorrido.

            Atenciosamente,
            Equipe CodeNexus
            """;

            emailService.enviarEmailsDevs(loadService, assunto, mensagem);
            return;
        }
    }
}