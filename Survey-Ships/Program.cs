using System;
using Survey_Ships.Helpers;
using Survey_Ships.Model;

/// <summary>
/// Not 100% working, but with a bit more time could fix:
/// - find out why is it not working 100%
/// - move functions to the related classes or create data manipulation classes
/// - add more input for more ships (ask user how many ships, etc.)
/// - create Struct for coordinates
/// </summary>

namespace Survey_Ships
{
   class Program
   {
      static private Grid _grid = new Grid();
      static private Ship _ship = new Ship();
      static private string _movement = string.Empty;
      static private string _endResult = string.Empty;

      static void Main(string[] args)
      {
         Console.WriteLine("Surveyor Ship coding challenge\n");

         GetGridCoordinates();
         GetShipData();
         GetShipMovement();
         MoveShip();

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

         while (!SetShipStartData(shipStart))
         {
            Console.WriteLine("Invalid data, two numbers and one Direction(N S W E) separated by space!");
            shipStart = Console.ReadLine();
         }
         Console.WriteLine($"Ship starting coordinates are: X'{_ship.PosX}', Y'{_ship.PosY}', facing '{_ship.Orientation}'\n");
      }

      private static void GetShipMovement()
      {
         Console.WriteLine("Please enter the Ship movements:\nF - forward, R - turn right, L - turn left\n(invalid entries will be disregarded)");
         var movement = Console.ReadLine();

         while (!ValidateMovement(movement))
         {
            Console.WriteLine("Invalid data, only F R L accepted!");
            movement = Console.ReadLine();
         }
         Console.WriteLine($"Accepted Ship movement '{_movement}'\n");
      }

      private static void MoveShip()
      {
         var curShipX = _ship.PosX;
         var curShipY = _ship.PosY;
         var lost = string.Empty;

         var currOrientation = _ship.Orientation;

         foreach (var item in _movement)
         {
            var modifier = GetShipDirectionModifier(currOrientation);
            Enum.TryParse(item.ToString(), out Heading heading);

            switch (heading)
            {
               case Heading.F:
                  if (currOrientation == Direction.N || currOrientation == Direction.S) { curShipX += modifier; }
                  if (currOrientation == Direction.E || currOrientation == Direction.W) { curShipY += modifier; }
                  break;
               case Heading.R:
                  currOrientation = Rotate(currOrientation, true);
                  break;
               case Heading.L:
                  currOrientation = Rotate(currOrientation, false);
                  break;
               default:
                  break;
            }

            if (!CheckShipOnGrid(curShipX, curShipY)) { lost = "LOST"; break; }
         }

         Console.WriteLine($"Movement Report:\n{curShipX} {curShipY} {currOrientation} {lost}");
      }

      private static bool SetGridTopRight(string topRight)
      {
         if (string.IsNullOrWhiteSpace(topRight)) return false;

         var data = topRight.Replace(" ", string.Empty).ToCharArray();
         if (data.Length != 2) return false;

         int.TryParse(data[0].ToString(), out int coordN);
         int.TryParse(data[1].ToString(), out int coordE);

         if (coordN > 0 && coordN <= 50 && coordE > 0 && coordE <= 50)
         {
            _grid.SetNorth(coordN);
            _grid.SetEast(coordE);
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

         if (Enum.TryParse(data[2].ToString().ToUpper(), out Direction direction)
            && posX > 0 && posY > 0)
         {
            _ship.SetPositionX(posX);
            _ship.SetPositionY(posY);
            _ship.SetOrientation(direction);

            return true;
         }

         return false;
      }

      private static bool ValidateMovement(string movement)
      {
         if (string.IsNullOrWhiteSpace(movement)) return false;

         var data = movement.ToUpper().ToCharArray();

         if (data.Length <= 100)
         {
            foreach (var item in data)
            {
               if (Enum.TryParse(item.ToString(), out Heading heading))
               {
                  _movement += heading;
               }
            }
            return true;
         }

         return false;
      }

      private static int GetShipDirectionModifier(Direction direction)
      {
         switch (direction)
         {
            case Direction.N:
            case Direction.E:
               return 1;
            case Direction.S:
            case Direction.W:
               return -1;
         }

         return 0;
      }

      private static Direction Rotate(Direction current, bool positiveRotate)
      {
         var degree = (int)current;

         var result = positiveRotate ? degree += 90 : degree -= 90;
         if (result > 360) { result = 0; }

         return (Direction)result;
      }

      private static bool CheckShipOnGrid(int shipX, int shipY)
      {
         return (shipX > 0 || shipX < _grid.PosNorth) && (shipY > 0 || shipY < _grid.PosEast);
      }
   }
}
