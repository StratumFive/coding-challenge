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


            }
            else
            {
                Console.WriteLine("Args missing!");
            }
            Console.WriteLine("Hello World!");
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
