import type { StorageProvider, VaultUploadMeta, VaultDownloadMeta, ProviderUploadResult } from './storageProvider'
import type { ProviderVersion } from '../types'

export class OneDriveProvider implements StorageProvider {
  id: 'onedrive' = 'onedrive'
  name = 'OneDrive'
  type: 'cloud' = 'cloud'

  isConfigured(): boolean {
    return false
  }

  async testConnection(): Promise<{ ok: boolean; error?: string }> {
    return { ok: false, error: 'OneDrive integration is coming soon' }
  }

  async upload(_data: Buffer, _meta: VaultUploadMeta): Promise<ProviderUploadResult> {
    throw new Error('OneDrive integration is coming soon')
  }

  async download(_meta?: VaultDownloadMeta): Promise<Buffer> {
    throw new Error('OneDrive integration is coming soon')
  }

  async listVersions(): Promise<ProviderVersion[]> {
    return []
  }

  async restoreVersion(_versionId: string): Promise<Buffer> {
    throw new Error('OneDrive integration is coming soon')
  }
}
