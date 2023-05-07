//Random Quotes Api URL
const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100";
const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");
let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;

//Display random quotes
const renderNewQuote = async () => {
  //Fetch contents from url
  const response = await fetch(quoteApiUrl);

  //Store response
  let data = await response.json();

  //Access quote
  quote = 'ང་བོད་ལ་འགྲོ་རྒྱུ་ཡིན་པའི་ཅ་ལག་འཁྱེར་དགོས་ཡོད་ན་ལབ་རོགས་གནང་།';
  console.log(quote) 

  //Array of characters in the quote
  let arr = quote.split("").map((value) => {
    //wrap the characters in a span tag
    return "<span class='quote-chars'>" + value + "</span>";
  });
  //join array for displaying
  quoteSection.innerHTML += arr.join("");
};

//Logic for comparing input words with quote


//Update Timer on screen
function updateTimer() {
  if (time == 0) {
    //End test if timer reaches 0
    displayResult();
  } else {
    document.getElementById("timer").innerText = --time + "s";
  }
}

//Sets timer
const timeReduce = () => {
  time = 60;
  timer = setInterval(updateTimer, 1000);
};

const append_array = (arr, str, n) => {
    const repeatedStr = new Array(n).fill(str);

  // Append the new array to the original array
  const newArr = arr.concat(repeatedStr);

  return newArr;

};

const get_accuracy = (userInputChars, quoteChars) => {
    const maxLength = Math.max(userInputChars.length, quoteChars.length);
    const quote_length = quoteChars.length
    const input_length = userInputChars.length
    if (quote_length > input_length) {
        no_of_extra_string = quote_length - input_length
        userInputChars = append_array(userInputChars, "", no_of_extra_string)
        console.log(userInputChars)
    } else if (quote_length < input_length) {
        no_of_extra_string =  input_length - quote_length
        quoteChars = append_array(quoteChars, "", no_of_extra_string)
    }

    // Count the number of matching characters
    let count = 0;
    for (let i = 0; i < maxLength; i++) {
        if (userInputChars[i] === quoteChars[i]) {
        count++;
        }
    }
    console.log(count)
    // Calculate the similarity as a percentage
    const similarity = (count / maxLength) * 100;

    return similarity;

};

//End Test
const displayResult = () => {
  //display result div
  userInputChars = userInput.value.split("")
  quoteChars = quote.split("")
  console.log(userInputChars)
  console.log(quoteChars)
  document.querySelector(".result").style.display = "block";
  clearInterval(timer);
  document.getElementById("stop-test").style.display = "none";
  userInput.disabled = true;
  let timeTaken = 1;
  if (time != 0) {
    timeTaken = (60 - time) / 100;
  }
  document.getElementById("wpm").innerText =
    (userInput.value.length / 5 / timeTaken).toFixed(2) + " wpm";
  accuracy = get_accuracy(userInputChars, quoteChars )
  document.getElementById("accuracy").innerText = accuracy;

    console.log(userInput.value)
};

//Start Test
const startTest = () => {
  mistakes = 0;
  timer = "";
  userInput.disabled = false;
  timeReduce();
  document.getElementById("start-test").style.display = "none";
  document.getElementById("stop-test").style.display = "block";
};

window.onload = () => {
  userInput.value = "";
  document.getElementById("start-test").style.display = "block";
  document.getElementById("stop-test").style.display = "none";
  userInput.disabled = true;
  renderNewQuote();
};