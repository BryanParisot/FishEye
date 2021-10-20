export default class scroll {
  scrollDisplayBtn() {
    window.addEventListener("scroll", () => {
      let btn = document.getElementById("btn_home");
      let y = window.scrollY;
      if (y >= 140) {
        btn.style.display = "block";
      } else {
        btn.style.display = "none";
      }
    });
  }
}
