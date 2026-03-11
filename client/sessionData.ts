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

console.log(isWineTasted('Viini 3', testWineEntries))

export function isWineTasted(wineName: string, allWineEntries: WineEntry[]): boolean {

    /*return allWineEntries.some(entry => entry.name === wineName);*/

    //const wineNames = allWineEntries.map(function (entry) {
    //    console.log("Checking entry: ", entry.name);
    //    return entry.name === wineName;
    //}

    return allWineEntries.some(function (entry) {
        console.log("Checking entry: ", entry.name);
        return entry.name === wineName;
    });
}

//export function filterByWineName(wineName: string, allWineEntries: WineEntry[]): WineEntry[] {

//    function matchName((allWineEntries.forEach())
//    const result = allWineEntries.filter(wineName) => testWineEntries.

//    }
//    return []
//}

