var repoList = document.querySelector('ul');
var fetchButton = document.getElementById('fetch-button');
var drinkButton = document.getElementById("modal-drink")

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("modal-drink");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function byID(id) {
  return document.getElementById(id);
}

byID("toggle").onclick = function() {
  if (byID("container").classList.contains("closed")) {
    byID("container").classList.remove("closed");
  } else {
    byID("container").classList.add("closed");
  }
}

drinkButton.addEventListener("click",function(e){
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("NETWORK RESPONSE NOT OK");
    }
  })
  .then(function (data) {   
    console.log(data); 
    displayCocktail(data);
  })
  .catch((error) => {
    console.error("FETCH ERROR:", error);
  });
  
})


  function displayCocktail(data) {
    const cocktail = data.drinks[0];
    const cocktailDiv = document.getElementById("cocktail");
    cocktailDiv.innerHTML="";
    const cocktailName = cocktail.strDrink;
    const heading = document.createElement("h1");
    heading.innerHTML = cocktailName;
    cocktailDiv.appendChild(heading);
  
    const cocktailImg = document.createElement("img");
    cocktailImg.src = cocktail.strDrinkThumb;
    cocktailDiv.appendChild(cocktailImg);
    modal.style.backgroundImage = "url('" + cocktail.strDrinkThumb + "')";
  
    const cocktailIngredients = document.createElement("ul");
    cocktailDiv.appendChild(cocktailIngredients);
  
    const getIngredients = Object.keys(cocktail)
      .filter(function (ingredient) {
        return ingredient.indexOf("strIngredient") == 0;
      })
      .reduce(function (ingredients, ingredient) {
        if (cocktail[ingredient] != null) {
          ingredients[ingredient] = cocktail[ingredient];
        }
        return ingredients;
      }, {});
  
    for (let key in getIngredients) {
      let value = getIngredients[key];
      listItem = document.createElement("li");
      listItem.innerHTML = value;
      cocktailIngredients.appendChild(listItem);
  }

  }
/*Variables*/
var quizBody = document.getElementById("quiz");
var container = document.getElementById('question-block');
var question = document.getElementById('question-text');
var opt1 = document.getElementById('a');
var opt2 = document.getElementById('b');
var opt3 = document.getElementById('c');
var opt4 = document.getElementById('d');
//var nextButton = document.getElementById('nextButton');

//Start quiz function, need to prvent default
var startQuizButton = document.getElementById("startQuizButton");
var startQuizDiv = document.getElementById("startpage");

/*
Number of questions: 
Min - 1
max - 50
*/

//Quiz variables
var categories = document.getElementById("stacked-categories")
var difficulty = document.getElementById("stacked-difficulty")
//var numQuest = document.getElementById("field-questions")
console.log(categories.value)
console.log(difficulty.value)

//Function for start quiz and get appropriate menu selections
function startQuiz(){

  if (categories.value === "General Knowledge") {
        categories = "9"
    
  } else if 
      (categories.value === "Film") {
        categories = "11"
      } else if 
      (categories.value === "Music") {
        categories = "12" 
      } else if 
      (categories.value === "TV") {
        categories = "14"
      } else if 
      (categories.value === "Videogames") {
        categories = "15"
      } else {
      (categories.value === "Sports") 
        categories = "21"
      }
      console.log("https://opentdb.com/api.php?amount=25&category=" + categories + "&difficulty=" + difficulty.value.toLowerCase() + "&type=multiple")
 
  //Quiz api fetch 
   fetch("https://opentdb.com/api.php?amount=5&category=" + categories + "&difficulty=" + difficulty.value.toLowerCase() + "&type=multiple")
  
  //populate the quiz block with the category and questions 
 .then(res => {
     return res.json();
   })
   .then(data => {
     console.log(data);
     for (let i = 0; i < data.results.length; i++) {
       question.textContent = data.results[i].question
       opt1.innerHTML = "A: " + data.results[i].correct_answer;
       opt2.innerHTML = "B: " + data.results[i].incorrect_answers[0];
       opt3.innerHTML = "C: " + data.results[i].incorrect_answers[1];
       opt4.innerHTML = "D: " + data.results[i].incorrect_answers[2];
    };
       
     })
  startQuizDiv.style.display = "none";
  quizBody.style.display = "block";
}

//START QUIZ
startQuizButton.addEventListener("click",function(event) {
event.preventDefault()
startQuiz()
});
    