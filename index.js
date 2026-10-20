console.log('Hello, world ✨')

const changePageButtons = document.querySelectorAll('.change-page-button');

changePageButtons.forEach(function (changePageButton) {
    changePageButton.addEventListener("click", function (event) {
        window.location.href = changePageButton.id + ".html";
    })
})
