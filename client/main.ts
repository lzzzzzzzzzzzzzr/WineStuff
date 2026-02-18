const style = document.createElement('style');
style.textContent = `
    #session * {
        color: white;
    }
    #session input {
        color: white;
        background: transparent;
        border: none;
        outline: none;
    }
    #session input::placeholder {
        color: rgba(255, 255, 255, 0.7);
    }
`;
document.head.appendChild(style);

//function createDefaultSession() {
//    return {
//        wineEntry: {
//            name: "Wine Name",
//            photo: null,
//            year: "",
//            country: "",
//            price: "",
//            date: "",
//            winery: "",
//            grapes: [""],
//            flavors: [""],
//            ratings: [],
//        },
//        playerEntries: [
//            {
//                name: "",
//                flavorGuesses: ["", "", "", "", ""],
//                grapes: [""],
//                country: "",
//                score: "",
//                rating: "",
//                priceRating: "",
//                priceGuess: "",
//                comment: ""
//            },
//            {
//                name: "",
//                flavorGuesses: ["", "", "", "", ""],
//                grapes: [""],
//                country: "",
//                score: "",
//                rating: "",
//                priceRating: "",
//                priceGuess: "",
//                comment: ""
//            },
//        ]
//    }
//}

function createDefaultSession() {
    return {
        wineEntry: {
            name: "Piattelli",
            photo: null,
            year: "2023",
            country: "Argentina",
            price: "18,46€",
            date: "10/12/2025",
            winery: "Cafayate Valley",
            grapes: ["Cabernet Sauvignon"],
            flavors: ["Mustaherukka, tumma kirsikka, karhunvatukka, tummasuklaa, mustapippuri, tammi"],
            ratings: [],
        },
        playerEntries: [
            {
                name: "A",
                flavorGuesses: ["Mustaherukka, tumma kirsikka, karhunvatukka, tummasuklaa, mustapippuri"],
                grapes: ["Malbec"],
                country: "Argentina",
                score: "4",
                rating: "7",
                priceRating: "7",
                priceGuess: "15",
                comment: ""
            },
            {
                name: "J",
                flavorGuesses: ["Mustaherukka, tumma kirsikka, karhunvatukka, tummasuklaa, mustapippuri"],
                grapes: ["Pinot Noir"],
                country: "Ranksa",
                score: "3",
                rating: "8",
                priceRating: "8",
                priceGuess: "",
                comment: "Jees"
            },
        ]
    }
}

const currentSession = [];

const allSessions = [];

function createSession() {
    const sessionDiv = document.createElement('div');
    sessionDiv.id = 'session';
    sessionDiv.style.display = 'flex';
    sessionDiv.style.flexWrap = 'wrap';

    const newSession = createDefaultSession();
    currentSession.push(newSession);

    const sessionElement = document.getElementById('session');
    sessionElement.style.backgroundColor = '#464655';

    createTastingEntry(newSession, sessionElement, currentSession.length);
    renderSession(currentSession, 'session');
}

function renderSession(sessionId, elementId) {
    console.log("RENDER");
    const sessionElement = document.getElementById(elementId);
    sessionElement.innerHTML = '';
    sessionElement.id = 'session';
    sessionElement.style.display = 'flex';
    sessionElement.style.flexWrap = 'wrap';
    sessionElement.style.backgroundColor = '#464655';

    if (currentSession.length >= 1) {

        let sessionItems = sessionId.map((tastingData, tastingIndex) => {
            return createTastingEntry(tastingData, sessionElement, tastingIndex);
        })
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

function printComments(currentSession) {
    const playerEntries = currentSession[0].playerEntries;

    playerEntries.forEach(entry => {
        if (entry.comment !== "") {
            console.log(entry.comment);
        }
    });
    return;
}

function insertInputEntry(text, entry, content, tastingIndex, playerEntryIndex, propertyKey, arrayIndex = null) {
    const container = document.createElement('div');
    const thisEntry = document.createTextNode(text)
    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.style.background = 'transparent';
    textInput.style.border = 'none';
    textInput.style.outline = 'none';
    container.style.display = 'flex';
    container.style.gap = '8px';
    textInput.style.width = '100%';
    textInput.maxLength = 30;

    if (content != undefined) {
        textInput.setAttribute("value", content);
    }

    //event stuff
    if (tastingIndex !== undefined && propertyKey !== undefined) {
        textInput.onchange = (e) => {

            if (!(e.currentTarget instanceof HTMLInputElement)) return
            if (playerEntryIndex === undefined || playerEntryIndex === null) {
                if (arrayIndex !== null && Array.isArray(currentSession[tastingIndex].wineEntry[propertyKey])) {
<<<<<<< HEAD:client/main.ts
                    currentSession[tastingIndex].wineEntry[propertyKey][arrayIndex] = e.currentTarget.value;
                }
                else {
                    currentSession[tastingIndex].wineEntry[propertyKey] = e.currentTarget.value;
                }
            } else {
                console.log(playerEntryIndex);
                if (arrayIndex !== null && Array.isArray(currentSession[tastingIndex].playerEntries[playerEntryIndex][propertyKey])) {
                    currentSession[tastingIndex].playerEntries[playerEntryIndex][propertyKey][arrayIndex] = e.currentTarget.value;
                }
                else {
                    console.log(playerEntryIndex);
                    currentSession[tastingIndex].playerEntries[playerEntryIndex][propertyKey] = e.currentTarget.value;
=======
                    currentSession[tastingIndex].wineEntry[propertyKey][arrayIndex] = e.target.value;                 
                }
                else {
                    currentSession[tastingIndex].wineEntry[propertyKey] = e.target.value;
                }              
            } else {
                console.log(playerEntryIndex);
                if (arrayIndex !== null && Array.isArray(currentSession[tastingIndex].playerEntries[playerEntryIndex][propertyKey])) {
                    currentSession[tastingIndex].playerEntries[playerEntryIndex][propertyKey][arrayIndex] = e.target.value;
                }
                else {
                    console.log(playerEntryIndex);
                    currentSession[tastingIndex].playerEntries[playerEntryIndex][propertyKey] = e.target.value;
>>>>>>> main:client/main.js
                }
            }
        }
        textInput.onblur = (e) => { renderSession(currentSession, 'session'); }
<<<<<<< HEAD:client/main.ts
=======


        ////Log output for testing
        //if (playerEntryIndex !== undefined && playerEntryIndex !== null) {
        //    textInput.onblur = (e) => console.log("Blur:" + currentSession[tastingIndex].playerEntries[playerEntryIndex][propertyKey]);
        //}
        //else if (tastingIndex !== undefined && propertyKey !== undefined) {
        //    textInput.onblur = (e) => console.log("Blur:" + currentSession[tastingIndex].wineEntry[propertyKey]);
        //}
>>>>>>> main:client/main.js
    }
    
    container.appendChild(thisEntry);
    container.appendChild(textInput);
    entry.appendChild(container);
}

function createTastingEntry(sessionId, elementId, tastingIndex) {
    createPlayerEntry(sessionId, elementId, 0, tastingIndex),
    createPlayerEntry(sessionId, elementId, 1, tastingIndex),
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

    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.style.background = 'transparent';
    textInput.style.border = 'none';
    textInput.style.outline = 'none';

    insertInputEntry('Nimi: ', playerEntry, sessionId.playerEntries[playerIndex].name, tastingIndex, playerIndex, 'name');

    for (let i = 0; i < 5; i++) {
        const num = i + 1;
        insertInputEntry(num + ': ', playerEntry, sessionId.playerEntries[playerIndex].flavorGuesses[num], tastingIndex, playerIndex, 'flavorGuesses', num);
    }

    insertInputEntry('Maa: ', playerEntry, sessionId.playerEntries[playerIndex].country, tastingIndex, playerIndex, 'country');
    insertInputEntry('Rypäleet: ', playerEntry, sessionId.playerEntries[playerIndex].grapes, tastingIndex, playerIndex, 'grapes');
    insertInputEntry('Kouluarvosana: ', playerEntry, sessionId.playerEntries[playerIndex].rating, tastingIndex, playerIndex, 'rating');
    insertInputEntry('Pisteet: ', playerEntry, sessionId.playerEntries[playerIndex].score, tastingIndex, playerIndex, 'score');
    insertInputEntry('Comment: ', playerEntry, sessionId.playerEntries[playerIndex].comment, tastingIndex, playerIndex, 'comment');

    elementId.appendChild(playerEntry);
    return playerEntry;
}

function prepareSaveData() {
    allSessions.length = 0;

    currentSession.forEach(entry => {
        allSessions.push(JSON.parse(JSON.stringify(entry)));
        console.log(allSessions);
    });

    renderSession(currentSession, 'session');
    return {
        allSessions: allSessions
    }
}