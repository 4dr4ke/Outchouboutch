const req = new XMLHttpRequest();
req.open("GET", "/data/guides.json");
req.responseType = "json";
req.onload = () => {
    const container = document.getElementById("guides-container");

    for (const key of Object.keys(req.response)) {

        const guide = req.response[key];
        console.log(guide);
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
}
req.send();
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
