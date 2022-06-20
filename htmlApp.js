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

// define DOM variables

const background = document.querySelector('.background')
const gameText = document.querySelector('.game-text')
const yesButton = document.querySelector('.yes-button')
const noButton = document.querySelector('.no-button')
const playerInputLabel = document.querySelector('.player-input')
const playerInputBox = document.querySelector('#player-input')
const playerInputButton = document.querySelector('.input-button')
const attackButton = document.querySelector('.attack-button')
const replayButton = document.querySelector('.replay')

// declare game global variables
let playerResponse = ''
let shipNumber = 0
let repairs = 0
let confirm = ''
let timeout
let delay = 2000
const numberDecoration = ['st', 'nd', 'rd', 'th', 'th', 'th']

// define functions

function showHideAttackButton() {
    attackButton.classList.toggle('hide')
}

function showHideReplayButton() {
    replayButton.classList.toggle('hide')
}

function showHideYesNoButtons() {
    yesButton.classList.toggle('hide')
    noButton.classList.toggle('hide')
}

function showHidePlayerInput() {
    playerInputLabel.classList.toggle('hide')
    playerInputBox.classList.toggle('hide')
    playerInputButton.classList.toggle('hide')
    playerInputBox.focus()
}

function repairMenu() {
        repairs++
        if(ussSchwartzenegger.hull < 16) {
            ussSchwartzenegger.hull += 5
        } else {
            ussSchwartzenegger.hull = 20
        }
        ussSchwartzenegger.firepower *= 0.8
        gameText.innerText = `Welcome back to Starbase One commander. We have repaired your ship and adjusted your weapons output so that you will have enough energy to finish those wretched invaders! You now have ${ussSchwartzenegger.hull} hull points remaining.  Godspeed!`
        setTimeout(() => {
            showHideYesNoButtons()
            gameText.innerText = "Are you prepared to face the alien threat?"
        }, 10000)
}

// define event handlers and listeners

function yesButtonHandler() {
    showHideYesNoButtons()
    showHideAttackButton()
    gameText.innerText = `The ${shipNumber + 1}${numberDecoration[shipNumber]} enemy ship approaches. Time to attack!`
}

function noButtonHandler() {
    showHideYesNoButtons()
    showHideReplayButton()
    gameText.innerHTML = `Alas, Earth's last remaining hero has fled the battlefield along with any hope of survival.  The human race is now extinct!<br><br><span class="game-over">GAME OVER</span>`
}

function inputBoxHandler(e) {
    if(e.key === "Enter") {
        playerInputButton.click()
    }
}

function inputButtonHandler() {
    playerResponse = playerInputBox.value
    playerInputBox.value = ''

    switch(playerResponse){
        case 'no':
        case 'No':
        case 'n':
        case 'N':
        case 'fight':
        case 'Fight':
            showHidePlayerInput()
            showHideAttackButton()
            gameText.innerText = `The ${shipNumber + 1}${numberDecoration[shipNumber]} enemy ship approaches. Time to attack!`
            break

        case 'retreat':
        case 'Retreat':
            if(repairs == 0){
                showHidePlayerInput()
                repairMenu()
            } else {
                gameText.innerText = "WARNING: If you retreat a second time, the aliens will decide that you have given up on the defense and attack the planet directly! Are you sure you want to retreat?"
            }
            break

        case 'yes':
        case 'Yes':
        case 'y':
        case 'Y':
            showHidePlayerInput()
            showHideReplayButton()
            gameText.innerHTML = `In a stunning display of cowardice, our hero has decided to flee the battlefield. With no one left to stop them, the aliens press forward and decimate our once beautiful home. The atmosphere ignites and all life within perishes in an instant. The last human alive drifts through space reflecting on what might have been, until at long last the ship's life support fails and cruel reality fades to black.<br><br><span class="game-over">GAME OVER</span>`
            break

        default:
            gameText.innerText = "Sorry commander?  I didn't catch that."
            setTimeout(() => gameText.innerText = `You have destroyed one of the invaders! You currently have ${ussSchwartzenegger.hull} hull points remaining, and there are ${6-shipNumber} alien ships still to fight.  You may return to base one time to conduct minor repairs, however doing so will deplete your power cells and force you to set your blasters to 80% of full power for the remainder of the battle. Do you wish to continue the fight or will you retreat and regroup? Enter 'Fight' to continue, or 'Retreat' to dock for repairs.`, delay)
    }
}

function attackButtonHandler() {
    showHideAttackButton()
    
    // ussSchwartzenegger turn
    if (ussSchwartzenegger.attack()) {
        setTimeout(() => alienFleet[shipNumber].gotHit(ussSchwartzenegger.firepower), delay)
    }
    
    // alien turn
    setTimeout(() => {
        if(alienFleet[shipNumber].hull > 0) {
            if(alienFleet[shipNumber].attack()) {
                setTimeout(() => ussSchwartzenegger.gotHit(alienFleet[shipNumber].firepower), delay)
            }
            showHideAttackButton()
        } else if(shipNumber < 5){
            setTimeout(() => {
                shipNumber++
                showHidePlayerInput()
                if(repairs == 0) {
                    gameText.innerText = `You have destroyed one of the invaders! You currently have ${ussSchwartzenegger.hull} hull points remaining, and there are ${6-shipNumber} alien ships still to fight.  You may return to base one time to conduct minor repairs, however doing so will deplete your power cells and force you to set your blasters to 80% of full power for the remainder of the battle. Do you wish to continue the fight or will you retreat and regroup? Enter 'Fight' to continue, or 'Retreat' to dock for repairs.`
                } else {
                    gameText.innerText = `You have destroyed one of the invaders! You currently have ${ussSchwartzenegger.hull} hull points remaining, and there are ${6-shipNumber} alien ships still to fight. Do you wish to continue the fight or will you flee the battle? Enter 'Fight' to continue, or 'Retreat' to run away.`
                }
            }, delay)
        } else setTimeout(() => {
            showHideReplayButton()
            gameText.innerHTML = `You have done it!! Agains all odds you have driven back the alien horde and saved the planet from extraterrestrial wrath! You head home to receive a hero's welcome as world leaders gather to honor your great accomplishment this day. In the years to come, your name will be remembered foremost on the list of humanities greatest champions.<br><br><span class="game-over">YOU WIN!!</span>`
        }, delay)
    }, delay)
    
}

function attackButtonKeypressHandler(e) {
    if(e.key === "Enter") {
        attackButton.click()
    }
}

function replayButtonHandler() {
    location.reload()
}

yesButton.addEventListener('click', yesButtonHandler)
noButton.addEventListener('click', noButtonHandler)
playerInputButton.addEventListener('click', inputButtonHandler)
playerInputBox.addEventListener('keypress', inputBoxHandler)
attackButton.addEventListener('click', attackButtonHandler)
window.addEventListener('keypress', attackButtonKeypressHandler)
replayButton.addEventListener('click', replayButtonHandler)


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

    attack = function () {  // calculates hit based on accuracy, returns true if attack hits and false if it misses
        if(Math.random() < this.accuracy) {
            gameText.innerText = `The vile alien attacks with deadly precision, dealing ${this.firepower} damage to Earth's last hope!`
            return true
        } else {
            gameText.innerText = `The alien fires on you, but the fool's shot misses! It appears that skill in combat is an earthly trait.`
            return false
        }
    }
    gotHit = function (enemyPower) {  // applies damage from an attack and checks to see if dead
        this.hull -= enemyPower
        if(this.hull <= 0) {
            gameText.innerText = `The enemy explodes in a brilliant ball of fire and scrap metal!`
        }
    }
}

class Schwartzenegger extends Ship {
    constructor(hull, firepower, accuracy) {
        super(hull, firepower, accuracy)
    }

    attack = function () {  // calculates hit based on accuracy, returns true if attack hits and false if it misses
        if(Math.random() < this.accuracy) {
            gameText.innerText = `You fire upon your hated enemy and score a direct hit, dealing ${this.firepower} damage!!`
            return true
        } else {
            gameText.innerText = `You fire your blasters but your shot goes wide! It would seem that luck does not favor you this day.`
            return false
        }
    }
    gotHit = function (enemyPower) {  // applies damage from an attack and checks to see if dead
        this.hull -= enemyPower
        if(this.hull <=0) {
            showHideAttackButton()
            showHideReplayButton()
            gameText.innerText = 'This is the end, your ship breaks up around you as alien lasers pierce your hull! The remaining invaders charge through the debris cloud that was the USSSchwartzenegger, and speed toward a defensless planet! The desperate citizens of Earth can only cower in fear as enemy weapons rain down fire from above, superheating the atmosphere and scouring all life from the globe.<br><br><span class="game-over">GAME OVER</span>'
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
// console.log(alienFleet)

const alienDivArray = []

for(let i=0; i < alienFleet.length; i++ ) {
    let div = document.createElement('div')
    div.classList.add(`alien${i + 1}`)
    background.appendChild(div)
    alienDivArray.push(div)
}

// generate ussSchwartzenegger

const ussSchwartzenegger = new Schwartzenegger(20, 5, .7)
// console.log(ussSchwartzenegger)