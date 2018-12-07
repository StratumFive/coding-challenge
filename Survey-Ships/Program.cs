using System;
using Survey_Ships.Helpers;
using Survey_Ships.Model;

namespace Survey_Ships
{
   class Program
   {
      static private Grid _grid = new Grid();
      static private Ship _ship = new Ship();

      static void Main(string[] args)
      {
         Console.WriteLine("Surveyor Ship coding challenge\n");

         GetGridCoordinates();
         GetShipData();

         Console.ReadKey();
      }

      private static void GetGridCoordinates()
      {
         Console.WriteLine("Please enter the North East coordinates:");
         var topRight = Console.ReadLine();

         while (!SetGridTopRight(topRight))
         {
            Console.WriteLine("Invalid data, two numbers, separated by space!");
            topRight = Console.ReadLine();
         }
         Console.WriteLine($"Grid top right coordinates are: N'{_grid.PosNorth}', E'{_grid.PosEast}'\n");
      }

      private static void GetShipData()
      {
         Console.WriteLine("Please enter the Ship starting position and orientation:");
         var shipStart = Console.ReadLine();

         while (SetShipStartData(shipStart))
         {
            Console.WriteLine("Invalid data, two numbers and one Direction(N S W E) separated by space!");
            shipStart = Console.ReadLine();
         }
         Console.WriteLine($"Ship starting coordinates are: X'{_ship.PosX}', Y'{_ship.PosY}', facing '{_ship.Orientation}'\n");
      }

      private static bool SetGridTopRight(string topRight)
      {
         if (string.IsNullOrWhiteSpace(topRight)) return false;

         var data = topRight.Replace(" ", string.Empty).ToCharArray();
         if (data.Length != 2) return false;

         int.TryParse(data[0].ToString(), out int coordN);
         int.TryParse(data[1].ToString(), out int coordE);

         if (coordN > 0 && coordE > 0)
         {
            _grid.SetNorth(int.Parse(data[0].ToString()));
            _grid.SetEast(int.Parse(data[1].ToString()));
            return true;
         }

         return false;
      }

      private static bool SetShipStartData(string shipStart)
      {
         if (string.IsNullOrWhiteSpace(shipStart)) return false;

         var data = shipStart.Replace(" ", string.Empty).ToCharArray();
         if (data.Length != 3) return false;

         int.TryParse(data[0].ToString(), out int posX);
         int.TryParse(data[1].ToString(), out int posY);
         Direction direction;

         if (Enum.TryParse(data[2].ToString(), out direction)
            && posX > 0 && posY > 0)
         {
            _ship.SetPositionX(posX);
            _ship.SetPositionY(posY);
            _ship.SetOrientation(direction);
         }

         return false;
      }
   }
}
