using StratumFive.CodingChallenge.Core;
using StratumFive.CodingChallenge.Core.Interfaces;
using System;

namespace StratumFive.CodingChallenge.App
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length > 0)
            {
                var regionBounds = GetBoundedRegion(args[0].Split(' '));
                IWarningProvider warningProvider = new WarningProvider();

                for(var i = 1; i < args.Length; i+=2)
                {
                    var shipInitialPositionAndHeading = args[i].Split(' ');
                    Ship ship = new Ship(
                        new IntVector2(int.Parse(shipInitialPositionAndHeading[0]),
                        int.Parse(shipInitialPositionAndHeading[1])),
                        HeadingFactory.GetHeading(shipInitialPositionAndHeading[2]),
                        regionBounds,
                        warningProvider);

                    ship.ExecuteInstructions(args[i + 1]);
                }
            }
            else
            {
                Console.WriteLine("Args missing!");
            }
            Console.ReadLine();
        }

        static IBoundedRegion GetBoundedRegion(string[] parameters)
        {
            return new RectangularBoundedRegion
            (
                new IntVector2(int.Parse(parameters[0]), int.Parse(parameters[1]))
            );
        }
    }
}
}
