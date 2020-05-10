using System.Data.SqlClient;

namespace Taller.DataAccess
{
    public class BDComun
    {

        public static SqlConnection ObtenerConexion()
        {
            SqlConnection conectar = new SqlConnection("Data Source=LAPTOP-QHC355DF\\SQLEXPRESS;Initial Catalog=Taller;Integrated Security=true;");

            conectar.Open();
            return conectar;
        }

    }
}
