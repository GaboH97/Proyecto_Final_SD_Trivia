package test;

import models.dao.Juego;
import models.entities.Jugador;
import models.entities.Pregunta;

/**
 *
 * @author Gabriel Huertas, Juan Molina, Cesar Cardozo
 */
public class TestSpark {

    public static void main(String[] args) {
        Juego juego = new Juego();
        //Jugador jugador1 = new Jugador("Cesar", "123", "123.@123.com", "www.yo.com");
        //Jugador jugador2 = new Jugador("Gabo", "123", "1234.@123.com", "www.y1.com");
        //Jugador jugador3 = new Jugador("Cesarin", "123", "123.@123.com", "www.yo.com");
        Pregunta pregunta1 = new Pregunta("¿Quién es el actual seleccionador de Rusia?",
                1,
                "José Antonio Camacho.",
                "Gus Hiddink.",
                "Jupp Heynckes.",
                "Fabio Capello.",
                1);
        Pregunta pregunta2 = new Pregunta("¿Qué Mundial, con 171 goles, es hasta la fecha el más goleador de la historia?",
                2,
                "España 1982.",
                "Francia 1998.",
                "Alemania 2006.",
                "Sudáfrica 2010.",
                2);

        Pregunta pregunta3 = new Pregunta("¿Qué jugador de España tiene el récord de goles en un solo Mundial?",
                1,
                 "David Villa.",
                " Raúl González.",
                "Eloy.",
                "Emilio Butragueño.",
                1);

        try {
            //juego.addPlayer(jugador1);
            // juego.addPlayer(jugador2);
            //juego.addPlayer(jugador3);

            juego.addQuestion(pregunta1);
            juego.addQuestion(pregunta2);
            juego.addQuestion(pregunta3);

        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

}
