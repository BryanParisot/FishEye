export default class Lightbox {
  init() {
    let links = Array.from(
      document.querySelectorAll(
        'a[href$=".png"],a[href$=".jpg"],a[href$=".jpeg"],a[href$=".mp4"]'
      )
    );
    console.log(links);
    const gallery = links.map((link) => link.getAttribute("href"));
    const titles = links.map(
      (link) => link.childNodes[0].alt || link.childNodes[0].title
    );
    links.forEach((link) =>
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
        // Le innerHtml ne fonctionne pas ici, pour mettre le name de la photo
        console.log("name", name);
        const nameLight = document.createElement("p");
        nameLight.className("ligthbox__name");
        nameLight.innerHTML = "eeeee";
        dom.appendChild(nameLight);

        // const nameLigthbox = this.element.querySelector(".ligthbox__name");
        // console.log('test' + nameLigthbox );
        //nameLigthbox.innerHTML = "ffffff"
      })
    );
  }

  /**
   * @param {string} url de l'image
   */
  constructor(url, images, title, titles) {
    if (!url && !images && !title) return;
    console.log({ url, images, title });
    this.test = null;
    this.element = this.buildDOM(url, title);
    this.images = images;
    this.titles = titles;
    console.log({ images, titles });
    this.loadImage(url, title);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);
  }

  loadImage(url, title) {
    this.url = null;
    this.title = title;
    const image = new Image();
    const container = this.element.querySelector(".ligthbox__contain");
    console.log({ container });
    const loader = document.createElement("div");
    container.innerHTML = "";
    loader.classList.add("ligthbox__loader");
    container.appendChild(loader);
    image.onload = () => {
      container.removeChild(loader);
      container.appendChild(image);
      this.url = url;
    };
    image.src = url;
    image.alt = title;
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
