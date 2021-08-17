'use strict';

// Selecting the elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0'); //score of player 1
const score1El = document.getElementById('score--1'); //score of player 1 //another way to get the elements using getElementById

const diceEl = document.querySelector('.dice'); //dice image
const btnNew = document.querySelector('.btn--new');//new game button for the reset
const btnRoll = document.querySelector('.btn--roll');//roll button 
const btnHold = document.querySelector('.btn--hold');//hold button

const current0El = document.getElementById('current--0'); //current score of player 1
const current1El = document.getElementById('current--1'); //current score of player 2

let scores, currentScore, activePlayer, isPlaying ;

const init = function(){

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner'); 

    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');

    diceEl.classList.add('hidden');

    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    isPlaying = true;

};

init();

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent =0; 
    activePlayer = (activePlayer===0) ? 1 : 0;
    currentScore = 0;  
    player0El.classList.toggle('player--active'); 
    player1El.classList.toggle('player--active');     
}

btnRoll.addEventListener('click', function(){

    if(isPlaying)
    {
        //1. Generating a random number.
        //2. Display the number
        //3. Check if number ===1, if yes then switch the player. Else continue for the next round for rolling the dice
        const diceNumber = Math.trunc(Math.random() * 6)+1;
        diceEl.classList.remove('hidden');
        diceEl.src = `/images/dice-${diceNumber}.png`; 

        if(diceNumber !== 1 )
        {
        currentScore += diceNumber;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;  
        }

        else //switch to next player
        {
        switchPlayer();
        }    
    }
});

btnHold.addEventListener('click', function(){

   if(isPlaying)
   {
        //1. add the current score to the active player's score;
        scores[activePlayer] += currentScore;
        //similar to scores[0 or 1] = scores[0 or 1] + currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];   

        //2. check if score>=100, if yes finish the game
        if(scores[activePlayer]>= 100)
        {
            isPlaying = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
        }

        //3. Else switch the player
        else
        {
        switchPlayer();
        }
   }

});

btnNew.addEventListener('click',function(){
        init();
});


