using StratumFive.CodingChallenge.Core.Interfaces;
using System;

namespace StratumFive.CodingChallenge.Core
{
    public class Ship
    {
        public ShipState State { get; private set; } = ShipState.OK;

        public IntVector2 Position { get; private set; }
        public Heading Heading { get; private set; }

        public readonly IBoundedRegion _region;
        public readonly IWarningProvider _warningProvider;

        public Ship(IntVector2 position, Heading heading, IBoundedRegion region, IWarningProvider warningProvider)
        {
            this.Position = position;
            this.Heading = heading;
            this._region = region;
            this._warningProvider = warningProvider;
        }

        public void ExecuteInstructions(string instructions)
        {
            foreach(var instruction in instructions)
            {
                if (instruction == 'L')
                    Heading.Turn90DegLeft();

                if (instruction == 'R')
                    Heading.Turn90DegRight();

                if(instruction == 'F')
                {
                    var nextPositionIsInRegion = _region.IsInRegion(nextPosition());
                }
            }
        }

        private void moveForward()
        {
            this.Position = this.Position + Heading.GetTranslation();
        }

        private IntVector2 nextPosition()
        {
            return this.Position + Heading.GetTranslation();
        }

        public enum ShipState
        {
            OK, LOST
        }

    }
}
