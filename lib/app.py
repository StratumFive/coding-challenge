# write a program that determines each sequence of ship positions and reports the final position of the ship

def take_inputs () :
    # ask for input

    #  input1: 
    # grid point coordinates (x, y) = ints < 50  
    # # first line of input is the top right (y (north), x (east))
    # # lower-left (or south-west) coordinates are assumed to be( y(south) = 0, x(west) = 0)

    southWestX = 0
    southWestY = 0
    northEastX = int(input("Type in North East X coordinate : "))
    northEastY = int(input("Type in North East Y coordinate : "))


    # input2: ship position ((grid point coordinates (x, y) + (ship orientation))
    # # orientation (N, S, E, W) = string, Uppercase

    # input 3: Ship instruction (2 lines per ship)
    # ship instruction : string of the letters "L", "R", and "F" on one line, < 100 characters 
    # # Left: the ship turns left 90 degrees and remains on the current grid point.
    # # Right: the ship turns right 90 degrees and remains on the current grid point.
    # # Forward: the ship moves forward one grid point in the direction of the current orientation and maintains the same orientation. The direction North corresponds to the direction from grid point (x, y) to grid point (x, y+1) and the direction east corresponds to the direction from grid point (x, y) to grid point (x+1, y).

def find_ships () :
    # process inputs and make outputs
    # # indicate the final grid position and orientation of the ship.
    # # print "LOST" if the grid point coordinates (x, y) = ints > 50  