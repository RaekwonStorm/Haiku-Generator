var fs = require('fs');
var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file) {
    return fs.readFileSync(file).toString();
}

function formatData(data) {
    var myObj = {}
    var lines = data.toString().split("\n"),
        lineSplit
    lines.forEach(function(line) {
        var counter = 0;

        // loop to determine syllable count per word
        for (var i = 0; i < line.length; i++) {
            if (line[i].search(/\d/) !== -1) {
                counter++;
            }
        }

        // added number of syllables to end of the line,
        // then split into word, phoneme, and syllable count
        var lineSyllables = line + "  " + counter.toString();
        lineSplit = lineSyllables.split("  ");

        // this removes (n) suffix from duplicate words
        if (lineSplit[0].search(/\(/) !== -1) {
          lineSplit[0] = lineSplit[0].substring(0,lineSplit[0].indexOf("("));
        }

        // if the object has no key representing a word's syllable
        // count, make one and add the word. Otherwise add the word.
        if (myObj[counter] !== undefined) {
            myObj[counter].push(lineSplit[0]);
        } else {
          myObj[counter] = [lineSplit[0]]
        }
    });
    return myObj; //function returns the object full of syllable: word pairs
}

// instead of syllableArr, I created an object and stored it in this variable
var sylDictionary = formatData(cmudictFile);

// function that provides a random word of a given syllable count
function randomWord (sylCount) {
  return sylDictionary[sylCount][Math.floor(Math.random()*Object.keys(sylDictionary[sylCount]).length)]
}

// when invoked with the structure of the haiku in an array
// produces a haiku with the specified structure
// i.e. [[5],[7],[5]] or [[2,1,2], [3,4], [5]] etc;
function createHaiku(structure) {
  structure.forEach(function (array) {
    var lineArr = []
    for (var i = 0; i < array.length; i++) {
      lineArr.push(randomWord(array[i]));
    }
    var newLine = lineArr.join(" ");
    console.log(newLine);
  })
}

module.exports = {
    createHaiku: createHaiku,
};
