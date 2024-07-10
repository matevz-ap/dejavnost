const pb = new PocketBase("https://dejavnost.mapsoft.net");
let activities = {
    show: [],
    explain: [],
    draw: []
};

pb.collection("deck")
    .getFullList()
    .then((decks) => {
        const deckSelection =
            document.getElementById("deckSelection");
        for (const deck of decks) {
            const option = document.createElement("option");
            option.value = deck.id;
            option.text = deck.name;
            deckSelection.appendChild(option);
        }
    })
    .then(() => {
        loadDeck(document.getElementById("deckSelection").value);
    });

document
    .getElementById("deckSelection")
    .addEventListener("change", (event) => {
        loadDeck(event.target.value);
    });

function loadDeck(deckId) {
    activities = {
        show: [],
        explain: [],
        draw: []
    };
    const records = pb
        .collection("activity")
        .getFullList({
            filter: `deck='${deckId}'`,
            sort: "-created",
        })
        .then((records) => {
            for (const activity of records) {
                activities[activity.type].push(activity);
            }
        });
}

function selectActivity(activityType) {
    if (activities[activityType].length == 0) {
        alert("No more activities");
        return;
    }

    let index = Math.floor(
        Math.random() * activities[activityType].length,
    );
    let activity = activities[activityType].splice(index, 1)[0];
    document.getElementById("currentActivity").innerHTML = `
        <h3>${activity.name}</h3>
    `;
}