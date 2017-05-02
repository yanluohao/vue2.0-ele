export function loadLocalStorage(id, key, def) {
    let seller = window.localStorage.seller;
    if (!seller) {
        return def;
    } else {
        seller = JSON.parse(seller);
        if (!seller[id]) {
            return def;
        }
    }
    return seller[id][key] || def;
}


export function saveLocalStorage(id, key, val) {
    let seller = window.localStorage.seller;
    if (!seller) {
        seller = {};
        seller[id] = {};
    } else {
        seller = JSON.parse(seller);
        if (!seller[id]) {
            seller[id] = {};
        }
    }
    seller[id][key] = val;
    window.localStorage.seller = JSON.stringify(seller);
}
