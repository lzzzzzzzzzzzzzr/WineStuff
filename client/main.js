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
    createTastingEntry(newSession, sessionElement, currentSession.length);
    renderSession(currentSession, 'session');
}

function renderSession(sessionId, elementId) {
    console.log("RENDER");
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

function insertInputEntry(text, entry, content, tastingIndex, playerEntryIndex, propertyKey) {
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

    //event stuff
    if (tastingIndex !== undefined && propertyKey !== undefined) {
        console.log("tastingIndex: " + tastingIndex);
        textInput.onchange = (e) => {
            if (playerEntryIndex === undefined || playerEntryIndex === null) {
                sessionState[tastingIndex].wineEntry[propertyKey] = e.target.value;
            } else {
                sessionstate[tastingIndex].playerEntries[playerEntryIndex][propertyKey] = e.target.value;
            }
        }
        console.log("tastingIndex: " + tastingIndex);
        textInput.onblur = (e) => { renderSession(); }
    }


   /* console.log(content + " tastingIndex: " + tastingIndex + " ,playerEntryIndex: " + playerEntryIndex);*/

    container.appendChild(thisEntry);
    container.appendChild(textInput);
    entry.appendChild(container);
}

function createTastingEntry(sessionId, elementId, tastingIndex) {
    createPlayerEntry(sessionId, elementId, 0, tastingIndex),
    createPlayerEntry(sessionId, elementId, 1)
    createWineEntry(sessionId, elementId, tastingIndex);
}

function createWineEntry(sessionId, elementId, tastingIndex) {
    const wineEntry = document.createElement('div');
    wineEntry.className = 'wineEntry';
    wineEntry.style.border = '2px solid';
    wineEntry.style.borderRadius = '1px';
    wineEntry.style.minWidth = '100px';
    wineEntry.style.flexBasis = '85%';
    wineEntry.style.margin = '15px';

    const wineName = document.createTextNode('Viini');
    wineEntry.appendChild(wineName);

    insertInputEntry('Name: ', wineEntry, sessionId.wineEntry.name, tastingIndex, null, 'name');
    insertInputEntry('Vuosi ', wineEntry, sessionId.wineEntry.year, tastingIndex, null, 'year');
    insertInputEntry('Kuva: Tähän tulee oikeesti kuva ', wineEntry, null, tastingIndex, null, 'photo');
    insertInputEntry('Pvm ', wineEntry, sessionId.wineEntry.date, tastingIndex, null,'date');
    insertInputEntry('Maa: ', wineEntry, sessionId.wineEntry.country, tastingIndex, null,'country');
    insertInputEntry('Tila: ', wineEntry, sessionId.wineEntry.winery, tastingIndex, null, 'winery');
    insertInputEntry('Hinta: ', wineEntry, sessionId.wineEntry.price, tastingIndex, null, 'price');
    insertInputEntry('Rypäleet: ', wineEntry, sessionId.wineEntry.grapes, tastingIndex, null, 'grapes');
    insertInputEntry('Maut: ', wineEntry, sessionId.wineEntry.flavors, tastingIndex, null, 'flavors');

    elementId.appendChild(wineEntry);
    return wineEntry;
}

function createPlayerEntry(sessionId, elementId, playerIndex, tastingIndex) {
    const playerEntry = document.createElement('div');
    playerEntry.className = 'playerEntry';
    playerEntry.style.border = '2px solid';
    playerEntry.style.borderRadius = '1px';
    playerEntry.style.minWidth = '100px';
    playerEntry.style.flexBasis = '40%';
    playerEntry.style.margin = '15px';

    const nameEntry = document.createTextNode('Nimi: ' + sessionId.playerEntries[playerIndex].name, null, playerIndex, tastingIndex, 'name');
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

    insertInputEntry('Maa: ', playerEntry, sessionId.playerEntries[playerIndex].country, null, playerIndex, tastingIndex, 'country');
    insertInputEntry('Rypäleet: ', playerEntry, sessionId.playerEntries[playerIndex].grapes, null, playerIndex, tastingIndex, 'grapes');
    insertInputEntry('Kouluarvosana: ', playerEntry, sessionId.playerEntries[playerIndex].rating, null, playerIndex, tastingIndex, 'rating');
    insertInputEntry('Pisteet: ', playerEntry, sessionId.playerEntries[playerIndex].score, null, playerIndex, tastingIndex, 'score');
    insertInputEntry('Comment: ', playerEntry, sessionId.playerEntries[playerIndex].comment, null, playerIndex, tastingIndex, 'comment');

    elementId.appendChild(playerEntry);
    return playerEntry;
}