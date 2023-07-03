let currentItem1 = null;
let currentItem2 = null;

async function getItems() {
  try {
    const response = await fetch('/api/items');
    const items = await response.json();

    if (items.length < 2) {
      displayTopList();
      return;
    }

    currentItem1 = items[0];
    currentItem2 = items[1];

    displayItems();
  } catch (error) {
    console.error(error);
  }
}

function displayItems() {
  const item1 = document.getElementById('item1');
  const item2 = document.getElementById('item2');

  item1.textContent = currentItem1.name;
  item2.textContent = currentItem2.name;
}

async function vote(itemNumber) {
  try {
    const winner = itemNumber === 1 ? currentItem1 : currentItem2;
    const loser = itemNumber === 1 ? currentItem2 : currentItem1;

    await fetch('/api/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ winner, loser }),
    });

    await getItems();
  } catch (error) {
    console.error(error);
  }
}

async function displayTopList() {
  try {
    const response = await fetch('/api/toplist');
    const topList = await response.json();

    const listElement = document.getElementById('topList');
    listElement.innerHTML = '';

    for (const item of topList) {
      const listItem = document.createElement('li');
      listItem.textContent = item.name;
      listElement.appendChild(listItem);
    }
  } catch (error) {
    console.error(error);
  }
}

getItems();
