using System.Drawing;
using Xunit;

namespace SurveyShips.Tests
{
    /*
        1. Grid is rectangular
        2. No Min or maximum X Y coordinates with regards to grid size.
        3. There is a maximum coordinate value of 50 though, but not really relevant to this object.
        4. Grid should know if a ship has been lost.
        5. Cartesian coordinates 0,0 being bottom left.
     */

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
    public class GridTests
    {
        [Fact]
        public void As_A_Grid_We_Should_Have_X_Y_Coordinates()
        {}

        [Fact]
        public void As_A_Grid_We_Should_Be_Rectangular()
        {
            //arrange
            var gridOfShips = new ShipGrid(5,3,1);
        
            //act
            var rec = gridOfShips.IsGridARectangle();
            
            //assert
            Assert.True(rec,$"Assert failed, isn't a rectangle {rec}");
        }

        [Fact]
        public void As_A_Grid_We_Shouldnt_Be_Rectangular()
        {
            //arrange
            var gridOfShips = new ShipGrid(5,5,1);
        
            //act
            var rec = gridOfShips.IsGridARectangle();
            
            //assert
            Assert.False(rec,$"Assert failed, isn't a rectangle {rec}");
        }
        
        [Fact]
        public void As_A_Grid_I_Should_Report_Warning_Of_Known_Boundary()
        {}
    }
}
