import listPhotos from "./listPhotos.js";

export default class dropDown {
  constructor() {
    this.listTri = document.getElementById("contain_tri");
    this.btnTri = document.getElementById("btn_tri");
  }
  displayBtn() {
    this.btnTri.addEventListener("click", () => {
      this.listTri.style.display = "flex";
    });
    this.listTri.addEventListener("click", () => {
      this.listTri.style.display = "none";
    });
  }

  tri() {
    let sortBtn = Array.from(document.getElementsByClassName("tri"));

    sortBtn.forEach((btn, index) =>
      btn.addEventListener("click", () => {
        this.listTri.style.display = "none";

        if (index === 0) {
          new listPhotos().displayPicture(0);
          this.btnTri.innerHTML = "Popularité";

        } else if (index === 1) {
          new listPhotos().displayPicture(1);
          this.btnTri.innerHTML = "Date";

        } else if (index === 2) {
          new listPhotos().displayPicture(2);
          this.btnTri.innerHTML = "Titre";
        }
      })
    );
     this.displayBtn();
  }
}

