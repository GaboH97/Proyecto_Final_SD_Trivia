$(document).ready(function () {

	var partidaId;
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
			
		});

	}

	function setTimer(tiempoPartida){
		$.ajax({
			url: 'https://'+serverIP+'/getTime',
			type: 'GET',
			success: function (data) {
				console.log(tiempoPartida);
				var timeToWait = 30000-(data - tiempoPartida);
				console.log('tengo que es perar ' + timeToWait);
				if(timeToWait>0){
					$('#modalWait').modal('show');

					var distance = timeToWait;

					var x = setInterval(function() {
					  // Get todays date and time

					  //console.log("tiempito "+totalTimeGame+"-> "+now)

					  // Find the distance between now an the count down date
					  
					  distance-=1000;

					  // Time calculations for days, hours, minutes and seconds
					  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
					  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

					  // Display the result in the element with id="demo"
					  $('#labelTimer').text(minutes + "m " + seconds + "s ");
					}, 1000);

					setTimeout(function(){
						localStorage.setItem('idPartida',partidaId);
						location.href = "partials/responderPregunta.html";
					},timeToWait);
				}else{
					alert('yaper');
				}
			}

      // CLOCK SYNCHRONIZATION   

  });
	}


	function playPartida(id){

		$.ajax({
			url: 'https://'+serverIP+'/partida/'+ id,
			dataType: 'json',
			type: 'GET',
			success: function (data) {
				console.log("data "+data.startTime);
				partidaId=id;
				setTimer(data.startTime);
			}

      // CLOCK SYNCHRONIZATION   

  });
	}

});