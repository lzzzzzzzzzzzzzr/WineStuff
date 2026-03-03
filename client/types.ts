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