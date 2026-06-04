export function getBannedUsers() {
    const bannedUsers = localStorage.getItem('bannedUsers');
    return bannedUsers ? JSON.parse(bannedUsers) : [];
}

export function saveBannedUsers(bannedUsers) {
    localStorage.setItem('bannedUsers', JSON.stringify(bannedUsers));
}
