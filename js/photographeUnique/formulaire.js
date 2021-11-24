export default class Form {
  constructor() {
    this.error = document.getElementById("error_message");
  }

  validation() {
    //const formulaire
    const form = document.getElementById("formContact");
    const firstName = document.getElementById("prenom");
    const lastName = document.getElementById("nom");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    //error

    //regex
    const regexTxt = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let validationVar =
        this.validateFirstName(firstName, regexTxt) &&
        this.validateLastName(lastName, regexTxt) &&
        this.validateEmail(email) &&
        this.validateMessage(message);

      if (validationVar) {
        this.error.style.display = "none";
        this.resultConsole(firstName, lastName, email, message);
      }
    });
    this.displayForm();
  }

  displayForm() {
    const close = document.getElementById("close");
    const form = document.getElementById("formContact");
    const listPhotos = document.getElementById("contain_picture");
    close.addEventListener("click", () => {
      form.style.display = "none";
      listPhotos.style.display = "flex";
    });
    document.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        form.style.display = "none";
        listPhotos.style.display = "flex";
      }
    });
  }

  //result in console
  resultConsole(firstName, lastName, email, message) {
    console.group("Résultat du formulaire de contact");
    console.log("Prénom : " + firstName.value);
    console.log("Nom : " + lastName.value);
    console.log("Email : " + email.value);
    console.log("Message : " + message.value);
    console.groupEnd();
  }

  validateFirstName(elt, regex) {
    if (
      elt.value.trim().length < 1 ||
      elt.value == "" ||
      !elt.value.match(regex)
    ) {
      this.error.style.display = "block";
      this.error.innerHTML = "Une erreur est survenue au niveau du prénom";
      return false;
    }
    this.error.style.display = "none";
    console.log("gg prenom");
    return true;
  }

  validateLastName(elt, regex) {
    if (
      elt.value.trim().length < 1 ||
      elt.value == "" ||
      !elt.value.match(regex)
    ) {
      this.error.style.display = "block";
      this.error.innerHTML = "Une erreur est survenue au niveau du nom";
      return false;
    }
    this.error.style.display = "none";
    console.log("gg nom");
    return true;
  }
  validateEmail(elt, regex) {
    if (!elt.value.match(regex) || elt.value == "") {
      this.error.style.display = "block";
      this.error.innerHTML =
        "Une erreur est survenue au niveau de l'adresse email";
      return false;
    }
    this.error.style.display = "none";
    console.log("gg email");
    return true;
  }
  validateMessage(elt) {
    if (elt.value.trim() < 2 || elt.value == "") {
      this.error.style.display = "block";
      this.error.innerHTML = "Une erreur est survenue au niveau du text";
      return false;
    }
    this.error.style.display = "none";
    console.log("gg message");
    return true;
  }
}
