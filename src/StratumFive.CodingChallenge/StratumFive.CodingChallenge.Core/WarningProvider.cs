using StratumFive.CodingChallenge.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StratumFive.CodingChallenge.Core
{
    public class WarningProvider : IWarningProvider
    {
        private static HashSet<(int posX, int posY)> warnings = new HashSet<(int posX, int posY)>();
        public bool AnyWarningsForPosition(IntVector2 position)
        {
            return warnings.Contains((position.X, position.Y));
        }
        public void RegisterWarningForPosition(IntVector2 position)
        {
            warnings.Add((position.X, position.Y));
        }
    }
}
