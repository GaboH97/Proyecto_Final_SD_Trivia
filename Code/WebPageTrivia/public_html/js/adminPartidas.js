$(document).ready(function () {
    loadPartidas();

    function loadPartidas() {
        $.ajax({
            url: 'https://'+serverIP+'/partidas',
            dataType: 'json',
            type: 'GET',
            success: function (data) {
                $("#tabla-partida").html("");
                for (var i = 0; i < data.length; i++) {
                    cargarPartidas(data[i]);
                }
            }
        });
    }

    function cargarPartidas(element) {
        console.log(element);
        var bodyPartida = "";
        bodyPartida += '<tr id="row-' + element.id + '" ><td>' + element.nombre + '</td><td>' + element.tiempoPartida + '</td>';
        bodyPartida += '<td><div class="btn-group" role="group" aria-label="..."><button id="borra-' + element.id + '" type="button" class="btn btn-default" '
        bodyPartida += 'idPartida = "' + element.id + '" ><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></div></td></tr>';
        $('#borra-' + element.id).on('click', function (e) {
            delPartida(e.currentTarget.attributes[3].value);
            $('#row-' + e.currentTarget.attributes[3].value).remove();
        });
        $("#tabla-partida").append(bodyPartida);
    }

    function delPartida(id) {
        console.log(id);
        $.ajax({
            url: "https://"+serverIP+"/partida/" + id,
            type: 'DELETE',
            success: function (res) {
                alert(res);
                location.href = "adminPartidas.html";
            }
        });
    }
});