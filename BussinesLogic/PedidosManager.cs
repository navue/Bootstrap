using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.DataAccess;
using Taller.Domain;

namespace Taller.BussinesLogic
{
    public class PedidosManager
    {
        public static List<Pedido> Buscar(int idCliente)
        {
            return PedidosDAL.Buscar(idCliente);
        }
        public static int Guardar(Pedido pPedido)
        {
            return PedidosDAL.Agregar(pPedido);
        }
    }
}
