// export default class filterTag {
function test() {
  let filtres = document.getElementById("navigation");
  let articles = document.querySelectorAll('.articlePh');
  console.log(filtres);
  console.log(articles)

  filtres.addEventListener("click", (e) => {
    let classValue = e.target.classList.value;

    console.log(e.target.classList);
  });
}
test();
// }
