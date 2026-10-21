const req = new XMLHttpRequest();
req.open("GET", "/data/vocabulary.json");
req.responseType = "json";
req.onload = () => {

    let vocabulary = req.response;

    const container = document.getElementById("vocabulary-container");
    const multipleMeaningsText = "Cliquer pour découvrir les différentes significations..."

    for (const categoryKey of Object.keys(vocabulary)) {
        const category = vocabulary[categoryKey];
        const categoryTitle = document.createElement("p");
        categoryTitle.classList.add("voc-category-title");
        categoryTitle.textContent = category.title;

        container.appendChild(categoryTitle);

        for (const entry of category.vocabularyEntries) {
            const box = document.createElement("div");
            box.classList.add("voc-box");
            box.dataset.translation = entry.translation.toLowerCase();

            const word = document.createElement("p");
            word.classList.add("voc-word");
            word.textContent = entry.word;

            const translation = document.createElement("p");
            translation.classList.add("voc-translation");
            translation.textContent = entry.translation;

            if (entry.multipleMeanings != null && entry.multipleMeanings) {
                box.dataset.meanings = entry.word.toLowerCase();
                box.classList.add("voc-interactable");

                const meaningsBox  = document.createElement("div");
                meaningsBox.classList.add("voc-meanings-box");

                const title = document.createElement("p");
                title.classList.add("voc-meanings-title");
                title.textContent = "Significations de " + translation.textContent.toLowerCase().trim();
                meaningsBox.appendChild(title);

                const meaningsContainer = document.createElement("div");
                meaningsBox.appendChild(meaningsContainer);

                const meanings = entry.word.split("/");

                for (const meaning of meanings) {
                    const meaningText = document.createElement("p");
                    meaningText.textContent = meaning.trim().toLowerCase();
                    meaningText.style.marginBottom = "10px";
                    meaningText.style.fontSize = "17px";
                    meaningsContainer.appendChild(meaningText);
                }

                box.classList.add("voc-interactable");
                meaningsBox.style.display = "none";

                box.addEventListener("click", () => {
                    const overlay = document.createElement("div");
                    overlay.classList.add("black-overlay");

                    meaningsBox.style.display = "flex";

                    document.body.appendChild(overlay);

                    overlay.addEventListener("click", () => {
                        meaningsBox.style.display = "none";
                        overlay.remove();
                    });
                });

                word.textContent = multipleMeaningsText;
                word.style.fontStyle = "italic";
                word.style.color = "rgb(198,198,198)";

                document.body.appendChild(meaningsBox);
            }

            box.appendChild(word);
            box.appendChild(translation);

            container.appendChild(box);
        }
    }
}
req.send();

const vocWords = document.getElementsByClassName("voc-word");
const searchBox = document.getElementById("voc-search-box");

let lastSearched = null;

searchBox.addEventListener("keypress", (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const searched = format(searchBox.value);

    if (!searched) return;

    let found = null;

    for (const vocWord of vocWords) {
        if (format(vocWord.textContent) === searched) {
            found = vocWord;
            break;
        }
    }

    for (const vocWord of vocWords) {
        const box = vocWord.parentElement;

        const translation = format(box.dataset.translation || "");
        const meanings = (box.dataset.meanings || "").split("/").map(m => format(m));

        if (translation === searched || meanings.includes(searched)) {
            found = vocWord;
            break;
        }
    }

    if (!found) {
        let bestScore = -1;

        for (const vocWord of vocWords) {
            const word = format(vocWord.textContent);

            let score = 0;

            for (const letter of searched) {
                if (word.includes(letter)) {
                    score++;
                }
            }

            if (score > bestScore) {
                bestScore = score;
                found = vocWord;
            }
        }
    }

    if (!found) return;

    found.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    const parent = found.parentElement;

    parent.style.backgroundColor = "#252b2e";
    parent.style.color = "white";

    if (lastSearched && lastSearched !== found) {
        const lastParent = lastSearched.parentElement;
        lastParent.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
    }

    lastSearched = found;
    searchBox.value = "";
});

function format(text) {
    return text
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}
