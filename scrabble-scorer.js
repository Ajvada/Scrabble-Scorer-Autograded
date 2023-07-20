// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //



function initialPrompt() { 
   let word = input.question("Let's play some scrabble! Enter a word:"); 
   return word
};

let simpleScorer = function (word) { 
word = word.toLowerCase();
let letterPoints = word.length;

// for (let i = 0; i < word.length; i++) {
//    letterPoints += 1; 
// } 
return letterPoints;
};

let vowelBonusScorer = function (word){
   let vowels = "aeiou"; 
   word = word.toLowerCase();
   let letterPoints = 0;
  for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])){
        letterPoints += 3; 
      } else {
        letterPoints += 1;
      }
   } 
  return letterPoints;
};

 let scrabbleScorer = function (word) {
   word = word.toLowerCase();
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
 
      for (const pointValue in newPointStructure ) {
  
        if (pointValue.includes(word[i])) {
          letterPoints += newPointStructure[pointValue]
        }
  
      }
    }
    return letterPoints;
  }



const scoringAlgorithms = [{
   name: "simple score", 
   description: "Each letter is worth 1 point", 
   scorerFunction: simpleScorer
}, 
{ name: "Bonus Vowels", 
description: "Vowels are 3 pts,consonants are 1 pt.", 
scorerFunction: vowelBonusScorer
},
{name: "Scrabble", 
description: "The traditional scoring algorithm.", 
scorerFunction: scrabbleScorer
}];

function scorerPrompt() { 
   let num = Number(input.question( ` Which scoring algorithm would you like to use?\n
   0 - Simple: One point per character\n
   1 - Vowel Bonus: Vowels are worth 3 points\n
   2 - Scrabble: Uses scrabble point system\n
   Enter 0, 1, or 2: `)); 

   
   let scorer;
   if (num === 0) {
      scorer = scoringAlgorithms[0].scorerFunction;
   } else if (num === 1) {
      scorer = scoringAlgorithms[1].scorerFunction;
   } else if (num === 2) {
      scorer = scoringAlgorithms[2].scorerFunction;
   } 
   return scorer;
}

function transform(n) {
   let points = {}
   for (const key in n){
       
      for (let i = 0; i < n[key].length; i++) {
         
         points[n[key][i].toLowerCase()] = Number(key)
         
      }
   }  
   return points;
} 

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   let word = initialPrompt(); 
   let score = scorerPrompt();
   console.log(score(word));
   // initialPrompt(); 
   // scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
