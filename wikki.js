let searchInputEl = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinnerElement = document.getElementById("spinner");

function crateAndAppend(results) {
    let {
        title,
        link,
        description
    } = results;
    //container element
    let resultsContainer = document.createElement("div");
    resultsContainer.classList.add("result-item");

    searchResults.appendChild(resultsContainer);
    //anchor title
    let resultTitle = document.createElement("a");
    resultTitle.classList.add("result-title");
    resultTitle.textContent = title;
    resultTitle.href = link;
    resultTitle.target = "_blank";

    resultsContainer.appendChild(resultTitle);
    //break Element
    let titleBreakElement = document.createElement("br");

    resultsContainer.appendChild(titleBreakElement);
    //link anchor
    let linkElement = document.createElement("a");
    linkElement.classList.add("result-url");
    linkElement.textContent = link;
    linkElement.href = link;
    linkElement.target = "_blank";

    resultsContainer.appendChild(linkElement);
    //link break
    let linkBreakElement = document.createElement("br");

    resultsContainer.appendChild(linkBreakElement);
    //description
    let descriptionElement = document.createElement("p");
    descriptionElement.classList.add("link-description");
    descriptionElement.textContent = description;

    resultsContainer.appendChild(descriptionElement);

}

function displayResults(data) {
    spinnerElement.classList.toggle("d-none");
    for (let results of data) {
        crateAndAppend(results);
    }
}

function wikipedia(event) {
    if (event.key === "Enter") {
        spinnerElement.classList.toggle("d-none");
        searchResults.textContent = "";
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            })
    }
}
searchInputEl.addEventListener("keydown", wikipedia);