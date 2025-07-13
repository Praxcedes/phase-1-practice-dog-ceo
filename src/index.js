const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";
let allBreeds = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchDogImages();
  fetchBreeds();
  addBreedClickHandler();
  addDropdownFilter();
});

function fetchDogImages() {
  fetch(imgUrl)
    .then(res => res.json())
    .then(data => {
      const imageContainer = document.getElementById("dog-image-container");
      data.message.forEach(imageUrl => {
        const img = document.createElement("img");
        img.src = imageUrl;
        imageContainer.appendChild(img);
      });
    });
}

function fetchBreeds() {
  fetch(breedUrl)
    .then(res => res.json())
    .then(data => {
      allBreeds = Object.keys(data.message);
      renderBreeds(allBreeds);
    });
}

function renderBreeds(breeds) {
  const breedList = document.getElementById("dog-breeds");
  breedList.innerHTML = "";
  breeds.forEach(breed => {
    const li = document.createElement("li");
    li.textContent = breed;
    breedList.appendChild(li);
  });
}

function addBreedClickHandler() {
  const breedList = document.getElementById("dog-breeds");
  breedList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      e.target.style.color = "blue";
    }
  });
}

function addDropdownFilter() {
  const dropdown = document.getElementById("breed-dropdown");
  dropdown.addEventListener("change", (e) => {
    const selectedLetter = e.target.value;
    const filteredBreeds = selectedLetter === "all"
      ? allBreeds
      : allBreeds.filter(breed => breed.startsWith(selectedLetter));
    renderBreeds(filteredBreeds);
  });
}

