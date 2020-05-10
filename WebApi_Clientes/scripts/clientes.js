var myURL = "http://localhost:6030/api/clientes";
sessionStorage.setItem("IDCliente", 0);

$(function () {
    actualizarGrilla();
    $('#btnGuardar').click(function () { guardarCliente(); });
    $('#confirmaBorrar').click(function () { borrarCliente() });
    $('#btnCancelar').click(function () { limpiarControles(); });
    $('#btnGuardar').html("Nuevo");

});

function actualizarGrilla() {
    var data = ajaxGET();
    construyeGrilla(data);
};

function ajaxGET() {
    var result;

    $.ajax({
        url: myURL,
        type: 'GET',
        async: false
    }).done(function (data) {
        result = data;
    }).error(function (xhr, status, error) {
        alert(error);
        var s = status;
        var e = error;
    });

    return result;
}

function ajaxPOST() {
    var result;
    var obj = obtenerCliente();

    $.ajax({
        url: myURL,
        type: 'POST',
        async: false,
        data: obj
    }).done(function (data) {
        result = data;
        alertPost();
    }).error(function (xhr, status, error) {
        alert(error);
        var s = status;
        var e = error;
    });

    return result;
}

function ajaxPUT() {
    var result;
    var obj = obtenerCliente();

    $.ajax({
        url: myURL,
        type: 'PUT',
        async: false,
        data: obj
    }).done(function (data) {
        result = data;
        alertPut();
    }).error(function (xhr, status, error) {
        alert(error);
        var s = status;
        var e = error;
    });

    return result;
}

function ajaxDELETE(id) {
    var result;

    $.ajax({
        url: myURL + '/' + id,
        type: 'DELETE',
        async: false
    }).done(function (data) {
        result = data;
        alertDelete();
    }).error(function (xhr, status, error) {
        alert(error);
        var s = status;
        var e = error;
    });

    return result;
}

function construyeGrilla(data) {
    var grd = $('#grdClientes');
    grd.html("");
    var tbl = $('<table border=1></table>');

    var header = $('<tr></tr>');
    header.append('<td>Id</td>');
    header.append('<td>Nombre</td>');
    header.append('<td>Apellido</td>');
    header.append('<td>Fecha Nacimiento</td>');
    header.append('<td>N° Documento</td>');
    header.append('<td>Direccion</td>');

    tbl.append(header);

    for (d in data) {
        var row = $('<tr class="jqClickeable"></tr>');
        row.append('<td>' + data[d].ID + '</td>');
        row.append('<td>' + data[d].Nombre + '</td>');
        row.append('<td>' + data[d].Apellido + '</td>');
        row.append('<td>' + data[d].Fecha_Nac + '</td>');
        row.append('<td>' + data[d].Nro_Doc + '</td>');
        row.append('<td>' + data[d].Direccion + '</td>');

        tbl.append(row);
    }

    grd.append(tbl);
    $('.jqClickeable').click(function () { mostrarElemento($(this)); });

}

function borrarCliente() {
    if (sessionStorage.getItem("IDCliente") != 0) {
        ajaxDELETE(sessionStorage.getItem("IDCliente"));
    } else {
        alertDelete();
    }
    actualizarGrilla();
    limpiarControles();
}

function guardarCliente() {
    if (sessionStorage.getItem("IDCliente") == 0) {
        ajaxPOST();
    }
    else {
        ajaxPUT();
    }
    actualizarGrilla();
    limpiarControles();
}

function mostrarElemento(elem) {
    sessionStorage.setItem("IDCliente", elem.children().eq(0).text());
    $('#txtNombre').val(elem.children().eq(1).text());
    $('#txtApellido').val(elem.children().eq(2).text());
    $('#txtFecha').val(elem.children().eq(3).text());
    $('#txtDocumento').val(elem.children().eq(4).text());
    $('#txtDireccion').val(elem.children().eq(5).text());
    $('#btnGuardar').html("Modificar");
}

function obtenerCliente() {
    var cliente = {};
    cliente.Id = sessionStorage.getItem("IDCliente");
    cliente.Nombre = $('#txtNombre').val();
    cliente.Apellido = $('#txtApellido').val();
    cliente.Fecha_Nac = $('#txtFecha').val();
    cliente.Nro_Doc = $('#txtDocumento').val();
    cliente.Direccion = $('#txtDireccion').val();
    return cliente;
}
function limpiarControles() {
    sessionStorage.setItem("IDCliente", 0);
    $('#txtNombre').val("");
    $('#txtApellido').val("");
    $('#txtFecha').val("");
    $('#txtDocumento').val("");
    $('#txtDireccion').val("");

    $('#btnGuardar').html("Nuevo");
}

function alertPost() {
    var alert = $('#alert');
    var div = $('<div class="alert alert-success alert-dismissible fade show" role="alert"></div>');
    var button = $('<button type = "button" class= "close" data-dismiss="alert" aria-label="Close"></button>')
    var span = $('<span aria-hidden="true"></span>');
    span.append('&times;');
    button.append(span);
    div.append('Elemento insertado!', button);
    alert.append(div);
}

function alertPut() {
    var alert = $('#alert');
    var div = $('<div class="alert alert-success alert-dismissible fade show" role="alert"></div>');
    var button = $('<button type = "button" class= "close" data-dismiss="alert" aria-label="Close"></button>')
    var span = $('<span aria-hidden="true"></span>');
    span.append('&times;');
    button.append(span);
    div.append('Elemento actualizado!', button);
    alert.append(div);
}

function alertDelete() {
    var alert = $('#alert');
    var div = $('<div class="alert alert-danger alert-dismissible fade show" role="alert"></div>');
    var button = $('<button type = "button" class= "close" data-dismiss="alert" aria-label="Close"></button>')
    var span = $('<span aria-hidden="true"></span>');
    span.append('&times;');
    button.append(span);
    div.append('Elemento borrado!', button);
    alert.append(div);
}

function alertWarning() {
    var alert = $('#alert');
    var div = $('<div class="alert alert-warning alert-dismissible fade show" role="alert"></div>');
    var button = $('<button type = "button" class= "close" data-dismiss="alert" aria-label="Close"></button>')
    var span = $('<span aria-hidden="true"></span>');
    span.append('&times;');
    button.append(span);
    div.append('No hay ningún registro seleccionado!', button);
    alert.append(div);
}
