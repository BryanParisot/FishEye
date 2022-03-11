//data user and media
import displayHome from "./home/displayHome.js";

const homeHandler = new displayHome();
homeHandler.displayPhotographers();
homeHandler.filterPhotographers;

//filtrer les photographes
function filterTags() {
  let filtres = document.getElementsByClassName("categories");

  //récupérer les clicks des filtres
  for (let i = 0; i < filtres.length; i++) {
    filtres[i].addEventListener("click", (e) => {
      homeHandler.addTag(filtres[i].textContent.toLowerCase().substr(1));
      console.log(homeHandler.filterPhotographers());
    });
  }
}
filterTags();


