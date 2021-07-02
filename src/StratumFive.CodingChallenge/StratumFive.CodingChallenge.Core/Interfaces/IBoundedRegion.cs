using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StratumFive.CodingChallenge.Core.Interfaces
{
    public interface IBoundedRegion
    {
        bool IsInRegion(IntVector2 position);
    }
}
