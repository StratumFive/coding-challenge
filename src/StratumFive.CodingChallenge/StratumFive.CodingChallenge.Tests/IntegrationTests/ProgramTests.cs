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
    }
}
