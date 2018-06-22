//$(document).ready(function () {

addQuestions();

function addQuestions() {
    $.ajax({
        url: 'http://localhost:8181/questions',
        dataType: 'json',
        success: function (data) {
            $('#pregunta-list').html('');
            var bodyTable = '';
            for (var i = 0; i < data.length; i++) {
                var element = data[i];
                bodyTable = '';
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
                bodyTable += element.respuestaCuatro + '</p></div><div class="col-xs-2"><div class="btn-group" role="group" aria-label="..."><button'
                bodyTable += ' id="' + element.idPregunta + '-edit" type="button" class="btn btn-default editar" id-question = "';
                bodyTable += element.idPregunta + '" ><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> </button><button id="';
                bodyTable += element.idPregunta + '-del" type="button" class="btn btn-default borrar" id-question = "';
                bodyTable += element.idPregunta + '"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></div></div>';
                $('#pregunta-list').append(bodyTable);
                $('#' + element.idPregunta + '-edit').on('click', function (e) {
                    editPregunta(e.currentTarget.attributes[3].value);
                });
                $('#' + element.idPregunta + '-del').on('click', function (e) {
                    delPregunta(e.currentTarget.attributes[3].value);
                });
            }
        }
    });

}


function delPregunta(id) {
    console.log(id);
    $.ajax({
        url: "http://localhost:8181/question/" + id,
        type: 'DELETE',
        success: function (res) {
            alert(res);
            location.href = "admonPreguntas.html";

        }
    });
}



function llenarDialogoEditar(data) {
    console.log(data);
    $("#idPregunta").val(data.idPregunta);
    $("#question").val(data.textoPregunta);
    $("#dificultad").val(data.nivelDificultad);
    $("#answer1").val(data.respuestaUno);
    $("#answer2").val(data.respuestaDos);
    $("#answer3").val(data.respuestaTres);
    $("#answer4").val(data.respuestaCuatro);
    $("#inlineRadio" + data.inlineRadio1).prop("checked", true);

    $('#createQuestionModal').modal('show');
}

$("#btn-agregar").on('click', function (e) {
    e.preventDefault();
    console.log($('#form-question').serializeFormJSON());
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
                    location.href = "admonPreguntas.html";
                }, 2);
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
//});