import { ejs_download } from "./modules/ejs_download";
import { dialog } from "./modules/dialog";

const events = [];
events.push(ejs_download());
dialog(events);
