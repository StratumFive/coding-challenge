using StratumFive.CodingChallenge.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StratumFive.CodingChallenge.Core
{
    public class RectangularBoundedRegion : IBoundedRegion
    {
        public readonly IntVector2 Origin;
        public readonly IntVector2 OuterBound;

        public RectangularBoundedRegion(IntVector2 outerBound)
        {
            this.Origin = new IntVector2(0, 0);
            this.OuterBound = outerBound;
        }
        public bool IsInRegion(IntVector2 position)
        {
            throw new NotImplementedException();
        }
    }
}
