package models.entity;

/**
 *
 */
public class Respuesta {

    /**
     * Default constructor
     */
    public Respuesta() {
    }

    /**
     *
     */
    private Long idRespuesta;

    /**
     *
     */
    private String textoRespuesta;

    /**
     *
     */
    public boolean esCorrecta;

    /**
     *
     */
    private Pregunta pregunta;

}
