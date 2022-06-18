// console.log('app.js')

// Parameters
    // Six alien ships
    // Alien ships attack one at a time, waiting for the outcome of the previous battle before deploying the next ship
    // Player attacks first
    // Player does not have targeting lasers and can only attack the aliens in order
    // Once a ship is destroyed, the player may choose to retreat or stay

    // One round looks like
        // Player attacks the first alien ship
        // If the ship survives, it attacks the player
        // If the player survives, player attacks the alien ship
        // If it survives, it attacks the player
        // Etc.
        // If the alien ship is destroyed, the player has the option to attack the next ship or retreat
        // If the player retreats, the game is over with an option to continue
        // The player wins if all aliens are destroyed
        // The player loses if destroyed

// ship class

class Ship {
    constructor(hull, firepower, accuracy){
        this.hull = hull
        this.firepower = firepower
        this.accuracy = accuracy
    }

    gotHit = function (enemyPower) {
        this.hull -= enemyPower
    }

    getFirePower = function () {
        return this.firepower
    }

    getAccuracy = function () {
        return this.accuracy
    }
}

// generate alien ships


const alienOne = new Ship(Math.floor(Math.random() * 4 + 3), Math.floor(Math.random() * 3 + 2), Math.floor(Math.random() * 3 + 6) * 0.1)
const alienTwo = new Ship(Math.floor(Math.random() * 4 + 3), Math.floor(Math.random() * 3 + 2), Math.floor(Math.random() * 3 + 6) * 0.1)
const alienThree = new Ship(Math.floor(Math.random() * 4 + 3), Math.floor(Math.random() * 3 + 2), Math.floor(Math.random() * 3 + 6) * 0.1)
const alienFour = new Ship(Math.floor(Math.random() * 4 + 3), Math.floor(Math.random() * 3 + 2), Math.floor(Math.random() * 3 + 6) * 0.1)
const alienFive = new Ship(Math.floor(Math.random() * 4 + 3), Math.floor(Math.random() * 3 + 2), Math.floor(Math.random() * 3 + 6) * 0.1)
const alienSix = new Ship(Math.floor(Math.random() * 4 + 3), Math.floor(Math.random() * 3 + 2), Math.floor(Math.random() * 3 + 6) * 0.1)

const alienFleet = [alienOne, alienTwo, alienThree, alienFour, alienFive, alienSix]

console.log(alienFleet)

// start game loop
let gameOver = false

while(!gameOver) {
    gameOver = true
}