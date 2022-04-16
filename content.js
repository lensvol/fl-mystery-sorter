const MYSTERIES_ORDER = [143188, 143189, 143190, 143191, 143192];
const MYSTERIES_SELECTOR = MYSTERIES_ORDER.map((i) => `div[data-branch-id='${i}']`).join(", ");

let qualityListObserver = new MutationObserver(function (mutations) {
    for (let m = 0; m < mutations.length; m++) {
        const mutation = mutations[m];

        for (let n = 0; n < mutation.addedNodes.length; n++) {
            const node = mutation.addedNodes[n];

            if (node.nodeName !== "DIV") {
                continue;
            }

            const accomplishments = node.querySelectorAll("div[data-group-name='Accomplishments']");
            if (accomplishments.length === 0) {
                continue;
            }

            console.log("[FL Mystery Sorter] Accomplishments found!")
            const mysteryIcons = node.querySelectorAll(MYSTERIES_SELECTOR);
            if (mysteryIcons.length <= 1) {
                return;
            }

            const mysteries = Array
                .from(mysteryIcons)
                .sort((i1, i2) => i1.dataset.branchId - i2.dataset.branchId)
                .map((icon) => icon.parentElement);

            const parent = mysteries[0].parentElement;
            const start = mysteries[0].previousSibling;

            mysteries
                .slice(1)
                .reverse()
                .forEach(mystery => {
                    parent.removeChild(mystery);
                    mysteries[0].after(mystery);
                })
        }
    }
});

qualityListObserver.observe(document, {childList: true, subtree: true});