import page from "../node_modules/page/page.mjs";
import { loging } from "./navigationBar/loging.js";
import { logout } from "./navigationBar/logout.js";
import { updateNav } from "./navigationBar/navigation.js";
import { register } from "./navigationBar/register.js";
import { addDrone } from "./views/cellDrone.js";
import { detailsView } from "./views/details.js";
import { editItem } from "./views/edit.js";
import { homeView } from "./views/homeView.js";
import { marketPlaceView } from "./views/marketPLace.js";

page("/", homeView);
page("/register", register);
page("/login", loging);
page("/logout", logout);

page("/", homeView);
page("/marketPlace", marketPlaceView);
page("/sells", addDrone);
page("/details/:pageId", detailsView);
page("/data/drones/:pageId", editItem);

updateNav();
page.start();
