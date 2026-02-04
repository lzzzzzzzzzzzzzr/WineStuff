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

function loadData() {
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