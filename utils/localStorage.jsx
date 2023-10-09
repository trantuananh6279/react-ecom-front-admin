export function getUserFromLocalStorage() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

export function addUserToLocalStorage(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

export function removeUserFromLocalStorage() {
    localStorage.removeItem('user');
}
