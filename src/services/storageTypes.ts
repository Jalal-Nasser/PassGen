export type ProviderId = 'local' | 'google-drive' | 's3-compatible' | 'dropbox' | 'onedrive'

export interface LocalStorageConfig {
  vaultFolder?: string
  backupsEnabled?: boolean
  keepLast?: number
}

export interface S3CompatibleConfig {
  endpoint?: string
  region: string
  bucket: string
  accessKeyId: string
  secretAccessKey: string
  pathPrefix?: string
}

export interface StorageConfig {
  provider: ProviderId
  local?: LocalStorageConfig
  s3Compatible?: S3CompatibleConfig
}
