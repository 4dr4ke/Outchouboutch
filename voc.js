const vocWords = document.getElementsByClassName("voc");
const vocBoxes = document.getElementsByClassName("voc-box");
const vocSearchBar = document.getElementById("voc-search-bar");
const summaryButtons = document.getElementsByClassName("summary-button");
const summaryCategories = document.getElementsByClassName("summary-categories");
const dict = {};
let vocLastModified = null;

for (const vocBox of vocBoxes) {
    const vocs = [...vocBox.getElementsByClassName("voc")];

    if (vocs.length < 2) continue;

    const key = format(vocs[vocs.length - 1].textContent).trim();

    for (let i = 0; i < vocs.length - 1; i++) {
        const value = format(vocs[i].textContent).trim();
        dict[key] = value;
    }
}

console.log(dict)

localStorage.setItem("words", JSON.stringify(dict));

vocSearchBar.addEventListener("keypress", (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    let searched = vocSearchBar.value.toLowerCase().trim();
    let foundElement = null;

    for (const vocWord of vocWords) {
        if (vocWord.textContent.toLowerCase().trim() === searched) {
            foundElement = vocWord;
            break;
        }
    }

    if (!foundElement) {
        let bestMatch = null;
        let bestScore = -1;

        for (const otherWord of vocWords) {
            const word = otherWord.textContent.toLowerCase().trim();
            let currentScore = 0;

            for (const letter of searched) {
                if (word.includes(letter)) {
                    currentScore++;
                }
            }

            if (currentScore > bestScore) {
                bestScore = currentScore;
                bestMatch = otherWord;
            }
        }

        foundElement = bestMatch;
    }

    if (!foundElement) return;

    foundElement.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    const parent = foundElement.parentElement;
    parent.style.backgroundColor = "rgb(0, 0, 0)"
    parent.style.color = "white"

    if (vocLastModified != null && vocLastModified !== foundElement) {
        const lastParent = vocLastModified.parentElement
        lastParent.style.backgroundColor = "#bfbfbf"
        lastParent.style.color = "#000000"
    }

    vocLastModified = foundElement
    vocSearchBar.value = "";
});

for (const button of summaryButtons) {
    button.addEventListener("click", (e) => {
        let category = null
        for (const summaryCategory of summaryCategories) {
            if (summaryCategory.textContent.toLowerCase().trim() === button.textContent.toLowerCase().trim()) category = summaryCategory;
        }

        if (!category) return;
        category.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    })
}

function format(text) {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}