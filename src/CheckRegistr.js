import { dbUser } from "./db/db";
import { useLiveQuery } from "dexie-react-hooks";
//!  Check Registr
let isUser;
function CheckRegistr() {
    console.log("CheckRegistr")
  function CheckRegistr() {
    isUser = useLiveQuery(() => dbUser.dbUser.toArray());
  }
  CheckRegistr();
  if (!isUser) return null; // Still loading.

  if (isUser[0] === undefined) {
    if (window.location.pathname != "/register") {
      window.location.pathname = "/register";
    }
  }
}
//!  Check Registr 

export {CheckRegistr}
