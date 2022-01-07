
/* Global Variables */
const apiKey = '&APPID=88b735a919700d20722b8abff9d335eb&units=imperial';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const dateHTML = document.getElementById('date');
const tempHTML = document.getElementById('temp');
const contentHTML = document.getElementById('content');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'.'+ d.getDate()+'.'+ d.getFullYear();
// Event listener for button
document.getElementById('generate').addEventListener('click', generateClicked);
// Callback func to button click event
function generateClicked(e){
    const zipCodeHTML = document.getElementById('zip').value;
    const feelingsHTML = document.getElementById('feelings').value; 
    checkWeather(baseURL, zipCodeHTML, apiKey)
    .then(function(data){
        
        postData('/postData', {temp: data.main.temp, date: newDate, content: feelingsHTML})
        updateHTML();
    })
}
// Creating URL and fetching data from API
const checkWeather = async (baseURL, zip, apiKey) => {
    const res = await fetch(baseURL+zip+apiKey)
    try {
        const data = await res.json();
        return data;
    } catch(err) {
        console.log('error is: '+err)
    }
}
// PostData to post to server
const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await res.json();
        return newData;
    }catch(err){
        console.log('the error is '+err)
    }
}
// UpdateHTML func to update HTML elements content
const updateHTML = async () => {
    const req = await fetch ('/getData');
    try{
        const siteData = await req.json();
        dateHTML.innerHTML = siteData.date;
        tempHTML.innerHTML = Math.round(siteData.temp) + ' degrees';
        contentHTML.innerHTML = siteData.content;
    }catch(err){
        console.log('error is '+err)
    }
}