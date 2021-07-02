using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StratumFive.CodingChallenge.Core
{
    public class Heading
    {
        private IntVector2 _translation;

        public Heading(IntVector2 translation)
        {
            _translation = translation;
        }

        public IntVector2 GetTranslation()
        {
            return _translation;
        }

        public void Turn90DegLeft()
        {
            _translation = new IntVector2(-_translation.Y, _translation.X);
        }

        public void Turn90DegRight()
        {
            _translation = new IntVector2(_translation.Y, -_translation.X);
        }

        public override string ToString()
        {
            if (_translation.Y == 1)
                return "N";
            if (_translation.Y == -1)
                return "S";
            if (_translation.X == 1)
                return "E";
            if (_translation.X == -1)
                return "W";

            throw new Exception("Invalid heading");
        }
    }
}
