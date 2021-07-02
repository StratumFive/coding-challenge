using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StratumFive.CodingChallenge.Core
{
    public static class HeadingFactory
    {
        private static Dictionary<String, Heading> headings = new Dictionary<string, Heading>()
        {
            {"N", new Heading(new IntVector2(0, 1)) },
            {"E", new Heading(new IntVector2(1, 0)) },
            {"S", new Heading(new IntVector2(0, -1))},
            {"W", new Heading(new IntVector2(-1, 0))}
        };
        /// <summary>
        /// Returns a heading transformation from a compass direction
        /// </summary>
        /// <param name="headingName"></param>
        /// <returns></returns>
        public static Heading GetHeading(string headingName)
        {
            return headings[headingName];
        }
    }
}
