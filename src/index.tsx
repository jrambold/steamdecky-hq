import {
  ButtonItem,
  definePlugin,
  DialogButton,
  Menu,
  MenuItem,
  PanelSection,
  PanelSectionRow,
  Router,
  ServerAPI,
  showContextMenu,
  staticClasses,
} from "decky-frontend-lib";
import { FaShip } from "react-icons/fa";
import { SettingsProvider } from './context/settingsContext'

import logo from "../assets/logo.png";

export default definePlugin((serverApi: ServerAPI) => {
  serverApi.routerHook.addRoute("/steamdecky-hq", DeckyPluginRouterTest, {
    exact: true,
  });

  return {
    title: <div className={staticClasses.Title}>SteamDecky HQ</div>,
    content: (
      <SettingsProvider>
        <Settings />
      </SettingsProvider>
    ),
    icon: <FaShip />,
    onDismount() {
      serverApi.routerHook.removeRoute("/steamdecky-hq");
    },
  };
});
