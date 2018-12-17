using System;
using System.Drawing;
using Xunit;

namespace SurveyShips.Tests
{
    /*
        1. Ship should have a current position (X, Y)
        2. Ship should have a current orientation (N,E,S,W)
        3. We should know if the ship is 'lost'
        4. Ship can rotate 90 degrees Left or Right
     */

    public enum Orientation
    {
        North,
        East,
        South,
        West,
        Unknown
    }

    /// <summary>
    /// Ship object.
    /// </summary>
    public class Ship
    {
        public Point CurrentPosition {get;private set;} 
        public Orientation CurrentOrientation {get;private set;}

        public Ship(int startX, int startY, char startOrientation)
        {
            this.CurrentPosition = new Point(startX, startY);
            this.CurrentOrientation = ConvertCharToOrientation(startOrientation);
        }

        /// <summary>
        /// Process the instructions to move and turn a ship.
        /// </summary>
        /// <param name="instructions"></param>
        /// <exception><see cref="ArgumentNullException"/></exception>
        /// <exception><see cref="ArgumentException"/></exception>
        public void ProcessInstructions(string instructions)
        {
            if(string.IsNullOrEmpty(instructions))
                throw new ArgumentNullException(nameof(instructions));
            
            if(instructions.Length > 99)
                throw new ArgumentException("Instructions need to be less than 100 characters in length ");
            
            for(int i=0;i < instructions.Length;i++)
            {
                switch(char.ToLower(instructions[i]))
                {
                    case 'l':
                        TurnLeft();
                        break;
                    case 'r':
                        TurnRight();
                        break;
                    case 'f':
                        MoveForward();
                        break;
                    default:
                        break;
                }
            }
            
        }

        /// <summary>
        /// Turn orientation of the ship by 90 Degrees to the left.
        /// </summary>
        private void TurnLeft()
        {
            switch(CurrentOrientation)
            {
                case Orientation.North:
                    this.CurrentOrientation = Orientation.West;
                    break;
                case Orientation.East:
                    this.CurrentOrientation = Orientation.North;
                    break;
                case Orientation.South:
                    this.CurrentOrientation = Orientation.East;
                    break;
                case Orientation.West:
                    this.CurrentOrientation = Orientation.South;
                    break;
                default:
                    break;
            }
        }

        /// <summary>
        /// Turn orientation of the ship by 90 Degrees to the left.
        /// </summary>
        private void TurnRight()
        {
            switch(CurrentOrientation)
            {
                case Orientation.North:
                    this.CurrentOrientation = Orientation.East;
                    break;
                case Orientation.East:
                    this.CurrentOrientation = Orientation.South;
                    break;
                case Orientation.South:
                    this.CurrentOrientation = Orientation.West;
                    break;
                case Orientation.West:
                    this.CurrentOrientation = Orientation.North;
                    break;
                default:
                    break;
            }
        }

        /// <summary>
        /// Move Forward one grid point.
        /// </summary>
        private void MoveForward()
        {
             switch(CurrentOrientation)
            {
                case Orientation.North:
                    this.CurrentPosition = new Point(CurrentPosition.X, CurrentPosition.Y + 1);
                    break;
                case Orientation.East:
                    this.CurrentPosition = new Point(CurrentPosition.X + 1, CurrentPosition.Y);
                    break;
                case Orientation.South:
                    this.CurrentPosition = new Point(CurrentPosition.X, CurrentPosition.Y - 1);
                    break;
                case Orientation.West:
                    this.CurrentPosition = new Point(CurrentPosition.X - 1, CurrentPosition.Y);
                    break;
                default:
                    break;
            }           
        }
        
        /// <summary>
        /// Quick method to return a instruction orientation to <see cref="Orientation.cs" />
        /// </summary>
        /// <param name="orientationCode"></param>
        /// <returns>Orientation</returns>
        private Orientation ConvertCharToOrientation(char orientationCode)
        {
            if(orientationCode == 'N' || orientationCode == 'n')
            {
                return Orientation.North;
            } else if(orientationCode == 'E' || orientationCode == 'e')
            {
                return Orientation.East;
            } else if(orientationCode == 'S' || orientationCode == 's')
            {
                return Orientation.South;
            } else if(orientationCode == 'W' || orientationCode == 'w')
            {
                return Orientation.West;
            }

            return Orientation.Unknown;
        }


    }
    public class ShipsTests
    {
        [Fact]
        public void As_A_Ship_We_Can_Turn_Left_From_North()
        {
            //arrange
            var ship = new Ship(1,1,'N');

            //act
            ship.ProcessInstructions("L");
            
            //assert
            Assert.True(ship.CurrentOrientation == Orientation.West, $"Assert failed {ship.CurrentOrientation}");
        }

        [Fact]
        public void As_A_Ship_We_Can_Turn_Left_From_East()
        {
            //arrange
            var ship = new Ship(1,1,'E');

            //act
            ship.ProcessInstructions("L");
            
            //assert
            Assert.True(ship.CurrentOrientation == Orientation.North, $"Assert failed {ship.CurrentOrientation}");
        }

        [Fact]
        public void As_A_Ship_We_Can_Turn_Left_From_South()
        {
            //arrange
            var ship = new Ship(1,1,'S');

            //act
            ship.ProcessInstructions("L");
            
            //assert
            Assert.True(ship.CurrentOrientation == Orientation.East, $"Assert failed {ship.CurrentOrientation}");
        }

        [Fact]
        public void As_A_Ship_We_Can_Turn_Left_From_West()
        {
            //arrange
            var ship = new Ship(1,1,'W');

            //act
            ship.ProcessInstructions("L");
            
            //assert
            Assert.True(ship.CurrentOrientation == Orientation.South, $"Assert failed {ship.CurrentOrientation}");
        }

        [Fact]
        public void As_A_Ship_We_Can_Turn_Right_From_North()
        {
            //arrange
            var ship = new Ship(1,1,'N');

            //act
            ship.ProcessInstructions("R");
            
            //assert
            Assert.True(ship.CurrentOrientation == Orientation.East, $"Assert failed {ship.CurrentOrientation}");
        }

        [Fact]
        public void As_A_Ship_We_Can_Turn_Right_From_East()
        {
            //arrange
            var ship = new Ship(1,1,'E');

            //act
            ship.ProcessInstructions("R");
            
            //assert
            Assert.True(ship.CurrentOrientation == Orientation.South, $"Assert failed {ship.CurrentOrientation}");
        }

        [Fact]
        public void As_A_Ship_We_Can_Turn_Right_From_South()
        {
            //arrange
            var ship = new Ship(1,1,'S');

            //act
            ship.ProcessInstructions("R");
            
            //assert
            Assert.True(ship.CurrentOrientation == Orientation.West, $"Assert failed {ship.CurrentOrientation}");
        }

        [Fact]
        public void As_A_Ship_We_Can_Turn_Right_From_West()
        {
            //arrange
            var ship = new Ship(1,1,'W');

            //act
            ship.ProcessInstructions("R");
            
            //assert
            Assert.True(ship.CurrentOrientation == Orientation.North, $"Assert failed {ship.CurrentOrientation}");
        }

        [Fact]
        public void As_As_Ship_We_Can_Move_1_From_North()
        {
            //arrange
            var ship = new Ship(1,1,'N');
            var newPoint = new Point(1,2);

            //act
            ship.ProcessInstructions("F");
            
            //assert
            Assert.True(ship.CurrentPosition == newPoint, $"Assert failed {ship.CurrentOrientation}");
        }

        [Fact]
        public void As_As_Ship_We_Can_Move_1_From_South()
        {
            //arrange
            var ship = new Ship(1,1,'S');
            var newPoint = new Point(1,0);

            //act
            ship.ProcessInstructions("F");
            
            //assert
            Assert.True(ship.CurrentPosition == newPoint, $"Assert failed {ship.CurrentOrientation}");
        }

        [Fact]
        public void As_As_Ship_We_Can_Move_1_From_East()
        {
            //arrange
            var ship = new Ship(1,1,'E');
            var newPoint = new Point(2,1);

            //act
            ship.ProcessInstructions("F");
            
            //assert
            Assert.True(ship.CurrentPosition == newPoint, $"Assert failed {ship.CurrentOrientation}");
        }

        [Fact]
        public void As_As_Ship_We_Can_Move_1_From_West()
        {
            //arrange
            var ship = new Ship(1,1,'W');
            var newPoint = new Point(0,1);

            //act
            ship.ProcessInstructions("F");
            
            //assert
            Assert.True(ship.CurrentPosition == newPoint, $"Assert failed {ship.CurrentOrientation}");
        }

        
    }
}