export default class Lightbox {
  init() {
    let links = Array.from(
      document.querySelectorAll(
        'a[href$=".png"],a[href$=".jpg"],a[href$=".jpeg"],a[href$=".mp4"]'
      )
    );
   // console.log(links);
   const gallery = links.map((link) => link.getAttribute("href"));

   console.log(gallery)
   const titles = links.map((link) => link.getAttribute("data-title"));
   links.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        new Lightbox(
          e.currentTarget.getAttribute("href"),
          gallery,
          titles,
          e.currentTarget.getAttribute("alt")
        );
        console.log(e)
        const name = link.getAttribute("data-title");


     // Le innerHtml ne fonctionne pas ici, pour mettre le name de la photo
       const nameLigthbox = document.getElementById('ligthbox__name');
       const lightContain = document.getElementById('ligthbox__contain');
       console.log(lightContain);

       lightContain.removeChild(nameLigthbox)
       nameLigthbox.innerHTML = "ffffffrrrrrr"
       lightContain.appendChild(nameLigthbox);
       console.log(nameLigthbox);

      })
    );
  }

  /**
   * @param {string} url de l'image
   */
  constructor(url, images, titles,) {
    this.test = null 
    this.element = this.buildDOM(url);
    this.images = images;
    this.titles = titles;
    console.log('title' , titles)
    //this.loadImage(url, titles[0]);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);
    console.log(this.images);
  }

  loadImage(url, title) {
    this.url = null;
    const image = new Image();
    const container = this.element.querySelector(".ligthbox__contain");
    const loader = document.createElement("div");
    const paragraphe = document.createElement('p')
    paragraphe.innerHTML=title
    container.innerHTML = "aaaa";
    loader.classList.add("ligthbox__loader");
    container.appendChild(loader);
    image.onload = () => {
      container.removeChild(loader);
      container.appendChild(image);
      container.appendChild(paragraphe)
      this.url = url;
    };
    image.src = url;
    image.alt = 'aaaaa';

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
    this.loadImage(this.images[i + 1]);
  }

  prev(e) {
    e.preventDefault();
    let i = this.images.findIndex((i) => i === this.url);
    if (i === 0) {
      i = this.images.length;
    }
    this.loadImage(this.images[i - 1]);
  }

  buildDOM(url,titles) {
    const dom = document.createElement("div");
    dom.classList.add("ligthbox");
    dom.innerHTML = `
      <button aria-label="close" class="ligthbox__close"><i class="fas fa-times"></i></button>
      <button aria-label="next" class="ligthbox__next">
        <i class="fas fa-chevron-right"></i>
      </button>
      <button aria-label="prev" class="ligthbox__prev">
        <i class="fas fa-chevron-left"></i>
      </button>
      <div class="ligthbox__contain" id="ligthbox__contain">
      
      </div>
      <p class="ligthbox__name" id="ligthbox__name">Name doit apparaitre ici</p>
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
