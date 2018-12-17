using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace SurveyShips.Tests
{
    /*
    1. String not greater than 100
    2. 1st line: Rectangle Size
    3. 2nd Line: Ship starting position
    4. 3rd Line: Movement
    5. Only L, R and F for 3rd line.
     */

    // 0 5 3
    // 1 1 1 E
    // 2 RFRFRFRF

    // 1 3 2 N
    // 2 FRRFLLFFRRFLL

    // 1 0 3 W
    // 2 LLFFFLFLFL
    public class InstructionFileParser
    {
        private static List<string> parsed;

        /// <summary>
        /// Parse the file, and validate the Instructions.
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns>Validated instructions.</returns>
        public static async Task<List<string>> ParseLinesAsync(string fileName)
        {

            string line = default(string);
            int count = 1;
            bool firstRecordPassed  = false;
            parsed = new List<string>();
            try
            {
                using (StreamReader sr = new StreamReader(fileName))
                {
                    while((line = await sr.ReadLineAsync()) != null)  
                    {  
                        if(string.IsNullOrWhiteSpace(line))
                        {
                                count = 1; //reset back
                                continue;
                        }
                        if(!firstRecordPassed)
                        {
                            if( ! await parseFirstRecord(line))
                            {
                                throw new IOException("First line failed"); //Throw because without this you cannot set grid.
                            }
                            firstRecordPassed = true;
                            parsed.Add(line);
                            continue;
                        }
                    

                        
                        if(count == 1)                                      //Ship Position
                        {
                            if(await parseShipCoordinates(line))
                            {
                                parsed.Add($"[ship-start] {line}");
                            }
                            else 
                            {
                                parsed.Add($"[ship-start] Failed");          //Added Failed record so that the calling application can still continue
                            }
                            count++;
                            continue;
                        } else if (count == 2)                              //Ship Instructions
                        {
                            if(await parseShipInstructions(line))
                            {
                                parsed.Add($"[ship-instr] {line}");
                            }else
                            {
                                parsed.Add($"[ship-instr] Failed");
                            }
                            count = 1;
                        }
                    }  
                    sr.Close();
                }
        
            }
            catch (Exception ex) when (ex is FileNotFoundException || ex is DirectoryNotFoundException)
            {
                Console.WriteLine($"Issue opening file: {ex}");
            }
            return parsed;
        }
    
        /// <summary>
        /// First record should only contain 2 numbers to build the size of the
        /// rectangle
        /// </summary>
        /// <param name="record"></param>
        /// <returns>true: parsed correctly, false: failed.</returns>
        private static async Task<bool> parseFirstRecord(string record)
        {
            if(string.IsNullOrEmpty(record))
                return false;
            char[] toCheck = new char[record.Length];
            using(var reader = new StringReader(record))
            {
                await reader.ReadAsync(toCheck, 0, record.Length);
                foreach(var c in toCheck)
                {
                    if(char.IsWhiteSpace(c))
                        continue;
                    if(!char.IsNumber(c))
                        return false;
                }
                reader.Close();
            }
            return true;
        }

        /// <summary>
        /// The record that represents the Coordinates and Orientation
        /// should only contain numbers not greater than 50 and N,S,E,W
        /// </summary>
        /// <param name="record"></param>
        /// <returns>true: parsed correctly, false: failed.</returns>
        private static async Task<bool> parseShipCoordinates(string record)
        {
            if(string.IsNullOrEmpty(record))
                return false;
            char[] toCheck = new char[record.Length];
            using(var reader = new StringReader(record))
            {
                await reader.ReadAsync(toCheck, 0, record.Length);
                foreach(var c in toCheck)
                {
                    if(char.IsWhiteSpace(c))
                        continue;
                    if(char.IsNumber(c))
                    {
                        var parsedInt = (int)char.GetNumericValue(c);
                        if(parsedInt > 50)
                        {
                            return false;
                        }
                    }
                    if(char.IsLetter(c))
                    {
                        var lower = char.ToLowerInvariant(c);
                        switch(lower)
                        {
                            case 'n':
                            case 'e':
                            case 's':
                            case 'w':
                                break;
                            default:
                                return false;
                        }
                    }
                }
                reader.Close();
            }
            return true;         
        }
        
        /// <summary>
        /// The record that represents the Instructions for movement, should only
        /// contain (L)eft, (R)ight and (F)orward. Also the instruction should be less than
        ///  100 characters in length.
        /// </summary>
        /// <param name="record"></param>
        /// <returns>true: parsed correctly, false: failed.</returns>
        private static async Task<bool> parseShipInstructions(string record)
        {
            if(string.IsNullOrEmpty(record))
                return false;
            char[] toCheck = new char[record.Length];
            using(var reader = new StringReader(record))
            {
                if(record.Count() > 99) 
                {
                    return false;
                }               
                await reader.ReadAsync(toCheck, 0, record.Length);
                foreach(var c in toCheck)
                {
                    if(char.IsWhiteSpace(c))
                        continue;
                    if(char.IsLetter(c))
                    {
                        var lower = char.ToLowerInvariant(c);
                        switch(lower)
                        {
                            case 'l':
                            case 'f':
                            case 'r':
                                break;
                            default:
                                return false;
                        }
                    }
                }
                reader.Close();
            }
            return true;         
        }


        /// <summary>
        /// Total successfully parsed ships ()
        /// </summary>
        /// <returns></returns>
        public static int CountOfShips()
        {
            return parsed.Where(s => s.Contains("[ship-start]") && !s.Contains("Failed")).Count();
        }
    
        /// <summary>
        /// Returns the Grid coordinates.
        /// </summary>
        /// <returns>X, Y coordinates</returns>
        public static (int x, int y) GridCoordinates()
        {
            string value = parsed[0];
            if(string.IsNullOrWhiteSpace(value))
                return (0,0);

            int x , y = 0;
            char xx = value[0];
            char yy = value[2];
            
            x = (int)char.GetNumericValue(xx);
            y = (int)char.GetNumericValue(yy);

            return (x,y);

        }
    }

    public class InstructionTests
    {
        [Fact]
        public void No_Instruction_Should_Be_Greater_Than_100()
        {
            //arrange
            //act
            //assert
        }

        [Fact]
        public async Task As_1st_Line_Should_Have_Rectangle_Size()
        {
            //arrange
            var lines = await InstructionFileParser.ParseLinesAsync("input.txt");
            
            //act
            //assert
            Assert.True(lines[0] == "5 3",$"Assert failed failed: {lines[0]}");
        }

        [Fact]
        public async Task As_1st_Line_Should_Have_Rectangle_Size_Fails()
        {
            //arrange
            var ex = await Assert.ThrowsAnyAsync<IOException>( () =>   InstructionFileParser.ParseLinesAsync("input2.txt"));
            
            //act
            //assert
            Assert.True(ex.Message == "First line failed",$"Assert failed {ex.Message}");
        }

        [Fact]
        public async Task As_2nd_Line_Should_Have_Starting_Position()
        {
            //arrange
            var lines = await InstructionFileParser.ParseLinesAsync("input.txt");
            
            //act
            var shiplines = lines?.Where(s => s.Contains("[ship-start]") && !s.Contains("Failed"));
            //assert
            Assert.True(shiplines.Count() > 0,$"Assert failed failed: {shiplines.Count()}");
        }
    
        [Fact]
        public async Task As_A_Ship_Position_I_Should_Fail_Incorrect_Orientation()
        {
            //arrange
            var lines = await InstructionFileParser.ParseLinesAsync("input3.txt");
            
            //act
            var shiplines = lines?.Where(s => s.Contains("[ship-start]") && s.Contains("Failed"));
            //assert
            Assert.True(shiplines.Count() > 0,$"Assert failed failed: {shiplines.Count()}");
        }

        [Fact]
        public async Task As_3rd_Line_Should_Have_L_R_And_F()
        {
            //arrange
            var lines = await InstructionFileParser.ParseLinesAsync("input.txt");
            
            //act
            var shiplines = lines?.Where(s => s.Contains("[ship-instr]") && !s.Contains("Failed"));
            //assert
            Assert.True(shiplines.Count() > 0,$"Assert failed failed: {shiplines.Count()}");
        }


        [Fact]
        public async Task As_3rd_Line_Should_Have_L_R_And_F_Should_Fail()
        {
            //arrange
            var lines = await InstructionFileParser.ParseLinesAsync("input3.txt");
            
            //act
            var shiplines = lines?.Where(s => s.Contains("[ship-instr]") && s.Contains("Failed"));
            //assert
            Assert.True(shiplines.Count() > 0,$"Assert failed failed: {shiplines.Count()}");
        }

        [Fact]
        public async Task Should_Count_3_Ships()
        {
            //arrange
            var lines = await InstructionFileParser.ParseLinesAsync("input.txt");
            
            //act
            var count = InstructionFileParser.CountOfShips();
            //assert
            Assert.True(count == 3,$"Assert failed failed: {count}");
        }

        [Fact]
        public async Task Should_Return_Grid_Size()
        {
            //arrange
            var lines = await InstructionFileParser.ParseLinesAsync("input.txt");

            //act
            (var x, var y) = InstructionFileParser.GridCoordinates();

            //assert
            Assert.True(x == 5, $"Assert failed {x}");
            Assert.True(y == 3, $"Assert failed {y}");
        }
    }
}