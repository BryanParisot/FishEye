import dataApi from "../dataUser/dataApi.js";
import listPhotos from "./listPhotos.js";
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
        const createProfileUnique = document.createElement("div");
        const profile = document.getElementById("aaa");
        const namePh = document.getElementById("namePh");
        createProfileUnique.className = "container_description_profil";

        profile.appendChild(createProfileUnique);
        namePh.innerText = `${photographer.name}`;
        // createProfileUnique.innerHTML= contenuHtml

        //div secondaire
        const containerDescription = document.createElement("div");
        containerDescription.className = "container_description_flex";

        //containerForWidth
        const containerForWidth = document.createElement("div");
        containerForWidth.className = "container_for_width";

        //<h2
        const createTitle = document.createElement("h2");
        createTitle.className = "name_profil";
        createTitle.innerHTML = `${photographer.name}`;
        // <p city
        const createParagraphCity = document.createElement("h3");
        createParagraphCity.className = "ville_profil";
        createParagraphCity.innerHTML = `${photographer.city}, ${photographer.country}`;

        //<p txt profil
        const createParaProfile = document.createElement("p");
        createParaProfile.className = "txt_profil";
        createParaProfile.innerHTML = `${photographer.tagline}`;

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
        containerDescription.appendChild(containerForWidth);
        containerForWidth.appendChild(createTitle);
        containerForWidth.appendChild(createParagraphCity);
        containerForWidth.appendChild(createParaProfile);
        containerForWidth.appendChild(createListTag);
        containerDescription.appendChild(divBtn);
        divBtn.appendChild(createBtn);
        divImg.appendChild(createImg);
        createProfileUnique.appendChild(containerDescription);
        createProfileUnique.appendChild(divImg);

        //tarif
        const tariffs = document.getElementById("tarif");
        tariffs.innerHTML = `${photographer.price}€ / jours`;
      });
    });
  }
}

new listPhotos().displayPicture().then(() => {
  new Lightbox().init();
  // url images tiles
});
