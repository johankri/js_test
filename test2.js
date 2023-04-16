//import fetch from 'node-fetch'

function getRarity(distribution) {
    const random = Math.random()
    let sum = 0
    return Object.keys(distribution).find(key => {
        sum = sum + distribution[key]
        return random < sum
    });
}

async function getRandomCard(query) {
    const url = `https://api.scryfall.com/cards/random?q=${encodeURIComponent(query + ' in:booster')}`
    const response = await fetch(url)
    return await response.json()
}

async function getSpecialSheetCard(query) {
    const distribution = {"m": (1 / 5) * (1 / 3), "r": (4 / 5) * (1 / 3), "u": 2 / 3}
    const rarity = getRarity(distribution)
    return await getRandomCard(`${query} and r:${rarity}`)
}

async function getRare(query) {
    const distribution = {"m": (1 / 7.4) * (1 / 3), "r": (6.4 / 7.4)}
    const rarity = getRarity(distribution)
    return await getRandomCard(`${query} and r:${rarity}`)
}

async function getUncommon(query) {
    return await getRandomCard(`${query} and r:u`)
}

async function getCommon(query) {
    return await getRandomCard(`${query} and r:c`)
}

async function getLand(query) {
    return undefined;
}

let cards = []
cards.push(await getSpecialSheetCard("s:MUL"))
cards.push(await getSpecialSheetCard("s:MOM t:Battle"))
cards.push(await getSpecialSheetCard("s:MOM is:doublefaced -t:battle"))
cards.push(await getRare("s:MOM"))
for (let i = 0; i < 2; i++) {
    cards.push(await getUncommon("s:MOM"))
}
for (let i = 0; i < 8; i++) {
    cards.push(await getCommon("s:MOM"))
}
cards.push(await getLand("s:MOM"))
console.log(cards)


// Mystical Archive: Uncommon 2/3, Rare 26.4, mythic rare 6.6

// Sheet (U / R / M)
// Sheet (R / M)
// Sheet (U)
// Sheet (C)
// Sheet (L)


//let json = await fetchCards();

//console.log(json)
