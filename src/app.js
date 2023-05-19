import "./df-resultcard.js";

let btnClearAll;
let btnSearch;
let elementCardHolder;
let heroChosen;
let allComics = [];
let allNames = [];
let allIDs = [];
let myStatus;

let favoriteButtonIndex = [];
let favoritesList = [];
const storageName = "jk9927-330-datastore"


let timeNow = new Date().getTime();
let stageOne = "358a2e9675dc5787e6ac935b4148927ba59ce49d";
let stageTwo = "ad82b7af4505705a32a81d9ee89c4876";
let hash = md5(timeNow+stageOne+stageTwo);
// this can change at any time so im going to set a varaible aside just fot it
let version = ":443/v1"
// base Url
let url = `https://gateway.marvel.com${version}/public/characters/`;
// looking for characters
// let searchTerm = "characters?";
let searchTerm = "/comics?format=comic&formatType=comic&";
// let characterID;
// value to maintain Note: 99 is the max the api will handle
let searchAmount;
// looking for 10 characters ordered by name
//let thisSearch = `orderBy=name&limit=${searchAmount}&`;
let random = Math.floor(Math.random() * 800);
// random = 1291;
console.log(random);
let offset = `offset=${random}&`;
let verification = `ts=${timeNow}&apikey=${stageTwo}&hash=${hash}`;
let json;

async function init()
{
    btnClearAll = document.querySelector("#btn-clear-all");
    btnSearch = document.querySelector("#btn-search");
    elementCardHolder = document.querySelector("#element-card-holder");
    heroChosen = document.querySelector("#hero-value");
    myStatus = document.querySelector("#element-status");

    btnSearch.onclick = (e) => 
    {
        let amountChosen = document.querySelector("#field-limit");
        if(amountChosen.value == "3")
        {
            searchAmount = 3;
        }
        else if(amountChosen.value == "5")
        {
            searchAmount = 5;
        }
        else if(amountChosen.value == "10")
        {
            searchAmount = 10;
        }
        e.target.classList.add("is-loading");
        showResults();
        e.target.classList.remove("is-loading");
    }
    btnClearAll.onclick = (c) =>
    {
        while(elementCardHolder.firstChild)
        {
            elementCardHolder.removeChild(elementCardHolder.firstChild);
        }
        heroChosen.value = "";
    }
}
init();

// const createResultCards = (array) => 
// {
//     allComics.length = 0;
//     elementCardHolder.innerHTML = "";
    
//     const html = array.map(url => `<div><img src="${url}" alt="dog"></div>`).join("");
//     elementCardHolder.innerHTML = `<div class="box">${html}</div>`;
// };

async function showResults()
{
    let temp = "";
    let jsonID;
    for(let i = 0; i < heroChosen.value.length; i++)
    {
        if( heroChosen.value.charAt(i) == " ")
        {
            temp = temp + "%20";
        }
        else
        {
            temp = temp + heroChosen.value.charAt(i);
        }
    }
    let localUrl = `https://gateway.marvel.com${version}/public/characters?name=${temp}&limit=1&${verification}`;
    let responseID = await fetch(localUrl);
    jsonID = await responseID.json();

    url+= "" + jsonID.data.results[0].id;
    url+=searchTerm;
    let thisSearch = `limit=${searchAmount}&`;
    url+=thisSearch;
    url+=offset;
    url+=verification;
    let response = await fetch(url);
    json = await response.json();
    for(let i = 0; i < searchAmount; i++)
    {
        // if theres a comic it will have an id  element-status
        if(json.data.results[0])
        {
            allComics[i] = "" + json.data.results[i].thumbnail.path + "." + json.data.results[i].thumbnail.extension;
            allNames[i] = "" + json.data.results[i].title;
            allIDs[i] = "" + json.data.results[i].id;
            myStatus.innerHTML = "";
        }
        else
        {
            myStatus.innerHTML = "No results Found"
        }
    }
    for(let i = 0; i < allComics.length; i++)
    {
        let temp = document.createElement("div");
        temp.className = "card";
        // 600 should cover most problems but if theres a really long title then they will scroll
        temp.style = `height:600px;overflow: auto;`
        temp.innerHTML = 
        `<div class = "box card-header-title is-size-4">
            <i class="fas fa-book-open"></i>
            <span class = "is-size-5" id="title">${allNames[i]}</span>
        </div>
        <div class = "control has-Text-centered">
            <button id = "btn-favorite${i}"
            class = "button" is-primary is-small"
            title = ${allIDs[i]}>
                Favorite
            </button>
        </div>
        <div class="card-content">
            <div class="card-image">
            <figure class="image">
                <img style="border:1px solid black; background-color:white; padding:7px;box-shadow: 1px 1px 2px #333; margin:.1rem; width:300px" id="image-main" src="${allComics[i]}" alt="Comic Book">
            </figure>
            </div>
        </div>`;
    elementCardHolder.appendChild(temp);
        // didnt work and i dont have time to figure it out... for now just brute force it with a lot of messy code
        // let newCard = document.createElement("df-resultcard");
        // //newCard.dataset.src = allComics[i];
        // newCard.dataset.title = allNames[i];
        // //newCard.dataset.comicid = allIDs[i];
        // elementCardHolder.appendChild(newCard);
        favoriteButtonIndex[i] = document.querySelector("#btn-favorite" + i);
        favoriteButtonIndex[i].onclick = (e) => 
        {
            // add to the favorite list           
            // im just going to throw the index into the hidden title for now
            let control = false;
            for(let j = 0; j < favoritesList.length; j++)
            {
                // if its in the list
                if(favoritesList[j] == favoriteButtonIndex[i].title)
                {
                    control = true;
                }
            }
            // if we didnt find this index
            if(!control)
            {
                favoritesList.push(favoriteButtonIndex[i].title);
                let storageInfo = localStorage.getItem(storageName);
                localStorage.clear(storageName);
                console.log(storageInfo + "_=^" + favoriteButtonIndex[i].title);
                localStorage.setItem(storageName, storageInfo + "_=^" + favoriteButtonIndex[i].title  + "_=^");
                console.log(favoriteButtonIndex[i].title);
            }
            // for(let j = 0; j < favoritesList.length; j++)
            // {
            //     console.log(favoritesList[j]);
            // }
        }
    }
}
