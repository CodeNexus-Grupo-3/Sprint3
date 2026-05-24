package school.sptech.model;

import java.time.LocalDateTime;

public class LogErro extends Log{
    private String mensagemErro;
    private String stacktrace;

    public LogErro(LocalDateTime dataHora, String status, String evento, String servico, String mensagemErro, String stacktrace) {
        super(dataHora, status, evento, servico);
        this.mensagemErro = mensagemErro;
        this.stacktrace = stacktrace;
    }

    public String getMensagemErro() {
        return mensagemErro;
    }

    public String getStacktrace() {
        return stacktrace;
    }
}
