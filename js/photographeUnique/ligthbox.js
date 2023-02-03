export default class Lightbox {
  init() {
    let links = Array.from(
      document.querySelectorAll(
        'a[href$=".png"],a[href$=".jpg"],a[href$=".jpeg"],a[href$=".mp4"]'
      )
    );
    const gallery = links.map((link) => link.getAttribute("href"));
    const titles = links.map(
      (link) => link.childNodes[0].alt || link.childNodes[0].title
    );
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        new Lightbox(
          e.currentTarget.getAttribute("href"),
          gallery,
          e.currentTarget.childNodes[0].alt ||
            e.currentTarget.childNodes[0].title,
          titles
        );
        const name = link.getAttribute("data-title");
      });
    });
  }

  /**
   * @param {string} url de l'image
   */
  constructor(url, images, title, titles) {
    if (!url && !images && !title) return;
    this.element = this.buildDOM(url, title);
    this.images = images;
    this.titles = titles;
    this.loadImage(url, title);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);
  }

  loadImage(url, title) {
    this.url = url;
    this.title = title;

    const image = new Image();
    const video = document.createElement("video");
    video.classList.add("video_lightbox");

    const container = this.element.querySelector(".ligthbox__contain");
    const loader = document.createElement("div");
    const containTittle = document.createElement("div");
    container.appendChild(containTittle);

    container.innerHTML = "";

    loader.classList.add("ligthbox__loader");
    loader.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"style = "margin: auto; background: none; display: block; shape-rendering: auto;" width = "200px" height = "200px" viewBox = "0 0 100 100" preserveAspectRatio = "xMidYMid" ><path d = "M17 50A33 33 0 0 0 83 50A33 34.6 0 0 1 17 50" fill = "#911616" stroke = "none"><animateTransform attributeName = "transform" type = "rotate" dur = "1.5384615384615383s" repeatCount = "indefinite" keyTimes = "0;1" values = "0 50 50.8;360 50 50.8"></animateTransform></path></svg>';

    containTittle.appendChild(loader);
    const h1 = document.createElement("h1");
    h1.classList.add("ligthbox__name");
    h1.textContent = title;

    if (url.includes("jpg")) {
      container.appendChild(containTittle);
      containTittle.appendChild(image);
      containTittle.appendChild(h1);
      image.src = url;
      containTittle.removeChild(loader);
      return url;
    } else if (url.includes("mp4")) {
      container.appendChild(containTittle);
      containTittle.appendChild(video);
      containTittle.appendChild(h1);
      video.controls = true;
      video.src = url;
      containTittle.removeChild(loader);
      return url;
    }

    //     image.onload = () => {
    //       console.log("image");

    //       containTittle.appendChild(image);

    //       container.removeChild(loader);
    //       container.appendChild(containTittle);
    //       containTittle.appendChild(h1);

    //       this.url = url;
    //     };
    //     image.src = url;
    //     image.alt = title;
    // }
  }

  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e);
    } else if (e.key === "ArrowLeft") {
      this.prev(e);
    } else if (e.key === "ArrowRight") {
      this.next(e);
    }
  }

  close(e) {
    e.preventDefault();
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  next(e) {
    e.preventDefault();
    let i = this.images.findIndex((i) => i === this.url);
    if (i === this.images.length - 1) {
      i = -1;
    }
    this.loadImage(this.images[i + 1], this.titles[i + 1]);
  }

  prev(e) {
    e.preventDefault();
    let i = this.images.findIndex((i) => i === this.url);
    if (i === 0) {
      i = this.images.length;
    }
    this.loadImage(this.images[i - 1], this.titles[i - 1]);
  }

  buildDOM(url, name) {
    var dom = document.createElement("div");
    dom.classList.add("ligthbox");
    dom.innerHTML = `
    <button aria-label="close" class="ligthbox__close"><i class="fas fa-times"></i></button>
    <button aria-label="next" class="ligthbox__next">
      <i class="fas fa-chevron-right"></i>
    </button>
    <button aria-label="prev" class="ligthbox__prev">
      <i class="fas fa-chevron-left"></i>
    </button>
    <div class="ligthbox__contain">
    </div>
    `;
    dom
      .querySelector(".ligthbox__close")
      .addEventListener("click", this.close.bind(this));
    dom
      .querySelector(".ligthbox__next")
      .addEventListener("click", this.next.bind(this));
    dom
      .querySelector(".ligthbox__prev")
      .addEventListener("click", this.prev.bind(this));
    return dom;
  }
}
