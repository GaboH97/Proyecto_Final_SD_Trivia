$(document).ready(function () {

    //getPartida();
    var numPreguntas = 1;
    var partidaData;
    function getPartida(id) {
        $.ajax({
            url: 'http://localhost:8181/partida/' + id,
            dataType: 'json',
            type: 'GET',
            success: function (data) {
                partidaData = data;
                $('#preguntas').html('');
                var bodyTable = '';
                for (var i = 0; i < data.preguntas.length; i++) {
                    constructPregunta(data.preguntas[i]);
                }
            }
        });
    }


    function constructPregunta(element) {
        var bodyTable = '<div id = "div-pre-';
        bodyTable += element.idPregunta + '" >';
        bodyTable += '<div class="col-xs-10"><h2>';
        bodyTable += element.textoPregunta + '<br><small> Nivel ' + element.nivelDificultad + '</small></h2><span class="border-left glyphicon glyphicon'
        bodyTable += element.correcta === 1 ? "-ok" : "-remove";
        bodyTable += ' aria-hidden="true"></span>';
        bodyTable += element.respuestaUno + '</p><p class="margin-right"><span class="glyphicon glyphicon'
        bodyTable += element.correcta === 2 ? "-ok" : "-remove";
        bodyTable += ' aria-hidden="true"></span>';
        bodyTable += element.respuestaDos + '</p><p class="margin-right"><span class="glyphicon glyphicon'
        bodyTable += element.correcta === 3 ? "-ok" : "-remove";
        bodyTable += ' aria-hidden="true"></span>';
        bodyTable += element.respuestaTres + '</p><p class="margin-right"><span class="glyphicon glyphicon'
        bodyTable += element.correcta === 4 ? "-ok" : "-remove";
        bodyTable += ' aria-hidden="true"></span>';
        bodyTable += element.respuestaCuatro + '</p></div><div class="col-xs-2"><div class="btn-group margin-top-20" role="group" aria-label="..."><button id="';
        bodyTable += element.idPregunta + '-remove" type="button" class="btn btn-default borrar" id-question = "';
        bodyTable += element.idPregunta + '"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></div></div></div>';
        $('#preguntas').append(bodyTable);
        $('#' + element.idPregunta + '-remove').on('click', function (e) {
            delPregunta(e.currentTarget.attributes[3].value);
            $('#div-pre-' + e.currentTarget.attributes[3].value).remove();
        });
    }

    $("#add-question-3").on('click', function (e) {
        addQuestions();
    });

    function addQuestions() {
        $.ajax({
            url: 'http://localhost:8181/questions',
            dataType: 'json',
            success: function (data) {
                $('#preguntas-agregar-list').html('');
                var bodyTable = '';
                for (var i = 0; i < data.length; i++) {
                    var element = data[i];
                    if (contain(element.idPregunta)) {
                        bodyTable = '';
                        bodyTable += '<div id="div-' + element.idPregunta + '" class="row border"><div class="col-xs-10"><p class="pregunta-text-list">';
                        bodyTable += element.textoPregunta + '<br><small><strong> Nivel ' + element.nivelDificultad + '</strong></small></p></div><div class="col-xs-2 btn-group btn-group-xs"><button type="button" id="btn-agregar-pregunta-';
                        bodyTable += element.idPregunta + '" class="btn btn-default" id-question = "';
                        bodyTable += element.idPregunta + '" ><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> </button></div> <hr></div>';
                        $('#preguntas-agregar-list').append(bodyTable);
                        $('#btn-agregar-pregunta-' + element.idPregunta).on('click', function (e) {
                            addPregunta(e.currentTarget.attributes[3].value);
                            $('#div-' + e.currentTarget.attributes[3].value).remove();
                        });
                    }
                }
            }
        });
    }

    function contain(id) {
        if(partidaData===undefined)
            return true;
        if (partidaData.preguntas !== undefined) {
            var index = partidaData.preguntas.indexOf('' + id);
            if (index > -1) {
                return false;
            }
        }
        return true;
    }

    function delPregunta(num) {
        var index = partidaData.preguntas.indexOf('' + num);
        if (index > -1) {
            partidaData.preguntas.splice(index, 1);
        }
    }

    $("#terminar").on('click', function (e) {
        if (partidaData === undefined || (Object.keys(partidaData).length === 0)) {
            partidaData = $('#form-partida').serializeFormJSON();
        }
        e.preventDefault();
        console.log(partidaData);
        $.ajax({
            url: 'http://localhost:8181/partida',
            method: "POST",
            dataType: 'json',
            data: partidaData,
            success: function (result) {
                if (result !== null || result !== undefined) {
                    console.log("Percho");
                   // location.href = "adminPartidas.html";
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

    function addPregunta(id) {

        if (partidaData === undefined) {
            partidaData = $('#form-partida').serializeFormJSON();
        }
        $.ajax({
            url: "http://localhost:8181/question/" + id,
            type: 'GET',
            success: function (data, textStatus, jqXHR) {
                if (partidaData.preguntas === undefined) {
                    partidaData.preguntas = new Array();
                }
                partidaData.preguntas.push(id);
                constructPregunta(data);
            }
        });
        if (numPreguntas === 10) {
            $('#addQuestionModal').modal('hide');
            $("#alert").html("");
            $("#alert").append('<div class="alert alert-success"><strong>Ya has agregado 10 preguntas  </strong> </div>');
        }
    }


    $("#btn-cancelar").on('click', function (e) {
        $("#idPregunta").val("");
        $("#question").val("");
        $("#dificultad").val("");
        $("#answer1").val("");
        $("#answer2").val("");
        $("#answer3").val("");
        $("#answer4").val("");
        $("#inlineRadio1").prop("checked", true);
    });
    $("#btn-cancelar2").on('click', function (e) {
        $("#idPregunta").val("");
        $("#question").val("");
        $("#dificultad").val("");
        $("#answer1").val("");
        $("#answer2").val("");
        $("#answer3").val("");
        $("#answer4").val("");
        $("#inlineRadio1").prop("checked", true);
    });
    $("#btn-crear").on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:8181/addquestion',
            method: "POST",
            dataType: 'json',
            data: $('#form-question').serializeFormJSON(),
            success: function (result) {
                if (result !== null || result !== undefined) {
                    addPregunta(result.idPregunta);
                } else {
                    $("#alert").html("");
                    $("#alert").append('<div class="alert alert-danger"><strong>Error:  </strong>' + result + '</div>');
                }
            },
            error: function (er) {
                $("#alert").append('<div class="alert alert-danger"><strong>Error: </strong>' + er + '</div>');
            }
        });
    }
    );
});