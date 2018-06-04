package models;

import java.util.*;

/**
 *
 */
public class Usuario {

    /**
     * Default constructor
     */
    public Usuario() {
    }

    /**
     *
     */
    private String nombreUsuario;

    /**
     *
     */
    private String contrasenaUsuario;

    /**
     *
     */
    private String email;

    /**
     *
     */
    private String fotoOAvatar;

    public Usuario(String nombreUsuario, String contrasenaUsuario, String email, String fotoOAvatar) {
        this.nombreUsuario = nombreUsuario;
        this.contrasenaUsuario = contrasenaUsuario;
        this.email = email;
        this.fotoOAvatar = fotoOAvatar;
    }

}
