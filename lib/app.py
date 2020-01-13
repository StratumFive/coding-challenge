# write a program that determines each sequence of ship positions and reports the final position of the ship

def take_inputs () :
    # ask for input

    #  input1: 
    # grid point coordinates (x, y) = ints < 50  
    # # first line of input is the top right (y (north), x (east))
    # # lower-left (or south-west) coordinates are assumed to be( y(south) = 0, x(west) = 0)
    northEast = str(input("Type in grid point coordinates i.e. X Y: "))
    northEastList = ''.join(northEast).split() 
    print(northEastList)

    # input2: ship position ((grid point coordinates (x, y) + (ship orientation))
    # # orientation (N, S, E, W) = string, Uppercase
    shipPosition = str(input("Type in grid point coordinates and ship orientation i.e. X Y N: ")).upper()
    shipPositionList = ''.join(shipPosition).split() 
    print(shipPositionList)

    # collect grid point coordinates into integers of X & Y
    X = shipPositionList[0]
    Y = shipPositionList[1]
    shipOrientation = shipPositionList[2]
    print(f'X: {X}\nY: {Y}\nShip Orientation: {shipOrientation}')



    # input 3: Ship instruction (2 lines per ship)
    # ship instruction : string of the letters "L", "R", and "F" on one line, < 100 characters 
    shipInstruction = str(input("Type in Ship instructions i.e. LRF: ")).upper()   
    print(shipInstruction)


# def analyze_inputs () :
#     take_inputs()
#     # collect grid point coordinates into integers of X & Y
#     # collect ship orientation string in ship position
#     # analyze ship instructions
#     # # Left: the ship turns left 90 degrees and remains on the current grid point.
#     # # Right: the ship turns right 90 degrees and remains on the current grid point.
#     # # Forward: the ship moves forward one grid point in the direction of the current orientation and maintains the same orientation. The direction North corresponds to the direction from grid point (x, y) to grid point (x, y+1) and the direction east corresponds to the direction from grid point (x, y) to grid point (x+1, y).
    
#     print(shipInstruction)

take_inputs()

# def find_ships () :
    # process inputs and make outputs
    # # indicate the final grid position and orientation of the ship.
    # # print "LOST" if the grid point coordinates (x, y) = ints > 50  
