package models.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 *
 */
@Entity
@Table(name = "PREGUNTAS")
public class Pregunta {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "id_Sequence")
    @SequenceGenerator(name = "id_Sequence", sequenceName = "QUESTION_ID_SEQ")
    private Long idPregunta;
    private String textoPregunta;
    private Integer nivelDificultad;
    private String respuestaUno;
    private String respuestaDos;
    private String respuestaTres;
    private String respuestaCuatro;
    private int correcta;

    public Pregunta() {
    }

    public Pregunta(String textoPregunta, Integer nivelDificultad, String respuestaUno, String respuestaDos, String respuestaTres, String respuestaCuatro, int correcta) {
        this.textoPregunta = textoPregunta;
        this.nivelDificultad = nivelDificultad;
        this.respuestaUno = respuestaUno;
        this.respuestaDos = respuestaDos;
        this.respuestaTres = respuestaTres;
        this.respuestaCuatro = respuestaCuatro;
        this.correcta = correcta;
    }

    public Long getIdPregunta() {
        return idPregunta;
    }

    public void setIdPregunta(Long idPregunta) {
        this.idPregunta = idPregunta;
    }

    public String getTextoPregunta() {
        return textoPregunta;
    }

    public void setTextoPregunta(String textoPregunta) {
        this.textoPregunta = textoPregunta;
    }

    public Integer getNivelDificultad() {
        return nivelDificultad;
    }

    public void setNivelDificultad(Integer nivelDificultad) {
        this.nivelDificultad = nivelDificultad;
    }

    public String getRespuestaUno() {
        return respuestaUno;
    }

    public void setRespuestaUno(String respuestaUno) {
        this.respuestaUno = respuestaUno;
    }

    public String getRespuestaDos() {
        return respuestaDos;
    }

    public void setRespuestaDos(String respuestaDos) {
        this.respuestaDos = respuestaDos;
    }

    public String getRespuestaTres() {
        return respuestaTres;
    }

    public void setRespuestaTres(String respuestaTres) {
        this.respuestaTres = respuestaTres;
    }

    public String getRespuestaCuatro() {
        return respuestaCuatro;
    }

    public void setRespuestaCuatro(String respuestaCuatro) {
        this.respuestaCuatro = respuestaCuatro;
    }

    public int getCorrecta() {
        return correcta;
    }

    public void setCorrecta(int correcta) {
        this.correcta = correcta;
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("Pregunta ID: ").append(getIdPregunta()).append(builder).append("\n");
        builder.append("Nivel: ").append(getNivelDificultad()).append(builder).append("\n");
        builder.append("Texto Pregunta: ").append(getTextoPregunta()).append(builder).append("\n");
        builder.append("Respuesta 1: ").append(getRespuestaUno()).append(builder).append("\n");
        builder.append("Respuesta 2: ").append(getRespuestaDos()).append(builder).append("\n");
        builder.append("Respuesta 3: ").append(getRespuestaTres()).append(builder).append("\n");
        builder.append("Respuesta 4: ").append(getRespuestaCuatro()).append(builder).append("\n");
        builder.append("Opción correcta: ").append(getCorrecta()).append(builder).append("\n");
        return builder.toString();
    }

}
