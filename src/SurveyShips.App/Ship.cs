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

    /// <summary>
    /// Ship object.
    /// </summary>
    public class Ship
    {
        public Point CurrentPosition {get;private set;} 
        public Point Grid {get;private set;}
        public Orientation CurrentOrientation {get;private set;}

        public List<Point> LostShipCoordinates {get;set;}


        public Ship(int startX, int startY, char startOrientation)
        {
            this.CurrentPosition = new Point(startX, startY);
            this.CurrentOrientation = ConvertCharToOrientation(startOrientation);
            this.LostShipCoordinates = new List<Point>();
        }

        /// <summary>
        /// Process the instructions to move and turn a ship.
        /// </summary>
        /// <param name="instructions"></param>
        /// <exception><see cref="ArgumentNullException"/></exception>
        /// <exception><see cref="ArgumentException"/></exception>
        public void ProcessInstructions(string instructions, bool debug = false)
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
                if(debug)
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
                    if(this.LostShipCoordinates.Where(i => i.X ==  CurrentPosition.X && (i.Y == CurrentPosition.Y  + 1))
                                               .Count() > 0)
                        break;
                    this.CurrentPosition = new Point(CurrentPosition.X, CurrentPosition.Y + 1);
                    break;
                case Orientation.East:
                    if(this.LostShipCoordinates.Where(i => i.X + 1 ==  CurrentPosition.X && (i.Y == CurrentPosition.Y))
                                               .Count() > 0)
                        break;
                    this.CurrentPosition = new Point(CurrentPosition.X + 1, CurrentPosition.Y);
                    break;
                case Orientation.South:
                    if(this.LostShipCoordinates.Where(i => i.X ==  CurrentPosition.X && (i.Y == CurrentPosition.Y  - 1))
                                               .Count() > 0)
                        break;
                    this.CurrentPosition = new Point(CurrentPosition.X, CurrentPosition.Y - 1);
                    break;
                case Orientation.West:
                    if(this.LostShipCoordinates.Where(i => i.X - 1 ==  CurrentPosition.X && (i.Y == CurrentPosition.Y))
                                               .Count() > 0)
                        break;
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
}