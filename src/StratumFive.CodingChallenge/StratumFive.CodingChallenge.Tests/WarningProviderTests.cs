using Microsoft.VisualStudio.TestTools.UnitTesting;
using StratumFive.CodingChallenge.Core;
using StratumFive.CodingChallenge.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StratumFive.CodingChallenge.Tests
{
    [TestClass]
    public class WarningProviderTests
    {
        private IWarningProvider _warningProvider; 

        [TestInitialize]
        public void Init()
        {
            _warningProvider = new WarningProvider();
        }

        [TestMethod]
        public void When_WarningStored_WarningFound()
        {
            var position = new IntVector2(5, 5);

            _warningProvider.RegisterWarningForPosition(position);

            var isWarningRegistered = _warningProvider.AnyWarningsForPosition(position);

            Assert.IsTrue(isWarningRegistered);
        }

        [TestMethod]
        public void When_DifferentWarningStored_WarningNotFound()
        {
            var position = new IntVector2(5, 5);

            _warningProvider.RegisterWarningForPosition(position);

            var differentPosition = new IntVector2(3, 7);

            var isWarningRegistered = _warningProvider.AnyWarningsForPosition(differentPosition);

            Assert.IsFalse(isWarningRegistered);
        }
    }
}
