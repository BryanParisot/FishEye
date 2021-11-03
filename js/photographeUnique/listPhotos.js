import dataApi from "../dataUser/dataApi.js";

export default class listPhotos {
  constructor(url) {
    this.totalLike = 0;
  }

  displayPicture() {
    new dataApi().findData().then((response) => {
      response.media.map((media) => {
        let id = window.location.search.split("id=")[1];

        if (id != media.photographerId) {
          return false;
        }
        this.totalLike += media.likes;

        const createDivPictures = document.createElement("div");
        const divContainPicture = document.getElementById("contain_picture");
        createDivPictures.className = "container_card";
        divContainPicture.appendChild(createDivPictures);

        //element dom
        //lien de l'image
        const lien = document.createElement("a");
        lien.href = `${media.image}`;

        //img
        const img_photographe = document.createElement("img");
        img_photographe.className = "card_picture";
        img_photographe.src = `${media.image}`;
        img_photographe.alt = `${media.title}`;

        const container_card_info = document.createElement("div");
        container_card_info.className = "container_card_info";

        //vdo
        const vdo_photographe = document.createElement('video');
        vdo_photographe.setAttribute("controls", "controls")
        vdo_photographe.setAttribute('src', media.video);
        vdo_photographe.setAttribute('role', 'button');
        vdo_photographe.className = 'card_picture';

        //name
        const name = document.createElement("p");
        name.className = "name";
        name.innerHTML = `${media.title}`;

        // div like
        const container_like = document.createElement("div");
        container_like.className = "like_card";

        //number like
        const like = document.createElement("p");
        like.className = "like";
        like.innerHTML = `${media.likes}`;
        like.id = "numberLikes-" + media.id;

        const heart = document.createElement("i");
        heart.className = "fas fa-heart";
        heart.id = `likeHeart${media.id}`;
        heart.setAttribute("data-like-id", media.id);
        heart.addEventListener("click", this.addLikes);

        //ajout des element dans le dom
        createDivPictures.appendChild(lien);
        let formatImg = img_photographe.src.split(".").pop()
        console.log(formatImg);
        if (formatImg == 'jpg') {
          lien.appendChild(img_photographe);
        }else{
         return  lien.appendChild(vdo_photographe);
        }
        createDivPictures.appendChild(container_card_info);
        container_card_info.appendChild(name);
        container_card_info.appendChild(container_like);
        container_like.appendChild(like);
        container_like.appendChild(heart);

        const total = document.getElementById("like_total");
        total.innerHTML = `${this.totalLike}`;
      });
    });
  }
  addLikes = (e) => {
    this.totalLike += 1;
    const total = document.getElementById("like_total");
    total.innerHTML = `${this.totalLike}`;
    const heartP = document.getElementById(
      `numberLikes-${e.currentTarget.getAttribute("data-like-id")}`
    );
    console.log(heartP);

    heartP.innerHTML = parseInt(heartP.textContent) + 1;

    console.log(e.currentTarget);
  };
}
