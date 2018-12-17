using System;
using System.IO;
using System.Threading.Tasks;

namespace SurveyShips.App
{
    class Program
    {
        static async Task Main(string[] args)
        {
            //TODO: Remove hard coding of file, take from args
            int linecount = 0;
            string line = default(string);

            try
            {
                var parsedFile = await InstructionFileParser.ParseLinesAsync("input.txt");
                (var maxX, var maxY) = InstructionFileParser.GridCoordinates();
                var grid = new ShipGrid(maxX,maxY,InstructionFileParser.CountOfShips());
                Console.WriteLine($"--Start-- Grid Size {grid.GridSize.X},{grid.GridSize.Y} for {grid.LostShipCoordinates.Length} ships");

                if(!grid.IsGridARectangle())
                {
                    Console.WriteLine("Error, grid isn't a rectangle, press any key to exit");
                    Console.ReadKey();
                    return;
                }

                foreach(var l in parsedFile)
                {
                    Console.WriteLine(l);
                }
            }
            catch (IOException ex)
            {
                Console.WriteLine($"Issue opening file: {ex}");
            }

        }
    }
}
