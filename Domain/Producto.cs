using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taller.Domain
{
    public class Producto
    {
        public int ID { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public decimal Precio { get; set; }
        public int Stock { get; set; }

        public Producto() { }

        public Producto(int pID, string pNombre, string pDescripcion, decimal pPrecio, int pStock)
        {
            this.ID = pID;
            this.Nombre = pNombre;
            this.Descripcion = pDescripcion;
            this.Precio = pPrecio;
            this.Stock = pStock;
        }
    }
}
