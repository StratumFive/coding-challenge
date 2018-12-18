using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;

namespace SurveyShips.App
{
    /*
    		        N

        W           			E

		            S
     */
    /// <summary>
    /// Compass Orientation values.
    /// </summary>
    public enum Orientation
    {
        North,
        East,
        South,
        West,
        Unknown
    }

       public class Ship
    {
        public Point CurrentPosition { get; private set; }
        public Point Grid { get; private set;}
        public Orientation CurrentOrientation { get; private set; }
        public List<Point> LostShipCoordinates { get;  private set; }
        private bool lost = false;
        public bool IsLost() => lost;

        /// <summary>
        /// Default ctor.
        /// </summary>
        /// <param name="startX"></param>
        /// <param name="startY"></param>
        /// <param name="startOrientation"></param>
        public Ship(int startX, int startY, char startOrientation)
        {
            this.CurrentPosition = new Point(startX, startY);
            this.CurrentOrientation = ConvertCharToOrientation(startOrientation);
            this.LostShipCoordinates = new List<Point>();
            this.Grid = new Point(50,25);                                           //Setting a default.
        }
        
        /// <summary>
        /// Ctor.
        /// </summary>
        /// <param name="startX"></param>
        /// <param name="startY"></param>
        /// <param name="startOrientation"></param>
        /// <param name="missingShips"></param>
        /// <param name="grid"></param>
        public Ship(int startX, int startY, char startOrientation, List<Point> missingShips, Point grid)
        {
            this.CurrentPosition = new Point(startX, startY);
            this.CurrentOrientation = ConvertCharToOrientation(startOrientation);
            this.LostShipCoordinates = missingShips;
            this.Grid = grid;
        }

        /// <summary>
        /// Process the instructions to move and turn a ship.
        /// </summary>
        /// <param name="instructions"></param>
        /// <param name="debug"></param>
        /// <exception><see cref="ArgumentNullException"/></exception>
        /// <exception><see cref="ArgumentException"/></exception>
        public void ProcessInstructions(string instructions, bool debug = false)
        {
            if (string.IsNullOrEmpty(instructions))
                throw new ArgumentNullException(nameof(instructions));

            if (instructions.Length > 99)
                throw new ArgumentException("Instructions need to be less than 100 characters in length ");

            for (int i = 0; i < instructions.Length; i++)
            {
                switch (char.ToLower(instructions[i]))
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
                if (debug)
                {
                    Console.WriteLine($"Debug: Instruction {instructions[i]} {this.CurrentPosition.X}, {this.CurrentPosition.Y} with a position");
                }
            }

        }

        /// <summary>
        /// Turn orientation of the ship by 90 Degrees to the left.
        /// </summary>
        private void TurnLeft()
        {
            switch (CurrentOrientation)
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
            switch (CurrentOrientation)
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
            switch (CurrentOrientation)
            {
                case Orientation.North:
                    if(!CanMoveForward(this.CurrentPosition.X,this.CurrentPosition.Y + 1))
                        break;
                    this.CurrentPosition = new Point(CurrentPosition.X, CurrentPosition.Y + 1);
                    break;
                case Orientation.East:
                    if(!CanMoveForward(this.CurrentPosition.X + 1,this.CurrentPosition.Y))
                        break;
                    this.CurrentPosition = new Point(CurrentPosition.X + 1, CurrentPosition.Y);
                    break;
                case Orientation.South:
                    if(!CanMoveForward(this.CurrentPosition.X,this.CurrentPosition.Y - 1))
                        break;
                    this.CurrentPosition = new Point(CurrentPosition.X, CurrentPosition.Y - 1);
                    break;
                case Orientation.West:
                    if(!CanMoveForward(this.CurrentPosition.X - 1,this.CurrentPosition.Y))
                        break;
                    this.CurrentPosition = new Point(CurrentPosition.X - 1, CurrentPosition.Y);
                    break;
                default:
                    break;
            }
        }

        /// <summary>
        /// Checks to see if a Ship can move forward.
        /// </summary>
        /// <param name="x"></param>
        /// <param name="y"></param>
        /// <returns>true: Can move forward, false: Either the ship is lost OR part of the coordinates 
        /// have been moved.</returns>
        private bool CanMoveForward(int x, int y)
        {
            //Stop ship moving forward if a ship got lost their previously.
            //Might be able to move in a particular direction though
            if (this.LostShipCoordinates.Count() > 0)
            {
                if(x <=  this.Grid.X && y > this.Grid.Y)
                {
                    this.CurrentPosition = new Point(x,CurrentPosition.Y);
                } else if(x > this.Grid.X && y <= this.Grid.Y)
                {
                    this.CurrentPosition = new Point(CurrentPosition.X,y);
                }
                else if(x <= this.Grid.X && y <= this.Grid.Y)
                {
                    this.CurrentPosition = new Point(x,y);
                }
                lost = false;
                return false;
            }

            if(lost)
                return false;
            
            if(x > this.Grid.X || y > this.Grid.Y)
            {
                lost = true;     
                return false;
            }
            return true;
        }

        /// <summary>
        /// Quick method to return a instruction orientation to <see cref="Orientation.cs" />
        /// </summary>
        /// <param name="orientationCode"></param>
        /// <returns>Orientation</returns>
        private Orientation ConvertCharToOrientation(char orientationCode)
        {
            if (orientationCode == 'N' || orientationCode == 'n')
            {
                return Orientation.North;
            }
            else if (orientationCode == 'E' || orientationCode == 'e')
            {
                return Orientation.East;
            }
            else if (orientationCode == 'S' || orientationCode == 's')
            {
                return Orientation.South;
            }
            else if (orientationCode == 'W' || orientationCode == 'w')
            {
                return Orientation.West;
            }

            return Orientation.Unknown;
        }
    }
}