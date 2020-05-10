namespace Taller.Domain
{
    public class Cliente
    {
        public int ID { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Fecha_Nac { get; set; }
        public string Nro_Doc { get; set; }
        public string Direccion { get; set; }

        public Cliente() { }

        public Cliente(int pID, string pNombre, string pApellido, string pFecha_Nac, string pNro_Doc, string pDireccion)
        {
            this.ID = pID;
            this.Nombre = pNombre;
            this.Apellido = pApellido;
            this.Fecha_Nac = pFecha_Nac;
            this.Nro_Doc = pNro_Doc;
            this.Direccion = pDireccion;
        }

    }
}
