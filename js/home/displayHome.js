import dataApi from "../dataUser/dataApi.js";
import scroll from "./scroll.js";

export default class displayHome {
  constructor() {
    this.photographers = [];
    this.tags = [];
  }
  getPhotagrapherTemplate(photographer) {
    return `
    <a href="photographeUnique.html?id=${photographer.id}" title=${
      photographer.name
    }>
      <img src="${photographer.portrait}" alt="" />
      <h2 class="name">${photographer.name}</h2>
    </a>
    <p class="city">${photographer.city}, ${photographer.country}</p>
    <p class="tagline">${photographer.tagline}</p>
    <span class="price">${photographer.price}/jours</span>
    <ul class="filter">
      ${photographer.tags
        .map(
          (item) => `
      <li>#${item}</li>
      `
        )
        .join(" ")}
    </ul>
    
          `;
  }
  setTags(tags) {
    this.tags = tags;
  }
  addTag(tag) {
    if (this.tags.includes(tag)) return;
    this.tags.push(tag);
    console.log(this.tags);
  }
  displayPhotographers() {
    new dataApi().findData().then((response) => {
      this.photographers = response.photographer;
      response.photographer.map((photographer) => {
        const templatePhotographer = this.getPhotagrapherTemplate(photographer);
        let create = document.createElement("article");
        const containMain = document.getElementById("contain_cards");
        create.className = photographer.tags.join(" ") + " articlePhotographer";
        containMain.appendChild(create);
        create.innerHTML = templatePhotographer;
      });
    });
  }

  filterPhotographers() {
    const containMain = document.getElementById("contain_cards");
    containMain.innerHTML = "";
    return this.photographers
      .filter((photographer) =>
        photographer.tags.reduce((acc, tag) => {
          return acc || this.tags.includes(tag);
        }, false)
      )
      .map((photographer) => {
        const templatePhotographer = this.getPhotagrapherTemplate(photographer);
        let create = document.createElement("article");
        create.className = photographer.tags.join(" ") + " articlePhotographer";
        containMain.appendChild(create);
        create.innerHTML = templatePhotographer;
      });
  }
}

new scroll().scrollDisplayBtn();
