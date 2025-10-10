// JavaScript source code
console.log('hello');

function createSession() {
    const sessionDiv = document.createElement('div');
    sessionDiv.id = 'session';
    sessionDiv.style.display = 'flex';
    sessionDiv.style.flexWrap = 'wrap';

    const sessionEntry = document.createElement('div');
    sessionEntry.className = 'sessionEntry';
    sessionEntry.style.border = '2px solid';
    sessionEntry.style.borderRadius = '1px';
    sessionEntry.style.minWidth = '100px';
    sessionEntry.style.flexBasis = '40%';
    sessionEntry.style.margin = '15px';

    for (let i = 1; i <= 5; i++) {
        const entry = document.createElement('div');

        const numberText = document.createTextNode(i + '. ');
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        entry.appendChild(numberText);
        entry.appendChild(inputElement);
        sessionEntry.appendChild(entry);
    }
    document.body.appendChild(sessionEntry);
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