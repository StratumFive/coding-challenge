using Survey_Ships.Helpers;

namespace Survey_Ships.Model
{
   public class Ship
   {
      public int PosX { get; set; }
      public int PosY { get; set; }
      public Direction Orientation { get; set; }

      public Ship(int posX, int posY, Direction orientation)
      {
         PosX = posX;
         PosY = posY;
         Orientation = orientation;
      }
   }
}
