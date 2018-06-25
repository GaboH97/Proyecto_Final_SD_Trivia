$(document).ready(function () {

    if (localStorage.getItem("user") === null) {
        location.href = "partials/login.html";
    }

    $('#login').on('click', function (e) {
        e.preventDefault();
        localStorage.removeItem('user');
        location.href = "partials/login.html";
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
