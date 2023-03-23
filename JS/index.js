'use strict';
window.addEventListener('DOMContentLoaded', function () {
    let monsters = [
        'monster1',
        'monster2',
        'monster3',
        'monster4',
        'monster5',
        'monster6',
        'monster7',
        'monster8',
        'monster9',
        'monster10',
        'monster11',
        'sock'
    ];
    let monsterCount = 0; //for mantaining how many monsters are found.
    let gameFinished = false; //It will toggle to true if sock is found
    let shuffled //shuffled monster and sock array list.
    // shuffling monster array
    function shuffleMethods(monsters) {
        shuffled = monsters
            .map(value => ({
                value,
                sort: Math.random()
            }))
            .sort((a, b) => a.sort - b.sort)
            .map(({
                value
            }) => value)
        console.log(shuffled);
    }
    // called shuffle methods
    shuffleMethods(monsters);
    let parentEle = document.querySelector('.row');
    let doors, img;
    while (parentEle.firstChild) {
        parentEle.removeChild(parentEle.firstChild);
    }
    for (let i = 0; i < monsters.length; i++) {
        doors = document.createElement('div');
        img = document.createElement('img');
        doors.classList.add('grid');
        img.src = 'images/door.svg';
        img.alt = 'door';
        doors.appendChild(img);
        parentEle.appendChild(doors);
    }
    parentEle.childNodes.forEach((door, index) => {
        door.addEventListener('click', function () {
            if (gameFinished) {
                return;
            }
            this.querySelector('img').setAttribute('src', `./images/${shuffled[index]}.svg`);
            if (this.querySelector('img').getAttribute('src').search('/sock.svg') > 0) {
                endGame("You found the sock! You lose!")
            } else {
                monsterCount++;
                if (monsterCount == monsters.length - 1) {
                    endGame("Congratulations !!! You found all the monsters! You win!")
                }
            }
        })
    });


    //End game method for opening popup and displaying the result message.
    function endGame(message) {
        let popup = document.createElement('div')
        let overlay = document.createElement('div');
        let result = document.createElement('p')
        let playAgainBtn = document.createElement('button');
        popup.classList.add('result-popup');
        overlay.classList.add('overlay');
        result.classList.add('result');
        result.textContent = message;
        playAgainBtn.classList.add('start');
        playAgainBtn.textContent = 'Play Again';
        popup.appendChild(result);
        popup.appendChild(playAgainBtn);
        gameFinished = true;
        parentEle.insertAdjacentElement("afterend", popup);
        popup.insertAdjacentElement("afterend", overlay);
        playAgainBtn.addEventListener('click', function () {
            parentEle.parentNode.removeChild(popup)
            parentEle.parentNode.removeChild(overlay)
            gameFinished = false;
            monsterCount = 0;
            parentEle.childNodes.forEach((door) => {
                door.querySelectorAll('img')[0].setAttribute('src', './images/door.svg');
            });
            shuffleMethods(monsters);
        })
    }
    // restart game method and resetting game state.

    document.querySelectorAll('.start').forEach((start) => {
        start.addEventListener('click', function () {
            parentEle.childNodes.forEach((door) => {
                door.querySelectorAll('img')[0].setAttribute('src', './images/door.svg');
            });
            gameFinished = false;
            monsterCount = 0;
            resultPopup.classList.remove('open');
            overlay.classList.remove('open');
            result.style.display = 'none';
            shuffleMethods(monsters);
        })
    })
})