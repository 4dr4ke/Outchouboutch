const buttons = document.getElementsByClassName("button");
const searchBars = document.getElementsByClassName("search-box");
const topOffsets = []

for (const searchBar of searchBars) {
    topOffsets[searchBar.id] = searchBar.offsetTop;
}

for (const button of buttons) {
    button.addEventListener("click", (e) => {
        const category = button.textContent.toLowerCase().trim();
        open(category + ".html");
    })
}

window.addEventListener("scroll", () => {
    for (const searchBar of document.getElementsByClassName("search-box")) {
        if (window.scrollY >= topOffsets[searchBar.id]) {
            searchBar.style.position = "fixed";
            searchBar.style.top = "0";
        } else {
            searchBar.style.position = "static";
        }
    }
});