import "./models/User";
import "./models/Vocab";
import "./models/Note";
import "./models/Page";

import { sequelize as db } from "./database";

export function syncDbs() {
  db.sync({ alter: true }).then(() => {});
}

// syncDbs();
