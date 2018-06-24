package models.entities;

import java.util.*;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 *
 */
@Entity
@Table(name = "PARTIDAS")
public class Partida {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "id_Sequence")
    @SequenceGenerator(name = "id_Sequence", sequenceName = "GAME_ID_SEQ")
    private Long id;
    private String nombre;
    private int tiempoPartida;
    //private double promedioTiempoParticipantes;
    //private List<EstadisticasPlayer> estadisticas;
    @ManyToMany
    private List<Pregunta> preguntas;

    public Partida() {
    }

    public Partida(String nombre, int tiempoPartida, List<Pregunta> preguntas) {
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

    public int getTiempoPartida() {
        return tiempoPartida;
    }

    public void setTiempoPartida(int tiempoPartida) {
        this.tiempoPartida = tiempoPartida;
    }

    public List<Pregunta> getPreguntas() {
        return preguntas;
    }

    public void setPreguntas(List<Pregunta> preguntas) {
        this.preguntas = preguntas;
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("Partida ID: ").append(getId()).append(builder).append("\n");
        builder.append("Nombre: ").append(getNombre()).append(builder).append("\n");
        builder.append("Tiempo: ").append(getTiempoPartida()).append(builder).append("\n");
        for (Pregunta pregunta : getPreguntas()) {
            builder.append(pregunta.toString());
        }
        return builder.toString();
    }
    
    
    

}
