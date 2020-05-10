using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.DataAccess;
using Taller.Domain;

namespace Taller.BussinesLogic
{
    public static class ClientesManager
    {
        public static int Guardar(Cliente pCliente)
        {
            // Valida que el nro de documento no se repita
            List<Cliente> lista = new List<Cliente>();
            lista = ClientesDAL.Buscar(pCliente.Nro_Doc);
            if (lista.Count > 0)
            {
                // Si el cliente es nuevo y hay Nros de Documento repetidos
                if (pCliente.ID == 0)
                {
                    return 0;
                }
                else
                {
                    // Si el cliente existía y hay nros de documento repetidos 
                    // y el nro de documento repetido es diferente del cliente a modificar
                    if (lista[0].ID != pCliente.ID)
                    {
                        return 0;
                    }
                }
            }
            return ClientesDAL.Guardar(pCliente);
        }
        public static List<Cliente> Buscar()
        {
            return ClientesDAL.Buscar();
        }
        public static List<Cliente> Buscar(string pNombre, string pApellido)
        {
            return ClientesDAL.Buscar(pNombre, pApellido);
        }
        public static int Eliminar(int pID)
        {
            return ClientesDAL.Eliminar(pID);
        }
    }
}
