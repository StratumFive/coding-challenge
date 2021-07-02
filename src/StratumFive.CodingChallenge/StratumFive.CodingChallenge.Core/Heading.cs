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

        public void Turn90DegLeft()
        {
            _transformation = new IntVector2(-_transformation.Y, _transformation.X);
        }

        public void Turn90DegRight()
        {
            _transformation = new IntVector2(_transformation.Y, -_transformation.X);
        }
    }
}
