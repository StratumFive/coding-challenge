using System;

namespace StratumFive.CodingChallenge.Core
{
    public class Ship
    {
        public ShipState State { get; private set; } = ShipState.OK;

        public void ExecuteInstructions(string instructions)
        {

        }
        public enum ShipState
        {
            OK, LOST
        }

    }
}
