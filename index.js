console.log('Hello, world ✨')

const changePageButtons = document.querySelectorAll('.change-page-button');

changePageButtons.forEach(function (changePageButton) {
    changePageButton.addEventListener("click", function (event) {
        window.location.href = changePageButton.id + ".html";
    })
})

const searchBars = document.getElementsByClassName("search-box");
const topOffsets = []

for (const searchBar of searchBars) {
    topOffsets[searchBar.id] = searchBar.offsetTop;
}

window.addEventListener("scroll", () => {
    for (const searchBar of document.getElementsByClassName("search-box")) {
        if (window.scrollY >= topOffsets[searchBar.id] + 100) {
            searchBar.style.position = "fixed";
            searchBar.style.top = "0";
        } else {
            searchBar.style.position = "static";
        }
    }
});
