import { WineProperties } from "./types";
import { loadWinePropertyData } from "./save-file-utils";
import { saveWinePropertyData } from "./save-file-utils";

let wineProperties: WineProperties = {
    wineFlavors: [],
    wineGrapes: []
}

const TestWineProperties: WineProperties = {
    wineFlavors: [
        "blackcurrant", "cedar", "tobacco", "green bell pepper", "vanilla",
        "red cherry", "raspberry", "clove", "cinnamon", "leather",
        "blackberry", "plum", "chocolate", "coffee", "spice",
        "green apple", "citrus", "honeysuckle", "mineral", "mineral", "mineral", "wet stone",
        "peach", "apricot", "honey", "ginger", "petrol",
        "gooseberry", "passion fruit", "grass", "grapefruit", "cat's pee",
        "strawberry", "watermelon", "cream", "rose petal", "white pepper",
        "black cherry", "smoke", "olive", "black pepper", "lavender"
    ],
    wineGrapes: [
        "Cabernet Sauvignon", "Pinot Noir", "Merlot", "Cabernet Franc",
        "Chardonnay", "Riesling", "Sauvignon Blanc", "Grenache",
        "Syrah", "Cinsault"
    ]
};

PropertyTest();

function PropertyTest() {
    //console.log("Property test");
    //console.log("wineProperties.wineFlavors length: " + wineProperties.wineFlavors.length);
    //console.log("wineProperties.wineGrapes length: " + wineProperties.wineGrapes.length);

    SaveWineProperties(TestWineProperties);
    LoadWineProperties();

    //console.log("wineProperties.wineFlavors length: " + wineProperties.wineFlavors.length);
    //console.log("wineProperties.wineGrapes length: " + wineProperties.wineGrapes.length);
}

function SaveWineProperties(wineProperties: WineProperties) {
    saveWinePropertyData(wineProperties)
}

function LoadWineProperties() {
    const loadedProperties = loadWinePropertyData();

    if (loadedProperties) {
        wineProperties = loadedProperties;
        RemoveDuplicateProperties(wineProperties);
        SortWineProperties();
    }
}

function SortWineProperties() {
    wineProperties.wineFlavors.sort();
    wineProperties.wineGrapes.sort();
}

function RemoveDuplicateProperties(properties: WineProperties): WineProperties {
    return {
        wineFlavors: [...new Set(properties.wineFlavors)],
        wineGrapes: [...new Set(properties.wineGrapes)],
    };
}