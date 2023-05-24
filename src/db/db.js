// db.js
import Dexie from "dexie";

export const dbList = new Dexie("dbList");
dbList.version(4).stores({
  dbList: "++id, title, body , img, DateCreated, done", // Primary key and indexed props
});

export const dbUser = new Dexie("dbUser");
dbUser.version(1).stores({
  dbUser: "++id, name, img", // Primary key and indexed props
});
