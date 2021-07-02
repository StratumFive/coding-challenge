using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StratumFive.CodingChallenge.Core.Interfaces
{
    public interface IWarningProvider
    {
        public bool AnyWarningsForPosition(IntVector2 position);
        /// <summary>
        /// Registers a warning against a given position
        /// </summary>
        /// <param name="position"></param>
        public void RegisterWarningForPosition(IntVector2 position);
    }
}
