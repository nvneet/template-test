// Get quotes from API
let apiQuotes = [];

//Show New Quote
function newQuote() {
    // ick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote);
}

async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        //console.log(apiQuotes[12]);
    } catch (error) {
        alert("couldn't fetch a quote today");
    }
}

//On Load
getQuotes();