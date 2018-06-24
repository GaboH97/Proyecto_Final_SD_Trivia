$(document).ready(function () {


  var preguntaIndex = 0;
  var progress = 0;
  var percentageIncrement = 0;

  var partidaID = 1;
  var startGameTimeStamp = Date.now();
  var startAnswerTimestamp;
  var endAnswerTimestamp; 
  var totalTimeAnswer = 0;  
  var totalTimeGame = 0;
  var pregunta;
  var partida;


  getPartida(partidaID);


  $('#answer-question').on('click', function (e) {

    detenerTimer();

    $('input[name=inlineRadioOptions]').attr('disabled',true);

    var answer = $('input[name=inlineRadioOptions]:checked').attr('value');
    var type, alertHeader, message;
    if(answer == pregunta.correcta){
      type = 'success';
      alertHeader= '¡Bien!';
      message = 'Respuesta correcta';
    }else{   
      type = 'danger';
      alertHeader= '¡Mal!'
      message = 'Respuesta incorrecta';
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

  });


$('#next-question').on('click', function (e) {

  $('input[name=inlineRadioOptions]').attr('disabled',false);

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
    url: 'http://localhost:8181/question/'+ id,
    dataType: 'json',
    type: 'GET',
    success: function (data) {
      pregunta = data;
      llenarDialogoResponderPregunta(data);
    }
  });
}

function getPartida(id) {
  $.ajax({
    url: 'http://localhost:8181/partida/'+ id,
    dataType: 'json',
    type: 'GET',
    success: function (data) {
      partida = data;
      $('#game-name').html('');
      $('#game-name').html('<strong>'+partida.nombre+'<strong>');
      pregunta = partida.preguntas[preguntaIndex];
      llenarDialogoResponderPregunta(pregunta);
      setUpProgressBar();
    }
  });
}

function setUpProgressBar(){
  percentageIncrement = Math.floor(100/partida.preguntas.length);
}

function stopGame(){
    $('#answer-question').addClass('mybtn-hidden');
    $('#next-question').addClass('mybtn-hidden');
    $('#finalize-trivia').removeClass('mybtn-hidden');  
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

    totalTimeAnswer = endAnswerTimestamp - startAnswerTimestamp;

    console.log('Se gastó '+totalTimeAnswer+' segundos'); 

    totalTimeGame += totalTimeAnswer;

  }

  var x = setInterval(function() {



  // Get todays date and time
  var now = Date.now();

  console.log("tiempito "+totalTimeGame+"-> "+now)

  // Find the distance between now an the count down date
  var distance = now - startGameTimeStamp;

  // Time calculations for days, hours, minutes and seconds
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  $('#total-time-game').text("Tiempo de juego: "+minutes + "m " + seconds + "s ");
}, 1000);

});