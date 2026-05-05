document.querySelector('#save-data-button').addEventListener('click', saveData)

import { prepareSaveData } from './main';
import { isWineTasted } from './sessionData';
import {
    WineEntry,
    PlayerEntry,
    WineProperties,
} from './types';
function saveData() {
    try {
        const dataToSave = prepareSaveData();

        localStorage.setItem('wineData', JSON.stringify(dataToSave));
        return true;

    } catch (error) {
        alert(error);
        return false;
    }
}

export function saveWinePropertyData(wineProperties) {
    try {
        const dataToSave = wineProperties;

        localStorage.setItem('winePropertyData', JSON.stringify(dataToSave));
        return true;

    } catch (error) {
        alert(error);
        return false;
    }
}

export function loadWinePropertyData(): WineProperties | false {

    try {
        const savedData = localStorage.getItem('winePropertyData');

        if (!savedData) {
            alert('No saved wineProperty data found!');
            return false;
        }
        const parsedData = JSON.parse(savedData);

        if (
            !Array.isArray(parsedData.wineFlavors) ||
            !Array.isArray(parsedData.wineGrapes)
        ) {
            throw new Error(
                'Invalid data format: wineFlavors or wineGrapes missing or not an array'
            );
        }
        console.log("Loaded data: ");
        console.log(parsedData);
        return parsedData as WineProperties;
    } catch (error) {
        alert(error);
        return false;
    }
}

export function loadData(allSessions, currentSession, renderSession) {
    try {
        const savedData = localStorage.getItem('wineData');

        if (!savedData) {
            alert('No saved data found!');
            return false;
        }
        const parsedData = JSON.parse(savedData);

        if (!parsedData.allSessions || !Array.isArray(parsedData.allSessions)) {
            throw new Error('Invalid data format: wineData missing or not an array');
        }

        allSessions.length = 0;
        currentSession.length = 0;

        parsedData.allSessions.forEach(entry => {
            allSessions.push(entry);
            currentSession.push(entry);
        });
        
        renderSession(currentSession, 'session');

        console.log("AllSessions: " + allSessions);
        console.log("CurrentSession: " + allSessions);
        isWineTasted('Piattelli', allSessions);

        return true;
    } catch (error) {
        alert(error);
        return false;
    }
}

function clearSavedData() {
    if (confirm('Are you sure you want to clear ALL saved data? This cannot be undone.')) {
        localStorage.removeItem('wineData');
        alert('All data has been removed!');
    }
}


//window.saveData = saveData;
//window.loadData = loadData;
//window.clearSavedData = clearSavedData;