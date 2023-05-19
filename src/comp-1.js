
//this will be used to show a preview headshot and a short description of the heros and villans within a comic that was selected

// I. <my-list> web component stuff
const template = document.createElement("template");
template.innerHTML = `
<style>
    :host{
        background-color: #dfdfdf;
        display: inline-block;
        padding: .25rem;
        width: 100px;
        font-family: sans-serif;
        color: black;
    }
    h2{
        font-size: .8rem;
        text-align: center;
        margin: 0 auto .2rem auto;
    }
    ul{
        margin: 0 auto auto 16px;
        padding-left: 0;
    }
    ul li{
        font-size: .7rem;
    }
</style>
<div>
<h2>???</h2>
<ul></ul>
<div>
`;

class MyList extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._title = "unknown title";
        this._items = ["one","two","three"];
        this.h2 = this.shadowRoot.querySelector("h2");
        this.ul = this.shadowRoot.querySelector("ul");
    }
    
    // 3 - called when the component is added to the page
    connectedCallback(){
        this.render();
    }

    render(){
        // only re-render the <h1> if we need to
        if (this.h2.innerHTML != this._title) this.h2.innerHTML = this._title; 
        // we *should* do the same thing here for the _items array - write that code if you want to
        // https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
        // https://gomakethings.com/dom-diffing-with-vanilla-js/
        this.ul.innerHTML = this._items.map(item => `<li>${item}</li>`).join("");
    }

    clear()
    {
        while(this._items.length > 0)
        {
            this._items.pop();
        }
        this.render();
        this.lengthChanged();
    }
    length()
    {
        return this.items.length;
    }
    lengthChanged(){
        this.dispatchEvent(new CustomEvent("lengthchanged", {
        detail: {
                    //length: this._items.length
                    length: this._items.length
                }
        })  // end new CustomEvent()
        ); // end dispatchEvent call
    }

    // Property setter/getter code
    // Good stuff here, for all of your JS objects, not just web components
    set title(val) {
        console.log(`title setter called with val = ${val}`);
        this._title = val;
        this.render();
    }

    get title(){
        console.log("title getter called");
        return this._title;
    }

    set items(val) {
        console.log(`items setter called with val = ${val}`);
        this._items = [...val]; // copy the array
        this.render();
    }

    get items() {
        console.log("items getter called");
        return [...this._items]; // returns a copy
    }

    add(val){
        if (val.length > 0){
            this._items.push(val);
            this.render();
            this.lengthChanged();
        }
    }
    // ...
    // for practice, you should implement addAtIndex(), removeAtIndex(), clear() etc
} 

customElements.define('my-list', MyList);

// II. Use the <my-list> component
let	colorList,movieList;
window.onload = () =>{
    colorList = document.querySelector("#color-list");
    movieList = document.querySelector("#movie-list");
    inputText = document.querySelector("#input-text");
    outputText = document.querySelector("#output-text");
    
    colorList.title = "Colors";
    colorList.items = ["Cyan","Magenta"];
    colorList.add("purple")
    colorList.title = "Primary Colors";
    
    movieList.title = "Movies";
    movieList.items = ["Citizen Kaine","Casablanca","Kind Hearts and Coronets"];
    movieList.add("Village of the Damned")
    
    document.querySelector("#btn-add").onclick = e => 
    {
        const item = inputText.value.trim();
        if(item)
        {
            colorList.add(item);
            inputText.value = "";
        }
    };
    document.querySelector("#btn-clear").onclick = e => 
    {
        colorList.clear();
    };
    // listen for the "lengthchanged" event and then update the #output-text
    colorList.addEventListener("lengthchanged", e => outputText.innerHTML = e.detail.length);
}