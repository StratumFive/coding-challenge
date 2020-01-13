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

    # collect grid point coordinates into integers of X & Y
    X = int(shipPositionList[0])
    Y = int(shipPositionList[1])
    # collect ship orientation string in ship position
    shipOrientation = str(shipPositionList[2])
    print(f'X: {X}\nY: {Y}\nShip Orientation: {shipOrientation}')


    # input 3: Ship instruction (2 lines per ship)
    # ship instruction : string of the letters "L", "R", and "F" on one line, < 100 characters 
    shipInstruction = str(input("Type in Ship instructions i.e. LRF: ")).upper()   
    print(shipInstruction)
    for i in shipInstruction:
    # analyze ship instructions
    # make sure input is only LRF
    # # R: the ship turns right 90 degrees and remains on the current grid point.
    # # if R, N --> E 
    # # if R, E --> S 
    # # if R, S --> W 
    # # if R, W --> N 
        if ('R' in shipInstruction):
            print ("found R")
    # # L: the ship turns left 90 degrees and remains on the current grid point.
    # # if L, N --> W
    # # if L, W --> S
    # # if L, S --> E
    # # if L, E --> N
        if ('L' in shipInstruction):
            print ("found L")
    # # Forward: the ship moves forward one grid point in the direction of the current orientation and maintains the same orientation. The direction North corresponds to the direction from grid point (x, y) to grid point (x, y+1) and the direction east corresponds to the direction from grid point (x, y) to grid point (x+1, y).
    # # if F, X = X+1
    # # if F, Y = Y+1
        if ('F' in shipInstruction):
            print ("found F")



take_inputs()

# def find_ships () :
    # process inputs and make outputs
    # # indicate the final grid position and orientation of the ship.
    # # print "LOST" if the grid point coordinates (x, y) = ints > 50  
