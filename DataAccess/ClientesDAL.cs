using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Taller.Domain;

namespace Taller.DataAccess
{
    public class ClientesDAL
    {
        public static int Guardar(Cliente pCliente)
        {
            if (pCliente.ID == 0) return Agregar(pCliente);
            else return Modificar(pCliente);
        }
        public static List<Cliente> Buscar()
        {
            List<Cliente> _lista = new List<Cliente>();

            SqlCommand _comando = new SqlCommand("GetClientes", BDComun.ObtenerConexion());
            _comando.CommandType = System.Data.CommandType.StoredProcedure;
            SqlDataReader _reader = _comando.ExecuteReader();
            while (_reader.Read())
            {
                Cliente pCliente = new Cliente();
                pCliente.ID = _reader.GetInt32(0);
                pCliente.Nombre = _reader.GetString(1);
                pCliente.Apellido = _reader.GetString(2);
                pCliente.Fecha_Nac = _reader.GetString(3);
                pCliente.Nro_Doc = _reader.GetString(4);
                pCliente.Direccion = _reader.GetString(5);
                _lista.Add(pCliente);
            }
            return _lista;
        }
        public static int Modificar(Cliente pCliente)
        {
            int retorno = 0;
            SqlConnection conexion = BDComun.ObtenerConexion();

            SqlCommand _comando = new SqlCommand("UpdateClientes", conexion);
            _comando.CommandType = System.Data.CommandType.StoredProcedure;

            _comando.Parameters.AddWithValue("@Nombre", pCliente.Nombre);
            _comando.Parameters.AddWithValue("@Apellido", pCliente.Apellido);
            _comando.Parameters.AddWithValue("@Fecha_Nacimiento", pCliente.Fecha_Nac);
            _comando.Parameters.AddWithValue("@Nro_Documento", pCliente.Nro_Doc);
            _comando.Parameters.AddWithValue("@Direccion", pCliente.Direccion);
            _comando.Parameters.AddWithValue("@IDCliente", pCliente.ID);

            retorno = _comando.ExecuteNonQuery();
            conexion.Close();
            return retorno;
        }
        public static int Agregar(Cliente pCliente)
        {
            int retorno = 0;
            SqlConnection conexion = BDComun.ObtenerConexion();

            SqlCommand _comando = new SqlCommand("InsertClientes", conexion);
            _comando.CommandType = System.Data.CommandType.StoredProcedure;

            _comando.Parameters.AddWithValue("@Nombre", pCliente.Nombre);
            _comando.Parameters.AddWithValue("@Apellido", pCliente.Apellido);
            _comando.Parameters.AddWithValue("@Fecha_Nacimiento", pCliente.Fecha_Nac);
            _comando.Parameters.AddWithValue("@Nro_Documento", pCliente.Nro_Doc);
            _comando.Parameters.AddWithValue("@Direccion", pCliente.Direccion);

            retorno = _comando.ExecuteNonQuery();
            conexion.Close();
            return retorno;
        }
        public static List<Cliente> Buscar(string pNombre, string pApellido)
        {
            List<Cliente> _lista = new List<Cliente>();

            SqlCommand _comando = new SqlCommand("GetClientesPorNombreApellido", BDComun.ObtenerConexion());
            _comando.CommandType = System.Data.CommandType.StoredProcedure;
            _comando.Parameters.AddWithValue("@Nombre", pNombre);
            _comando.Parameters.AddWithValue("@Apellido", pApellido);
            SqlDataReader _reader = _comando.ExecuteReader();
            while (_reader.Read())
            {
                Cliente pCliente = new Cliente();
                pCliente.ID = _reader.GetInt32(0);
                pCliente.Nombre = _reader.GetString(1);
                pCliente.Apellido = _reader.GetString(2);
                pCliente.Fecha_Nac = _reader.GetString(3);
                pCliente.Nro_Doc = _reader.GetString(4);
                pCliente.Direccion = _reader.GetString(5);
                _lista.Add(pCliente);
            }
            return _lista;
        }
        public static List<Cliente> Buscar(string pNro_Doc)
        {
            List<Cliente> _lista = new List<Cliente>();

            SqlCommand _comando = new SqlCommand("GetClientesPorNroDocumento", BDComun.ObtenerConexion());
            _comando.CommandType = System.Data.CommandType.StoredProcedure;
            _comando.Parameters.AddWithValue("@Nro_Documento", pNro_Doc);
            SqlDataReader _reader = _comando.ExecuteReader();
            while (_reader.Read())
            {
                Cliente pCliente = new Cliente();
                pCliente.ID = _reader.GetInt32(0);
                pCliente.Nombre = _reader.GetString(1);
                pCliente.Apellido = _reader.GetString(2);
                pCliente.Fecha_Nac = _reader.GetString(3);
                pCliente.Nro_Doc = _reader.GetString(4);
                pCliente.Direccion = _reader.GetString(5);
                _lista.Add(pCliente);
            }
            return _lista;
        }

        // ObtenerCliente no se usa hasta ahora
        public static Cliente ObtenerCliente(int pID)
        {
            Cliente pCliente = new Cliente();
            SqlConnection conexion = BDComun.ObtenerConexion();
            SqlCommand _comando = new SqlCommand("GetClientesPorID", conexion);
            _comando.CommandType = System.Data.CommandType.StoredProcedure;
            _comando.Parameters.AddWithValue("@IDCliente", pID);
            SqlDataReader _reader = _comando.ExecuteReader();
            while (_reader.Read())
            {
                pCliente.ID = _reader.GetInt32(0);
                pCliente.Nombre = _reader.GetString(1);
                pCliente.Apellido = _reader.GetString(2);
                pCliente.Fecha_Nac = _reader.GetString(3);
                pCliente.Nro_Doc = _reader.GetString(4);
                pCliente.Direccion = _reader.GetString(5);
            }
            conexion.Close();
            return pCliente;
        }
        public static int Eliminar(int pID)
        {
            int retorno = 0;
            SqlConnection conexion = BDComun.ObtenerConexion();

            SqlCommand _comando = new SqlCommand("DeleteClientes", conexion);
            _comando.CommandType = System.Data.CommandType.StoredProcedure;

            _comando.Parameters.AddWithValue("@IDCliente", pID);

            retorno = _comando.ExecuteNonQuery();
            conexion.Close();
            return retorno;
        }
    }
}
