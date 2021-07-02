using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StratumFive.CodingChallenge.Core
{
    public struct IntVector2
    {
        public int X { get; private set; }
        public int Y { get; private set; }

        public IntVector2(int x, int y)
        {
            this.X = x;
            this.Y = y;
        }
    }
}
