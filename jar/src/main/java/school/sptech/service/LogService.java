package school.sptech.service;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.model.LogErro;
import school.sptech.model.Log;

import java.time.LocalDateTime;

public class LogService {

    private final JdbcTemplate jdbcTemplate;

    public LogService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void sucesso(String status, String evento, String servico) {
         saveLog(new Log(LocalDateTime.now(), status, evento, servico));
    }

    public void erro(String status, String evento, String servico, String mensagemErro, String stacktrace) {
        saveErro(new LogErro(LocalDateTime.now(), status, evento, servico, mensagemErro, stacktrace));
    }

    public void saveLog(Log log) {
        jdbcTemplate.update(
                "INSERT INTO JavaLog VALUES (DEFAULT, ?, ?, ?, ?, null, null)",
                log.getDataHora(),
                log.getStatus(),
                log.getEvento(),
                log.getServico());
    }

    public void saveErro(LogErro logErro) {
        jdbcTemplate.update(
                "INSERT INTO JavaLog VALUES (DEFAULT, ?, ?, ?, ?, ?, ?)",
                logErro.getDataHora(),
                logErro.getStatus(),
                logErro.getEvento(),
                logErro.getServico(),
                logErro.getMensagemErro(),
                logErro.getStacktrace());
    }
}