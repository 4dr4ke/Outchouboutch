let verbs = [];

const persons = [
    ["Lo", "o"],
    ["Lu", "u"],
    ["Lil", "il"],
    ["Löm", "öm"],
    ["Lut", "ut"],
    ["Les", "es"]
];

const req = new XMLHttpRequest();
req.open("GET", "/data/verbs.json");
req.responseType = "json";
req.onload = () => {

    verbs = req.response;
    
    const container = document.getElementById("verbs-container");

    for (let i = 0; i < verbs.length; i += 2) {

        const box = document.createElement("div");
        box.classList.add("verb-box");

        // left verb
        const leftVerb = createVerbColumn(verbs[i]);
        box.appendChild(leftVerb);

        // right verb
        if (verbs[i + 1]) {
            const rightVerb = createVerbColumn(verbs[i + 1]);
            box.appendChild(rightVerb);
        }

        container.appendChild(box);
    }
}
req.send();

function conjugate(root) {
    return persons.map(([person, suffix]) => {
        return `${person} ${root}${suffix}`;
    });
}



function createVerbColumn(verbEntry) {
    const column = document.createElement("div");
    column.classList.add("verb-column");

    const verbTitle = document.createElement("p");
    verbTitle.classList.add("verb-title");

    verbTitle.innerHTML =
        `<strong><mark>${capitalizeFirstLetter(verbEntry.root)}</mark>${verbEntry.verb.replace(verbEntry.root, "")}</strong>
        <i>(${verbEntry.translation})</i>`;

    const conjugatedText = document.createElement("div");
    conjugatedText.classList.add("conjugated-verb");

    conjugatedText.innerHTML = conjugate(verbEntry.root)
        .map(line => `<p>${line}</p>`)
        .join("");

    column.appendChild(verbTitle);
    column.appendChild(conjugatedText);

    return column;
}

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const searchBox = document.getElementById("verb-search-box");
const verbTitles = document.getElementsByClassName("verb-title");

let lastFound = null;

searchBox.addEventListener("keypress", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();

    const searched = format(searchBox.value);

    if (!searched) return;

    let found = null;

    for (const verbTitle of verbTitles) {
        if (format(removeParentheses(verbTitle.textContent)) === searched) {
            found = verbTitle;
            break;
        }
    }

    if (!found) {
        let bestScore = -1;

        for (const verbTitle of verbTitles) {
            const word = format(removeParentheses(verbTitle.textContent));

            let score = 0;

            for (const letter of searched) {
                if (word.includes(letter)) {
                    score++;
                }
            }

            if (score > bestScore) {
                bestScore = score;
                found = verbTitle;
            }
        }
    }

    if (!found) return;
    found.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    if (lastFound && lastFound !== found) {
        const lastParent = lastFound.parentElement.parentElement;
        lastParent.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
    }

    lastFound = found;

    const parent = found.parentElement.parentElement;
    parent.style.backgroundColor = "#252b2e";
    parent.style.color = "white";

    searchBox.value = "";
})

function format(text) {
    return text
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function removeParentheses(text) {
    let start = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === "(") {
            start = i + 1;
        }
    }
    return text.slice(start, text.length - 1);
}
