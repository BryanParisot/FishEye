import dataApi from "../dataUser/dataApi.js";

export default class displayHome {
  constructor() {
    this.photographers = [];
    this.tags = [];
  }
  //template du photographe
  getPhotagrapherTemplate(photographer) {
    return `
    <a href="photographeUnique.html?id=${photographer.id}" title=${
      photographer.name
    }>
      <img aria-label="${photographer.name}" src="${
      photographer.portrait
    }" alt="${photographer.name}" />
      <h2 aria-label="${photographer.name}" class="name">${
      photographer.name
    }</h2>
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
  }
  //afficher les photographes
  displayPhotographers() {
    return new dataApi().findData().then((response) => {
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

  //filter les photographes
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
