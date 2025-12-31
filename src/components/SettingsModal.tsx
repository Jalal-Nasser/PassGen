import './UpgradeModal.css'
import './SettingsModal.css'
import { useI18n } from '../services/i18n'

interface SettingsModalProps {
  open: boolean
  onClose: () => void
}

export default function SettingsModal({ open, onClose }: SettingsModalProps) {
  const { t, language, setLanguage } = useI18n()
  if (!open) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal settings-modal" onClick={(e) => e.stopPropagation()}>
        <h2>{t('Settings')}</h2>
        <div className="settings-section">
          <label htmlFor="app-language">{t('Language')}</label>
          <select
            id="app-language"
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'ar')}
          >
            <option value="en">{t('English')}</option>
            <option value="ar">{t('Arabic')}</option>
          </select>
        </div>
        <div className="actions">
          <button className="btn-secondary" onClick={onClose}>{t('Close')}</button>
        </div>
      </div>
    </div>
  )
}
