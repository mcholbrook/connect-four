# Connect-Four

![Wireframe for connect four game](https://i.imgur.com/ksP6EAv.png)


### **Pseudocode**

* Define the necessary constants
* Define the necessary variables
* Store any cached element references
* Define the necessary event listeners
* Initialize the game
  * Set turn
  * Set clear game board
  * Set winner as null
  * Call render function 
* Handle user clicking a square
  * Get id of clicked square
  * Check to make sure that square is available && eligible
  * If so, update board variables and render on screen
    * Check to see if that constitutes a win
      * Compare board array to possible win combinations to see if any win conditions have been met
    * If there is a winner, update winner variable
    * If there is not a winner, check to see if there are still possible moves on the board
      * If no possible moves remain, display tie message and halt gameplay
    * If there are still possible moves, update turn variable, display updated turn message, and repeat "handle a user clicking a square"
  * If the square is either not available or not eligible, display message asking user to choose an eligible square and repeat "handle a user clicking a square"
* Handle user pressing reset
  * Initialize the game again, resetting state variables, and repeat the steps above