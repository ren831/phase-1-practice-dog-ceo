console.log("%c HI", "color: firebrick");

document.addEventListener("DOMContentLoaded", function () {
  let dogImangeContainer = document.getElementById("dog-image-container");

  let dogUL = document.querySelector("#dog-breeds");

  //Challenge 1
  fetch("https://dog.ceo/api/breeds/image/random/4")
    .then((response) => response.json())
    .then(function (jsonObject) {
      let arrayOfDogs = jsonObject.message;
      arrayOfDogs.forEach((url) => {
        dogImangeContainer.innerHTML += makeImageTag(url);
      });
    });

  //Challenge 2
  fetch("https://dog.ceo/api/breeds/list/all")
    .then((response) => response.json())
    .then((response) => {
      let dogBreedsArr = Object.keys(response.message);
      dogBreedsArr.forEach((breed) => {
        dogUL.innerHTML += `<li data-info="breed">${breed}</li>`;
      });
    });
  //Challenge 3
  dogUL.addEventListener("click", function (event) {
    if (event.target.dataset.info === "breed") {
      event.target.style.color = "red";
    }
  });
  // Challenge 4
  let dogSelect = document.getElementById("breed-dropdown");
  dogSelect.addEventListener("change", (event) => {
    fetch("https://dog.ceo/api/breeds/list/all").then((response) =>
      response.json().then((response) => {
        let dogBreedsArr = Object.keys(response.message);

        let filteredArray = dogBreedsArr.filter((breed) => {
          return breed.startsWith(event.target.value);

          dogUL.innerHTML = "";
          filteredArray.forEach((breed) => {
            dogUL.innerHTML += `<li data-info="breed">${breed}</li>`;
          });
        });
      })
    );
  });
});

function makeImageTag(url) {
  return `<img src="${url}"/>`;
}
