import { WineEntry } from "./types";
import { Tasting } from "./types";

const testWineEntries = [
    {
        name: 'Piattelli',
        photo: null,
        year: '2023',
        country: 'Argentina',
        price: '18,46€',
        date: '2023-12-11',
        winery: 'Cafayate Valley',
        grapes: ['Cabernet Sauvignon'],
        flavors: ['Mustaherukka', 'tumma kirsikka', 'karhunvatukka', 'tummasuklaa', 'mustapippuri', 'tammi'],
        ratings: [],
    },
    {
        name: 'Viini 2',
        photo: null,
        year: '2023',
        country: 'Ranska',
        price: '18,46€',
        date: '2024-10-12',
        winery: 'Cafayate Valley',
        grapes: ['Cabernet Sauvignon'],
        flavors: ['Mustaherukka', 'kookos', 'karhunvatukka', 'tummasuklaa', 'mustapippuri', 'tammi'],
        ratings: [],
    },
    {
        name: 'Viini 3',
        photo: null,
        year: '2023',
        country: 'Ranska',
        price: '18,46€',
        date: '2025-09-13',
        winery: 'Cafayate Valley',
        grapes: ['Cabernet Sauvignon'],
        flavors: ['Mustaherukka', 'tumma kirsikka', 'karhunvatukka', 'tummasuklaa', 'mustapippuri', 'tammi'],
        ratings: [],
    },
]

export function isWineTasted(wineName: string, allWineEntries: WineEntry[]): boolean {

    return allWineEntries.some(function (entry) {
        console.log("Checking entry: ", entry.name);
        console.log(entry.name + " = " + wineName);
        return entry.name === wineName;
    });
}

export function filterByWineName(wineName: string, allWineEntries: WineEntry[]): WineEntry[] {

    const filteredSession = allWineEntries.filter(entry => entry.name === wineName);
    return filteredSession;
}

export function getLatestWineEntry(allWineEntries: WineEntry[]): WineEntry{

    const latestEntry = allWineEntries.reduce(compareDate, allWineEntries[0]);

    function compareDate(acc: WineEntry, current: WineEntry): WineEntry {

        console.log("Acc = " + acc.date);
        console.log("Current = " + current.date);
        if (current.date >= acc.date) {
            return current;
        }
        else {
            return acc;
        }
    }
    return latestEntry;
}

export function getAllWineEntries(allSessions: Tasting[]): WineEntry[] {
    const allWines = allSessions.map(session => session.wineEntry).flat();
    console.log("AllWines");
    console.log(allWines);
    return allWines;
}
//TODO
export function getAllWineFlavors(allSessions: Tasting[]) {
    /*let allFlavors = getAllWineEntries(allSessions).flat(allSessions);*/

}