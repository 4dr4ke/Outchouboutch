const guides = {
    pronunciations: {
        name: "Prononciations",
        desc: "Dans ce guide, les différentes prononciations exclusives de la langue sont expliquées !",
        content: [
            {text: "Digraphes :<br>Quand la lettre C est suivie d'un H, cela se prononce [k]"},
            {example: "<strong>Che</strong> sto fatu? (que fais-tu ?)"},
            {text: "Quand la lettre C est suivie d'un E ou d'un I, cela se prononce [s]"},
            {example: "Cecere! (au suivant !)"},
            {text: "Quand la lettre Ç est suivie d'une autre voyelle, cela se prononce de la même manière."},
            {text: "Quand la lettre G est suivie d'un E ou d'un I, cela se prononce [ʒ]"},
            {example: "Su gentu (tu es gentil)"},
            {text: "Monographes :"},
            {text: "La lettre X se prononce [ʁ]"},
            {example: "On xao (une rose)"},
            {text: "La lettre Z se prononce [θ]"},
            {text: "La lettre K se prononce [ks]"},
            {text: "Lorsqu'une voyelle est écrite avec un trémat, prononcez la de manière ouverte. Sinon, fermée."},
            {example: "Ogu, <strong>prosöm voatob</strong> cal <strong>oss pörtanuss</strong> (ici, nous pouvons voir quelque chose d'intéressant)"}
        ]
    },

    futur: {
        name: "Parler au futur",
        desc: "Maîtrisez le futur en quelques secondes de lectures !",
        content: [
            {
                text:
                    "Il y a deux façons de parler de quelque chose qui se passera dans le futur.<br>" +
                    "La première : mettre <i><mark><strong>go</mark></strong></i> avant le verbe."
            },
            {
                example: "Lo go mando <i>(je vais manger)</i>"
            },
            {
                text:
                    "La deuxième : utiliser le mot <mark><strong><i>tas</mark></strong></i> avant le verbe."
            },
            {
                example: "Lo tas mando <i>(je vais manger)</i>"
            },
            {
                text:
                    "La différence ? La première manière de parler du futur (<mark><strong><i>go</mark></strong></i>) s'emploie pour une décision spontanée ou une simple opinion, tandis que la deuxième (<i><mark><strong>tas</mark></strong></i>) sert pour quelque chose de planifié, de prévu, ou d'un fait visible dans le présent."
            }
        ]
    },

    past: {
        name: "Parler au passé",
        desc: "N'ayez pas peur, le passé est simple à apprendre !",
        content: [
            {
                text:
                    "Pour parler au passé, il faut mettre le mot <mark><strong><i>mo</i></strong></mark> avant le verbe."
            },
            {
                example: "Lo mo mando <i>(j'ai mangé / j'avais mangé)</i>"
            }
        ]
    },

    superlative: {
        name: "Le superlatif",
        desc: "Apprenez le superlatif comme il se doit, dans ce guide.",
        content: [
            {
                text:
                    "Pour utiliser le superlatif, il faut mettre le suffixe <mark><strong><i>en</mark></strong></i> sur un adjectif."
            },
            {
                example: "Ö trosten <i>(le plus triste)</i>"
            },
            {
                text:
                    "Il est aussi possible d'utiliser la forme suivante, qui donne le même résultat :"
            },
            {
                example: "Ö lüss trost"
            },
            {
                text:
                    "Vous pouvez également faire un mélange des deux formes afin d'exagérer ou de mettre davantage en valeur :"
            },
            {
                example: "Ö lüss trosten"
            }
        ]
    },

    gerund: {
        name: "Le gérondif / être en train de...",
        desc: "Vous dites plutôt gérondif ou participe présent ?",
        content: [
            {
                text:
                    "Pour dire que vous êtes en train d'effectuer une action ou utiliser le gérondif, placez le mot <i><mark><strong>sto</mark></strong></i> avant le verbe."
            },
            {
                example: "Lo sto dio <i>(Je suis en train de parler)</i>\nSil sto bruil! <i>(Il est en train de dessiner)</i>"
            },
            {
                text: "Note : le gérondif marche comme en Anglais."
            },
        ]
    },

    doubleS: {
        name: "Règle du double S",
        desc: "J'avais pas trop d'idée de nom...",
        content: [
            {
                text: "Lorsqu'un mot se termine par la sonorité [s], il est obligatoire de l'écrire avec un double S !"
            },
            {
                example: "Oguö sil portanu<mark><strong>ss</strong></mark> <i>(c'est important)</i>"
            },
            {
                text: "Sinon, suivez la règle par défaut : si le son [s] est suivi d'un E ou d'un I, écrivez le avec la lettre C<br>" +
                    "Si le son [s] est suivi de n'importe quelle voyelle n'étant pas un E ou un I, écrivez le avec la lettre ç"
            }
        ]
    }
};

const container = document.getElementById("guides-container");

for (const key of Object.keys(guides)) {

    const guide = guides[key];

    const box = document.createElement("div");
    box.classList.add("guide-box");

    const title = document.createElement("p");
    title.classList.add("guide-title");
    title.textContent = guide.name;

    const desc = document.createElement("p");
    desc.textContent = guide.desc;

    box.appendChild(title);
    box.appendChild(desc);

    box.addEventListener("click", () => {
        openGuide(guide);
    });

    container.appendChild(box);
}

const modal = document.getElementById("guide-modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");

function openGuide(guide) {

    modalTitle.textContent = guide.name;

    modalBody.innerHTML = "";

    for (const section of guide.content) {

        if (section.text) {

            const p = document.createElement("p");
            p.innerHTML = section.text;
            p.classList.add("guide-text");

            modalBody.appendChild(p);
        }

        if (section.example) {

            const example = document.createElement("p");
            example.innerHTML = section.example;
            example.classList.add("guide-example");

            modalBody.appendChild(example);
        }
    }

    modal.classList.remove("hidden");
}

modal.addEventListener("click", (e) => {

    if (e.target === modal) {
        modal.classList.add("hidden");
    }

});
