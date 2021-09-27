import { ejs_download } from "./modules/ejs_download";
import { meta_fill } from "./modules/meta_fill";
import { dialog } from "./modules/dialog";
import "./style.scss";

const events = [
  ejs_download(),
  meta_fill(),
];
dialog(events);
