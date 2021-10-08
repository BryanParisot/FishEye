//data user and media
import displayHome from "./home/displayHome.js";
import profil from "./photographeUnique/profil.js";

const homeHandler = new displayHome();
homeHandler.displayPhotographers();
homeHandler.filterPhotographers;
new profil().displayProfil();

function test() {
  let filtres = document.getElementsByClassName("cat");

  //récupérer les clicks des filtres
  for (let i = 0; i < filtres.length; i++) {
    filtres[i].addEventListener("click", (e) => {
      homeHandler.addTag(filtres[i].textContent.toLowerCase().substr(1));
      console.log(homeHandler.filterPhotographers());
    });
  }
}
test();
