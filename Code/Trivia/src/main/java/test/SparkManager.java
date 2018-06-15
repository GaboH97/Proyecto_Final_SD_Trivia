package test;

import static spark.Spark.*;
import com.google.gson.Gson;
import javax.servlet.DispatcherType;
import models.dao.Juego;
import persistence.JsonUtil;

/**
 * This class handles incoming requests from a server using Spark Framework
 * using GET and POST methods for querying and adding data from the DB which
 * response is in JSON format.
 *
 * @author Gabriel Huertas, Juan Molina, Cesar Cardozo
 */
public class SparkManager {

    public static void main(String[] args) {
        //Set port and IP address in which Spark server will be listening
        ipAddress("localhost");
        port(8181);

        //Create a manager and spark manager instance, plus set spark manager
        //response to JSON
        Juego juego = new Juego();
        SparkManager main = new SparkManager();
        main.corsFilter();

        get("/players", (req, res) -> juego.getAllPlayers(), JsonUtil.json());
//        get("/trainners", (req, res) -> juego.getAllTrainners(), JsonUtil.json());
//        get("/movements", (req, res) -> juego.getAllMovements(), JsonUtil.json());
        post("/player", (req, res) -> juego.createPlayer(
                req.queryParams("nombreJugador"),
                req.queryParams("contraseniaJugador"),
                req.queryParams("emailJugador"),
                req.queryParams("fotoJugador")), JsonUtil.json());

        get("/questions", (req, res) -> juego.getallQuestions(), JsonUtil.json());
//        get("/trainners", (req, res) -> juego.getAllTrainners(), JsonUtil.json());
//        get("/movements", (req, res) -> juego.getAllMovements(), JsonUtil.json());
        post("/question", (req, res) -> juego.createQuestion(
                req.queryParams("textoPregunta"),
                Integer.parseInt(req.queryParams("nivelDificultadPregunta")),
                req.queryParams("respuestaUno"),
                req.queryParams("respuestaDos"),
                req.queryParams("respuestaTres"),
                req.queryParams("respuestaCuatro"),
                Integer.parseInt(req.queryParams("correcta"))), JsonUtil.json());

    }

    /**
     * Metodo encargado de adicionar los CorsFilters al servicio
     */
    public void corsFilter() {
        // Filtro para convertir la salida a formato JSON
        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }
            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }
            String mensajeOk = "{'id':10,'cantidad':0}";
            return new Gson().toJson(mensajeOk).toString();
        });
        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));
        after((request, response) -> response.type("application/json"));
    }
}