
import { useState } from 'react'

function AppFooter() {
  const year = new Date().getFullYear()
  const [checking, setChecking] = useState(false)
  const [updateMsg, setUpdateMsg] = useState<string|null>(null)

  const checkForUpdate = async () => {
    setChecking(true)
    setUpdateMsg(null)
    try {
      const res = await fetch('https://api.github.com/repos/Jalal-Nasser/PassGen-Releases/releases/latest')
      if (!res.ok) throw new Error('Failed to fetch release info')
      const data = await res.json()
      const latest = data.tag_name?.replace(/^v/, '')
      const url = data.html_url
      // @ts-ignore
      const current = (window as any).appVersion || (import.meta as any)?.env?.npm_package_version || '1.0.0'
      if (latest && latest !== current) {
        setUpdateMsg(`New version ${latest} available! ` + url)
        if (window.confirm(`A new version (${latest}) is available!\n\nGo to download page?`)) {
          window.open(url, '_blank')
        }
      } else {
        setUpdateMsg('You have the latest version.')
      }
    } catch (e:any) {
      setUpdateMsg('Update check failed: ' + e.message)
    } finally {
      setChecking(false)
    }
  }

  return (
    <footer className="app-footer">
      © {year} PassGen · Developer: <a href="https://github.com/Jalal-Nasser" target="_blank" rel="noopener noreferrer">JalalNasser</a> · Visit My IT Blog: <a href="https://jalalnasser.com" target="_blank" rel="noopener noreferrer">BlogiFy</a>
      {' '}· <a href="#" onClick={(e)=>{e.preventDefault(); window.dispatchEvent(new Event('open-terms'))}}>Terms</a>
      {' '}· <a href="#" onClick={(e)=>{e.preventDefault(); checkForUpdate()}}>{checking ? 'Checking...' : 'Check for Updates'}</a>
      {' '}· Free: 4 passwords · Premium $3.99/mo
      {updateMsg && <div style={{marginTop:4, fontSize:13, color:'#4a4'}}>{updateMsg}</div>}
    </footer>
  )
}

export default AppFooter
