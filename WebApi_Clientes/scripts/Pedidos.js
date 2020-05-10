var listaDePrecios = {};

$(function () {
    construyeCmbProd();
    construyeCmbCli();
    limpiarControles();
    actualizarGrilla();
    $('#btnAgregar').click(function () { guardarPedido(); });
    $('#txtCantidad').change(function () {
        actualizarPrecio();
    });
    $('#cmbProductos').change(function () {
        actualizarPrecio();
    });
    $('#cmbClientes').change(function () {
        actualizarGrilla();
    });
});

function construyeCmbProd() {
    var data = ajaxGETP();
    cmbProducto(data);
};

function construyeCmbCli() {
    var data = ajaxGETC();
    cmbCliente(data);
};

function actualizarGrilla() {
    var data = ajaxGETPe();
    construyeGrilla(data);
};

function actualizarPrecio() {
    $('#txtSubtotal').attr("placeholder", '$' + $('#txtCantidad').val() *listaDePrecios[$('#cmbProductos').val()]);
}

function ajaxGETP() {
    var result;

    $.ajax({
        url: "http://localhost:6030/api/productos",
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

function ajaxGETC() {
    var result;

    $.ajax({
        url: "http://localhost:6030/api/clientes",
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

function cmbProducto(data) {
    var cmb = $('#cmbProductos');
    cmb.html("");
    for (d in data) {
        var op = $('<option value="' + data[d].ID + '">' + data[d].Nombre + '</option>');
        cmb.append(op);
        listaDePrecios[data[d].ID] = data[d].Precio;
    }
}

function cmbCliente(data) {
    var cmb = $('#cmbClientes');
    cmb.html("");
    for (d in data) {
        var op = $('<option value="' + data[d].ID + '">' + data[d].Apellido + '</option>');
        cmb.append(op);
    }
}

function construyeGrilla(data) {
    var grd = $('#grdPedidos');
    grd.html("");
    var tbl = $('<table border=1></table>');

    var header = $('<tr></tr>');
    header.append('<th>Id Cliente</th>');
    header.append('<th>Apellido</th>');
    header.append('<th>Id Producto</th>');
    header.append('<th>Nombre</th>');
    header.append('<th>Cantidad</th>');
    header.append('<th>Subtotal</th>');
    tbl.append(header);

    for (d in data) {
        var row = $('<tr></tr>');
        row.append('<td>' + data[d].IDCliente + '</td>');
        row.append('<td>' + data[d].Apellido + '</td>');
        row.append('<td>' + data[d].IDProducto + '</td>');
        row.append('<td>' + data[d].Nombre + '</td>');
        row.append('<td>' + data[d].Cantidad + '</td>');
        row.append('<td>' + data[d].Subtotal + '</td>');
        tbl.append(row);
    }
    grd.append(tbl);
}

function ajaxGETPe() {
    var result;
    $.ajax({
        url: "http://localhost:6030/api/pedidos" + '?idCliente=' + $('#cmbClientes').val(),
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

function guardarPedido() {
    ajaxPOSTPe();
    actualizarGrilla();
    limpiarControles();
}

function ajaxPOSTPe() {
    var result;
    var obj = obtenerPedido();
    $.ajax({
        url: "http://localhost:6030/api/pedidos",
        type: 'POST',
        async: false,
        data: obj
    }).done(function (data) {
        result = data;
        alertPost()
    }).error(function (xhr, status, error) {
        var s = status;
        var e = error;
    });
    return result;
}

function obtenerPedido() {
    var pedido = {};
    pedido.IDCliente = $('#cmbClientes').val()
    pedido.IDProducto = $('#cmbProductos').val()
    pedido.Cantidad = $('#txtCantidad').val();
    pedido.Subtotal = pedido.Cantidad * listaDePrecios[pedido.IDProducto]
    return pedido;
}

function limpiarControles() {
    $('#txtCantidad').val('0');
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
