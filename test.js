import fetch from 'node-fetch';

async function fetchCards() {
    // JK: query
    // JK: Multiple pages
    const url = 'https://api.scryfall.com/cards/search?q=%28set%3Amom+or+set%3Amul%29+%28r%3Ac+or+r%3Au%29';
    const response = await fetch(url);
    const newVar = await response.json();
    return newVar.data;
}

function getCard(sheet, distribution) {
    const random = Math.random();
    let sum = 0;
    return distribution.find(x => {
        sum = sum + Object.values(x)[0];
        return random < sum
    });
}

const sheet = null;
const distribution = [{"m": (1 / 5) * (1 / 3)}, {"r": (4 / 5) * (1 / 3)}, {"u": 2 / 3}];
const foo = getCard(sheet, distribution)
console.log(foo)

// Mystical Archive: Uncommon 2/3, Rare 26.4, mythic rare 6.6

// Sheet (U / R / M)
// Sheet (R / M)
// Sheet (U)
// Sheet (C)
// Sheet (L)


//let json = await fetchCards();

//console.log(json)
