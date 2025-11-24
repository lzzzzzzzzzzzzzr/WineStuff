const sessionState = [
    {
        wineEntry: {
            name: "Viini",
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
    createTastingEntry(sessio);
}

function readSession() {
    console.log('Read');
}

function updateSession() {
    console.log('Update');
}

function deleteSession() {
    console.log('Delete');
}

function insertInputEntry(text, entry) {
    const container = document.createElement('div');
    const thisEntry = document.createTextNode(text)
    const textInput = document.createElement('input');

    textInput.type = 'text';
    textInput.style.background = 'transparent';
    textInput.style.border = 'none';
    textInput.style.outline = 'none';

    container.appendChild(thisEntry);
    container.appendChild(textInput);
    entry.appendChild(container);
}

function createTastingEntry(session) {
    createPlayerEntry(session);
    createPlayerEntry(session);
    createWineEntry(session);
}

function createWineEntry(session) {
    const wineEntry = document.createElement('div');
    wineEntry.className = 'wineEntry';
    wineEntry.style.border = '2px solid';
    wineEntry.style.borderRadius = '1px';
    wineEntry.style.minWidth = '100px';
    wineEntry.style.flexBasis = '85%';
    wineEntry.style.margin = '15px';

    const wineName = document.createTextNode('Viini');
    wineEntry.appendChild(wineName);

    insertInputEntry('Name: ', wineEntry);
    insertInputEntry('Vuosi ', wineEntry);
    insertInputEntry('Kuva: Tähän tulee oikeesti kuva ', wineEntry);
    insertInputEntry('Pvm ', wineEntry);
    insertInputEntry('Maa: ', wineEntry);
    insertInputEntry('Rypäleet: ', wineEntry);
    insertInputEntry('Maut: ', wineEntry);

    session.appendChild(wineEntry);
}

function createPlayerEntry(session) {
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

    insertInputEntry('Maa: ', sessionEntry);
    insertInputEntry('Rypäleet: ', sessionEntry);
    insertInputEntry('Kouluarvosana: ', sessionEntry);
    insertInputEntry('Pisteet: ', sessionEntry);
    insertInputEntry('Comment: ', sessionEntry);

    session.appendChild(sessionEntry);
}