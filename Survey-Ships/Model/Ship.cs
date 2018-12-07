using Survey_Ships.Helpers;

namespace Survey_Ships.Model
{
   public class Ship
   {
      public int PosX { get; set; }
      public int PosY { get; set; }
      public Direction Orientation { get; set; }

      public void SetPositionX(int value) => PosX = value;
      public void SetPositionY(int value) => PosY = value;
      public void SetOrientation(Direction value) => Orientation = value;
   }
}
