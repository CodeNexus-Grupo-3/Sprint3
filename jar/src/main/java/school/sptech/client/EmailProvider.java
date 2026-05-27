package school.sptech.client;

import java.util.Properties;
import jakarta.mail.Session;
import jakarta.mail.Authenticator;
import jakarta.mail.PasswordAuthentication;

public class EmailProvider {

    private final String host;
    private final String port;
    private final String user;
    private final String pass;

    public EmailProvider() {
        this.host = System.getenv("SMTP_HOST");
        this.port = System.getenv("SMTP_PORT");
        this.user = System.getenv("SMTP_USER");
        this.pass = System.getenv("SMTP_PASS");
    }

    public Session getSession() {
        Properties properties = new Properties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", port);

        return Session.getInstance(
            properties,
            new Authenticator() {
                @Override
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(user, pass);
                }
            }
        );
    }

    public String getUser() {
        return user;
    }
}