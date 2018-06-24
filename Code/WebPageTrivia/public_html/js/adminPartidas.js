$(document).ready(function () {
    loadPartidas();
    
    function loadPartidas() {
        $.ajax({
            url: 'http://localhost:8181/partidas',
            dataType: 'json',
            type: 'GET',
            success: function (data) {
                console.log(data);
                for (var item in data) {
                    cargarPartidas(item);
                }
            }
        });
    }

    function cargarPartidas(element) {
        $("#tabla-partida").html("");
        var bodyPartida = "";
        bodyPartida += '<tr id="row-' + element.id + '" ><td>' + element.name + '</td><td>' + element.tiempoPartida + '</td>';
        bodyPartida += '<td><div class="btn-group" role="group" aria-label="..."><button id="borra-' + element.id + '" type="button" class="btn btn-default" '
        bodyPartida += 'idPartida = "' + element.id + '" ><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></div></td></tr>';
        $('#borra-' + element.id).on('click', function (e) {
            delPartida(e.currentTarget.attributes[3].value);
            $('#row-' + e.currentTarget.attributes[3].value).remove();
        });
    }

    function delPartida(id) {
        console.log(id);
        $.ajax({
            url: "http://localhost:8181/partida/" + id,
            type: 'DELETE',
            success: function (res) {
                alert(res);
                location.href = "adminPartidas.html";
            }
        });
    }
});