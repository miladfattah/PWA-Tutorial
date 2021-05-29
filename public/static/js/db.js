let DB_VERSION = 1;

let db = new Dexie("friend_database");
db.version(DB_VERSION).stores({
    products: 'id'
});