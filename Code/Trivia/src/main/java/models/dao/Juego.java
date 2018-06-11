package models.dao;

import java.util.List;
import models.entities.Jugador;
import models.entities.Pregunta;
import org.hibernate.Session;
import org.hibernate.Transaction;
import persistence.HibernateUtil;

/**
 *
 */
public class Juego {

    private Session sessionHibernate;
    private Transaction tx;

    public Juego() {

    }

    /**
     * Adds persistent student data to the DBMS
     *
     * @param student
     * @throws java.lang.Exception
     */
    public void addPlayer(Jugador jugador) throws Exception {
        saveHibernate(jugador);
    }

    /**
     * Adds persistent student data to the DBMS
     *
     * @param student
     * @throws java.lang.Exception
     */
    public void addQuestion(Pregunta pregunta) throws Exception {
        saveHibernate(pregunta);
    }

    /**
     *
     * @param nombreUsuario
     * @param contrasenaUsuario
     * @param email
     * @param fotoOAvatar
     * @return A message representing success/failure when adding a new student
     */
    public String createPlayer(String nombreUsuario, String contrasenaUsuario, String email, String fotoOAvatar) {
        Jugador jugador = new Jugador(nombreUsuario, contrasenaUsuario, email, fotoOAvatar);
        try {
            addPlayer(jugador);
            return "Jugador agregado";
        } catch (Exception e) {
            return "No se pudo agregar jugador";
        }
    }

    public String createQuestion(String textoPregunta, Integer nivelDificultad, String respuestaUno, String respuestaDos, String respuestaTres, String respuestaCuatro, int correcta) {
        Pregunta pregunta = new Pregunta(textoPregunta, nivelDificultad, respuestaUno, respuestaDos, respuestaTres, respuestaCuatro, correcta);
        try {
            addQuestion(pregunta);
            return "Pregunta agregada";
        } catch (Exception e) {
            return "No se pudo agregar pregunta";
        }
    }

    /**
     *
     * @param object A raw object to be persisted in the DB
     * @throws Exception when any of the steps during the transaction fails
     */
    public void saveHibernate(Object object) throws Exception {
        sessionHibernate = HibernateUtil.getSessionFactory().openSession();
        tx = sessionHibernate.beginTransaction();
        sessionHibernate.save(object);
        tx.commit();
        sessionHibernate.close();
    }

    /**
     *
     * @return A list of existing students in the DB
     */
    public List<Jugador> getAllPlayers() {
        sessionHibernate = HibernateUtil.getSessionFactory().openSession();
        List<Jugador> list = sessionHibernate.createQuery("from " + Jugador.class.getName()).list();
        sessionHibernate.close();
        return list;
    }

    public List<Pregunta> getallQuestions() {
        sessionHibernate = HibernateUtil.getSessionFactory().openSession();
        List<Pregunta> list = sessionHibernate.createQuery("from " + Pregunta.class.getName()).list();
        sessionHibernate.close();
        return list;

    } 
}
