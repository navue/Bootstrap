using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taller.Domain;

namespace Taller.DataAccess
{
    public class ProductosDAL
    {
        public static int Guardar(Producto pProducto)
        {
            if (pProducto.ID == 0) return Agregar(pProducto);
            else return Modificar(pProducto);
        }
        public static List<Producto> Buscar()
        {
            List<Producto> _lista = new List<Producto>();

            SqlCommand _comando = new SqlCommand("GetProductos", BDComun.ObtenerConexion());
            _comando.CommandType = System.Data.CommandType.StoredProcedure;
            SqlDataReader _reader = _comando.ExecuteReader();
            while (_reader.Read())
            {
                Producto pProducto = new Producto();
                pProducto.ID = _reader.GetInt32(0);
                pProducto.Nombre = _reader.GetString(1);
                pProducto.Descripcion = _reader.GetString(2);
                pProducto.Precio = _reader.GetDecimal(3);
                pProducto.Stock = _reader.GetInt32(4);
                _lista.Add(pProducto);
            }
            return _lista;
        }
        public static int Modificar(Producto pProducto)
        {
            int retorno = 0;
            SqlConnection conexion = BDComun.ObtenerConexion();

            SqlCommand _comando = new SqlCommand("UpdateProductos", conexion);
            _comando.CommandType = System.Data.CommandType.StoredProcedure;

            _comando.Parameters.AddWithValue("@Nombre", pProducto.Nombre);
            _comando.Parameters.AddWithValue("@Descripcion", pProducto.Descripcion);
            _comando.Parameters.AddWithValue("@Precio", pProducto.Precio);
            _comando.Parameters.AddWithValue("@Stock", pProducto.Stock);
            _comando.Parameters.AddWithValue("@IDProducto", pProducto.ID);

            retorno = _comando.ExecuteNonQuery();
            conexion.Close();
            return retorno;
        }
        public static int Agregar(Producto pProducto)
        {
            int retorno = 0;
            SqlConnection conexion = BDComun.ObtenerConexion();

            SqlCommand _comando = new SqlCommand("InsertProductos", conexion);
            _comando.CommandType = System.Data.CommandType.StoredProcedure;

            _comando.Parameters.AddWithValue("@Nombre", pProducto.Nombre);
            _comando.Parameters.AddWithValue("@Descripcion", pProducto.Descripcion);
            _comando.Parameters.AddWithValue("@Precio", pProducto.Precio);
            _comando.Parameters.AddWithValue("@Stock", pProducto.Stock);

            retorno = _comando.ExecuteNonQuery();
            conexion.Close();
            return retorno;
        }
        public static List<Producto> Buscar(string pNombre)
        {
            List<Producto> _lista = new List<Producto>();

            SqlCommand _comando = new SqlCommand("GetProductosPorNombre", BDComun.ObtenerConexion());
            _comando.CommandType = System.Data.CommandType.StoredProcedure;
            _comando.Parameters.AddWithValue("@Nombre", pNombre);

            SqlDataReader _reader = _comando.ExecuteReader();
            while (_reader.Read())
            {
                Producto pProducto = new Producto();
                pProducto.ID = _reader.GetInt32(0);
                pProducto.Nombre = _reader.GetString(1);
                pProducto.Descripcion = _reader.GetString(2);
                pProducto.Precio = _reader.GetDecimal(3);
                pProducto.Stock = _reader.GetInt32(4);
                _lista.Add(pProducto);
            }
            return _lista;
        }

        // ObtenerProducto no se usa hasta ahora
        public static Producto ObtenerProducto(int pID)
        {
            Producto pProducto = new Producto();
            SqlConnection conexion = BDComun.ObtenerConexion();
            SqlCommand _comando = new SqlCommand("GetProductosPorID", conexion);
            _comando.CommandType = System.Data.CommandType.StoredProcedure;
            _comando.Parameters.AddWithValue("@IDProducto", pID);
            SqlDataReader _reader = _comando.ExecuteReader();
            while (_reader.Read())
            {
                pProducto.ID = _reader.GetInt32(0);
                pProducto.Nombre = _reader.GetString(1);
                pProducto.Descripcion = _reader.GetString(2);
                pProducto.Precio = _reader.GetDecimal(3);
                pProducto.Stock = _reader.GetInt32(4);
            }
            conexion.Close();
            return pProducto;
        }
        public static int Eliminar(int pID)
        {
            int retorno = 0;
            SqlConnection conexion = BDComun.ObtenerConexion();
            SqlCommand _comando = new SqlCommand("DeleteProductos", conexion);
            _comando.CommandType = System.Data.CommandType.StoredProcedure;
            _comando.Parameters.AddWithValue("@IDProducto", pID);
            retorno = _comando.ExecuteNonQuery();
            conexion.Close();
            return retorno;
        }
    }
}
