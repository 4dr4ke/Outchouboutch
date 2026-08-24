const verbs = [
    { verb: "sore", root: "s", translation: "être" },
    { verb: "vore", root: "v", translation: "avoir" },
    { verb: "diöb", root: "di", translation: "parler" },
    { verb: "tumöb", root: "tum", translation: "permettre" },
    { verb: "liöb", root: "li", translation: "aimer" },
    { verb: "prose", root: "pros", translation: "pouvoir" },
    { verb: "astoabre", root: "astoab", translation: "saluer" },
    { verb: "bru", root: "bru", translation: "dessiner" },
    { verb: "pare", root: "par", translation: "passer" },
    { verb: "vovöb", root: "vov", translation: "vivre" },
    { verb: "tasre", root: "tas", translation: "aller" },
    { verb: "fatiöb", root: "fati", translation: "fatiguer" },
    { verb: "fatce", root: "fat", translation: "faire" },
    { verb: "mande", root: "mand", translation: "manger" },
    { verb: "sevre", root: "sev", translation: "savoir" },
    { verb: "qere", root: "qer", translation: "chercher" },
    { verb: "pêçöb", root: "pêç", translation: "penser" },
    { verb: "velor", root: "vel", translation: "vouloir" },
    { verb: "xeflor", root: "xefl", translation: "réfléchir" },
    { verb: "regöb", root: "reg", translation: "regarder" },
    { verb: "voatöb", root: "voat", translation: "voir" },
    { verb: "conor", root: "con", translation: "comprendre" },
    { verb: "rovosre", root: "rov", translation: "rêver" },
    { verb: "rewosre", root: "rew", translation: "lire" },
    { verb: "ecusöb", root: "ecus", translation: "écouter" },
    { verb: "jotasre", root: "jot", translation: "jouer" },
    { verb: "triaste", root: "trias", translation: "travailler" },
    { verb: "lesaste", root: "lesa", translation: "dormir" },
    { verb: "debetse", root: "deb", translation: "devoir" },
    { verb: "venre", root: "ven", translation: "venir" },
    { verb: "lapre", root: "lap", translation: "laisser" },
    { verb: "aidöb", root: "aid", translation: "aider" },
    { verb: "eplasre", root: "eplas", translation: "expliquer" },
    { verb: "repöb", root: "rep", translation: "répondre" },
    { verb: "deshöb", root: "desh", translation: "descendre" },
    { verb: "daröb", root: "dar", translation: "dire" },
    { verb: "demasre", root: "dem", translation: "demander" },
    { verb: "pre", root: "pr", translation: "prendre" },
    { verb: "bexatöb", root: "bex", translation: "boire" },
    { verb: "ixat", root: "ix", translation: "hydrater" },
    { verb: "ibatsre", root: "ibat", translation: "habiter" },
    { verb: "tiure", root: "tiu", translation: "tuer" },
    { verb: "abröb", root: "ab", translation: "arrêter" },
    { verb: "glere", root: "gler", translation: "détester" },
    { verb: "raplapla", root: "rapl", translation: "épuiser" },
    { verb: "rupasre", root: "rup", translation: "respirer" },
    { verb: "kapla", root: "kap", translation: "construire" },
    { verb: "ferolöb", root: "fer", translation: "fermer" },
    { verb: "upolöb", root: "up", translation: "ouvrir" },
    { verb: "uxöb", root: "ux", translation: "oublier" },
    { verb: "ptara", root: "ptar", translation: "agir" },
    { verb: "ar", root: "ar", translation: "gratter" }
];

const persons = [
    ["Lö", "ö"],
    ["Lu", "u"],
    ["Lil", "il"],
    ["Lom", "om"],
    ["Lut", "ut"],
    ["Les", "es"]
]

function conjugate(root) {
    return persons.map(([person, suffix]) => {
        return `${person} ${root}${suffix}`;
    });
}

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