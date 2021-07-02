using StratumFive.CodingChallenge.Core;
using StratumFive.CodingChallenge.Core.Interfaces;
using System;
using System.Collections.Generic;

namespace StratumFive.CodingChallenge.App
{
    public class Program
    {
        public static void Main(string[] args)
        {
            if (args.Length > 0)
            {
                var regionBounds = GetBoundedRegion(args[0].Split(' '));
                IWarningProvider warningProvider = new WarningProvider();

                List<(Ship, string)> ships = new List<(Ship, string)>();

                for(var i = 1; i < args.Length; i+=2)
                {
                    var shipInitialPositionAndHeading = args[i].Split(' ');
                    Ship ship = new Ship(
                        new IntVector2(int.Parse(shipInitialPositionAndHeading[0]),
                        int.Parse(shipInitialPositionAndHeading[1])),
                        HeadingFactory.GetHeading(shipInitialPositionAndHeading[2]),
                        regionBounds,
                        warningProvider);

                    ships.Add((ship, args[i + 1]));

                    ship.ExecuteInstructions(args[i + 1]);
                }
            }
            else
            {
                Console.WriteLine("Args missing!");
            }
            Console.ReadLine();
        }

        static void ExecuteShipInstructions(List<(Ship, string)> ships)
        {
            foreach(var shipWithInstructions in ships)
            {
                shipWithInstructions.Item1.ExecuteInstructions(shipWithInstructions.Item2);
            }
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
