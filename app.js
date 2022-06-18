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

// define ship classes

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
            alert('This is the end, your ship breaks up around you as alien lasers pierce your hull! The remaining invaders charge through the debris cloud that was the USS Schwartzenegger, and speed toward a defensless planet! The desperate citizens of Earth can only cower in fear as enemy weapons rain down fire from above, superheating the atmosphere and scouring all life from the globe.')
            lose()
        }
    }
}

// define game functions

function lose() {
    alert("GAME OVER")
    gameOver = true
}

// generate alien ships
const alienOne = new AlienShip(Math.floor(Math.random() * 4 + 3), Math.floor(Math.random() * 3 + 2), Math.floor(Math.random() * 3 + 6) * 0.1)
const alienTwo = new AlienShip(Math.floor(Math.random() * 4 + 3), Math.floor(Math.random() * 3 + 2), Math.floor(Math.random() * 3 + 6) * 0.1)
const alienThree = new AlienShip(Math.floor(Math.random() * 4 + 3), Math.floor(Math.random() * 3 + 2), Math.floor(Math.random() * 3 + 6) * 0.1)
const alienFour = new AlienShip(Math.floor(Math.random() * 4 + 3), Math.floor(Math.random() * 3 + 2), Math.floor(Math.random() * 3 + 6) * 0.1)
const alienFive = new AlienShip(Math.floor(Math.random() * 4 + 3), Math.floor(Math.random() * 3 + 2), Math.floor(Math.random() * 3 + 6) * 0.1)
const alienSix = new AlienShip(Math.floor(Math.random() * 4 + 3), Math.floor(Math.random() * 3 + 2), Math.floor(Math.random() * 3 + 6) * 0.1)

const alienFleet = [alienOne, alienTwo, alienThree, alienFour, alienFive, alienSix]
// console.log(alienFleet)

// generate ussSchwartzenegger
const ussSchwartzenegger = new Schwartzenegger(20, 5, .7)
console.log(ussSchwartzenegger)

// declare game global variables
let gameOver = false
let playerChoice = ''
let menu = true
let prepared = ''
let repairs = 0
let confirm = ''
const numberDecoration = ['st', 'nd', 'rd', 'th', 'th', 'th']

// start game loop
while(!gameOver) {
    // menu
    if(menu == true) {
        if(repairs == 0) {
            alert("Welcome to the end of the world! The aliens are attacking, and only one hero stands between our precious home and annihilation!  You are humanity's last hope!")
        } else {
            alert(`Welcome back to Starbase One officer. We have repaired your ship and adjusted your weapons output so that you will have enough energy to finish those wretched invaders! You now have ${ussSchwartzenegger.hull} hull points remaining.  Godspeed!`)
        }
        prepared = ''
        while(prepared.toLowerCase() !='y' && prepared.toLowerCase() != 'yes'){
            prepared = prompt("Are you prepared to face the alien threat?")
            if(prepared.toLowerCase() == 'n' || prepared.toLowerCase() == 'no') {
                alert("Alas, Earth's last remaining hero has fled the battlefield along with any hope of survival.  The human race is now extinct!")
                lose()
                break
            } 
        }
        menu = false
    }

    // turn iterator
    if(!gameOver) { // check to see if the game is over
        for(let i = 0; i < alienFleet.length; i++) {
            if(alienFleet[i].hull > 0) {    // check for dead aliens when returning from base
                alert(`The ${i + 1}${numberDecoration[i]} enemy ship approaches. Time to attack!`)
                while(alienFleet[i].hull > 0 && ussSchwartzenegger.hull > 0){

                    // ussSchwartzenegger turn
                    if (ussSchwartzenegger.attack()) {
                        alienFleet[i].gotHit(ussSchwartzenegger.firepower)
                    }
                    
                    // alien turn
                    if(alienFleet[i].hull > 0) {
                        if(alienFleet[i].attack()) {
                            ussSchwartzenegger.gotHit(alienFleet[i].firepower)
                        }
                    }
                }
                
                if(!gameOver) {

                    // player chooses to fight or retreat if there are still enemies remaining
                    if(i !== alienFleet.length -1) {

                        playerChoice = ''
                        while(playerChoice.toLowerCase() != 'fight' && playerChoice.toLowerCase() !='retreat') {
                            if(repairs == 0){
                                playerChoice = prompt(`You have destroyed one of the invaders! You currently have ${ussSchwartzenegger.hull} hull pionts remaining, and there are ${5-i} alien ships still to fight.  You may return to base one time to conduct minor repairs, however doing so will deplete your power cells and force you to set your blasters to 80% of full power for the remainder of the battle. Do you wish to continue the fight or will you retreat and regroup? Enter 'Fight' to continue, or 'Retreat' to dock for repairs.`)
                            } else {
                                playerChoice = prompt(`You have destroyed one of the invaders! You currently have ${ussSchwartzenegger.hull} hull pionts remaining, and there are ${5-i} alien ships still to fight. Do you wish to continue the fight or will you flee the battle? Enter 'Fight' to continue, or 'Retreat' to run away.`)
                            }
                        }
                        
                        // perform repairs and weapons modification on first retreat
                        if(playerChoice == 'retreat' && repairs == 0) {
                            repairs = 1
                            if(ussSchwartzenegger.hull < 16) {
                                ussSchwartzenegger.hull += 5
                            } else {
                                ussSchwartzenegger.hull = 20
                            }
                            ussSchwartzenegger.firepower *= 0.8
                            menu = true
                            break

                        // confirmirmation of second retreat
                        } else if(playerChoice == 'retreat') {
                            while(confirm.toLowerCase() != 'yes' || confirm.toLowerCase() != 'y') {
                                confirm = prompt("WARNING: If you retreat a second time, the aliens will decide that you have given up on the defense and attack the planet directly! Are you sure you want to retreat?")
                                if(confirm.toLowerCase() == 'no' || confirm.toLowerCase() == 'n') {
                                    break
                                } else if(confirm.toLowerCase() == 'yes' || confirm.toLowerCase() == 'y') {
                                    alert("In a stunning display of cowardice, our hero has decided to flee the battlefield. With no one left to stop them, the aliens press forward and decimate our once beautiful home. The atmosphere ignites and all life within perishes in an instant. The last human alive drifts through space reflecting on what might have been, until at long last the ship's life support fails and cruel reality fades to black.")
                                    lose()
                                    i = 6
                                    break
                                }
                            }
                        }

                    // inform player of their victory
                    } else {
                            alert("You have done it!! Agains all odds you have driven back the alien horde and saved the planet from extraterrestrial wrath! You head home to receive a hero's welcome as world leaders gather to honor your great accomplishment this day. In the years to come, your name will be remembered foremost on the list of humanities greatest champions.")
                            alert("YOU WIN!!")
                            gameOver = true
                    }
                }
            }
        }
    } else {
        break
    }
}