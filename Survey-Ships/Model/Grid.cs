namespace Survey_Ships.Model
{
   public class Grid
   {
      public int PosNorth { get; set; }
      public int PosEast { get; set; }

      public Grid(int posN, int posE)
      {
         PosNorth = posN;
         PosEast = posE;
      }
   }
}
