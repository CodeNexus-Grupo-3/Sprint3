package school.sptech.service;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.model.Dados;

import java.util.List;

public class LoadService {

    private final JdbcTemplate jdbcTemplate;
    private final LogService logService;

    public LoadService(JdbcTemplate jdbcTemplate, LogService logService) {
        this.jdbcTemplate = jdbcTemplate;
        this.logService = logService;
    }

    public void save(List<Dados> dados) {

        if (dados == null || dados.isEmpty()) {
            return;
        }

        String sql = "INSERT INTO Dashboard VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        jdbcTemplate.batchUpdate(sql, dados, dados.size(), (ps, dado) -> {
            ps.setInt(1, dado.getDuracao());
            ps.setInt(2, dado.getTotalBaron());
            ps.setInt(3, dado.getTotalDrag());
            ps.setInt(4, dado.getTotalTorres());
            ps.setInt(5, dado.getTotalAbates());
            ps.setInt(6, dado.getTotalMortes());
            ps.setInt(7, dado.getTotalAssistencias());
            ps.setInt(8, dado.getTotalGold());
            ps.setInt(9, dado.getTotalDano());
        });
    }

    public void clean() {
        try {
            logService.sucesso("INFO", "Iniciando limpeza da tabela Dashboard", "LoadService");
            System.out.println("[INFO] Iniciando limpeza da tabela Dashboard");

            jdbcTemplate.execute("TRUNCATE TABLE Dashboard");

            logService.sucesso("SUCESSO", "Tabela limpa com sucesso", "LoadService");
            System.out.println("[SUCESSO] Tabela limpa com sucesso");

        } catch (DataAccessException e) {
            logService.erro("ERRO", "Erro ao limpar tabela", "LoadService", e.getMessage(), e.toString());
            System.out.println("[ERRO] Erro ao limpar tabela");
        }
    }

    public List<String> buscarEmailsCoachs() {
        try {
            logService.sucesso("INFO", "Buscando emails dos coaches", "EmailService");
            System.out.println("[INFO] Buscando emails dos coaches");

            String sql = """
                SELECT email
                FROM Usuario
                WHERE notificar = 1
                AND cargo = 'Treinador'
            """;

            List<String> emails = jdbcTemplate.queryForList(sql, String.class);

            if (emails.isEmpty()) {
                logService.sucesso("INFO", "Nenhum email encontrado", "LoadService");
                System.out.println("[INFO] Nenhum email encontrado");
            } else {
                logService.sucesso("SUCESSO", emails.size() + " emails encontrados", "LoadService");
                System.out.println("[SUCESSO] " + emails.size() + " emails encontrados");
            }

            return emails;
        } catch (Exception e) {
            logService.erro("ERRO", "Erro ao buscar emails dos coaches", "LoadService", e.getMessage(), e.toString());
            System.out.println("[ERRO] Erro ao buscar emails dos coaches");

            throw new RuntimeException(e);
        }
        
    }

    public List<String> buscarEmailsDevs() {
        try {
            logService.sucesso("INFO", "Buscando emails dos coaches", "EmailService");
            System.out.println("[INFO] Buscando emails dos coaches");

            String sql = """
                SELECT email
                FROM Usuario
                WHERE notificar = 1
                AND cargo = 'Dev'
            """;

            List<String> emails = jdbcTemplate.queryForList(sql, String.class);

            if (emails.isEmpty()) {
                logService.sucesso("INFO", "Nenhum email encontrado", "LoadService");
                System.out.println("[INFO] Nenhum email encontrado");
            } else {
                logService.sucesso("SUCESSO", emails.size() + " emails encontrados", "LoadService");
                System.out.println("[SUCESSO] " + emails.size() + " emails encontrados");
            }

            return emails;
        } catch (Exception e) {
            logService.erro("ERRO", "Erro ao buscar emails dos coaches", "LoadService", e.getMessage(), e.toString());
            System.out.println("[ERRO] Erro ao buscar emails dos coaches");

            throw new RuntimeException(e);
        }
        
    }
}