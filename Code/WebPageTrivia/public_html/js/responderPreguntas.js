$(document).ready(function () {

  var preguntaIndex = 0;
  var progress = 0;
  var percentageIncrement = 0;

  var partidaID = localStorage.getItem('idPartida');

  var startGameTimeStamp;
  var timeToServer;

  var startAnswerTimestamp;
  var endAnswerTimestamp;
  var tiempoLimitePregunta;
  var tiempoLimitePartida;

  var totalTimeAnswer = 0;

  var totalTimeGame = 0;
  var puntaje = 0;
  var respuestasCorrectas = 0;

  
  var puntajePregunta = 0;

 
  var pregunta;
  var partida;

  var estadisticasPregunta={
    pregunta : {},
    esCorrecta : false,
    tiempoRespuesta: 0
  }

  var estadisticas = {
    "idPartida" : 0,
    "estadisticasPregunta" :[],
    "esCorrecta" : false
  };


  getPartida(partidaID);


  $('#answer-question').on('click', function (e) {

    detenerTimer();

    $('input[name=inlineRadioOptions]').attr('disabled',true);

    var answer = $('input[name=inlineRadioOptions]:checked').attr('value');
    var type, alertHeader, message;
    if(answer == pregunta.correcta){
      estadisticasPregunta.esCorrecta = false;
      type = 'success';
      alertHeader= '¡Bien!';
      message = 'Respuesta correcta';
      puntajePregunta += 10;
      if(totalTimeAnswer > tiempoLimitePregunta &&  totalTimeAnswer <= (tiempoLimitePregunta + 5)){
        console.log("respondio 5 segundos después");
        puntajePregunta -= 1
      }else if(totalTimeAnswer > tiempoLimitePregunta &&  totalTimeAnswer > (tiempoLimitePregunta + 5) && totalTimeAnswer <= (tiempoLimitePregunta + 10) ){
        puntajePregunta -= 2;
        console.log("respondio 10 segundos después");
      }
      respuestasCorrectas++;
    }else{
      estadisticasPregunta.esCorrecta  = false;   
      type = 'danger';
      alertHeader= '¡Mal!'
      message = 'Respuesta incorrecta';
      puntajePregunta = -2;
    }

    var alertType = 'alert-'+ type;
    var htmlAlert = '<div class="alert '+ alertType +'"><h1>'+ alertHeader +'</h1><BR><p>'+ message +'</p></div>';

    $(".alert-message").prepend(htmlAlert);
    $(".alert-message .alert").first().hide().fadeIn(200).delay(1000).fadeOut(500, function () { $(this).remove(); });

    $('#next-question').removeClass('mybtn-hidden');
    $('#answer-question').addClass('mybtn-hidden');


    preguntaIndex++;

    progress += percentageIncrement;

    if(!(preguntaIndex<partida.preguntas.length)){
      progress = 100;
    } 

    $('#progress-bar').css('width', progress+'%').attr('aria-valuenow', progress);
    $('#progress-bar').html('');
    $('#progress-bar').append(progress+'%');

    puntaje += puntajePregunta;

    console.log("Puntaje pregunta: "+puntajePregunta+" Puntaje Total "+puntaje);

    puntajePregunta = 0;

  });


$('#next-question').on('click', function (e) {

  $('input[name=inlineRadioOptions]').attr('disabled',false);

  estadisticas.estadisticasPregunta.push(estadisticasPregunta);
  if(preguntaIndex<partida.preguntas.length){
    console.log("Index es "+preguntaIndex+". "+partida.preguntas.length);
    $('#next-question').addClass('mybtn-hidden');
    $('#answer-question').removeClass('mybtn-hidden');
    pregunta = partida.preguntas[preguntaIndex];
    llenarDialogoResponderPregunta(pregunta);
    
  }else{
    alert("ya se acabó");
    stopGame();
  }
});

function getPregunta(id) {
  $.ajax({
    url: 'https://'+serverIP+'/question/'+ id,
    dataType: 'json',
    type: 'GET',
    success: function (data) {
      pregunta = data;
      llenarDialogoResponderPregunta(data);
    }
  });
}

function getPartida(id) {
  console.log("THIS IS "+serverIP);
  $.ajax({
    url: 'https://'+serverIP+'/partida/'+ id,
    dataType: 'json',
    type: 'GET',
    success: function (data) {
      partida = data;
      setUpStats(partida.id);

      // CLOCK SYNCHRONIZATION

      console.log(partida);
      $('#game-name').html('');
      $('#game-name').html('<strong>'+partida.nombre+'<strong>');
      getListPreguntas(id);    
    }
  });
}


function setUpStats(idPartida){

  var stats ={
    "idJugador":localStorage.getItem('userID'),
    "idPartida":idPartida
  };

  console.log("stats "+stats.idJugador+" -> "+stats.idPartida);


  $.ajax({
    url: 'https://'+serverIP+'/joinPartida',
    dataType: 'json',
    type: 'POST',
    data : stats,
    success: function (data) {
      timeToServer = data;
      console.log("This is time: "+timeToServer);
    }
  });
}

function getListPreguntas(idPartida){
   $.ajax({
    url: 'https://'+serverIP+'/partidapreguntalist/'+ idPartida,
    dataType: 'json',
    type: 'GET',
    success: function (data) {
      partida["preguntas"] = data;
      console.log(partida);
      setUpGame();
    }
  });
}

function setUpGame(){

 startGameTimeStamp = Date.now();

 pregunta = partida.preguntas[preguntaIndex];
 tiempoLimitePartida = partida.tiempoPartida;
 tiempoLimitePregunta = tiempoLimitePartida/partida.preguntas.length;

 console.log("Tiempo Partida "+tiempoLimitePartida+"Tiempo pregunta "+tiempoLimitePregunta);
 llenarDialogoResponderPregunta(pregunta);
 setUpProgressBar();
 estadisticasPregunta.pregunta = pregunta;
 estadisticas.idPartida = partida.id;

}

function setUpProgressBar(){
  percentageIncrement = Math.floor(100/partida.preguntas.length);
}

function stopGame(){
  $('#answer-question').addClass('mybtn-hidden');
  $('#next-question').addClass('mybtn-hidden');
  $('#finalize-trivia').removeClass('mybtn-hidden');
  sendStats();
}

function sendStats(){

  var stats = {
    "idJugador":localStorage.getItem('userID'),
    "idPartida":partidaID,
    "tiempoTotal": totalTimeGame,
    "puntaje": puntaje,
    "respuestasCorrectas": respuestasCorrectas,
    "numeroPreguntas":partida.preguntas.length
  };

  console.log(stats);

   $.ajax({
    url: 'https://'+serverIP+'/updateStats',
    dataType: 'json',
    type: 'POST',
    data : stats,
    success: function (data) {
      console.log(data);
    }
  });
}



function llenarDialogoResponderPregunta(data) {
  console.log(data);
  $("#question-id").text(data.idPregunta);
  $("#question-text").text(data.textoPregunta);
  $("#dificultad").text('Nivel '+data.nivelDificultad);
  $("#answer1").text(data.respuestaUno);
  $("#answer2").text(data.respuestaDos);
  $("#answer3").text(data.respuestaTres);
  $("#answer4").text(data.respuestaCuatro);
  $("#inlineRadio" + data.inlineRadio1).prop("checked", true);
    //$("#total-time-game").text('Tiempo de juego: '+totalTimeGame+'s');
    comenzarTimer();
  }

  function comenzarTimer(){
    totalTimeAnswer = 0;
    startAnswerTimestamp = Date.now();
    endAnswerTimestamp = startAnswerTimestamp; 
  }

  function detenerTimer(){

    endAnswerTimestamp = Date.now();

    var diff = endAnswerTimestamp - startAnswerTimestamp;

    totalTimeAnswer = Math.floor((diff % (1000 * 60)) / 100);

    totalTimeAnswer = totalTimeAnswer/10;

    estadisticasPregunta.tiempoRespuesta = totalTimeAnswer;

    console.log('Se gastó '+totalTimeAnswer+' segundos'); 

    totalTimeGame += totalTimeAnswer;

  }

  var x = setInterval(function() {
  // Get todays date and time
  var now = Date.now();

  //console.log("tiempito "+totalTimeGame+"-> "+now)

  // Find the distance between now an the count down date
  var distance = now - startGameTimeStamp;

  // Time calculations for days, hours, minutes and seconds
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  $('#total-time-game').text("Tiempo de juego: "+minutes + "m " + seconds + "s ");
}, 1000);

});