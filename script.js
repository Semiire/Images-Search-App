const accessKey = "D5xGKVsRTVW5viOPOpEXymWOIKLvrrhNzo_0fQd15j0";

const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

// Truncate text description to specified number of lines
// Function to truncate text description to specified number of lines
// Function to truncate text description to specified number of lines
function truncateDescription(descriptionElement, maxLines) {
  const lineHeight = parseFloat(
    window.getComputedStyle(descriptionElement).lineHeight
  );
  const maxHeight = lineHeight * maxLines;

  // Set a temporary height to get the scrollHeight
  descriptionElement.style.height = "auto";
  const scrollHeight = descriptionElement.scrollHeight;

  // If the scrollHeight exceeds the maximum height, truncate the text
  if (scrollHeight > maxHeight) {
    descriptionElement.style.height = maxHeight + "px";
    descriptionElement.style.overflow = "hidden";
  }
}

// Call truncateDescription function for each search result
function truncateDescriptions(maxLines) {
  const descriptionElements = document.querySelectorAll(".search-result a");
  descriptionElements.forEach((descriptionElement) => {
    truncateDescription(descriptionElement, maxLines);
  });
}

async function searchImages() {
  inputData = inputElement.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });

  truncateDescriptions(4);

  page++;
  if (page > 1) {
    showMore.style.display = "block";
  }
}

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMore.addEventListener("click", () => {
  searchImages();
});
