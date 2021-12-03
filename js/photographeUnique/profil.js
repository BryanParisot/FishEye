import dataApi from "../dataUser/dataApi.js";
import listPhotos from "./listPhotos.js";
import dropDown from "./dropDown.js";
import Lightbox from "./ligthbox.js";

export default class profil {
  //Afficher le profil des users
  displayProfil() {
    return new dataApi().findData().then((response) => {
      response.photographer.map((photographer) => {
        let id = window.location.search.split("id=")[1];
        if (id != photographer.id) {
          return false;
        }
        const createProfilUnique = document.createElement("div");
        const profil = document.getElementById("aaa");
        const namePh = document.getElementById("namePh");
        createProfilUnique.className = "container_description_profil";

        profil.appendChild(createProfilUnique);
        namePh.innerText = `${photographer.name}`;
        // createProfilUnique.innerHTML= contenuHtml

        //div secondaire
        const containterDescription = document.createElement("div");
        containterDescription.className = "container_description_flex";

        //containerForWidth
        const containerForWidth = document.createElement("div");
        containerForWidth.className = "container_for_width";

        //<h2
        const createTitle = document.createElement("h2");
        createTitle.className = "name_profil";
        createTitle.innerHTML = `${photographer.name}`;
        // <p ville
        const createParagrapheVille = document.createElement("h3");
        createParagrapheVille.className = "ville_profil";
        createParagrapheVille.innerHTML = `${photographer.city}, ${photographer.country}`;

        //<p txt profil
        const createParaProfil = document.createElement("p");
        createParaProfil.className = "txt_profil";
        createParaProfil.innerHTML = `${photographer.tagline}`;

        // <ul list tag
        const createListTag = document.createElement("ul");
        createListTag.className = "filter";
        createListTag.ariaLabel = "listes des catégorires de photos";

        // <li listUnique
        photographer.tags.forEach((tag) => {
          const createList = document.createElement("li");
          createList.innerHTML = `#${tag}`;
          createListTag.appendChild(createList);
        });

        //containerBtn
        const divBtn = document.createElement("div");
        divBtn.className = "container_btn";

        //btn
        const createBtn = document.createElement("button");
        createBtn.id = "btnForm";
        const txtBtn = document.createTextNode("Contactez-moi");
        createBtn.ariaLabel = "Vers le formulaire de contact";
        createBtn.appendChild(txtBtn);
        //display formulaire
        createBtn.addEventListener("click", () => {
          const form = document.getElementById("formContact");
          const listPhotos = document.getElementById("contain_picture");
          form.style.display = "block";
          listPhotos.style.display = "none";
        });

        // <div img
        const divImg = document.createElement("div");
        divImg.className = "container_img";

        // <img
        const createImg = document.createElement("img");
        createImg.src = `${photographer.portrait}`;
        createImg.alt = `Photo de ${photographer.name}`;

        //placement des création
        containterDescription.appendChild(containerForWidth);
        containerForWidth.appendChild(createTitle);
        containerForWidth.appendChild(createParagrapheVille);
        containerForWidth.appendChild(createParaProfil);
        containerForWidth.appendChild(createListTag);
        containterDescription.appendChild(divBtn);
        divBtn.appendChild(createBtn);
        divImg.appendChild(createImg);
        createProfilUnique.appendChild(containterDescription);
        createProfilUnique.appendChild(divImg);

        //tarif
        const tarifs = document.getElementById("tarif");
        tarifs.innerHTML = `${photographer.price}€ / jours`;
      });
    });
  }
}


new listPhotos().displayPicture().then(() => {
  new Lightbox().init();
});

