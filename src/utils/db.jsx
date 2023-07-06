
export function setLocalStorageDB(db, clear=true) {
    if(clear) localStorage.clear();
    db.forEach(item => localStorage.setItem(item.id,JSON.stringify(item)));
}

export function getLocalStorageDB() {
    let db = [];
    for (let i = 0; i < localStorage.length; i++) {
        db.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }

    return db;
}