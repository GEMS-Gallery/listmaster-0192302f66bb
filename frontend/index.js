import { backend } from 'declarations/backend';

const newItemInput = document.getElementById('new-item');
const addBtn = document.getElementById('add-btn');
const shoppingList = document.getElementById('shopping-list');

async function refreshList() {
    const items = await backend.getItems();
    shoppingList.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.className = `shopping-item ${item.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <i class="fas ${item.completed ? 'fa-check-circle' : 'fa-circle'}"></i>
            <span>${item.name}</span>
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
        `;
        li.querySelector('i').addEventListener('click', () => toggleItem(item.id));
        li.querySelector('.delete-btn').addEventListener('click', () => deleteItem(item.id));
        shoppingList.appendChild(li);
    });
}

async function addItem() {
    const name = newItemInput.value.trim();
    if (name) {
        await backend.addItem(name);
        newItemInput.value = '';
        refreshList();
    }
}

async function toggleItem(id) {
    await backend.completeItem(id);
    refreshList();
}

async function deleteItem(id) {
    await backend.deleteItem(id);
    refreshList();
}

addBtn.addEventListener('click', addItem);
newItemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addItem();
});

refreshList();
