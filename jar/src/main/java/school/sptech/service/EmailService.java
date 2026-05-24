package school.sptech.service;

import jakarta.mail.Session;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import java.util.List;
import school.sptech.client.EmailProvider;

public class EmailService {

    private final EmailProvider provider;
    private final LogService logService;

    public EmailService(EmailProvider provider, LogService logService) {
        this.provider = provider;
        this.logService = logService;
    }

    public void enviarEmail(String destinatario, String assunto, String mensagem) {
        try {

            logService.sucesso("INFO", "Iniciando envio de email para: " + destinatario, "EmailService");
            System.out.println("[INFO] Iniciando envio de email para: " + destinatario);

            Session session = provider.getSession();

            Message email = new MimeMessage(session);
            email.setFrom(new InternetAddress(provider.getUser()));
            email.setRecipients(Message.RecipientType.TO, InternetAddress.parse(destinatario));
            email.setSubject(assunto);
            email.setText(mensagem);

            Transport.send(email);

            logService.sucesso("SUCESSO", "Email enviado para: " + destinatario, "EmailService");
            System.out.println("[SUCESSO] Email enviado para: " + destinatario);

        } catch (MessagingException e) {
            logService.erro("ERRO", "Erro ao enviar email para: " + destinatario, "EmailService", e.getMessage(), e.toString());
            System.out.println("[ERRO] Falha ao enviar email para: " + destinatario);
            throw new RuntimeException();
        }
    }

    public void enviarEmailsCoaches(LoadService loadService, String assunto, String mensagem) {
        try {
            List<String> emails = loadService.buscarEmailsCoaches();

            logService.sucesso("INFO", "Iniciando envio dos emails para os coaches", "LoadService");
            System.out.println("[INFO] Iniciando envio dos emails para os coaches");

            for (String email : emails) {
                enviarEmail(email, assunto, mensagem);
            }

            logService.sucesso("SUCESSO", "Envio dos emails para os coaches finalizado", "LoadService");
            System.out.println("[SUCESSO] Envio dos emails para os coaches finalizado");
        } catch (Exception e) {
            logService.erro("ERRO", "Erro ao enviar emails para os coaches", "EmailService", e.getMessage(), e.toString());
            System.out.println("[ERRO] Erro ao enviar emails para os coaches");

            throw new RuntimeException(e);
        }
    }

    public void enviarEmailsDevs(LoadService loadService, String assunto, String mensagem) {
        try {
            List<String> emails = loadService.buscarEmailsDevs();

            logService.sucesso("INFO", "Iniciando envio dos emails para os devs", "LoadService");
            System.out.println("[INFO] Iniciando envio dos emails para os devs");

            for (String email : emails) {
                enviarEmail(email, assunto, mensagem);
            }

            logService.sucesso("SUCESSO", "Envio dos emails para os devs finalizado", "LoadService");
            System.out.println("[SUCESSO] Envio dos emails para os devs finalizado");
        } catch (Exception e) {
            logService.erro("ERRO", "Erro ao enviar emails para os devs", "EmailService", e.getMessage(), e.toString());
            System.out.println("[ERRO] Erro ao enviar emails para os devs");

            throw new RuntimeException(e);
        }
    }
}