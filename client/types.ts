export interface WineEntry {
    name: string;
    photo: string | null;
    year: string;
    country: string;
    price: string;
    date: string;
    winery: string;
    grapes: string[];
    flavors: string[];
    ratings: number[];
}

export interface PlayerEntry {
    name: string;
    flavorGuesses: string[];
    grapes: string[];
    country: string;
    score: number;
    rating: number;
    priceRating: string;
    priceGuess: string;
    comment: string;
}

//Each wine has a Tasting with 2 players
export interface Tasting {
    wineEntry: WineEntry[];
    playerEntry1: PlayerEntry[];
    playerEntry2: PlayerEntry[];
}
//Session is made of up any number of Tastings
export interface Session {
    tastingEntries: Tasting[]
}

export interface WineProperties {
    wineFlavors: string[];
    wineGrapes: string[];
}