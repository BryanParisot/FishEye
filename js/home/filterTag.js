// export default class filterTag {
function test() {
  let filtres = document.getElementsByClassName("cat");
  
  //récupérer les clicks des filtres
  for (let i = 0; i < filtres.length; i++) {
    filtres[i].addEventListener("click", (e) => {
      console.log(filtres[i].innerHTML);
    });
  }
}
test();
// }
