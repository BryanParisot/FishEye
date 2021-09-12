import dataApi from "../dataUser/dataApi.js";
import scroll from "./scroll.js";

export default class displayHome {
  displayPhotographers() {
    new dataApi().findData().then((response) => {
      response.photographer.map((photographer) => {
        let create = document.createElement("article");
        const containMain = document.getElementById("contain_cards");
        create.className = "articlePh";
        let templatePhotographer = `
      <a href="#" title=${photographer.name}>
        <img src="${photographer.portrait}" alt="" />
        <h2 class="name">${photographer.name}</h2>
      </a>
      <p class="city">${photographer.city}, ${photographer.country}</p>
      <p class="tagline">${photographer.tagline}</p>
      <span class="price">${photographer.price}/jours</span>
      <ul class="filter">
        ${photographer.tags .map((item) => `
        <li>#${item}</li>
        `) .join(" ")}
      </ul>
      
            `;
        containMain.appendChild(create);
        create.innerHTML = templatePhotographer;
      });
    });
  }
}

new scroll().scrollDisplayBtn();
