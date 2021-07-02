using Microsoft.VisualStudio.TestTools.UnitTesting;
using StratumFive.CodingChallenge.Core;
using StratumFive.CodingChallenge.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StratumFive.CodingChallenge.Tests.IntegrationTests
{
    [TestClass]
    public class ShipTests
    {
        private IBoundedRegion _boundedRegion;
        private IWarningProvider _warningProvider;

        [TestInitialize]
        public void Init()
        {
            _boundedRegion = new RectangularBoundedRegion(new IntVector2(5, 3));
            _warningProvider = new WarningProvider();
        }

        [TestMethod]
        public void When_InstructionsSucessful_ToString_Correct()
        {
            Ship ship = new Ship(
                new IntVector2(1, 1),
                HeadingFactory.GetHeading("E"),
                _boundedRegion,
                _warningProvider);

            ship.ExecuteInstructions("RFRFRFRF");

            var result = ship.ToString();

            StringAssert.Equals(result, "1 1 E");
        }

        [TestMethod]
        public void When_InstructionsUnsuccessful_ToString_Correct()
        {
            Ship ship = new Ship(
                new IntVector2(1, 1),
                HeadingFactory.GetHeading("W"),
                _boundedRegion,
                _warningProvider);

            ship.ExecuteInstructions("FFFFF");

            var result = ship.ToString();

            StringAssert.Equals(result, "-1 1 W");
        }
    }
}
