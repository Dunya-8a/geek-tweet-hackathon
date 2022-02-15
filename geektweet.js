// Global variable - Twitter handle given by user
let twitterHandle;
let geekLanguage = {};

// Options for Twitter fetch
let options = {
  method: 'GET',
  url: `https://twitterfetch.p.rapidapi.com/user/${twitterHandle}`,
  headers: {
    'x-rapidapi-host': 'twitterfetch.p.rapidapi.com',
    'x-rapidapi-key': 'c57aa34a4cmsh350eee77833cf06p13ae59jsn54d62abfa700'
  }
};

// Create html for tweet with DOM manipulation
function createTweet(translatedTweet, originalTweet) {
    const tweetBox = document.createElement('div');
    tweetBox.classList.add("tweets__box");

    const translTweet = document.createElement('p');
    translTweet.classList.add("tweets__translated");
    translTweet.innerHTML = translatedTweet;

    const origTweet = document.createElement('p');
    origTweet.classList.add("tweets__original");
    origTweet.innerHTML = originalTweet;

    tweetBox.append(translTweet, origTweet);
    
    document.querySelector(".tweets__container").append(tweetBox);
}

// Translate tweet using funtranslations API
function translateTweet(origText, language) {
    let translateAPI;
    let tweetPromise;
    switch (language) {
        case "klingon":
            translateAPI = `https://api.funtranslations.com/translate/klingon.json?text=${origText}`;
            tweetPromise = axios.get(translateAPI);
            break;
        case "vulcan":
            translateAPI = `https://api.funtranslations.com/translate/vulcan.json?text=${origText}`;
            tweetPromise = axios.get(translateAPI);
            break;
        case "yoda":
            translateAPI = `https://api.funtranslations.com/translate/yoda.json?text=${origText}`;
            tweetPromise = axios.get(translateAPI);
            break;
        case "mandalorian":
            translateAPI = `https://api.funtranslations.com/translate/mandalorian.json?text=${origText}`;
            tweetPromise = axios.get(translateAPI);
            break;
        case "valyrian":
            translateAPI = `https://api.funtranslations.com/translate/valyrian.json?text=${origText}`;
            tweetPromise = axios.get(translateAPI);
            break;
        case "dothraki":
            translateAPI = `https://api.funtranslations.com/translate/dothraki.json?text=${origText}`;
            tweetPromise = axios.get(translateAPI);
            break;
        case "minion":
            translateAPI = `https://api.funtranslations.com/translate/minion.json?text=${origText}`;
            tweetPromise = axios.get(translateAPI);
            break;
        default: // minion
            translateAPI = `https://api.funtranslations.com/translate/minion.json?text=${origText}`;
            tweetPromise = axios.get(translateAPI);
    }

    tweetPromise.then((result) => {
        // console.log(result);
        let translated = result.data.contents.translated;
        let original = result.data.contents.text;
        console.log(translated, original);
        createTweet(translated, original);
    })
    .catch(err => {
        console.log("Oops something went wrong with the translation. You may be out of free trials for the hour. (Try using a VPN and seeting it to a different location.)");
    })
}

let getTweet = () => {
    axios
        .request(options)
        .then((response) => {
            let latestTweets = response.data.tweets;
            // console.log(response.data.tweets);
            latestTweets.forEach(tweet => {
                let tweetText = tweet.text;
                translateTweet(tweetText, geekLanguage.language)

                // I tried this function to introduce some delay but it just ends up throwing errors
                // setTimeout(() => translateTweet(tweetText, geekLanguage), 1500)
            });
        })
        .catch ((error) => {
            alert("Could not find Twitter handle")
        })
};


// Submit taking in the users' choices
const formSubmit = document.getElementById("tweets__form");
formSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    // Change the global variable, which will change the GET URL for axios
    // It does not work!! Ask again about scope of variables
    // console.log(e.target.tweetmaster.value);
    twitterHandle = e.target.tweetmaster.value;
    // Also change the global variable, with the value from the drop-down list
    geekLanguage.language = e.target.tweetlanguage.value;

    options.url = `https://twitterfetch.p.rapidapi.com/user/${twitterHandle}`;

    getTweet();
})



// Tests
// createTweet("hello translated", "hello original");
// getTweet();
// translateTweet("Who do you work for? They are going to terminate you.", "yoda");

