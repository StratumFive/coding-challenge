using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StratumFive.CodingChallenge.App;

namespace StratumFive.CodingChallenge.Tests.IntegrationTests
{
    [TestClass]
    public class ProgramTests
    {
        [TestMethod]
        public void When_ValidInput_CorrectResults()
        {
            //Check test Standard Output for result
            Program.Main(
                new string[]
                {
                    "5 3",
                    "1 1 E",
                    "RFRFRFRF",
                    "3 2 N",
                    "FRRFLLFFRRFLL",
                    "0 3 W",
                    "LLFFFLFLFL"
                });
        }

        [TestMethod]
        [ExpectedException(typeof(InvalidOperationException))]
        public void When_TooLargeCoordinates_InvalidOperationException()
        {
            Program.Main(
                    new string[]
                    {
                        "300 3",
                        "1 1 E",
                        "RFRFRFRF",
                    });
        }

        [TestMethod]
        [ExpectedException(typeof(InvalidOperationException))]
        public void When_TooLargeInstruction_InvalidOperationException()
        {
            Program.Main(
                    new string[]
                    {
                        "5 3",
                        "1 1 E",
                        new string('f', 100),
                    });
        }
    }
}
