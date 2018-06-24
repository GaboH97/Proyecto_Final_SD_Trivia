$(document).ready(function () {

  getPregunta(30);

  var startAnswerTimestamp;
  var endAnswerTimestamp;
  var totalTime;

  var pregunta;
  
  $('.answer-question').on('click', function (e) {
    
    detenerTimer();

    $(this).text('Siguiente pregunta');
    $(this).removeClass('answer-question').addClass('next-question');
    $(this).removeClass('btn btn-primary').addClass('btn btn-success');
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

function llenarDialogoResponderPregunta(data) {
    console.log(data);
    $("#question-id").text(data.idPregunta);
    $("#question-text").text(data.textoPregunta);
    $("#dificultad").text(data.nivelDificultad);
    $("#answer1").text(data.respuestaUno);
    $("#answer2").text(data.respuestaDos);
    $("#answer3").text(data.respuestaTres);
    $("#answer4").text(data.respuestaCuatro);
    $("#inlineRadio" + data.inlineRadio1).prop("checked", true);
    comenzarTimer();
}

function comenzarTimer(){
    startAnswerTimestamp = Date.now();
}

function detenerTimer(){
    endAnswerTimestamp = Date.now();

    totalTime = Math.floor(endAnswerTimestamp / 1000) - Math.floor(startAnswerTimestamp / 1000);

    console.log('Se gastó '+totalTime+' segundos'); 
}



});