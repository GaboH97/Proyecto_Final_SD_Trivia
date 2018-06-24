package models.dao;

import static java.lang.reflect.Array.set;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import models.entities.EstadisticasPlayer;
import models.entities.Jugador;
import models.entities.Partida;
import models.entities.Pregunta;
import org.hibernate.Session;
import org.hibernate.Transaction;
import persistence.HibernateUtil;
import spark.Request;

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
     * Borra la pregunta de la base de datos
     *
     * @param pregunta la pregunta a borrar
     * @throws Exception en el caso de que no exista en la base de datos
     */
    public void removeQuestion(Pregunta pregunta) throws Exception {
        removeHibernate(pregunta);
    }

    /**
     *
     * @param nombreUsuario
     * @param contrasenaUsuario
     * @param email
     * @param fotoOAvatar
     * @return A message representing success/failure when adding a new student
     */
    public Jugador createPlayer(String nombreUsuario, String contrasenaUsuario, String email, String fotoOAvatar) {
        Jugador jugador = new Jugador(nombreUsuario, contrasenaUsuario, email, fotoOAvatar);
        try {
            addPlayer(jugador);
            jugador.setContrasenaUsuario("null");
            return jugador;
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Crea una nuevo pregunta
     *
     * @param id de la pregunta
     * @param textoPregunta
     * @param nivelDificultad
     * @param respuestaUno
     * @param respuestaDos
     * @param respuestaTres
     * @param respuestaCuatro
     * @param correcta numero de 1 a 4 indicando que numero de la pregunta es
     * correcta
     * @return la si la pregunta se agrego o no
     */
    public String createQuestion(String id, String textoPregunta, Integer nivelDificultad, String respuestaUno, String respuestaDos, String respuestaTres, String respuestaCuatro, int correcta) {
        Pregunta pregunta = new Pregunta(textoPregunta, nivelDificultad, respuestaUno, respuestaDos, respuestaTres, respuestaCuatro, correcta);
        if (!id.isEmpty()) {
            pregunta.setIdPregunta(Long.parseLong(id));
        }
        try {
            addQuestion(pregunta);
            return "Pregunta agregada";
        } catch (Exception e) {
            return "No se pudo agregar pregunta";
        }

    }
    
        public Pregunta createQuestionReturnObj(String id, String textoPregunta, Integer nivelDificultad, String respuestaUno, String respuestaDos, String respuestaTres, String respuestaCuatro, int correcta) {
        Pregunta pregunta = new Pregunta(textoPregunta, nivelDificultad, respuestaUno, respuestaDos, respuestaTres, respuestaCuatro, correcta);
        if (!id.isEmpty()) {
            pregunta.setIdPregunta(Long.parseLong(id));
        }
        try {
            addQuestion(pregunta);
            return pregunta;
        } catch (Exception e) {
            return null;
        }

    }

    public String crearPartida(String id, String nombre, String tiempoPartida, ArrayList<String> idPreguntas) {
        Partida partida = new Partida(nombre, Integer.parseInt(tiempoPartida), new ArrayList<>());
        if (!id.isEmpty()) {
            partida.setId(Long.parseLong(id));
        }
        ArrayList<Pregunta> preguntaList=new ArrayList();
        for (String idPregunta : idPreguntas) {
            System.out.println("id pre+ "+idPregunta);
            preguntaList.add(getQuestionById(idPregunta));
        }
        partida.setPreguntas(preguntaList);
        try {
            saveHibernate(partida);
            return "Pregunta agregada";
        } catch (Exception ex) {
            Logger.getLogger(Juego.class.getName()).log(Level.SEVERE, null, ex);
            return "No se pudo agregar pregunta";
        }
    }

    public String borrarPartida(String id) {
        Partida partida = getPartidaById(id);
        removeHibernate(partida);
        return "Partida borrada";
    }

    /**
     *
     * @param object A raw object to be persisted in the DB
     * @throws Exception when any of the steps during the transaction fails
     */
    public void saveHibernate(Object object) throws Exception {
        sessionHibernate = HibernateUtil.getSessionFactory().openSession();
        tx = sessionHibernate.beginTransaction();
        sessionHibernate.saveOrUpdate(object);
        tx.commit();
        sessionHibernate.close();
    }

    public void removeHibernate(Object object) {
        sessionHibernate = HibernateUtil.getSessionFactory().openSession();
        tx = sessionHibernate.beginTransaction();
        sessionHibernate.remove(object);
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

    public Jugador login(String email, String password) {
        sessionHibernate = HibernateUtil.getSessionFactory().openSession();
        List<Jugador> list = sessionHibernate.createQuery("from " + Jugador.class.getName() + " WHERE email='" + email + "' and contrasenausuario='" + password + "'").list();
        sessionHibernate.close();
        System.out.println("email" + list.get(0).getEmail());
        return list.get(0);
    }

    public Pregunta getQuestionById(String params) {
        sessionHibernate = HibernateUtil.getSessionFactory().openSession();
        Pregunta pregunta = (Pregunta) sessionHibernate.createQuery("from " + Pregunta.class.getName() + " where IDPREGUNTA=" + params).list().get(0);
        sessionHibernate.close();
        return pregunta;
    }

    public List<Partida> getallPartidas() {
        sessionHibernate = HibernateUtil.getSessionFactory().openSession();
        List<Partida> partidas = (List<Partida>) sessionHibernate.createQuery("from " + Partida.class.getName()).list();
        sessionHibernate.close();
        return partidas;
    }

    public Partida getPartidaById(String params) {
        sessionHibernate = HibernateUtil.getSessionFactory().openSession();
        Partida partida = (Partida) sessionHibernate.createQuery("from " + Partida.class.getName() + " where ID=" + params).list().get(0);
        sessionHibernate.close();
        return partida;
    }

    public String deletQustion(String params) {
        Pregunta pregunta = getQuestionById(params);
        try {
            removeQuestion(pregunta);
        } catch (Exception ex) {
            Logger.getLogger(Juego.class.getName()).log(Level.SEVERE, null, ex);
            return "Error no se pudo eliminar";
        }
        return "Se borro correctamente";
    }

}
