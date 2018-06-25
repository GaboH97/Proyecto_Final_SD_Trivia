$(document).ready(function () {

        $('#registrarse').on('click', function () {
                location.href = "registrarse.html";
        });

        $('#iniciarSesion').on('click', function (e) {
                e.preventDefault();
                $.ajax({
                        url: 'http://'+serverIP+'/login',
                        method: "POST",
                        dataType: 'json',
                        data: $('#login-form').serializeFormJSON(),
                        success: function (result) {
                                console.log("result "+result);
                                if (result != null) {
                                        localStorage.setItem('user', JSON.stringify(result));
                                        location.href = "admonPreguntas.html";
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