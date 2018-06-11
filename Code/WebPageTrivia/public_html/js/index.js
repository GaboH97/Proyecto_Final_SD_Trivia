$(document).ready(function () {
    var state = "jugadores";
    addPlayers();

    $('#add').on('click', function () {
        if (state == 'jugadores') {
            location.href = "add/addPlayer.html";
        } else if (state == 'preguntas') {
            location.href = "add/addQuestion.html";
        }
    });

    $('#btn-players').on('click', function () {
        addPlayers();
    });
    $('#btn-questions').on('click', function () {
        addQuestions();
    });

    $('#add-player').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:8181/player',
            method: "POST",
            dataType: 'json',
            data: $('#form-player').serializeFormJSON(),
            success: function (result) {
                if (result == 'Jugador agregado') {
                    $("#alert").html("");
                    $("#alert").append('<div class="alert alert-success"><strong>Exito: </strong>' + result + '</div>');
                    setTimeout(function () {
                        location.href = "../index.html";
                    }, 1000);
                } else {
                    $("#alert").html("");
                    $("#alert").append('<div class="alert alert-danger"><strong>Error:  </strong>' + result + '</div>');
                }
            },
            error: function (er) {
                $("#alert").append('<div class="alert alert-danger"><strong>Error: </strong>' + er + '</div>');
            }
        });
    });

    $('#add-question').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:8181/question',
            method: "POST",
            dataType: 'json',
            data: $('#form-question').serializeFormJSON(),
            success: function (result) {
                if (result == 'Pregunta agregada') {
                    $("#alert").html("");
                    $("#alert").append('<div class="alert alert-success"><strong>Exito: </strong>' + result + '</div>');
                    setTimeout(function () {
                        location.href = "../index.html";
                    }, 1000);
                } else {
                    $("#alert").html("");
                    $("#alert").append('<div class="alert alert-danger"><strong>Error:  </strong>' + result + '</div>');
                }
            },
            error: function (er) {
                $("#alert").append('<div class="alert alert-danger"><strong>Error: </strong>' + er + '</div>');
            }
        });
    });

    function addPlayers() {
        $.ajax({
            url: 'http://localhost:8181/players',
            dataType: 'json',
            success: function (data) {
                $('#table').html('');
                $('#table').append('<thead><tr> <th>Nombre Jugador</th><th>Contraseña</th><th>E-mail</th> <th>Image</th></tr></thead><tbody>');
                var bodyTable = '';
                for (var i = 0; i < data.length; i++) {
                    var element = data[i];
                    bodyTable += '<tr><th>' + element.nombreUsuario + '</th><td>' + element.contrasenaUsuario + '</td><td>' + element.email + '</td><td><img src="' + element.fotoJugador + '" alt="" class="img-responsive img-circle" ></td></tr>';

                }
                $('#table').append(bodyTable);
                $('#title').html('');
                $('#title').append('Preguntas');
                state = "jugadores";
                 $('#btn-players').addClass('active');
                 $('#btn-questions ').removeClass('active');
            }
        });
    }

    function addQuestions() {
        $.ajax({
            url: 'http://localhost:8181/questions',
            dataType: 'json',
            success: function (data) {
                $('#table').html('');
                $('#table').append('<thead><tr><th>Pregunta</th><th>Nivel de Dificultad</th><th>Respuestas</th><th>Respuesta correcta</th></thead><tbody>');
                var bodyTable = '';
                for (var i = 0; i < data.length; i++) {
                    var element = data[i];
                    bodyTable += '<tr><th>' + element.textoPregunta +
                            '</th><td>' + element.nivelDificultad +
                            '</td><td> <p>1. ' + element.respuestaUno +
                            '<br>2. ' + element.respuestaDos + '<br>3. ' +
                            element.respuestaTres + '<br>4. ' +
                            element.respuestaCuatro + '</td><td>' +
                            element.correcta + '</td></tr>';
                }
                $('#table').append(bodyTable);
                $('#title').html('');
                $('#title').append('Jugadores');
                state = "preguntas";
                  $('#btn-questions').addClass('active');
                 $('#btn-players').removeClass('active');
      
            }
        });
    }

    (function ($) {
        $.fn.serializeFormJSON = function () {

            var o = {};
            var a = this.serializeArray();
            $.each(a, function () {
                if (o[this.name]) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        };
    })(jQuery);
});
