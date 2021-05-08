# StratumFive - Coding Challenge

## Overview

This is a simple application to give you information about where your ship will be after it follows the instructions declared by you. It will also inform you when your ship is going to run out of the border and it will save its latest location and move, so that the following ship can avoid doing the same maneuver.

The instructions for your ship can be L, R or F, put into one string. The meaning of each is as below: 

* L: the ship turns left 90 degrees and remains on the current point.
* R: the ship turns right 90 degrees and remains on the current point.
* F: the ship moves forward one grid point in the direction of the current orientation and maintains the same orientation


## Running the project 

Firstly you need to install all of dependencies: 

```
npm install 
```

Then run the project on the server, use the following command to do so: 

```
npm run serve 
```

If you want to run tests, use this command: 

```
npm run test
```
