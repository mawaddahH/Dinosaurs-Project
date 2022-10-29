/**
 * @description generate a Dino Constructor
 * @param {string} species
 * @param {number} weight
 * @param {number} height
 * @param {string} diet
 * @param {string} where
 * @param {string} when
 * @param {string} fact
 */
function Dino(species, weight, height, diet, where, when, fact) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
  this.image = 'images/' + species.toLowerCase() + '.png';
}


/**
 * @description Fetch data from Dino JSON file
 * @returns Promise contains array of Dinosaurs
 * 
 */
function getDinosData() {
  return fetch("dino.json")
    .then((res) => res.json())
    .then((res) => {
      data = res["Dinos"];
      let dino_array = [];

      for (let i = 0; i < data.length; i++) {
        dino_array.push(new Dino(data[i].species,
          data[i].weight,
          data[i].height,
          data[i].diet,
          data[i].where,
          data[i].when,
          data[i].fact));
      }
      return dino_array;
    })
    .catch((error) => {
      console.error("Fetch problem show: " + error.message)
    }
    );
}

/**
 * @description Create Human constructor
 * @param {string} name
 * @param {number} height
 * @param {number} weight
 * @param {string} diet
 * 
 */
function Human(name, height, weight, diet) {
  this.species = name;
  this.height = height;
  this.weight = weight;
  this.diet = diet;
  this.image = 'images/' + 'human.png';
}

/**
 * @description Use IIFE to get human data from form
 * @returns new Human object 
 * 
 */
function getHumanData() {
  nameInput = document.getElementById('name');
  feetInput = document.getElementById('feet');
  inchesInput = document.getElementById('inches');
  weightInput = document.getElementById('weight');
  dietInput = document.getElementById('diet');

  nameOutput = nameInput.value;
  heightOutput = parseInt(feetInput.value) * 12 + parseInt(inchesInput.value);
  weightOutput = weightInput.value;
  dietOutput = dietInput.value;

  return new Human(nameOutput, heightOutput, weightOutput, dietOutput);
};

// Create Dino Objects
let dinos = new Array();

// Create Human Objects
let human = new Object();


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 
Dino.prototype.compareWeight = function (HumanWeight) {
  const diff = Math.floor(this.weight - HumanWeight);
  if (diff > 0) {
    return `I was ${diff} lbs heavier than you`;
  }
  else {
    return `I was ${-1 * diff} lbs lighter than you`;
  }
};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareHeight = function (HumanHeight) {
  const diff = Math.trunc(this.height - HumanHeight);
  if (diff > 0) {
    return `I was ${diff} inches taller than you`;
  }
  else {
    return `I was ${-diff} inches shorter than you`;
  }
};


// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareDiet = function (HumanDiet) {
  if (HumanDiet === this.diet) {
    return `We share the same diet`;
  } else if (this.diet === "carnivor") {
    return `My diet is a ${this.diet}. You can become my meal. `;
  } else if (this.diet === "herbavor") {
    return `My diet is a ${this.diet}. You will not become my meal. `;
  } else {
    return `My diet is a ${this.diet}. I can eat anything`;
  }
};

// Create Dino Compare Method 4
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareSpecies = function (HumanName) {
  if (HumanName.length > this.species.length) {
    return `Your name has more letters than me`;
  } else if (HumanName.length < this.species.length) {
    return `My name ${this.species} has more letters than You`;
  } else {
    return `Our name have the SAME number of letters`;
  }
};



/**
 * @description sort items in Array randomlly
 * @returns Array
 * 
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


/**
 * @description check if the index contine spescfic item
 * @returns boolean
 * 
 */
function checkItem(array, item) {
  return array.some(a => a.toString().includes(item));
}


/**
 * @description Get random number from 1 to max
 * @returns randomly number between 1 - max
 * 
 */
function maxRandomNumb(max) {
  return 1 + Math.floor(Math.random() * Math.floor(max));
}


/**
 * @description check if the form is fiiled with valid data
 * @returns boolean and message alert
 * 
 */
function checkForm() {
  nameInput = document.getElementById('name').value;
  feetInput = document.getElementById('feet').value;
  inchesInput = document.getElementById('inches').value;
  weightInput = document.getElementById('weight').value;
  dietInput = document.getElementById('diet').value;

  let message = "";
  if (nameInput.length == 0 || feetInput.length == 0 || inchesInput == 0 || weightInput == 0 || dietInput == 0) {
    message = "All fields required\n";
    alert(message);
    return false;
  } else {
    let isValid = true;
    if (!(feetInput > 0 && feetInput <= 10)) {
      message = message + " - Your Feet must be between 0 to 10\n";
      isValid = false;
    }
    if (!(inchesInput > 0 && inchesInput <= 12)) {
      message = message + " - The Inches must be between 0 to 12\n"
      isValid = false;
    }
    if (!(weightInput > 0 && weightInput <= 1400)) {
      message = message + " - Your weight must be between 0 to 1400 lbs\n"
      isValid = false;
    }
    if (isValid == false) {
      alert(message);
      return false;
    }
    else {
      return true;
    }

  }

}

/**
 * @description check Form Is Valid when the user click on the button
 * 
 */
function checkFormIsValid() {
  if (checkForm()) {
    displayInfographic();
  }
  else {
    return
  }
}

/**
 * @description disply the infographic
 * 
 */
async function displayInfographic() {

  human = getHumanData();
  dinos = await getDinosData();
  dinos = shuffle(dinos);

  // add human to dinos array 
  dinos.splice(4, 0, human);

  // used to avoid duplicate unique number
  let tempArray = [];

  dinos.map((dino) => {

    //get main grid
    const grid = document.getElementById("grid");

    //create tile for dinosaurs
    const containerDiv = document.createElement("div");

    //change its class to grid-item to have the formatted css.
    containerDiv.classList.add("grid-item");

    //create h3 with the name of the object.
    const title = document.createElement("h3");


    //create the image element to add to the tile and set to the object's image.
    const img = document.createElement("img");
    img.src = dino.image;

    //create paragraph and set the text to the object's fact.
    const fact = document.createElement("p");

    if (dino.species === human.species) {
      title.innerHTML = human.species;

    } else if (dino.species === "Pigeon") {
      title.innerHTML = dino.species;
      fact.innerHTML = "All birds are Dinosaurs";
    } else {
      title.innerHTML = dino.species;
      fact.innerHTML = (_ => {
        let result = "";

        // Generate a 'unique' random number to choose fact from switch
        let randomise = maxRandomNumb(7);
        while (checkItem(tempArray, randomise)) {
          // console.log("I'm in while randomise", randomise);
          randomise = maxRandomNumb(7);
        }
        tempArray.push(randomise);
        // console.log("I'm in randomise", randomise);
        // console.log("I'm in tempArray", tempArray);

        switch (randomise) {
          case 1:
            result = `I lived in what is now ${dino.where}.`;
            break;
          case 2:
            result = `I was found in the ${dino.when}.`;
            break;
          case 3:
            result = dino.compareSpecies(human.species);
            break;
          case 4:
            result = dino.compareWeight(human.weight);
            break;
          case 5:
            result = dino.compareHeight(human.height);
            break;
          case 6:
            result = dino.compareDiet(human.diet);
            break;
          default:
            result = dino.fact;
            break;
        }
        return result;
      })();
    }

    // Add tiles to DOM
    containerDiv.appendChild(title);
    containerDiv.appendChild(img);
    if (dino.species === human.species) {
      fact.remove();
    }
    else {
      containerDiv.appendChild(fact);
    }
    grid.appendChild(containerDiv);
    return grid;
  });

  // Remove form from screen
  const form = document.getElementById("dino-compare");
  form.remove();

}

// On button click, prepare and display infographic
const submitBtn = document.querySelector("#btn");
submitBtn.addEventListener("click", checkFormIsValid);
