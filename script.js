let currentItem1 = null;
let currentItem2 = null;
let voteCounts = {};

// Sample item data
const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
  { id: 5, name: 'Item 5' },
  // ... Add more items
];

function initialize() {
  // Initialize vote counts to zero for each item
  voteCounts = {};
  items.forEach(item => {
    voteCounts[item.id] = 0;
  });

  getNextItems();
}

function getNextItems() {
  const [itemA, itemB] = getRandomItems();

  currentItem1 = itemA;
  currentItem2 = itemB;

  displayItems();
}

function getRandomItems() {
  const randomItems = [];
  const itemIndices = [];

  // Randomly select two items from the available items
  while (itemIndices.length < 2 && itemIndices.length < items.length) {
    const randomIndex = Math.floor(Math.random() * items.length);

    if (!itemIndices.includes(randomIndex)) {
      itemIndices.push(randomIndex);
      randomItems.push(items[randomIndex]);
    }
  }

  return randomItems;
}

function displayItems() {
  const item1 = document.getElementById('item1');
  const item2 = document.getElementById('item2');

  item1.textContent = currentItem1.name;
  item2.textContent = currentItem2.name;
}

function vote(itemNumber) {
  const winner = itemNumber === 1 ? currentItem1 : currentItem2;
  const loser = itemNumber === 1 ? currentItem2 : currentItem1;

  // Increment vote count for the winner
  voteCounts[winner.id] += 1;

  getNextItems();
  generateTopList();
}

function generateTopList() {
  const sortedItems = items.slice().sort((a, b) => voteCounts[b.id] - voteCounts[a.id]);

  const topListElement = document.getElementById('topList');
  topList
