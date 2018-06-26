$(document).ready(function () {
    getRanking();

    function getRanking() {
        $.ajax({
            url: "https://" + serverIP + "/playersRanking",
            type: 'GET',
            success: function (data, textStatus, jqXHR) {
                $("#ranking-table").html("");
                for (var i = 0; i < data.length; i++) {
                    llenarRanking(data[i], i);
                }
            }
        });
    }

    function llenarRanking(element, i) {
        var body = '<tr><th scope="row">' + (i + 1) + '</th><td><img class="img-responsive img-rounded img-responsive avatar" src="' + element.fotoJugador + '" alt=""></td>';
        body += '<td>' + element.nombreUsuario + '</td><td>' + element.puntaje + '</td></tr>';
        $("#ranking-table").append(body);

    }
});
