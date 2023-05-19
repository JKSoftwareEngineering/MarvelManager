// note: there are two options here I can either use a lot of memory in the device to store all of the data
// this wont be a problem for a PC but might be a problem for mobile or i could call a search on each individual
// index that could potentially be hundreds of times but I have a max call number of 3000 per day on my API key
let favoritesList = [];
const storageName = "jk9927-330-datastore"
let storageInfo = localStorage.getItem(storageName).split("_=^");
let allComics = [];
let allNames = [];
let elementCardHolder;
let clearFavorites;
let timeNow = new Date().getTime();
let stageOne = "358a2e9675dc5787e6ac935b4148927ba59ce49d";
let stageTwo = "ad82b7af4505705a32a81d9ee89c4876";
let hash = md5(timeNow+stageOne+stageTwo);
let verification = `ts=${timeNow}&apikey=${stageTwo}&hash=${hash}`;
let myStatus;

function init()
{
    //https://gateway.marvel.com:443/v1/public/comics/  btn-clear-all
    elementCardHolder = document.querySelector("#element-card-holder");
    clearFavorites = document.querySelector("#btn-clear-all");
    myStatus = document.querySelector("#element-status");
    makeCards();

    clearFavorites.onclick = (e) => 
    {
        // still want to keet the inital state
        localStorage.clear(storageName);
        let temp = "";
        for(let i = 0; i < 7; i++)
        {
            temp = temp + storageInfo[i];
        }
        localStorage.setItem(storageName, temp);
        location.reload();
        myStatus.innerHTML = "No Favorites";
    }
}
init();
async function makeCards()
{
    
    for(let i = 9; i < storageInfo.length; i++)
    {
        myStatus.innerHTML = "";
        let response = await fetch("https://gateway.marvel.com:443/v1/public/comics/" + storageInfo[i] + "?" + verification);
        let json = await response.json();

        let temp = document.createElement("div");
        temp.className = "card";
        // 600 should cover most problems but if theres a really long title then they will scroll
        temp.style = `height:600px;overflow: auto;`
        temp.innerHTML = 
        `<div class = "box card-header-title is-size-4">
            <i class="fas fa-book-open"></i>
            <span class = "is-size-5" id="title">${json.data.results[0].title}</span>
        </div>
        <div class = "control has-Text-centered">
        </div>
        <div class="card-content">
            <div class="card-image">
            <figure class="image">
                <img style="border:1px solid black; background-color:white; padding:7px;box-shadow: 1px 1px 2px #333; margin:.1rem; width:300px" id="image-main" src="${json.data.results[0].thumbnail.path + "." + json.data.results[0].thumbnail.extension}" alt="Comic Book">
            </figure>
            </div>
        </div>`;
        elementCardHolder.appendChild(temp);
    }
}