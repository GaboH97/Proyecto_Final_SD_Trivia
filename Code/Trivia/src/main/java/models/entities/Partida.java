package models.entities;

import java.util.*;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 */
@Entity
@Table(name = "PARTIDAS")
public class Partida {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nombre;
    private double tiempoPartida;
    //private double promedioTiempoParticipantes;
    //private List<EstadisticasPlayer> estadisticas;
    @OneToMany
    private List<Pregunta> preguntas;

    public Partida() {
    }

    public Partida(String nombre, double tiempoPartida, List<Pregunta> preguntas) {
        this.nombre = nombre;
        this.tiempoPartida = tiempoPartida;
        this.preguntas = preguntas;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public double getTiempoPartida() {
        return tiempoPartida;
    }

    public void setTiempoPartida(double tiempoPartida) {
        this.tiempoPartida = tiempoPartida;
    }

    public List<Pregunta> getPreguntas() {
        return preguntas;
    }

    public void setPreguntas(List<Pregunta> preguntas) {
        this.preguntas = preguntas;
    }

}
