export default class form {
  displayForm() {
    const close = document.getElementById("close");
    const form = document.getElementById("formContact");
    const listPhotos = document.getElementById("contain_picture");
    console.log(close);

    close.addEventListener("click", () => {
      form.style.display = "none";
      listPhotos.style.display = "flex";
    });
  }

  valdation() {
    //const formulaire
    const form = document.getElementById("formContact");
    const firstName = document.getElementById("prenom");
    const lastName = document.getElementById("nom");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    //regex
    const regexTxt = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/;
    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let validation =
        this.validateFirstName(firstName, regexTxt) &&
        this.validateLastName(lastName, regexTxt) &&
        this.validateEmail(email) &&
        this.validateMessage(message);

      if (validation) {
        this.resultConsole(firstName,lastName,email,message)
      } else {
        console.log("Une erreur est survenue");
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
      console.log("error prenom");
      return false;
    }
    console.log("gg prenom");
    return true;
  }

  validateLastName(elt, regex) {
    if (
      elt.value.trim().length < 1 ||
      elt.value == "" ||
      !elt.value.match(regex)
    ) {
      console.log("error nom");
      return false;
    }
    console.log("gg nom");
    return true;
  }
  validateEmail(elt, regex) {
    if (!elt.value.match(regex) || elt.value == "") {
      console.log("error email");
      return false;
    }
    console.log("gg email");
    return true;
  }
  validateMessage(elt) {
    if (elt.value.trim() < 2 || elt.value == "") {
      console.log("error message");
      return false;
    }
    console.log("gg message");
    return true;
  }
}

// function allValidationsPassed() {
//   return (
//     validateFirstName() &&
//     validateLastName() &&
//     validateEmail() &&
//     validateMessage()
//   );
// }

// function validate(e) {
//   if (allValidationsPassed()) {
//     return true;
//   }
//   e.preventDefault();
// }
// validate();

// displayForm();
