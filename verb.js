// verbs page
const verbTables = document.getElementsByClassName("verb-table");
const verbSearchBar = document.getElementById("verb-search-bar");
const verbs = document.getElementsByClassName("verb");
let verbLastModified = null;

const verbes = [
    { verbe: "Être : losre", racine: "los" },
    { verbe: "Avoir : vre", racine: "vr" },
    { verbe: "Parler : diole", racine: "dio" },
    { verbe: "Permettre : permet", racine: "perme" },
    { verbe: "Aimer : liobe", racine: "liob" },
    { verbe: "Pouvoir : prose", racine: "pros" },
    { verbe: "Saluer : astoabre", racine: "astoab" },
    { verbe: "Dessiner : bruh", racine: "bruh" },
    { verbe: "Passer : parre", racine: "parr" },
    { verbe: "Vivre : vove", racine: "vov" },
    { verbe: "Aller : tasre", racine: "tas" },
    { verbe: "Fatiguer : fatiöb", racine: "fati" },
    { verbe: "Faire : fatce", racine: "fat" },
    { verbe: "Manger : mande", racine: "mand" },
    { verbe: "Savoir : sevre", racine: "sev" },
    { verbe: "Chercher : chere", racine: "cher" },
    { verbe: "Penser : pensre", racine: "pens" },
    { verbe: "Vouloir : velor", racine: "vel" },
    { verbe: "Réfléchir : reflese", racine: "refles" },
    { verbe: "Regarder : regaste", racine: "reg" },
    { verbe: "Voir : voatöb", racine: "voat" },
    { verbe: "Comprendre : conor", racine: "con" },
    { verbe: "Rêver : rovosre", racine: "rov" },
    { verbe: "Lire : rewosre", racine: "rew" },
    { verbe: "Écouter : ecusre", racine: "ecus" },
    { verbe: "Jouer : jotasre", racine: "jot" },
    { verbe: "Travailler : triaste", racine: "trias" },
    { verbe: "Dormir : lesaste", racine: "lesa" },
    { verbe: "Devoir : debetse", racine: "deb" },
    { verbe: "Venir : venre", racine: "ven" },
    { verbe: "Laisser : lapre", racine: "lap" },
    { verbe: "Aider : aidöb", racine: "aid" },
    { verbe: "Expliquer : eplasre", racine: "eplas" },
    { verbe: "Répondre : repöb", racine: "rep" },
    { verbe: "Descendre : deshöb", racine: "desh" },
    { verbe: "Dire : daröb", racine: "dar" },
    { verbe: "Demander : demasre", racine: "dem" },
    { verbe: "Prendre : pre", racine: "pr" },
    { verbe: "Boire : bxatöb", racine: "b" },
    { verbe: "Hydrater : ixat", racine: "ix" },
    { verbe: "Habiter : ibatsre", racine: "ibat" },
    { verbe: "Tuer : tiure", racine: "tiu" },
    { verbe: "Arrêter : abröb", racine: "ab" },
    { verbe: "Détester : glere", racine: "gler" },
    { verbe: "Épuiser : raplapla", racine: "rapl" },
    { verbe: "Respirer : rupasre", racine: "rup" },
    { verbe: "Construire : kapla", racine: "kap" },
    { verbe: "Fermer : ferolöb", racine: "fer" },
    { verbe: "Ouvrir : upolöb", racine: "up" },
    { verbe: "Oublier : uhxöb", racine: "uhx" },
    { verbe: "Agir : ptara", racine: "ptar"}
];

function conjugatePresent(racine) {
    const personnes = [
        ["Luo", "o"],
        ["Luü", "u"],
        ["Luil", "il"],
        ["Lubo", "om"],
        ["Lubu", "ut"],
        ["Lues", "es"]
    ];

    return personnes.map(([pers, suffix]) => {
        return `${pers} ${racine}${suffix}`;
    });
}

function generateVerb(fr, lang, racine) {
    const conjugated = conjugatePresent(racine)
        .map(line => `<p>${line}</p>`)
        .join("\n");

    const suffix = lang.replace(racine, "");

    return `
        <div class="verb-table">
            <p class="verb"><mark>${racine}</mark>${suffix} : ${fr}</p>
            <div class="hline"></div>
            ${conjugated}
        </div>`;
}

function generateVerbs(verbs) {
    let html = "";

    for (let i = 0; i < verbs.length; i += 2) {
        const v1 = verbs[i];
        const v2 = verbs[i + 1];

        const verbs1 = v1.verbe.split(":").map(s => s.trim());
        const verbs2 = v2 ? v2.verbe.split(":").map(s => s.trim()) : null;

        html += `
            <div style="display: flex; align-items: center; justify-content: center; gap: 10px">
                ${v1 ? generateVerb(verbs1[0], verbs1[1], v1.racine) : ""}
                ${v2 ? generateVerb(verbs2[0], verbs2[1], v2.racine) : ""}
            </div>
        `;
    }

    return html;
}

const verbContainer = document.getElementById("verbs-container");
verbContainer.innerHTML = generateVerbs(verbes);

verbSearchBar.addEventListener("keypress", (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    let searched = verbSearchBar.value.toLowerCase().trim();
    let foundElement = null;

    for (const verb of verbs) {
        const verbText = verb.textContent.toLowerCase().trim().split(":");
        for (const text of verbText) {
            if (text.trim() === searched.trim()) {
                foundElement = verb;
                break;
            }
        }
    }

    if (!foundElement) {
        let bestMatch = null;
        let bestScore = -1;

        for (const otherWord of verbs) {
            const words = otherWord.textContent.toLowerCase().trim().split(":");
            let currentScore = 0;

            for (const letter of searched) {
                for (const word of words) {
                    if (word.trim().includes(letter)) currentScore++;
                }
            }

            if (currentScore > bestScore) {
                bestScore = currentScore;
                bestMatch = otherWord;
            }
        }

        foundElement = bestMatch;
    }

    if (searched === "etre") {
        for (const verb of verbs) {
            const words = verb.textContent.toLowerCase().trim()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .split(":");

            for (const word of words) {
                if (word.trim() === searched) {
                    foundElement = verb;
                }
            }
        }
    }

    if (!foundElement) return;

    foundElement.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    foundElement.parentElement.style.backgroundColor = "rgb(180 180 110)"

    if (verbLastModified) {
        verbLastModified.parentElement.style.backgroundColor = "rgb(194 194 194)"
    }

    verbLastModified = foundElement
    verbSearchBar.value = "";
});

for (const verb of verbTables) {
    console.log(verb);
    verb.addEventListener("click", (e) => {
        verb.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
        console.log("clicked");
    })
}
