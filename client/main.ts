import { loadData } from "./save-file-utils";
import { filterByWineName, isWineTasted } from "./sessionData";
import { getAllWineEntries } from "./sessionData";
import { PlayerEntry, Session, Tasting } from "./types";

document.querySelector('#create-session-button').addEventListener('click', createSession)
document.querySelector('#update-session-button').addEventListener('click', updateSession)

document.querySelector('#delete-session-button').addEventListener('click', deleteSession)
document.querySelector('#load-data-button').addEventListener('click', () => loadData(allSessions, currentSession, renderSession))

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
function createDefaultSession(): Tasting {
    return {
        wineEntry: [
            {
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
            }],
        playerEntry1: [
            {
                name: "A",
                flavorGuesses: ["Mustaherukka", "tumma kirsikka", "karhunvatukka", "tummasuklaa", "mustapippuri"],
                grapes: ["Malbec"],
                country: "Argentina",
                score: 3,
                rating: 7,
                priceRating: "7",
                priceGuess: "15",
                comment: ""
            }],
        playerEntry2: [
            {
                name: "J",
                flavorGuesses: ["Mustaherukka", "tumma kirsikka", "karhunvatukka", "tummasuklaa", "mustapippuri"],
                grapes: ["Pinot Noir"],
                country: "Ranksa",
                score: 3,
                rating: 8,
                priceRating: "8",
                priceGuess: "",
                comment: "Jees"
            }]
        } 
    }

const currentSession: Tasting[] = [];

const allSessions: Tasting[] = [createDefaultSession(), createDefaultSession(), createDefaultSession()];

getAllWineEntries(allSessions);

function createSession() {
    const add = (a: number, b: number): number => {
        return a + b
    }
    console.log(add(5, 8)) // should print 13 when page loads

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

export function renderSession(sessionId, elementId: string) {
    console.log("RENDER" + sessionId);
    const sessionElement = document.getElementById(elementId);
    sessionElement.innerHTML = '';
    sessionElement.id = 'session';
    sessionElement.style.display = 'flex';
    sessionElement.style.flexWrap = 'wrap';
    sessionElement.style.backgroundColor = '#464655';

    if (sessionId.length >= 1) {

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
//TODO: Rework for the 2 player tasting system
function printComments(currentSession) {
    const playerEntries = currentSession[0].playerEntries;

    playerEntries.forEach(entry => {
        if (entry.comment !== "") {
            console.log(entry.comment);
        }
    });
    return;
}

function insertInputEntry(text: string, entry: HTMLElement, content, tastingIndex: number, playerEntryIndex, propertyKey: string, arrayIndex = null) {
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
            console.log("Onchange! " + playerEntryIndex);
            if (!(e.currentTarget instanceof HTMLInputElement)) return
            if (playerEntryIndex === undefined || playerEntryIndex === null) {
                if (arrayIndex !== null && Array.isArray(currentSession[tastingIndex].wineEntry[0][propertyKey])) {
                    currentSession[tastingIndex].wineEntry[0][propertyKey][arrayIndex] = e.currentTarget.value;
                }
                else {
                    currentSession[tastingIndex].wineEntry[0][propertyKey] = e.currentTarget.value;
                }
            } else {

                let player: PlayerEntry;
                if (playerEntryIndex == 1) {
                    player = currentSession[tastingIndex].playerEntry1[0];
                }
                else if (playerEntryIndex == 2) {
                    player = currentSession[tastingIndex].playerEntry2[0];
                }
                else {
                    throw new Error('playerIndex out of bounds')
                }

                console.log("PlayerEntryIndex: " + playerEntryIndex);
                if (arrayIndex !== null && Array.isArray(player[propertyKey])) {
                    player[propertyKey][arrayIndex] = e.currentTarget.value;
                }
                else {
                    player[propertyKey] = e.currentTarget.value;
                }
            }
        }
/*        textInput.onblur = (e) => { renderSession(currentSession, 'session'); }*/
    }
    
    container.appendChild(thisEntry);
    container.appendChild(textInput);
    entry.appendChild(container);
}

function createTastingEntry(sessionId: Tasting, elementId: HTMLElement, tastingIndex: number) {
    createPlayerEntry(sessionId, elementId, 1, tastingIndex),
    createPlayerEntry(sessionId, elementId, 2, tastingIndex),
    createWineEntry(sessionId, elementId, tastingIndex);
}

function createWineEntry(sessionId: Tasting, elementId: HTMLElement, tastingIndex: number) {
    const wineEntry = document.createElement('div');
    wineEntry.className = 'wineEntry';
    wineEntry.style.border = '2px solid';
    wineEntry.style.borderRadius = '1px';
    wineEntry.style.minWidth = '100px';
    wineEntry.style.flexBasis = '85%';
    wineEntry.style.margin = '15px';

    const wineName = document.createTextNode('Viini');
    wineEntry.appendChild(wineName);

    const wine = sessionId.wineEntry[0];

    insertInputEntry('Name: ', wineEntry, wine.name, tastingIndex, null, 'name');
    insertInputEntry('Vuosi ', wineEntry, wine.year, tastingIndex, null, 'year');
    insertInputEntry('Kuva: Tähän tulee oikeesti kuva ', wineEntry, null, tastingIndex, null, 'photo');
    insertInputEntry('Pvm ', wineEntry, wine.date, tastingIndex, null,'date');
    insertInputEntry('Maa: ', wineEntry, wine.country, tastingIndex, null,'country');
    insertInputEntry('Tila: ', wineEntry, wine.winery, tastingIndex, null, 'winery');
    insertInputEntry('Hinta: ', wineEntry, wine.price, tastingIndex, null, 'price');
    insertInputEntry('Rypäleet: ', wineEntry, wine.grapes, tastingIndex, null, 'grapes');
    insertInputEntry('Maut: ', wineEntry, wine.flavors[0], tastingIndex, null, 'flavors', 0);

    elementId.appendChild(wineEntry);
    return wineEntry;
}


function getPlayerEntry(sessionId: Tasting, playerIndex: number): PlayerEntry[] {
    if (playerIndex == 1) {
        return sessionId.playerEntry1;
    }
    else if (playerIndex == 2) {
        return sessionId.playerEntry2;
    }
    else {
        throw new Error('playerIndex out of bounds')
    }
}

function createPlayerEntry(sessionId: Tasting, elementId: HTMLElement, playerIndex: number, tastingIndex: number) {

    let sessionPlayerEntry = getPlayerEntry(sessionId, playerIndex);

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

    insertInputEntry('Nimi: ', playerEntry, sessionPlayerEntry[0].name, tastingIndex, playerIndex, 'name');

    for (let i = 0; i < 5; i++) {
        const num = i + 1;
        insertInputEntry(num + ': ', playerEntry, sessionPlayerEntry[0].flavorGuesses[i], tastingIndex, playerIndex, 'flavorGuesses', i);
    }

    insertInputEntry('Maa: ', playerEntry, sessionPlayerEntry[0].country, tastingIndex, playerIndex, 'country');
    insertInputEntry('Rypäleet: ', playerEntry, sessionPlayerEntry[0].grapes, tastingIndex, playerIndex, 'grapes');
    insertInputEntry('Kouluarvosana: ', playerEntry, sessionPlayerEntry[0].rating, tastingIndex, playerIndex, 'rating');
    insertInputEntry('Pisteet: ', playerEntry, sessionPlayerEntry[0].score, tastingIndex, playerIndex, 'score');
    insertInputEntry('Comment: ', playerEntry, sessionPlayerEntry[0].comment, tastingIndex, playerIndex, 'comment');

    elementId.appendChild(playerEntry);
    return playerEntry;
}

export function prepareSaveData() {
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

//window.createSession = createSession;
//window.updateSession = updateSession;
//window.deleteSession = deleteSession;