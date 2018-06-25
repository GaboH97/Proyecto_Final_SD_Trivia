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
@Table(name = "ESTADISTICAS")
public class EstadisticasPlayer {

    // private List<EstadisticaPregunta> estadisticas;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "id_Sequence")
    @SequenceGenerator(name = "id_Sequence", sequenceName = "STATS_PLAYER_ID_SEQ")
    private Long id;

    private Long idPartida;
    private Long playerID;
    private int puntos;
    private int respuestasCorrectas;
    private int respuestasIncorrectas;
    private double porcRespuestasCorrectas;
    private double porcRespuestasIncorrectas;
    private double tiempoGastado;

    public EstadisticasPlayer() {
    }

    public EstadisticasPlayer(Long idPartida, Long playerID, int puntos, int respuestasCorrectas, int respuestasIncorrectas, double porcRespuestasCorrectas, double porcRespuestasIncorrectas, double tiempoGastado) {
        this.idPartida = idPartida;
        this.playerID = playerID;
        this.puntos = puntos;
        this.respuestasCorrectas = respuestasCorrectas;
        this.respuestasIncorrectas = respuestasIncorrectas;
        this.porcRespuestasCorrectas = porcRespuestasCorrectas;
        this.porcRespuestasIncorrectas = porcRespuestasIncorrectas;
        this.tiempoGastado = tiempoGastado;
    }

    public EstadisticasPlayer(Long idPartida, Long playerID) {
        this.idPartida = idPartida;
        this.playerID = playerID;
        this.puntos = 0;
        this.respuestasCorrectas = 0;
        this.respuestasIncorrectas = 0;
        this.porcRespuestasCorrectas = 0;
        this.porcRespuestasIncorrectas = 0;
        this.tiempoGastado = 0;
    }

    public Long getIdPartida() {
        return idPartida;
    }

    public void setIdPartida(Long idPartida) {
        this.idPartida = idPartida;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPlayerID() {
        return playerID;
    }

    public void setPlayer(Long playerID) {
        this.playerID = playerID;
    }

    public int getPuntos() {
        return puntos;
    }

    public void setPuntos(int puntos) {
        this.puntos = puntos;
    }

    public int getRespuestasCorrectas() {
        return respuestasCorrectas;
    }

    public void setRespuestasCorrectas(int respuestasCorrectas) {
        this.respuestasCorrectas = respuestasCorrectas;
    }

    public int getRespuestasIncorrectas() {
        return respuestasIncorrectas;
    }

    public void setRespuestasIncorrectas(int respuestasIncorrectas) {
        this.respuestasIncorrectas = respuestasIncorrectas;
    }

    public double getPorcRespuestasCorrectas() {
        return porcRespuestasCorrectas;
    }

    public void setPorcRespuestasCorrectas(double porcRespuestasCorrectas) {
        this.porcRespuestasCorrectas = porcRespuestasCorrectas;
    }

    public double getPorcRespuestasIncorrectas() {
        return porcRespuestasIncorrectas;
    }

    public void setPorcRespuestasIncorrectas(double porcRespuestasIncorrectas) {
        this.porcRespuestasIncorrectas = porcRespuestasIncorrectas;
    }

    public double getTiempoGastado() {
        return tiempoGastado;
    }

    public void setTiempoGastado(double tiempoGastado) {
        this.tiempoGastado = tiempoGastado;
    }

}
