let index = 1;
const storageName = "jk9927-330-datastore"
let storageInfo = localStorage.getItem(storageName).split("_=^");
async function init()
{
    // if we have never run this app before on this device
    if(!localStorage.getItem(storageName))
    {
        loadNewData();
    }
    else
    {
        loadCharacterData();
        loadNewData();
    }
}
init();
//localStorage.clear("jk9927-330-datastore");
async function loadNewData()
{
    let index = "";             // storage[0]
    let hasIndex = "true";      // storage[1]
    let name = "";              // storage[2]
    let hasName = "true";       // storage[3]
    let description = "";       // storage[4]
    let hasDescription = "true";// storage[5]
    let image = "";             // storage[6]
    let hasImage = "true";      // storage[7]

    let timeNow = new Date().getTime();
    let stageOne = "358a2e9675dc5787e6ac935b4148927ba59ce49d";
    let stageTwo = "ad82b7af4505705a32a81d9ee89c4876";
    let hash = md5(timeNow+stageOne+stageTwo);
    // this can change at any time so im going to set a varaible aside just fot it
    let version = ":443/v1"
    // base Url
    let url = `https://gateway.marvel.com${version}/public/`;
    // looking for characters
    let searchTerm = "characters?";
    // value to maintain Note: 99 is the max the api will handle
    let searchAmount = 1;
    // looking for 10 characters ordered by name
    let thisSearch = `orderBy=name&limit=${searchAmount}&`;
    let random = Math.floor(Math.random() * 1562);
    // random = 1291;
    console.log(random);
    let offset = `offset=${random}&`;
    let verification = `ts=${timeNow}&apikey=${stageTwo}&hash=${hash}`;
    // create the url
    url+=searchTerm;
    url+=thisSearch;
    url+=offset;
    url+=verification;
    let response = await fetch(url);
    let json = await response.json();

    index = json.data.results[0].id;
    name = json.data.results[0].name;
    if(name == "")
    {
        hasName = "false";
    }
    description = json.data.results[0].description;
    if(description == "")
    {
        hasDescription = "false";
    }
    image = json.data.results[0].thumbnail.path + "." + json.data.results[0].thumbnail.extension;
    let knownMissingImages = 
    [
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",
        "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif"
    ]
    for(let i = 0; i < knownMissingImages.length; i++)
    {
        if(image == knownMissingImages[i])
        {
            hasImage = "false";
        }
    }
    let buildString = "";
    buildString = buildString + index + "_=^";
    buildString = buildString + hasIndex + "_=^";
    buildString = buildString + name + "_=^";
    buildString = buildString + hasName + "_=^";
    buildString = buildString + description + "_=^";
    buildString = buildString + hasDescription + "_=^";
    buildString = buildString + image + "_=^";
    buildString = buildString + hasImage + "_=^";

    localStorage.setItem(storageName, buildString);
}
async function loadCharacterData()
{

    // for the moment this just opens the initial page
    let timeNow = new Date().getTime();
    let stageOne = "358a2e9675dc5787e6ac935b4148927ba59ce49d";
    let stageTwo = "ad82b7af4505705a32a81d9ee89c4876";
    let hash = md5(timeNow+stageOne+stageTwo);
    // this can change at any time so im going to set a varaible aside just fot it
    let version = ":443/v1"
    if(storageInfo[7] != "false")
    {
        let url = `https://gateway.marvel.com${version}/public/characters/${storageInfo[0]}?`;
        let verification = `ts=${timeNow}&apikey=${stageTwo}&hash=${hash}`;
        url+=verification;
        let response = await fetch(url);
        let json = await response.json();
        document.querySelector("#primary-image").src = storageInfo[6];
        // console.log(storageInfo[0]);
        // console.log(storageInfo[2]);
        // console.log(storageInfo[4]);
        // console.log(storageInfo[6]);
        document.querySelector("#primary-image").alt = storageInfo[2];
        let text = `This is a great place to keep up with and view the Marvel universe keep up with comics and find new and interesting heros and villans.  Here you can follow your favorite hereos read a few comics and find new favorites to like, share, and follow.<br>For example to the right: <b>${storageInfo[2]}</b>.<br>${storageInfo[4]}`;
        document.querySelector("#initial-description").innerHTML = text;
    }
    // for(let i = 0; i < 8; i++)
    // {
    //     console.log(storageInfo[i]);
    // }
}











// // aparently a timestamp and multiple keys that are all encrypted are nessisary to look at iron man comics
// let timeNow = new Date().getTime();
// let stageOne = "358a2e9675dc5787e6ac935b4148927ba59ce49d";
// let stageTwo = "ad82b7af4505705a32a81d9ee89c4876";
// let hash = md5(timeNow+stageOne+stageTwo);
// // this can change at any time so im going to set a varaible aside just fot it
// let version = ":443/v1"
// // base Url
// let url = `https://gateway.marvel.com${version}/public/`;
// // looking for characters
// let searchTerm = "characters?";
// // value to maintain Note: 99 is the max the api will handle
// let searchAmount = 20;
// // looking for 10 characters ordered by name
// let thisSearch = `orderBy=name&limit=${searchAmount}&`;
// // need the +1 becouse first entery has no description
// let random = Math.floor(Math.random() * 1561) + 1;
// // random = 94;
// console.log(random);
// let offset = `offset=${random}&`;
// let verification = `ts=${timeNow}&apikey=${stageTwo}&hash=${hash}`;
// // create the url
// url+=searchTerm;
// url+=thisSearch;
// url+=offset;
// url+=verification;

// async function loadJsonFetch(){
//     let response = await fetch(url);
//     let json = await response.json();
//     let imageSrc = json.data.results[0].thumbnail.path + "." + json.data.results[0].thumbnail.extension;
//     let changeLanding = true;
//     let knownMissingImages = 
//     [
//         "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",
//         "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif"
//     ]
//     // if there is an image available then use it otherwise dont change anything
//     // image is more important than text on the landing
//     for(let i = 0; i < knownMissingImages.length; i++)
//     {
//         if(imageSrc == knownMissingImages[i])
//         {
//             changeLanding = false;
//         }
//     }
//     if(changeLanding)
//     {
//         document.querySelector("#primary-image").src = imageSrc;
//         let text = `This is a great place to keep up with and view the Marvel universe keep up with comics and find new and interesting heros and villans.  Here you can follow your favorite hereos read a few comics and find new favorites to like, share, and follow.<br>For example to the right: <b>${json.data.results[0].name}</b>.<br>${json.data.results[0].description}`;
//         document.querySelector("#initial-description").innerHTML = text;
//     }
// }