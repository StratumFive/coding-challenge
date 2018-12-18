using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SurveyShips.App
{
    class Program
    {
        static async Task Main(string[] args)
        {
            //TODO: Remove hard coding of file, take from args
            try
            {
                await InstructionFileParser.ParseLinesAsync("input.txt");
                (var maxX, var maxY) = InstructionFileParser.GridCoordinates();
                var grid = new ShipGrid(maxX,maxY,InstructionFileParser.CountOfShips());
                Console.WriteLine($"-- Start Grid Size {grid.GridSize.X},{grid.GridSize.Y} for {grid.LostShipCoordinates.Length} ships");

                if(!grid.IsGridARectangle())
                {
                    Console.WriteLine("Error, grid isn't a rectangle, press any key to exit");
                    Console.ReadKey();
                    return;
                }

                Ship[] ships = new Ship[grid.LostShipCoordinates.Length];
                var startingCoordinates = InstructionFileParser.GetShipStartCoordinatesAsList();
                var instructions = InstructionFileParser.GetShipInstructions();

                if(ships.Length != startingCoordinates.Count)
                    throw new Exception("Error, values didn't match for ships vs. coordinates");

                for(int i=0;i < ships.Length;i++)
                {
                    ships[i] = new Ship(startingCoordinates[i].Item1,
                                        startingCoordinates[i].Item2,
                                        startingCoordinates[i].Item3,
                                        grid.LostShipCoordinates.Where(c => c.X != 0 && c.Y != 0).ToList(),
                                        grid.GridSize);

                    Console.WriteLine($"-- Set up Ship {i} - {ships[i].CurrentPosition} pointing {ships[i].CurrentOrientation}");
                    ships[i].ProcessInstructions(instructions[i]);
                    
                    if(ships[i].IsLost())
                    {
                        grid.LostShipCoordinates[i] = ships[i].CurrentPosition;
                    }
                    Console.WriteLine($@"-- End Ship    {i} - {ships[i].CurrentPosition} pointing {ships[i].CurrentOrientation} {(ships[i].IsLost() ? "LOST" : "" )}");
                }
            }
            catch (IOException ex)
            {
                Console.WriteLine($"Issue opening file: {ex}");
            }

        }

    }
}
