var myURL = "http://localhost:6030/api/productos";
sessionStorage.setItem("IDProducto", 0);

$(function () {
    actualizarGrilla();
    $('#btnGuardar').click(function () { guardarProducto(); });
    $('#confirmaBorrar').click(function () { borrarProducto() });
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
    var obj = obtenerProducto();

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
    var obj = obtenerProducto();

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
    var grd = $('#grdProductos');
    grd.html("");
    var tbl = $('<table border=1></table>');

    var header = $('<tr></tr>');
    header.append('<td>Id</td>');
    header.append('<td>Nombre</td>');
    header.append('<td>Descripción</td>');
    header.append('<td>Precio</td>');
    header.append('<td>Stock</td>');

    tbl.append(header);

    for (d in data) {
        var row = $('<tr class="jqClickeable"></tr>');
        row.append('<td>' + data[d].ID + '</td>');
        row.append('<td>' + data[d].Nombre + '</td>');
        row.append('<td>' + data[d].Descripcion + '</td>');
        row.append('<td>' + data[d].Precio + '</td>');
        row.append('<td>' + data[d].Stock + '</td>');

        tbl.append(row);
    }
    grd.append(tbl);
    $('.jqClickeable').click(function () { mostrarElemento($(this)); });
}

function borrarProducto() {
    if (sessionStorage.getItem("IDProducto") != 0) {
        ajaxDELETE(sessionStorage.getItem("IDProducto"));
    } else {
        alertDelete();
    }
    actualizarGrilla();
    limpiarControles();
}

function guardarProducto() {
    if (sessionStorage.getItem("IDProducto") == 0) {
        ajaxPOST();
    }
    else {
        ajaxPUT();
    }
    actualizarGrilla();
    limpiarControles();
}

function mostrarElemento(elem) {
    sessionStorage.setItem("IDProducto", elem.children().eq(0).text());
    $('#txtNombre').val(elem.children().eq(1).text());
    $('#txtDescripcion').val(elem.children().eq(2).text());
    $('#txtPrecio').val(elem.children().eq(3).text());
    $('#txtStock').val(elem.children().eq(4).text());
    $('#btnGuardar').html("Modificar");
}

function obtenerProducto() {
    var producto = {};
    producto.Id = sessionStorage.getItem("IDProducto");
    producto.Nombre = $('#txtNombre').val();
    producto.Descripcion = $('#txtDescripcion').val();
    producto.Precio = $('#txtPrecio').val();
    producto.Stock = $('#txtStock').val();
    return producto;
}
function limpiarControles() {
    sessionStorage.setItem("IDProducto", 0);
    $('#txtNombre').val("");
    $('#txtDescripcion').val("");
    $('#txtPrecio').val("");
    $('#txtStock').val("");
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