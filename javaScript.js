//adding h1 style and font size
document.getElementsByTagName("h1")[0].style.fontSize = "4vw";

// Styling the title to center it and make  the word "List" appear below "Better Buys"
const title = document.getElementById('title');
title.style.textAlign = 'center';

const shoppingListTitle = document.getElementById('shopping-list-title');
shoppingListTitle.style.display = 'block';
shoppingListTitle.style.marginTop = '10px';

// Adding styles to the buttons giving them a border properties
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.style.borderRadius = '10px';  
    button.style.padding = '10px';  
    button.style.color = 'white';  
    button.style.border = 'none';  
    button.style.cursor = 'pointer';  
});

// An empty array called items stores my shopping list items, keeping track of all items needed to be bought.
let items = [];

// Getting some priority elements to use within JavaScript
const itemInput = document.getElementById('item-input');
const shoppingList = document.getElementById('shopping-list');
const itemsList = document.getElementById('items');

// To get the text from the input section, if the input isn't empty, add the new item to my items array, Call refreshList() to refresh the displayed list and then clear the input field.
const addButton = document.getElementById('add-button');
function addItem() {
    const addedItem = itemInput.value.trim();
    if (addedItem !== '') {
        items.push({ name: addedItem, purchased: false });
        refreshList();
        itemInput.value = '';
    }
}

// On click add button handle the event, calling add item function.
addButton.addEventListener('click', addItem);



// Delete the items array, make the list of an array empty and update the displayed list.
const clearButton = document.getElementById('clear-button');
function clearList() {
    items = [];
    refreshList();
}

// By clicking the clear list button calls clearList() function,clear button event listener
clearButton.addEventListener('click', clearList);

// Get marked-purchased elements
const markPurchasedButton = document.getElementById('Mark-Purchased');

// To clear the current list on browser, check the purchased property of each item and add the purchased class to the list item (<li>) when needed, show name of each item on the list, mark items on list by clicking on them and add them to webpage
function refreshList() {
    shoppingList.innerHTML = '';
    itemsList.innerHTML = ''; // to clear the existing options in the datalist
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.name;
        if (item.purchased) {
            li.classList.add('purchased');
        }
        li.onclick = () => strikePurchased(index);
        shoppingList.appendChild(li);

        // Add the item to the datalist
        const option = document.createElement('option');
        option.value = item.name;
        itemsList.appendChild(option);
    });
}

// Function strikePurchased finds the clicked list itemToggles (adds or removes by striking a line through) the 'purchased' class, which changes how it looks(faded) and update on webpage to show effected changes.
function strikePurchased(index) {
    items[index].purchased = !items[index].purchased;
    refreshList();
}

// MarkAllTheItemsPurchased mark all items as purchased when the "Mark-Purchased" button is clicked. It iterates through the items array and sets the purchased property of each item to true, then updates the list.
function markAllTheItemsPurchased() {
    items.forEach(item => {
        item.purchased = true;
    });
    refreshList();
}

// Clicking the "Mark-Purchased" button, mark all items as bought in the displayed shopping list
markPurchasedButton.addEventListener('click', () => markAllTheItemsPurchased());

// A keyboard event listener adding item after typing, if enter keyboard button is press call the addItem function
itemInput.addEventListener('keypress', function(KeyboardEvent) {
    if (KeyboardEvent.key === 'Enter') {
        addItem();
    }
});

// Adding style to the footer area
const footer = document.getElementById('footer');
footer.style.backgroundColor = 'black'; 
footer.style.color = 'white';  
footer.style.padding = '10px';  
footer.style.textAlign = 'center'; 
footer.style.position = 'fixed'; 
footer.style.bottom = '0';  
footer.style.width = '100%'; 

// To call refreshList(), when the webpage first loads and show any items that were already in shopping list list display.
refreshList();
