import dataApi from "../dataUser/dataApi.js";

export default class profil {
  displayProfil() {
    new dataApi().findData().then((response) => {
      console.log(response);
      response.photographer.map((photographer) => {
        let id = window.location.search.split("id=")[1];
        if (id != photographer.id) {
          console.log("eerrr");
          return false;
        }
        const createProfilUnique = document.createElement("div");
        const profil = document.getElementById("aaa");
        createProfilUnique.className = "container_description_profil";
        let contenuHtml = `      
        <div class="container_description_flex">
        <div class="container_for_width">
          <h2 class="name_profil">${photographer.name}</h2>
          <p class="ville_profil">${photographer.city}, ${
          photographer.country
        }</p>
          <p class="txt_profil">${photographer.tagline}</p>
          <ul class="filter">
          ${photographer.tags
            .map(
              (item) => `
          <li>#${item}</li>
          `
            )
            .join(" ")}
        </ul>
          </div>
          <div class="container_btn"><button>Contactez-moi</button></div>
          </div>
      <div class="container_img">
        <img src=${photographer.portrait} alt="" />
      </div>`;

        console.log(photographer.name);
        profil.appendChild(createProfilUnique);
        createProfilUnique.innerHTML = contenuHtml;
      });
    });
  }
}
