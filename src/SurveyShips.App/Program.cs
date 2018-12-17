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
