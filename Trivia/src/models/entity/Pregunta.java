package models.entity;

import models.*;
import java.util.*;

/**
 * 
 */
public class Pregunta {

    /**
     * Default constructor
     */
    public Pregunta() {
    }

    public Pregunta(Long idPregunta, String textoPregunta, Integer nivelDificultad) {
        this.idPregunta = idPregunta;
        this.textoPregunta = textoPregunta;
        this.nivelDificultad = nivelDificultad;
    }

    /**
     * 
     */
    private Long idPregunta;

    /**
     * 
     */
    private String textoPregunta;

    /**
     * 
     */
    private Integer nivelDificultad;

    @Override
     protected Pregunta clone() throws CloneNotSupportedException {
         return new Pregunta(this.idPregunta, this.textoPregunta, this.nivelDificultad);
    }

}