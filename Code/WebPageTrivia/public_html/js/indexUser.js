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
					console.log(data);
				}
			}
		});
	}

	function cargarPartidas(element) {
		console.log(element);
		var bodyPartida = "";
		bodyPartida += '<tr id="row-' + element.id + '" ><td>' + element.nombre + '</td><td>' + element.tiempoPartida + '</td>';
		bodyPartida += '<td><div class="btn-group" role="group" aria-label="..."><button id="play-' + element.id + '" type="button" class="btn btn-default" '
		bodyPartida += 'idPartida = "' + element.id + '" ><span class="glyphicon glyphicon-play" aria-hidden="true"></span></button></div></td></tr>';
		$("#tabla-partida").append(bodyPartida);
		
		$('#play-' + element.id).on('click', function (e) {
			playPartida(e.currentTarget.attributes[3].value);
			location.href="partials/responderPregunta.html";
		});

	}

	function playPartida(id){
		localStorage.setItem('idPartida',id);
	}

});