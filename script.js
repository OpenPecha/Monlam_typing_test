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
  // const response = await fetch(quoteApiUrl);

  // //Store response
  // let data = await response.json();

  //Access quote
  quote = 'དུས་རྒྱུན་དུ་ང་ཚོས་སྒེར་གྱི་གནས་ཚད་ཅིག་གི་ཐོག་ནས་སྲོག་ཆགས་གཞན་དང་ང་ཚོའི་བར་གྱི་ཁྱད་པར་འཚོལ་ཞིབ་བྱེད་བཞིན་ཡོད། ང་ཚོས་རང་ཉིད་དང་། རང་ཉིད་ཀྱི་གཟུགས་ཕུང། རང་ཉིད་ཀྱི་ཀླད་པ་བཅས་ལ་དམིགས་བསལ་གྱི་ཁྱད་པར་ཞིག་ཡོད་པར་ཡིད་ཆེས་བྱེད་འདོད་ཡོད་ལ། དེ་ལ་བརྟེན་ནས་རང་ཉིད་ནི་ཁྱི་དང་། ཕག ཡང་ན། སྤྲ་ནག་སོགས་ལས་ཀྱང་ཁྱད་དུ་འཕགས་པ་ཞིག་ཏུ་འགྱུར་དུ་བཅུག་པ་རེད། འོན་ཀྱང་། སྒེར་བའི་གནས་ཚད་ཅིག་གི་ཐོག་ནས་བརྗོད་ན་དོན་དངོས་ནི་ང་དང་སྤྲ་ནག་གཉིས་འདྲ་མཚུངས་ཡིན་པས་ངོ་ཚ་དགོས་པ་ཞིག་སྟེ། གལ་ཏེ་ཁྱོད་ཀྱིས་ང་དང་སྤྲ་ནག་གཉིས་ཁྲིད་ནས་གླིང་ཕྲན་ཆུང་ཆུང་ཞིག་གི་ནང་དུ་གཅིག་པུར་བཞག་སྟེ། ངེད་གཉིས་ཀྱིས་རང་གི་འཚོ་གནས་ཀྱི་ཆེད་དུ་ཧུར་བརྩོན་བྱས་ཏེ་འཚོ་བ་ལེགས་པར་རོལ་མཁན་དེ་སུ་ཡིན་མིན་ལ་བལྟ་རྒྱུ་ཡིན་ན། ངས་ཐེ་ཚོམ་མེད་པར་སྤྲ་ནག་གི་ཐོག་ཏུ་རྒྱན་འཇོག་རྒྱུ་ལས་རང་ཉིད་ཀྱི་ཐོག་ཏུ་རྒྱན་འཇོག་རྒྱུ་མིན། འོན་ཀྱང་། འདི་ནི་ང་རང་སྒེར་ངོས་ཀྱི་ནོར་འཁྲུལ་ཞིག་མ་ཡིན། ངས་ཚོད་དཔག་ཅིག་བྱས་ན། གལ་ཏེ་ཁོ་ཚོས་ཕལ་ཆེར་ཁྱེད་ཚོའི་ཁྲོད་ནས་མི་ཞིག་ཁྲིད་ནས་གླིང་ཕྲན་ཞིག་ཏུ་སྤྲ་ནག་ཅིག་དང་ལྷན་དུ་གཅིག་པུར་བཞག་པ་ཡིན་ན། སྤྲ་ནག་གིས་མི་དེ་ལས་ཀྱང་འཚོ་བ་ལེགས་པར་རོལ་ཐུབ།';
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