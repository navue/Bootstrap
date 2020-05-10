USE [master]
GO
CREATE DATABASE [Taller]
GO
USE [Taller]
GO

---- CREACIÓN DE TABLAS

CREATE TABLE [dbo].[clientes](
       [IDCliente] [int] IDENTITY(1,1) NOT NULL,
       [Nombre] [varchar](50) NULL,
       [Apellido] [varchar](50) NULL,
       [Fecha_Nacimiento] [varchar](50) NULL,
       [Nro_Documento] [varchar](50) NULL,
       [Direccion] [varchar](50) NULL,
PRIMARY KEY ([IDCliente]) )

CREATE TABLE [dbo].[productos](
       [IDProducto] [int] IDENTITY(1,1) NOT NULL,
       [Nombre] [varchar](50) NULL,
       [Descripcion] [varchar](50) NULL,
       [Precio] [money] NULL,
       [Stock] [int] NULL,
PRIMARY KEY ([IDProducto]) )

CREATE TABLE [dbo].[pedidos](
	[IDPedido] [int] IDENTITY(1,1) NOT NULL,
	[IDCliente] [int] NULL,
	[IDProducto] [int] NULL,
	[Cantidad] [int] NULL,
	[Subtotal] [money] NULL,
PRIMARY KEY CLUSTERED ([IDPedido] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[pedidos]  WITH CHECK ADD FOREIGN KEY([IDCliente])
REFERENCES [dbo].[clientes] ([IDCliente])
GO

---- INSERTS DE REGISTROS

INSERT INTO clientes values('Malena','Gonzales','18/03/1995',40454456,'Merlo 456')
INSERT INTO clientes values('Nicolás','Agnessi Vuelta','23/09/1990',36789786,'Moreno 395')
INSERT INTO clientes values('Milton','Sesarego','24/01/1994',38258345,'Lujan 3944')

INSERT INTO productos values('Arena','Bolsa de 25kg',85,20)
INSERT INTO productos values('Cemento','Bolsa de 50kg',450,15)
INSERT INTO productos values('Piedra','Bolsa de 25kg',150,10)

---- CREACIÓN DE STORED PROCEDURES

-- CLIENTES

USE [Taller]
GO

CREATE PROCEDURE GetClientes
AS
BEGIN
-- SET NOCOUNT ON added to prevent extra result sets from
-- interfering with SELECT statements.
SET NOCOUNT ON;

SELECT IDCliente, Nombre, Apellido, Fecha_Nacimiento, Nro_Documento, Direccion FROM clientes
END
GO

CREATE PROCEDURE UpdateClientes
	@Nombre varchar(50),
	@Apellido varchar(50),
	@Fecha_Nacimiento varchar (50),
	@Nro_Documento varchar (50),
	@Direccion varchar (50),
	@IDCliente int out
AS
BEGIN
UPDATE clientes
SET Nombre=@Nombre,
	Apellido=@Apellido,
	Fecha_Nacimiento=@Fecha_Nacimiento,
	Nro_Documento=@Nro_Documento,
	Direccion=@Direccion
WHERE IDCliente=@IDCliente
END
GO

CREATE PROCEDURE InsertClientes
	@Nombre varchar(50),
	@Apellido varchar(50),
	@Fecha_Nacimiento varchar (50),
	@Nro_Documento varchar (50),
	@Direccion varchar (50)
AS
BEGIN
INSERT INTO clientes
(Nombre, Apellido, Fecha_Nacimiento, Nro_Documento, Direccion) 
VALUES (@Nombre, @Apellido, @Fecha_Nacimiento, @Nro_Documento, @Direccion)
END
GO

CREATE PROCEDURE GetClientesPorNombreApellido
	@Nombre varchar(50),
	@Apellido varchar(50)
AS
BEGIN
-- SET NOCOUNT ON added to prevent extra result sets from
-- interfering with SELECT statements.
SET NOCOUNT ON;

SELECT IDCliente, Nombre, Apellido, Fecha_Nacimiento, Nro_Documento, Direccion 
FROM clientes
WHERE Nombre = @Nombre OR Apellido = @Apellido
END
GO

CREATE PROCEDURE GetClientesPorID
	@IDCliente int
AS
BEGIN
-- SET NOCOUNT ON added to prevent extra result sets from
-- interfering with SELECT statements.
SET NOCOUNT ON;

SELECT IDCliente, Nombre, Apellido, Fecha_Nacimiento, Nro_Documento, Direccion 
FROM clientes
WHERE IDCliente = @IDCliente
END
GO

CREATE PROCEDURE GetClientesPorNroDocumento
	@Nro_Documento varchar(50)
AS
BEGIN
-- SET NOCOUNT ON added to prevent extra result sets from
-- interfering with SELECT statements.
SET NOCOUNT ON;

SELECT IDCliente, Nombre, Apellido, Fecha_Nacimiento, Nro_Documento, Direccion 
FROM clientes
WHERE Nro_Documento = @Nro_Documento
END
GO

CREATE PROCEDURE DeleteClientes
	@IDCliente int
AS
BEGIN
DELETE FROM clientes WHERE IDCliente=@IDCliente
END
GO

-- PRODUCTOS

CREATE PROCEDURE GetProductos
AS
BEGIN
-- SET NOCOUNT ON added to prevent extra result sets from
-- interfering with SELECT statements.
SET NOCOUNT ON;

SELECT IDProducto, Nombre, Descripcion, Precio, Stock FROM productos
END
GO

CREATE PROCEDURE UpdateProductos
	@Nombre varchar(50),
	@Descripcion varchar(50),
	@Precio money,
	@Stock int,
	@IDProducto int out
AS
BEGIN
UPDATE productos
SET Nombre=@Nombre,
	Descripcion=@Descripcion,
	Precio=@Precio,
	Stock=@Stock
WHERE IDProducto=@IDProducto
END
GO

CREATE PROCEDURE InsertProductos
	@Nombre varchar(50),
	@Descripcion varchar(50),
	@Precio money,
	@Stock int
AS
BEGIN
INSERT INTO productos
(Nombre, Descripcion, Precio, Stock) 
VALUES (@Nombre, @Descripcion, @Precio, @Stock)
END
GO

CREATE PROCEDURE GetProductosPorNombre
	@Nombre varchar(50)
AS
BEGIN
-- SET NOCOUNT ON added to prevent extra result sets from
-- interfering with SELECT statements.
SET NOCOUNT ON;

SELECT IDProducto, Nombre, Descripcion, Precio, Stock 
FROM productos 
WHERE Nombre = @Nombre
END
GO

CREATE PROCEDURE GetProductosPorID
	@IDProducto int
AS
BEGIN
-- SET NOCOUNT ON added to prevent extra result sets from
-- interfering with SELECT statements.
SET NOCOUNT ON;

SELECT IDProducto, Nombre, Descripcion, Precio, Stock 
FROM productos 
WHERE IDProducto = @IDProducto
END
GO

CREATE PROCEDURE DeleteProductos
	@IDProducto int
AS
BEGIN
DELETE FROM productos WHERE IDProducto=@IDProducto
END
GO

-- PEDIDOS

CREATE PROCEDURE GetPedidos
@IDCliente int
AS
BEGIN
SET NOCOUNT ON;

SELECT c.IDCliente, c.Apellido, p.IDProducto, p.Nombre, pe.Cantidad, pe.Subtotal
FROM clientes c, productos p, pedidos pe
WHERE c.IDCliente = pe.IDCliente
AND p.IDProducto = pe.IDProducto
AND @IDCliente = c.IDCliente
END
GO


CREATE PROCEDURE InsertPedidos
	@IDCliente int,
	@IDProducto int,
	@Cantidad int,
	@Subtotal money
AS
BEGIN
INSERT INTO pedidos
(IDCliente, IDProducto, Cantidad, Subtotal) 
VALUES (@IDCliente, @IDProducto, @Cantidad, @Subtotal)
END
GO