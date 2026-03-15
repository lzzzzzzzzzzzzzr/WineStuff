import { WineEntry } from "./types";

const testWineEntries = [
    {
        name: 'Piattelli',
        photo: null,
        year: '2023',
        country: 'Argentina',
        price: '18,46€',
        date: '10/12/2025',
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
        date: '10/12/2025',
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
        date: '10/12/2025',
        winery: 'Cafayate Valley',
        grapes: ['Cabernet Sauvignon'],
        flavors: ['Mustaherukka', 'tumma kirsikka', 'karhunvatukka', 'tummasuklaa', 'mustapippuri', 'tammi'],
        ratings: [],
    },
]

console.log(isWineTasted('Viini 2', testWineEntries))
console.log(filterByWineName('Piattelli', testWineEntries));
console.log("Last Entry");
console.log(getLatestWineEntry);

//function getAllWineEntries(allSessions: Session[]): WineEntry[] {
//    //Stuff

//    return wineEntries;
//}

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

export function getLatestWineEntry(allWineEntries: WineEntry[]) {

    const lastEntry = allWineEntries[allWineEntries.length - 1]

    return lastEntry;
}