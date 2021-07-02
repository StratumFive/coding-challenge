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
            if (args.Length >= 2)
            {
                var regionBounds = GetBoundedRegion(args[0].Split(' '));
                IWarningProvider warningProvider = new WarningProvider();

                List<(Ship, string)> ships = new List<(Ship, string)>();

                for(var i = 1; i < args.Length; i+=2)
                {
                    var shipInitialPositionAndHeading = args[i].Split(' ');

                    var initialPosition = new IntVector2(int.Parse(shipInitialPositionAndHeading[0]),
                        int.Parse(shipInitialPositionAndHeading[1]));

                    if (initialPosition.X > 50 || initialPosition.Y > 50)
                        throw new InvalidOperationException("Coordinates cannot be > 50");

                    Ship ship = new Ship(
                        initialPosition,
                        HeadingFactory.GetHeading(shipInitialPositionAndHeading[2]),
                        regionBounds,
                        warningProvider);

                    var instructions = args[i + 1];

                    if (instructions.Length >= 100)
                        throw new InvalidOperationException("Instruction length must be < 100");

                    ships.Add((ship, instructions));
                }

                ExecuteShipInstructions(ships);
            }
            else
            {
                Console.WriteLine("Args missing!");
            }
        }

        static void ExecuteShipInstructions(List<(Ship, string)> ships)
        {
            foreach(var shipWithInstructions in ships)
            {
                shipWithInstructions.Item1.ExecuteInstructions(shipWithInstructions.Item2);
                Console.WriteLine(shipWithInstructions.Item1);
            }
        }

        static IBoundedRegion GetBoundedRegion(string[] parameters)
        {
            var boundedRegion = new RectangularBoundedRegion
            (
                new IntVector2(int.Parse(parameters[0]), int.Parse(parameters[1]))
            );

            if (boundedRegion.OuterBound.X > 50 || boundedRegion.OuterBound.Y > 50)
                throw new InvalidOperationException("Coordinates cannot be > 50");

            return boundedRegion;
        }
    }
}