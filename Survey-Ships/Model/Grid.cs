namespace Survey_Ships.Model
{
   public class Grid
   {
      public int PosNorth { get; set; }
      public int PosEast { get; set; }

      public void SetNorth(int value) => PosNorth = value;

      public void SetEast(int value) => PosEast = value;
   }
}
