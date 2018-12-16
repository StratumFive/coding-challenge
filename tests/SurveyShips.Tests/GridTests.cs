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
    public class GridTests
    {
        [Fact]
        public void As_A_Grid_We_Should_Have_X_Y_Coordinates()
        {}

        [Fact]
        public void As_A_Grid_We_Should_Be_Rectangular()
        {}
        
        [Fact]
        public void As_A_Grid_I_Should_Report_Warning_Of_Known_Boundary()
        {}
    }
}
