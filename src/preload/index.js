import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  closeWindow: () => {
    ipcRenderer.send("close-window");
  },
  minimizeWindow: () => {
    ipcRenderer.send("minimize-window");
  },
  listen(channel, callback) {
    ipcRenderer.on(channel, (_, ...args) => callback(...args));
  },
  removeAllListeners(channel) {
    ipcRenderer.removeAllListeners(channel);
  },
  ignoreMouse() {
    ipcRenderer.send('ignore-mouse');
  }
};


// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
