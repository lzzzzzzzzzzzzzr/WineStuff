const sessionState = [
    {
        wineEntry: {
            name: "Esirenderöity viini",
            photo: null,
            year: 2008,
            country: "Italia",
            price: 18.99,
            date: "date",
            winery: "Jokupaikka",
            grapes: ["Syrah", "Zinfandel"],
            flavors: ["Mustaherukka", "Karpalo", "Tamminen"],
            ratings: [8, 7, 8, 9],
            comments: ["Tämä on viiniä", "Iha jees"]
        },
        playerEntries: [
            {
                name: "A",
                flavorGuesses: ["Karpalo", "Karhunvatukka"],
                grapes: ["Syrah", "Merlot"],
                country: "Espanja",
                score: 3,
                rating: 8,
                priceRating: 7,
                priceGuess: 15.00,
                comment: "Tämä on viiniä"
            },
            {
                name: "J",
                flavorGuesses: ["Karpalo", "Karhunvatukka"],
                grapes: ["Syrah", "Merlot"],
                country: "Espanja",
                score: 3,
                rating: 8,
                priceRating: 7,
                priceGuess: 15.00,
                comment: "Tämä on viiniä"
            },
        ]
    }
]

function createSession() {
    const sessionDiv = document.createElement('div');
    sessionDiv.id = 'session';
    sessionDiv.style.display = 'flex';
    sessionDiv.style.flexWrap = 'wrap';

    const sessio = document.getElementById('session');
    const tastingEntry = createTastingEntry(undefined, 0);
    appendTastingEntry(sessio, tastingEntry);
}

function readSession() {
    console.log('Read');
    renderSession();
}

function deleteSession() {
    console.log('Delete');
    // TODO: Do some changes to the sessionState here
    renderSession();
}

function renderSession() {
    console.log('Re-rendering page content');
    console.log('Current state:')
    console.log(sessionState);

    const session = document.getElementById('session');
    session.innerHTML = '';

    const tastingEntryElements = sessionState.map((tastingEntryData, tastingIndex) => {
        return createTastingEntry(tastingEntryData, tastingIndex);
    })

    tastingEntryElements.forEach(tastingEntry => {
        appendTastingEntry(session, tastingEntry);
    })
}

/**
 * @param {*} playerEntryIndex If null, the entry is assumed to be for a wine
 */
function insertInputEntry(text, entry, tastingIndex, playerEntryIndex, propertyKey) {
    const container = document.createElement('div');
    const thisEntry = document.createTextNode(text)
    const textInput = document.createElement('input');

    textInput.type = 'text';
    textInput.style.background = 'transparent';
    textInput.style.border = 'none';
    textInput.style.outline = 'none';

    if (tastingIndex !== undefined && propertyKey !== undefined) {
        textInput.onchange = (e) => {
            if (playerEntryIndex === undefined || playerEntryIndex === null) {
                sessionState[tastingIndex].wineEntry[propertyKey] = e.target.value;
            } else {
                sessionState[tastingIndex].playerEntries[playerEntryIndex][propertyKey] = e.target.value;
            }
        }
        textInput.onblur = (e) => { renderSession(); }
    }

    container.appendChild(thisEntry);
    container.appendChild(textInput);
    entry.appendChild(container);
}

function createTastingEntry(tastingEntryData, tastingIndex) {
    const playerEntries = [createPlayerEntry(tastingIndex, 0), createPlayerEntry(tastingIndex, 1)];
    const wineEntry = createWineEntry(tastingEntryData?.wineEntry, tastingIndex);

    return { playerEntries, wineEntry };
}

function appendTastingEntry(session, tastingEntry) {
    session.appendChild(tastingEntry.wineEntry);

    tastingEntry.playerEntries.forEach(entry => {
        session.appendChild(entry);
    })
}

// TODO: Initialize the input entry contents based on wineEntryData
function createWineEntry(wineEntryData, tastingIndex) {
    const wineEntry = document.createElement('div');
    wineEntry.className = 'wineEntry';
    wineEntry.style.border = '2px solid';
    wineEntry.style.borderRadius = '1px';
    wineEntry.style.minWidth = '100px';
    wineEntry.style.flexBasis = '85%';
    wineEntry.style.margin = '15px';

    const wineName = document.createTextNode(wineEntryData?.name ?? 'Viini');
    wineEntry.appendChild(wineName);

    insertInputEntry('Name: ', wineEntry, tastingIndex, null, 'name');
    insertInputEntry('Vuosi ', wineEntry, tastingIndex, null, 'year');
    insertInputEntry('Kuva: Tähän tulee oikeesti kuva ', wineEntry, tastingIndex, null, 'photo');
    insertInputEntry('Pvm ', wineEntry, tastingIndex, null, 'date');
    insertInputEntry('Maa: ', wineEntry, tastingIndex, null, 'country');
    insertInputEntry('Rypäleet: ', wineEntry, tastingIndex, null, 'grapes');
    insertInputEntry('Maut: ', wineEntry, tastingIndex, null, 'flavors');

    return wineEntry;
}

function createPlayerEntry(tastingIndex, playerEntryIndex) {
    const sessionEntry = document.createElement('div');
    sessionEntry.className = 'sessionEntry';
    sessionEntry.style.border = '2px solid';
    sessionEntry.style.borderRadius = '1px';
    sessionEntry.style.minWidth = '100px';
    sessionEntry.style.flexBasis = '40%';
    sessionEntry.style.margin = '15px';

    const nameEntry = document.createTextNode('Nimi: ')
    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.style.background = 'transparent';
    textInput.style.border = 'none';
    textInput.style.outline = 'none';

    sessionEntry.appendChild(nameEntry);
    sessionEntry.appendChild(textInput);

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
        sessionEntry.appendChild(entry);
    }

    insertInputEntry('Maa: ', sessionEntry, tastingIndex, playerEntryIndex, 'country');
    insertInputEntry('Rypäleet: ', sessionEntry, tastingIndex, playerEntryIndex, 'grapes');
    insertInputEntry('Kouluarvosana: ', sessionEntry, tastingIndex, playerEntryIndex, 'rating');
    insertInputEntry('Pisteet: ', sessionEntry, tastingIndex, playerEntryIndex, 'score');
    insertInputEntry('Comment: ', sessionEntry, tastingIndex, playerEntryIndex, 'comment');

    return sessionEntry;
}
