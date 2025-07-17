
const CHAMP_URL = 'https://ddragon.leagueoflegends.com/cdn/14.14.1/data/en_US/champion.json'; //* Will feth champ data from riot API
const ITEM_URL = 'https://ddragon.leagueoflegends.com/cdn/14.14.1/data/en_US/item.json'; //* Will fetch item data from riot API

const champImgBase = 'https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/'; //* Champ img from riot API
const itemImgBase = 'https://ddragon.leagueoflegends.com/cdn/14.14.1/img/item/'; //* Item img from riot API

const summonerSpells = ['Flash', 'Ignite', 'Heal', 'Ghost', 'Smite']; //* no api needed, just a list of summoner spells

document.getElementById('generateBtn').addEventListener('click', () => {  //* when button pressed will generate a random build
  fetch(CHAMP_URL)
    .then(res => res.json())
    .then(champData => {
      const champList = Object.values(champData.data);
      const randomChamp = champList[Math.floor(Math.random() * champList.length)];

      document.getElementById('champion').textContent = `Champion: ${randomChamp.name}`;
      document.getElementById('champImg').src = champImgBase + randomChamp.image.full;

      fetch(ITEM_URL) //* Fetch item data from Riot API
        .then(res => res.json()) 
        .then(itemData => { //* Fetch item data and generate random items
          const items = Object.entries(itemData.data); 

          const selectedItems = [];
          while (selectedItems.length < 6) {
            const rand = items[Math.floor(Math.random() * items.length)][1];
            if (!selectedItems.includes(rand) && rand.gold.purchasable && !rand.tags.includes("Consumable")) { //* ensures item is actually purchasable
              selectedItems.push(rand);
            }
          }

          const itemsContainer = document.getElementById('items');
          itemsContainer.innerHTML = "";

          selectedItems.forEach(item => {
            const img = document.createElement("img");
            img.src = itemImgBase + item.image.full;
            img.alt = item.name;
            img.title = item.name;
            itemsContainer.appendChild(img);
          });


          // Get two unique summoner spells
let spell1, spell2;
if (summonerSpells.length >= 2) {
  do {
    spell1 = summonerSpells[Math.floor(Math.random() * summonerSpells.length)];
    spell2 = summonerSpells[Math.floor(Math.random() * summonerSpells.length)];
  } while (spell1 === spell2);
} else {
  spell1 = spell2 = summonerSpells[0]; // fallback if not enough spells
}

// Display both
const summonerDisplay = document.getElementById('summoner');
if (summonerDisplay) {
  summonerDisplay.textContent = `Summoner Spells: ${spell1} + ${spell2}`;
}

        });
    });
});
