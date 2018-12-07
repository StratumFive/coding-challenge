using System;
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
         Console.WriteLine("Please enter the North East coordinates:");
         var topRight = Console.ReadLine();

         SetGridTopRight(topRight);
         Console.WriteLine($"Grid top right coordinates are: N'{_grid.PosNorth}', E'{_grid.PosEast}'");

         Console.ReadKey();
      }

      private static void SetGridTopRight(string topRight)
      {
         if (!string.IsNullOrWhiteSpace(topRight))
         {
            var data = topRight.Replace(" ", string.Empty).ToCharArray();
            if (data.Length == 2)
            {
               int.TryParse(data[0].ToString(), out int coordN);
               int.TryParse(data[1].ToString(), out int coordE);

               if (coordN > 0 && coordE > 0)
               {
                  _grid.SetNorth(int.Parse(data[0].ToString()));
                  _grid.SetEast(int.Parse(data[1].ToString()));
               }
            }
         }
      }
   }
}
