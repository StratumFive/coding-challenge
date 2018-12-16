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
                using (StreamReader sr = new StreamReader("input.txt"))
                {
                    while((line = await sr.ReadLineAsync()) != null)  
                    {  
                        Console.WriteLine($"{linecount} {line}");  
                        linecount++;  
                    }  
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Issue opening file: {ex}");
            }

        }
    }
}
