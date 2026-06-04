export function getPeopleCount() {
    return parseInt(localStorage.getItem('peopleCount') || '0');
}

export function incrementPeopleCount() {
    const count = getPeopleCount() + 1;
    localStorage.setItem('peopleCount', count.toString());
    return count;
}

export function updatePeopleCounter() {
    const counterElement = document.getElementById('peopleCounterValue');
    if (counterElement) {
        counterElement.textContent = getPeopleCount();
    }
}
