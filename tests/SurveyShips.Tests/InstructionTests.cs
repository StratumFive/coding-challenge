using System;
using System.Collections.Generic;
using System.IO;
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

    public class InstructionFileParser
    {
        /// <summary>
        /// Parse the file, and validate the Instructions.
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns>Validated instructions.</returns>
        public static async Task<List<string>> ParseLineAsync(string fileName)
        {
            string line = default(string);
            int linecount = 0;
            bool firstRecordPassed  = false;
            List<string> lines = new List<string>();
            try
            {
                using (StreamReader sr = new StreamReader(fileName))
                {
                    while((line = await sr.ReadLineAsync()) != null)  
                    {  
                        if(string.IsNullOrWhiteSpace(line))
                            continue;
                        
                        if(!firstRecordPassed)
                        {
                            if( ! await parseFirstRecord(line))
                            {
                                throw new IOException("First line failed");
                            }
                            firstRecordPassed = true;
                            lines.Add(line);
                            continue;
                        }
                        
                        linecount++;  
                    }  
                    sr.Close();
                }
        
            }
            catch (Exception ex) when (ex is FileNotFoundException || ex is DirectoryNotFoundException)
            {
                Console.WriteLine($"Issue opening file: {ex}");
            }
            return lines;
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
            }
            return true;
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
            var lines = await InstructionFileParser.ParseLineAsync("input.txt");
            
            //act
            //assert
            Assert.True(lines[0] == "5 3",$"Assert failed failed: {lines[0]}");
        }

        [Fact]
        public async Task As_1st_Line_Should_Have_Rectangle_Size_Fails()
        {
            //arrange
            var ex = await Assert.ThrowsAnyAsync<IOException>( () =>   InstructionFileParser.ParseLineAsync("input2.txt"));
            
            //act
            //assert
            Assert.True(ex.Message == "First line failed",$"Assert failed {ex.Message}");
        }

        [Fact]
        public void As_2nd_Line_Should_Have_Starting_Position()
        {}

        [Fact]
        public void As_3rd_Line_Should_Have_L_R_And_F()
        {}
    }
}