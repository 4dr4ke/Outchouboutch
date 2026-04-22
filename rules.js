const ruleButtons = document.getElementsByClassName("rule-wrapper");
for (const rule of ruleButtons) {
    rule.addEventListener("click", (e) => {
        const lastChild = rule.lastElementChild;
        lastChild.style.display = lastChild.style.display === "none" ? "flex" : "none";
    })
}