using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Taller.BussinesLogic;
using Taller.Domain;

namespace WebApplication1.Controllers
{
    public class PedidosController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<Pedido> Get(int idCliente)
        {
            return PedidosManager.Buscar(idCliente);
        }

        // POST api/<controller>
        public void Post([FromBody]Pedido pedido)
        {
            PedidosManager.Guardar(pedido);
        }

    }
}