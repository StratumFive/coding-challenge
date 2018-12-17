using System.Drawing;

namespace SurveyShips.App
{
    /// <summary>
    /// Simple object that represents a Cartesian grid for Ships
    /// </summary>
     public struct ShipGrid
     {
         public Point GridSize;
         public Point[] LostShipCoordinates;
         public ShipGrid(int maxX, int maxY, int maxShips)
         {
             GridSize = new Point(maxX,maxY);
             LostShipCoordinates = new Point[maxShips];
         }

        /// <summary>
        /// Simple method to determine if the Grid is rectangular.
        /// </summary>
        /// <returns></returns>
         public bool IsGridARectangle()
         {
             //Really simplified Alg.
             if(GridSize.X != GridSize.Y)
                return true;
            return false;
         }

     }
}