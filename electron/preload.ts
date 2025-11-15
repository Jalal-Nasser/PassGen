import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  payment: {
    requestActivation: (payload: { email: string; requestId: string }) => ipcRenderer.invoke('payment:requestActivation', payload)
  }
})

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('window:minimize'),
  maximize: () => ipcRenderer.send('window:maximize'),
  close: () => ipcRenderer.send('window:close')
})

declare global {
  interface Window {
    electron: {
      payment: {
        requestActivation: (payload: { email: string; requestId: string }) => Promise<{ success: boolean; error?: string }>
      }
    }
    electronAPI: {
      minimize: () => void
      maximize: () => void
      close: () => void
    }
  }
}
