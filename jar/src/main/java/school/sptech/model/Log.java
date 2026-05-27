package school.sptech.model;

import java.time.LocalDateTime;

public class Log {

    private LocalDateTime dataHora;
    private String status;
    private String evento;
    private String servico;

    public Log(LocalDateTime dataHora, String status, String evento, String servico) {
        this.dataHora = dataHora;
        this.status = status;
        this.evento = evento;
        this.servico = servico;
    }

    public String getEvento() {
        return evento;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public String getStatus() {
        return status;
    }

    public String getServico() {
        return servico;
    }
}