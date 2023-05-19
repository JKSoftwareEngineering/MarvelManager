const template = document.createElement("template");
template.innerHTML = 
`<link href = "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css" />
<link href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
<style></style>
<div id = "comicid" class = "card">
    <div class = "card-header-title is-size-4">   
        <i class = "fas fa-book-open"></i>
        <span id ="title">
            ???
        </span>
    </div>
</div>`;
class ResultCard extends HTMLElement
{
    static defaultImge = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
    constructor()
    {
        super();
        this.attachShadow({"mode": "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallBack()
    {
        this.shadowRoot.querySelector("#title").innerHTML = this.dataset.title;
    }
}
customElements.define("df-resultcard", ResultCard);