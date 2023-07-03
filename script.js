const itemList = [
  'Item A',
  'Item B',
  'Item C',
  'Item D',
  'Item E',
  // Add more items here
];

let currentItemIndex1 = 0;
let currentItemIndex2 = 1;
let votes = {};

function displayItems() {
  const item1 = document.getElementById('item1');
  const item2 = document.getElementById('item2');
  
  item1.textContent = itemList[currentItemIndex1];
  item2.textContent = itemList[currentItemIndex2];
}

function vote(itemNumber) {
  const winningItemIndex = itemNumber === 1 ? currentItemIndex1 : currentItemIndex2;
  const losingItemIndex = itemNumber === 1 ? currentItemIndex2 : currentItemIndex1;

  if (votes[winningItemIndex]) {
    votes[winningItemIndex]++;
  } else {
    votes[winningItemIndex] = 1;
  }

  currentItemIndex1 += 2;
  currentItemIndex2 += 2;

  if (currentItemIndex1 >= itemList.length || currentItemIndex2 >= itemList.length) {
    displayTopList();
    return;
  }

  displayItems();
}

function displayTopList() {
  const topList = document.getElementById('topList');
  
  // Clear the current top list
  topList.innerHTML = '';

  // Convert votes object to an array of [itemIndex, voteCount] pairs
  const voteArray = Object.entries(votes);

  // Sort the array based on vote count in descending order
  voteArray.sort((a, b) => b[1] - a[1]);

  // Display the top 15 items
  for (let i = 0; i < Math.min(15, voteArray.length);
