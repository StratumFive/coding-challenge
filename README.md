# StratumFive - Coding Challenge

## Introduction
Welcome to the StratumFive Coding Challenge. Please take ten minutes to carefully read through this document before starting the challenge.
* We expect you to spend in the region of a few hours on this challenge. If you do not complete it then please still submit your work.
* If you do not have a github account you will have to create one
* [Fork](https://help.github.com/articles/fork-a-repo/) this repository
* **Commit your code frequently. This is how we will review your submission.**
* If you do not have time to fully complete the challenge, please still push it and indicate what your next steps would be. Remember to try to solve the hardest problems first.
* We are not asking for a clever, over engineered or obfuscated solution. Please be as pragmatic as possible.
* User interface design is not the focus of the problem although we will not mark you down for creating a UI.
* We should be able to run your code without any crazy steps
* Make use of the sample data
* Make sure your final solution is on master
* **Let us know when you complete the challenge**

## Problem: Survey Ships
### The Problem
The surface of the ocean can be modelled by a rectangular grid around which ships are able to move according to instructions provided from a control station. You are to write a program that determines each sequence of ship positions and reports the final position of the ship.
A ship position consists of a grid coordinate (a pair of integers: x-coordinate followed by y-coordinate) and an orientation (N, S, E, W for north, south, east, and west). A ship instruction is a string of the letters "L", "R", and "F" which represent, respectively, the instructions:
* Left: the ship turns left 90 degrees and remains on the current grid point.
* Right: the ship turns right 90 degrees and remains on the current grid point.
* Forward: the ship moves forward one grid point in the direction of the current orientation and maintains the same orientation.
The direction North corresponds to the direction from grid point (x, y) to grid point (x, y+1) and the direction east corresponds to the direction from grid point (x, y) to grid point (x+1, y).

Since the grid is rectangular and bounded, a ship that falls off an edge of the grid is lost forever. However, lost ships leave a warning that prohibits future ships from dropping off the world from the same grid point. The warning is left at the last grid position the ship occupied before disappearing over the edge. An instruction to move "off" the world from a grid point from which a ship has been previously lost is simply ignored by the current ship.
### The Input
The first line of input is the top right (or north east) coordinates of the rectangular world, the lower-left (or south-west) coordinates are assumed to be 0, 0.
The remaining input consists of a sequence of ship positions and instructions (two lines per ship). A position consists of two integers specifying the initial coordinates of the ship and an orientation (N, S, E, W), all separated by whitespace on one line. A ship instruction is a string of the letters "L", "R", and "F" on one line.
Each ship is processed sequentially, i.e. finishes executing the ship instructions before the next ship begins execution.
The maximum value for any coordinate is 50.
All instruction strings will be less than 100 characters in length.
### The Output
For each ship position/instruction in the input, the output should indicate the final grid position and orientation of the ship. If a ship falls off the edge of the grid the word "LOST" should be printed after the position and orientation.

#### Sample Input
5 3\
1 1 E\
RFRFRFRF

3 2 N\
FRRFLLFFRRFLL

0 3 W\
LLFFFLFLFL

#### Expected Output
1 1 E\
3 3 N LOST\
2 3 S

## Finally
**Tell us when you have completed the challenge**
=======
# Mi Solution - shippy
The project was built using:


* Vue.js
* Vuetify
* Vuex
* Vue router
* vue-test-utils
* Jest
* Font Awesome (for the icons)


The installation is very standard, and here are the usual commands. Underneath these sections, there are details about the implementation, features, architecture, testing and workflow. Here is a sneak peek of the application run with the data provided.


![alt text](src/assets/config-1.png?raw=true 'Main results')

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Features
The application provides 2 main interfaces:

* The **Ship Tracker** menu: This is a page where the user can:
	- create the settings for a new world on a handy form with specific inputs per value


	![image](src/assets/settings-form.png?=100x100)


	- crete and execute ONE instruction for one ship, also with a form with specific inputs. On this form the user can enter the X coordinate, the Y coordinate, the Orientation (on a dropdown select input) and the instructions. The instructions can be added both by copying a line (that will later be parsed) or by clicking the "L", "R" and "F" buttons.
	
	
	![image](src/assets/ship-form.png?raw=true)

	- These components and view allow the user to interact with an interface more controlled, where the input fields are more guided and easy to control.

	- The forms have validations and alerts (for success and errors). And both forms also have a reset button to reset all the information.


	![image](src/assets/alerts.png?raw=true)
	
* The **All Instructions** menu: This is a page where the user can enter a set of instructions altogether like the ones on the example and the system provides also a feature to process all the instruction in sequence, if they are all well defined.
This form presents the user with only one field to enter all the information. But also the alerts and reset features (as in the previous forms). This page presents all the instructions results together on a specific field (instead of an alert).


![image](src/assets/all-instructions-form.png?raw=true)


Regardless of where the user enters the instructions, the application will show a map grid component that is able to represent all the possible configurations. Then when the user sends (correct) instructions that result with a ship WITHIN the proper range, then that ship is represented also on the map with a different color. Here are some configurations for the grid:


![image](src/assets/config-3.png?raw=true)



![image](src/assets/config-2.png?raw=true)

### Architecture and Implementation
The application was built separating:
- the state (on Vuex) where we I keep track of:
	- the world settings (map grid configuration) which is a 2*2 matrix (2d array) that contains zeros by default but gets a number 2 when there is a ship in those coordinates.
	- the limits for that map grid: limitX and limitY
	- an array of warnings keeping the positions where other ships have previously fallen.
	- the currentShip information, which actually represents the last ship that had an instruction.
	- and the processedShips which is alson an array but in this case, containing the positions, orientation and status of all the last set of instructions run by the user altogether.
	The state is only updated via MUTATIONS and accessed by getters. The MUTATIONS are only accessed by ACTIONS.
- the services contain the methods that actually calculate how to execute the ships instructions. In that file there are functions to move the ship Right, Left or Forward and to control the coordinates and orientation of the ships. These services are only consumed by the ACTIONS. The actions are triggered by the components.
- views (Home and AllInstructions) and components (MapGrid, Settings, Ship and ShipInstructionsSet).


The main methods at the store, services and main components are mostly documented.


### Testing
The testing was made with Jest and vue-test-utils. There are only 2 test files (due to time restrictions)
- store.spec.js: the store testing I divided into:
	- testing **getters**
	- testing **mutations**
	- testing **actions**
- Home.spec.js: the view or components testing I divide into:
	- testing **Template** (including snapshots)¸
	- testing **Computed properties**
	- testing **Methods**
	- testing **Watchers** (in this case there aren't any)

Here are some examples of the results:

![image](src/assets/testing-store.png?raw=true)

![image](src/assets/testing-home.png?raw=true)


### Workflow and Git
This application has 2 branches: master and development. Since this is not a real project, I worked on development and pushed my changes there. Normally I would branch off for every feature, create a merge request and only then merge to development.

That is all! If you have any questions, please do not hesitate to ask.
