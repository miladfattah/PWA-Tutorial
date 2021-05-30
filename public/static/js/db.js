let DB_VERSION = 1;

let db = new Dexie("pro_DATA");
db.version(DB_VERSION).stores({
    products: 'id'
});