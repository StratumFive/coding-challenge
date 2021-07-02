using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StratumFive.CodingChallenge.Core
{
    public class Heading
    {
        private IntVector2 _transformation;

        public Heading(IntVector2 transformation)
        {
            _transformation = transformation;
        }

        public IntVector2 GetTransformation()
        {
            return _transformation;
        }
    }
}
