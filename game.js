const status = {
  ERROR: 'error',
  CORRECT: 'correct',
  FINISHED: 'finished'
};

const expectedPaths = [
  [0, 1, 2, 3, 4, 5, 11],
  [],
  []
];

class Game {
  constructor(paths) {
    this.remainingPaths = paths;
    this.goToNextPath();
  }

  goToNextPath() {
    this.expectedPath = this.remainingPaths[0];
    this.currentPath = [];
    this.remainingPaths = this.remainingPaths.slice(1);
  }

  checkButton(index) {
    var tempPath = this.currentPath.concat([index]);
    var result = checkPath(tempPath, this.expectedPath);
    
    switch(result) {
      case status.ERROR:
        var pions = getPions();
        console.log(pions[index])
        pions[index].className = "error";
        break;
      case status.CORRECT:
        this.currentPath = tempPath;
        // TODO: changer couleur
        break;
      case status.FINISHED:
        if(this.remainingPaths.length > 0) {
          this.goToNextPath();
          // TODO: afficher numéro réussi
          // TODO: reset tableau
        }
        break;
    }
  }
}

let checkPath = (currentPath, wantedPath) => {
  if (wantedPath.slice(0, currentPath.length) == currentPath) {
    if (currentPath.length == wantedPath.length) {
      return status.FINISHED;
    } else {
      return status.CORRECT;
    }
  } else {
    return status.ERROR;
  }
}

function caseValide(button) {
  return button.innerHTML.length == 0;
}

function setSymbol(btn, symbole) {
  btn.style.backgroundColor = "#0099FF"
  btn.innerHTML = symbole;
}

function Pathfinding(pions, joueurs) {
  console.log(pions[11].style, pions[11])
  if (
    pions[11].innerHTML == joueurs &&
    pions[17].innerHTML == joueurs &&
    pions[23].innerHTML == joueurs
  ) {
    pions[11].style.backgroundColor = "#9ACD32";
    pions[17].style.backgroundColor = "#9ACD32";
    pions[23].style.backgroundColor = "#9ACD32";
    return true;
  }
}

var displayer = function (element) {
  var affichage = element;

  function setText(message) {
    affichage.innerHTML = message;
  }

  return {
    sendMessage: setText
  };
};

let getPions = () => {
  return document.querySelectorAll("#Jeu button");
}

let activateGameButtons = (game) => {
  var pions = getPions();

  for (var i = 0, len = pions.length; i < len; i++) {
      ((index) => {
		  pions[i].addEventListener("click", function () {
			  game.checkButton(index);
		  })
	  })(i);
  }
}

function main() {
  var joueurs = " ";
  var jeuEstFini = false;
  var display = new displayer(document.querySelector("#StatutJeu"));
  var game = new Game(expectedPaths); 
  display.sendMessage("pour commencer le jeu, cliquez sur la case blanche");
  activateGameButtons(game);
}


main();
