package models.entities;

import java.util.List;

/**
 * 
 */
public class EstadisticasPlayer {

    private List<EstadisticaPregunta> estadisticas;
    private Jugador player;
    
    private int puntos;
    private int respuestasCorrectas;
    private int respuestasIncorrectas;
    private double porcRespuestasCorrectas;
    private double porcRespuestasIncorrectas;
    private double tiempoGastado;

}