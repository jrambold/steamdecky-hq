import {
  definePlugin,
  ServerAPI,
  staticClasses,
} from "decky-frontend-lib";
import { FaShip } from "react-icons/fa";
import Settings from './components/settings'
import { SettingsProvider } from './context/settingsContext'
import patchLibraryApp from './lib/patchLibraryApp'

export default definePlugin((serverApi: ServerAPI) => {
  const libraryPatch = patchLibraryApp(serverApi)
  return {
    title: <div className={staticClasses.Title}>SteamDecky HQ</div>,
    content: (
      <SettingsProvider>
        <Settings />
      </SettingsProvider>
    ),
    icon: <FaShip />,
    onDismount() {
      serverApi.routerHook.removePatch('/library/app/:appid', libraryPatch)
    },
  };
});
