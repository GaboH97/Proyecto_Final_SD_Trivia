package models.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "JUGADORES")

public class Jugador {
    
    //===============Attributes===============

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nombreUsuario;
    private String contrasenaUsuario;
    private String email;
    private String fotoJugador;
//    private List<Partida> partidas;

    
    //===============Constructors=============
    
    public Jugador() {
    }

    public Jugador(String nombreUsuario, String contrasenaUsuario, String email, String fotoJugador) {
        this.nombreUsuario = nombreUsuario;
        this.contrasenaUsuario = contrasenaUsuario;
        this.email = email;
        this.fotoJugador = fotoJugador;
    }
    
    //============Getters & Setters===========

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    
    
    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getContrasenaUsuario() {
        return contrasenaUsuario;
    }

    public void setContrasenaUsuario(String contrasenaUsuario) {
        this.contrasenaUsuario = contrasenaUsuario;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFotoJugador() {
        return fotoJugador;
    }

    public void setFotoJugador(String fotoJugador) {    
        this.fotoJugador = fotoJugador;
    }

    @Override
    public String toString() {
        return "Player{" + "nombreUsuario=" + nombreUsuario + ", contrasenaUsuario=" + contrasenaUsuario + ", email=" + email + ", fotoOAvatar=" + fotoJugador + '}';
    }
}