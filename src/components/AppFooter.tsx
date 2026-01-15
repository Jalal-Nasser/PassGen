
import { useI18n } from '../services/i18n'

function AppFooter() {
  const year = 2026
  const { t, language, setLanguage } = useI18n()

  return (
    <footer className="app-footer">
      <div className="footer-clouds" aria-label="Supported cloud storage providers">
        <div className="footer-cloud-card">
          <img
            src="/google-drive.png"
            alt="Google Drive"
          />
        </div>
        <div className="footer-cloud-card">
          <img
            src="/aws-s3.svg"
            alt="AWS S3"
          />
        </div>
        <div className="footer-cloud-card">
          <img
            src="/supabase.svg"
            alt="Supabase"
          />
        </div>
        <div className="footer-cloud-card">
          <img
            src="/onedrive.svg"
            alt="OneDrive"
          />
        </div>
      </div>
      <span className="footer-line">
        © {year} PassGen · {t('Developer')}: <a href="https://github.com/Jalal-Nasser" target="_blank" rel="noopener noreferrer">JalalNasser</a> · {t('Deployed by')}: <a href="https://mdeploy.dev" target="_blank" rel="noopener noreferrer">mDeploy</a>
        {' '}· <a href="#" onClick={(e)=>{e.preventDefault(); window.dispatchEvent(new Event('open-terms'))}}>{t('Terms')}</a>
        {' '}· <span className="footer-lang">
          {t('Language')}:{' '}
          <select
            className="footer-lang-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'ar')}
          >
            <option value="en">{t('English')}</option>
            <option value="ar">{t('Arabic')}</option>
          </select>
        </span>
      </span>
    </footer>
  )
}

export default AppFooter
