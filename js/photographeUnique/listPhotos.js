import dataApi from "../dataUser/dataApi.js";

export default class listPhotos {
  constructor(url) {
    this.totalLike = 0;
  }
  //afficher les photos des utilisateurs
  displayPicture(tri = null) {
   return new dataApi().findData().then((response) => {
      let data = response.media;
      if (tri === 2) {
        data = data.sort((a, b) => a.title >  b.title ? 1 : -1 );
      }else if (tri === 1){
        data = data.sort((a, b ) => new Date(a.date).valueOf() - new Date(b.date).valueOf())
      }else if(tri === 0){
        data = data.sort((a, b) => a.likes - b.likes)
      }
      const divContainPicture = document.getElementById("contain_picture")
      divContainPicture.innerHTML = ''

      data.map((media) => {
        let id = window.location.search.split("id=")[1];

        if (id != media.photographerId) {
          return false;
        }
        this.totalLike += media.likes;
        //
        const createDivPictures = document.createElement("div");
        createDivPictures.className = "container_card";
        divContainPicture.appendChild(createDivPictures);

        //element dom
        //lien de l'image
        const lien = document.createElement("a");
        lien.href = `${media.image}`;
        lien.setAttribute("data-title",media.title);

        //lien de vdo
        const lien_vdo = document.createElement("a");
        lien_vdo.href = `${media.video}`;

        //img
        const img_photographe = document.createElement("img");
        img_photographe.className = "card_picture";
        img_photographe.src = `${media.image}`;
        img_photographe.setAttribute("alt", media.title);
        const container_card_info = document.createElement("div");
        container_card_info.className = "container_card_info";

        //vdo
        const vdo_photographe = document.createElement("video");
        vdo_photographe.setAttribute("controls", "controls");
        vdo_photographe.setAttribute("src", media.video);
        vdo_photographe.setAttribute("role", "button");
        vdo_photographe.setAttribute("title", media.title);
        vdo_photographe.className = "card_picture";

        //name
        const name = document.createElement("h2");
        name.className = "name";
        name.innerHTML = `${media.title}`;

        // div like
        const container_like = document.createElement("div");
        container_like.className = "like_card";

        //number like
        const like = document.createElement("h3");
        like.className = "like";
        like.innerHTML = `${media.likes}`;
        like.ariaLabel = "Nombre de j'aime sur photo";
        like.id = "numberLikes-" + media.id;

        const heart = document.createElement("i");
        heart.className = "fas fa-heart";
        heart.id = `likeHeart${media.id}`;
        heart.setAttribute("data-like-id", media.id);
        heart.addEventListener("click", this.addLikes);

        //ajout des element dans le dom
        let formatImg = img_photographe.src.split(".").pop();

        if (formatImg === "jpg") {
          createDivPictures.appendChild(lien);
          lien.appendChild(img_photographe);
        } else {
          return (
            createDivPictures.appendChild(lien_vdo),
            lien_vdo.appendChild(vdo_photographe),
            createDivPictures.appendChild(container_card_info),
            container_card_info.appendChild(name),
            container_card_info.appendChild(container_like),
            container_like.appendChild(like),
            container_like.appendChild(heart)
          );
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
  //ajouts des likes
  addLikes = (e) => {
    this.totalLike += 1;
    const total = document.getElementById("like_total");
    total.innerHTML = `${this.totalLike}`;
    const heartP = document.getElementById(
      `numberLikes-${e.currentTarget.getAttribute("data-like-id")}`
    );
    //console.log(heartP);

    heartP.innerHTML = parseInt(heartP.textContent) + 1;

    //console.log(e.currentTarget);
  };
}
