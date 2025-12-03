function createDefaultSession() {
    return {
        wineEntry: {
            name: "Wine Name",
            photo: null,
            year: "",
            country: "",
            price: "",
            date: "",
            winery: "",
            grapes: [""],
            flavors: [""],
            ratings: [],
        },
        playerEntries: [
            {
                name: "",
                flavorGuesses: ["","","","",""],
                grapes: [""],
                country: "",
                score: "",
                rating: "",
                priceRating: "",
                priceGuess: "",
                comment: ""
            },
            {
                name: "",
                flavorGuesses: ["", "", "", "", ""],
                grapes: [""],
                country: "",
                score: "",
                rating: "",
                priceRating: "",
                priceGuess: "",
                comment: ""
            },
        ]
    }
}

/*const currentSession = [createDefaultSession()];*/
const currentSession = [];


function createSession() {
    const sessionDiv = document.createElement('div');
    sessionDiv.id = 'session';
    sessionDiv.style.display = 'flex';
    sessionDiv.style.flexWrap = 'wrap';

    const newSession = createDefaultSession();
    currentSession.push(newSession);

    const sessionElement = document.getElementById('session');
    createTastingEntry(newSession, sessionElement);

    console.log("sessionItems: " + currentSession.length);
    renderSession(currentSession, 'session');
}

function renderSession(sessionId, elementId) {

    const sessionElement = document.getElementById(elementId);
    sessionElement.innerHTML = '';

    if (currentSession.length >= 1) {

        sessionItems = sessionId.map((tastingData) => {
            return createTastingEntry(tastingData, sessionElement);
        })
        console.log("sessionItems: " + currentSession.length);
    }
    else {
        console.log("No sessions to render!");
    }
}

function readSession() {
    if (currentSession.length >= 1) {
        printComments(currentSession);
    }
    else {
        console.log("No comments to read!");
    }
}

function updateSession() {
    renderSession(currentSession, 'session');
}

function deleteSession() {
    //const sessio = document.getElementById('session');
    //sessio.replaceChildren();

    if (currentSession.length == 0) {
        console.log("No entries to delete!");
        return;
    }
    else {
        currentSession.pop();
        console.log("Successfully deleted latest entry.");
        renderSession(currentSession, 'session');
    } 
}

function printComments(sessionState) {
    const playerEntries = sessionState[0].playerEntries;

    playerEntries.forEach(entry => {
        if (entry.comment !== "") {
            console.log(entry.comment);
        }
    });
    return;
}

function insertInputEntry(text, entry, content) {
    const container = document.createElement('div');
    const thisEntry = document.createTextNode(text)
    const textInput = document.createElement('input');

    textInput.type = 'text';
    textInput.style.background = 'transparent';
    textInput.style.border = 'none';
    textInput.style.outline = 'none';

    if (content != undefined) {
        textInput.setAttribute("value", content);
    }

    container.appendChild(thisEntry);
    container.appendChild(textInput);
    entry.appendChild(container);
}

function createTastingEntry(sessionId, elementId) {
    createPlayerEntry(sessionId, elementId, 0),
    createPlayerEntry(sessionId, elementId, 1)
    createWineEntry(sessionId, elementId);
}

function createWineEntry(sessionId, elementId) {
    const wineEntry = document.createElement('div');
    wineEntry.className = 'wineEntry';
    wineEntry.style.border = '2px solid';
    wineEntry.style.borderRadius = '1px';
    wineEntry.style.minWidth = '100px';
    wineEntry.style.flexBasis = '85%';
    wineEntry.style.margin = '15px';

    const wineName = document.createTextNode('Viini');
    wineEntry.appendChild(wineName);

    insertInputEntry('Name: ', wineEntry, sessionId.wineEntry.name);
    insertInputEntry('Vuosi ', wineEntry, sessionId.wineEntry.year);
    insertInputEntry('Kuva: Tähän tulee oikeesti kuva ', wineEntry);
    insertInputEntry('Pvm ', wineEntry, sessionId.wineEntry.date);
    insertInputEntry('Maa: ', wineEntry, sessionId.wineEntry.country);
    insertInputEntry('Tila: ', wineEntry, sessionId.wineEntry.winery);
    insertInputEntry('Hinta: ', wineEntry, sessionId.wineEntry.price);
    insertInputEntry('Rypäleet: ', wineEntry, sessionId.wineEntry.grapes);
    insertInputEntry('Maut: ', wineEntry, sessionId.wineEntry.flavors);

    elementId.appendChild(wineEntry);
    return wineEntry;
}

function createPlayerEntry(sessionId, elementId, playerNumber) {
    const playerEntry = document.createElement('div');
    playerEntry.className = 'playerEntry';
    playerEntry.style.border = '2px solid';
    playerEntry.style.borderRadius = '1px';
    playerEntry.style.minWidth = '100px';
    playerEntry.style.flexBasis = '40%';
    playerEntry.style.margin = '15px';

    const nameEntry = document.createTextNode('Nimi: ' + sessionId.playerEntries[playerNumber].name);
    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.style.background = 'transparent';
    textInput.style.border = 'none';
    textInput.style.outline = 'none';

    playerEntry.appendChild(nameEntry);
    playerEntry.appendChild(textInput);

    for (let i = 1; i <= 5; i++) {
        const entry = document.createElement('div');

        const numberText = document.createTextNode(i + '. ');
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.style.background = 'transparent';
        inputElement.style.border = 'none';
        inputElement.style.outline = 'none';
        entry.appendChild(numberText);
        entry.appendChild(inputElement);
        playerEntry.appendChild(entry);
    }

    insertInputEntry('Maa: ', playerEntry, sessionId.playerEntries[playerNumber].country);
    insertInputEntry('Rypäleet: ', playerEntry, sessionId.playerEntries[playerNumber].grapes);
    insertInputEntry('Kouluarvosana: ', playerEntry, sessionId.playerEntries[playerNumber].rating);
    insertInputEntry('Pisteet: ', playerEntry, sessionId.playerEntries[playerNumber].score);
    insertInputEntry('Comment: ', playerEntry, sessionId.playerEntries[playerNumber].comment);

    elementId.appendChild(playerEntry);
    return playerEntry;
}