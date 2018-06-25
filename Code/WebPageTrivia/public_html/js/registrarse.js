$(document).ready(function () {

    $("#add-player").on('click', function (e) {
        e.preventDefault();
        console.log($('#form-player').serializeFormJSON());
        $.ajax({
            url: 'https://'+serverIP+'/player',
            method: "POST",
            dataType: 'json',
            data: $('#form-player').serializeFormJSON(),
            success: function (result) {
                if (result != null) {
                    localStorage.setItem('user', result);
                     localStorage.setItem('userID', result.id);
                    location.href = "../index.html";

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