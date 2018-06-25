$(document).ready(function () {
    
    addUser();

    function addUser() {
        $.ajax({
            url: 'http://'+serverIP+'/players',
            dataType: 'json',
            success: function (data) {
                $('#body-table').html('');
                var bodyTable = '';
                for (var i = 0; i < data.length; i++) {
                    var element = data[i];
                    bodyTable += '<tr><th scope="row">'
                            + element.nombreUsuario + '</th><td>Masculino</td><td>'
                            + element.email + '</td><td>'
                            + element.puntaje + '</td><td>10</td></tr>';
                }
                $('#body-table').append(bodyTable);

            }
        });
    }
});