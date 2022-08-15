
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Get quotes from API
let apiQuotes = [];
// let apiQuote = {};

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function Complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//Show New Quote
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // Check if Author field is blank, replace with Unknown
    if(quote.author === null){
        authorText.textContent = 'Unknown';
    }else authorText.textContent = quote.author;

    // Check quote length to determine the stling
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    } else quoteText.classList.remove('long-quote');
    quoteText.textContent = quote.text;
    
    Complete();
}

async function getQuotes() {
    loading();
    // const proxUrl = 'https://cors-anywhere.herokuapp.com/';
    // const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // const response = await fetch(proxUrl + apiUrl);
        // apiQuote = await response.json();        
        newQuote();
    } catch (error) {
        alert("couldn't fetch a quote today");
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuotes();