const status = {
	ERROR: 'error',
	CORRECT: 'correct',
	FINISHED: 'finished'
};

const expectedPaths = [
	[0, 1, 2, 3, 4, 5, 11],
	[0, 6, 12, 13, 14],
	[0, 6, 7, 8, 14, 20]
];

var startsWith = (base, prefix) => {
	if (prefix.length <= base.length) {
		return Array.from(prefix.keys()).map(index => base[index] == prefix[index]).every(x => x);
	} else {
		return false;
	}
}

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
			setButtonTwoStates(index, "error", "nothing", 1000);
			break;
		case status.CORRECT:
			this.currentPath = tempPath;
			setButtonTwoStates(index, "good", "path", 2000);
			break;
		case status.FINISHED:
			setButtonTwoStates(index, "finished", "nothing", 2000);
			resetBoard(2000);
			if(this.remainingPaths.length > 0) {
				this.goToNextPath();
			}
			break;
		}
	}
}

let setButtonTwoStates= (index, state1, state2, timeout) => {
	((pion) => {
		pion.className = state1;
		window.setTimeout(() => { pion.className = state2; }, timeout);
	})(pions()[index]);
}

let resetBoard = (delay) => {
	window.setTimeout(() => { pions().forEach((pion) => { pion.className = "nothing"; }) }, delay);
}

let checkPath = (currentPath, wantedPath) => {
	if (startsWith(wantedPath, currentPath)) {
		if (currentPath.length == wantedPath.length) {
			return status.FINISHED;
		} else {
			return status.CORRECT;
		}
	} else {
		return status.ERROR;
	}
}

let displayer = (element) => {
	return (message) => {
		element.innerHTML = message;
	}
};

let pions = () => {
	return document.querySelectorAll("#Jeu button");
}

let activateGameButtons = (game) => {
	for (var i = 0, len = pions().length; i < len; i++) {
		((index) => {
			pions()[index].className = "nothing";
			pions()[index].addEventListener("click", function () {
				game.checkButton(index);
			})
		})(i);
	}
}


function main() {
	var display = displayer(document.querySelector("#StatutJeu"));
	var game = new Game(expectedPaths); 
	display("pour commencer le jeu, cliquez sur la case blanche");
	activateGameButtons(game);
}

main();
