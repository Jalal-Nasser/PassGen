import React, { useState } from 'react'
import './CustomTitleBar.css'

interface CustomTitleBarProps {
  title?: string
}

export const CustomTitleBar: React.FC<CustomTitleBarProps> = ({ title = 'PassGen' }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const handleMinimize = () => {
    window.electronAPI?.minimize()
  }

  const handleMaximize = () => {
    window.electronAPI?.maximize()
  }

  const handleClose = () => {
    window.electronAPI?.close()
  }

  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu)
  }

  const closeMenus = () => {
    setActiveMenu(null)
  }

  return (
    <div className="custom-title-bar">
      <div className="title-bar-left">
        <div className="app-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" fill="currentColor"/>
            <path d="M10 17l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" fill="white"/>
          </svg>
        </div>
        <span className="app-title">{title}</span>

        <div className="menu-bar">
          <div className="menu-item">
            <button
              className={`menu-button ${activeMenu === 'file' ? 'active' : ''}`}
              onClick={() => toggleMenu('file')}
            >
              File
            </button>
            {activeMenu === 'file' && (
              <>
                <div className="menu-overlay" onClick={closeMenus}></div>
                <div className="menu-dropdown">
                  <button className="menu-dropdown-item" onClick={closeMenus}>
                    <span>New Vault</span>
                    <span className="shortcut">Ctrl+N</span>
                  </button>
                  <button className="menu-dropdown-item" onClick={closeMenus}>
                    <span>Open Vault</span>
                    <span className="shortcut">Ctrl+O</span>
                  </button>
                  <button className="menu-dropdown-item" onClick={closeMenus}>
                    <span>Save Vault</span>
                    <span className="shortcut">Ctrl+S</span>
                  </button>
                  <div className="menu-divider"></div>
                  <button className="menu-dropdown-item" onClick={closeMenus}>
                    <span>Settings</span>
                    <span className="shortcut">Ctrl+,</span>
                  </button>
                  <div className="menu-divider"></div>
                  <button className="menu-dropdown-item" onClick={() => { closeMenus(); handleClose(); }}>
                    <span>Exit</span>
                    <span className="shortcut">Alt+F4</span>
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="menu-item">
            <button
              className={`menu-button ${activeMenu === 'view' ? 'active' : ''}`}
              onClick={() => toggleMenu('view')}
            >
              View
            </button>
            {activeMenu === 'view' && (
              <>
                <div className="menu-overlay" onClick={closeMenus}></div>
                <div className="menu-dropdown">
                  <button className="menu-dropdown-item" onClick={closeMenus}>
                    <span>Reload</span>
                    <span className="shortcut">Ctrl+R</span>
                  </button>
                  <button className="menu-dropdown-item" onClick={closeMenus}>
                    <span>Toggle DevTools</span>
                    <span className="shortcut">F12</span>
                  </button>
                  <div className="menu-divider"></div>
                  <button className="menu-dropdown-item" onClick={closeMenus}>
                    <span>Actual Size</span>
                    <span className="shortcut">Ctrl+0</span>
                  </button>
                  <button className="menu-dropdown-item" onClick={closeMenus}>
                    <span>Zoom In</span>
                    <span className="shortcut">Ctrl++</span>
                  </button>
                  <button className="menu-dropdown-item" onClick={closeMenus}>
                    <span>Zoom Out</span>
                    <span className="shortcut">Ctrl+-</span>
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="menu-item">
            <button
              className={`menu-button ${activeMenu === 'help' ? 'active' : ''}`}
              onClick={() => toggleMenu('help')}
            >
              Help
            </button>
            {activeMenu === 'help' && (
              <>
                <div className="menu-overlay" onClick={closeMenus}></div>
                <div className="menu-dropdown">
                  <button className="menu-dropdown-item" onClick={closeMenus}>
                    <span>Documentation</span>
                  </button>
                  <button className="menu-dropdown-item" onClick={closeMenus}>
                    <span>Keyboard Shortcuts</span>
                  </button>
                  <div className="menu-divider"></div>
                  <button className="menu-dropdown-item" onClick={closeMenus}>
                    <span>About PassGen</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="title-bar-right">
        <button className="title-bar-button minimize-btn" onClick={handleMinimize} title="Minimize">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M0 6h12" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </button>
        <button className="title-bar-button maximize-btn" onClick={handleMaximize} title="Maximize">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <rect x="1" y="1" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </button>
        <button className="title-bar-button close-btn" onClick={handleClose} title="Close">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
