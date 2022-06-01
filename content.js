const MYSTERIES_ORDER = [143188, 143189, 143190, 143191, 143192];
const MYSTERIES_SELECTOR = MYSTERIES_ORDER.map((i) => `div[data-branch-id='${i}']`).join(", ");

const NEATHBOW_ORDER = [141683, 142658, 142674, 142711, 142712, 142713, 142714];
const NEATHBOW_SELECTOR = NEATHBOW_ORDER.map((i) => `div[data-quality-id='${i}']`).join(", ");

function sortMysteries(node) {
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

function sortNeathbowBoxes(node) {
    const neathbowIcons = node.querySelectorAll(NEATHBOW_SELECTOR);
    if (neathbowIcons.length <= 1) {
        return;
    }

    const neathbow = Array
        .from(neathbowIcons)
        .sort((i1, i2) => i1.dataset.qualityId - i2.dataset.qualityId)
        .map((icon) => icon.parentElement);

    const parent = neathbowIcons[0].parentElement.parentElement;
    const start = neathbowIcons[0].parentElement.previousSibling;

    neathbow
        .slice(1)
        .reverse()
        .forEach(mystery => {
            parent.removeChild(mystery);
            neathbow[0].after(mystery);
        })
}

let qualityListObserver = new MutationObserver(function (mutations) {
    for (let m = 0; m < mutations.length; m++) {
        const mutation = mutations[m];

        for (let n = 0; n < mutation.addedNodes.length; n++) {
            const node = mutation.addedNodes[n];

            if (node.nodeName !== "DIV") {
                continue;
            }

            const accomplishments = node.querySelectorAll("div[data-group-name='Accomplishments']");
            if (accomplishments.length > 0) {
                console.debug("[FL Mystery Sorter] Accomplishments found!")
                sortMysteries(node);
            }

            const contrabandSection = node.querySelectorAll("div[data-group-name='Contraband']");
            if (contrabandSection.length > 0) {
                console.debug("[FL Mystery Sorter] Contraband section found!");
                sortNeathbowBoxes(node);
            }
        }
    }
});

qualityListObserver.observe(document, {childList: true, subtree: true});