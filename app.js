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

    attack = function () {
        if(Math.random() < this.accuracy) {
            return true
        } else {
            return false
        }
    }
    
    gotHit = function (enemyPower) {
        this.hull -= enemyPower
    }
}

class AlienShip extends Ship {
    constructor(hull, firepower, accuracy) {
        super(hull, firepower, accuracy)
    }

    attack = function () {
        if(Math.random() < this.accuracy) {
            alert(`The vile alien attacks with deadly precision, dealing ${this.firepower} damage to Earth's last hope!`)
            return true
        } else {
            alert(`The alien fires on you, but the fool's shot misses! It appears that skill in combat is an earthly trait.`)
            return false
        }
    }
    gotHit = function (enemyPower) {
        this.hull -= enemyPower
        if(this.hull <= 0) {
            alert(`The enemy explodes in a brilliant ball of fire and scrap metal!`)
        }
    }
}

class Schwartzenegger extends Ship {
    constructor(hull, firepower, accuracy) {
        super(hull, firepower, accuracy)
    }

    attack = function () {
        if(Math.random() < this.accuracy) {
            alert(`You fire upon your hated enemy and score a direct hit, dealing ${this.firepower} damage!!`)
            return true
        } else {
            alert(`You fire your blasters but your shot goes wide! It would seem that luck does not favor you this day.`)
            return false
        }
    }
    gotHit = function (enemyPower) {
        this.hull -= enemyPower
        if(this.hull <=0) {
            alert('This is the end, your ship breaks up around you as alien lasers pierce your hull! Aliens charge through the debris cloud that was the USS Schwartzenegger, last hope of humanity, and speed toward a defensless planet Earth. The desperate populace can only cower as alien lasers rain destruction down from above, superheating the atmosphere and scouring all life from the planet.')
            gameOver = true
        }
    }
}

// generate alien ships
const alienOne = new AlienShip(Math.floor(Math.random() * 4 + 3), Math.floor(Math.random() * 3 + 2), Math.floor(Math.random() * 3 + 6) * 0.1)
const alienTwo = new AlienShip(Math.floor(Math.random() * 4 + 3), Math.floor(Math.random() * 3 + 2), Math.floor(Math.random() * 3 + 6) * 0.1)
const alienThree = new AlienShip(Math.floor(Math.random() * 4 + 3), Math.floor(Math.random() * 3 + 2), Math.floor(Math.random() * 3 + 6) * 0.1)
const alienFour = new AlienShip(Math.floor(Math.random() * 4 + 3), Math.floor(Math.random() * 3 + 2), Math.floor(Math.random() * 3 + 6) * 0.1)
const alienFive = new AlienShip(Math.floor(Math.random() * 4 + 3), Math.floor(Math.random() * 3 + 2), Math.floor(Math.random() * 3 + 6) * 0.1)
const alienSix = new AlienShip(Math.floor(Math.random() * 4 + 3), Math.floor(Math.random() * 3 + 2), Math.floor(Math.random() * 3 + 6) * 0.1)

const alienFleet = [alienOne, alienTwo, alienThree, alienFour, alienFive, alienSix]
console.log(alienFleet)

// generate ussSchwartzenegger
const ussSchwartzenegger = new Schwartzenegger(20, 5, .7)
console.log(ussSchwartzenegger)

// declare game global variables
let gameOver = false
let playerChoice = ''
let menu = true
let prepared = ''
const numberDecoration = ['st', 'nd', 'rd', 'th', 'th', 'th']

// start game loop
while(!gameOver) {
    // Intro
    if(menu == true) {
        alert("Welcome to the end of the world! The aliens are attacking, and only one hero stands between our precious home and annihilation!  You are humanity's last hope. ")
        while(prepared.toLowerCase() !='y' && prepared.toLowerCase() != 'yes'){
            prepared = prompt("Are you prepared to face the alien threat?")
            if(prepared.toLowerCase() == 'n' || prepared.toLowerCase() == 'no') {
                alert("Alas, Earth's last remaining hero has fled the battlefield along with any hope of survival.  The human race is now extinct!")
                alert("GAME OVER")
                gameOver = true
                break   
            } 
        }
        menu = false
    }

    // Turn iterator
    if(gameOver != true) {
        alienFleet.forEach((alienShip, idx, array) => {
            alert(`The ${idx + 1}${numberDecoration[idx]} enemy ship approaches. Time to attack!`)
            while(alienShip.hull > 0 && ussSchwartzenegger.hull > 0){
                if (ussSchwartzenegger.attack()) {  // ussSchwartzenegger turn
                    alienShip.gotHit(ussSchwartzenegger.firepower)
                }
                
                if(alienShip.hull > 0) {    // alien turn
                    if(alienShip.attack()) {
                        ussSchwartzenegger.gotHit(alienShip.firepower)
                    }
                }
            }
            if(idx !== array.length -1) {   // player chooses to fight or retreat if there are still enemies remaining
                playerChoice = ''
                while(playerChoice.toLowerCase() != 'fight' && playerChoice.toLowerCase() !='retreat') {
                    playerChoice = prompt("You have destroyed one of the invaders.  Do you wish to continue the fight or will you retreat and regroup?  Enter 'Fight' to continue, or 'Retreat' to fly home to base.")
                }                
                if(playerChoice == 'retreat') {
                    menu = true
                }
            } else {    // inform player of their victory
                    alert("You have done it!! Agains all odds you have driven back the alien horde and saved the planet from extraterrestrial wrath! You head home to receive a hero's welcome as world leaders gather to honor your great accomplishment this day. In the years to come, your name will be remembered at the top of the list of humanities greatest champions.")
                    alert("YOU WIN!!")
                    gameOver = true
            }
        })
    } else {
        break
    }
}