using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taller.Domain
{
    public class Pedido
    {
        public int IDCliente { get; set; }
        public string Apellido { get; set; }
        public int IDProducto { get; set; }
        public string Nombre { get; set; }
        public int Cantidad { get; set; }
        public decimal Subtotal { get; set; }

        public Pedido() { }

        public Pedido(int pIDCliente, string pApellidoCliente, int pIDProducto, string pNombreProducto, int pCantidad, int pSubtotal)
        {
            this.IDCliente = pIDCliente;
            this.Apellido = pApellidoCliente;
            this.IDProducto = pIDProducto;
            this.Nombre = pNombreProducto;
            this.Cantidad = pCantidad;
            this.Subtotal = pSubtotal;
        }
    }
}
