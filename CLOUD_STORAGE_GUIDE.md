# PassGen - Cloud Storage Integration Summary

## What Was Added

Your PassGen desktop app now supports the full A-B-C storage plan with a provider architecture and zero-knowledge encryption.

### 🔐 Core Features Added

1. **Vault File System (Tier A)**
   - Encrypted vault file stored locally by default
   - Versioned local backups in `VaultBackups/`
   - Master password never stored (salt + KDF params only)

2. **Provider Architecture (Tier B + C)**
   - **Google Drive**: encrypted sync/backup (OAuth)
   - **S3-Compatible**: AWS S3, DigitalOcean Spaces, Wasabi, Cloudflare R2, MinIO
   - **Dropbox/OneDrive**: stubs included (coming soon)

3. **Zero-Knowledge Security**
   - Encryption happens locally only
   - Authenticated encryption: XChaCha20-Poly1305 (libsodium) or AES-256-GCM fallback
   - KDF: Argon2id preferred, PBKDF2 fallback with warning
   - Provider tokens/keys stored inside the encrypted vault payload

### 📦 Dependencies Used

- `googleapis` for Google Drive
- `@aws-sdk/client-s3` for S3-compatible storage
- `electron-store` for non-secret settings

### 📁 Key Files Added

- `electron/vault/crypto.ts` - KDF + authenticated encryption
- `electron/vault/providers/*` - Local, Google Drive, S3-compatible, Dropbox/OneDrive stubs
- `electron/vault/vaultRepository.ts` - Vault repository + provider orchestration
- `electron/vault/selfTest.ts` - Vault self-test harness

### 🔧 How It Works

1. **Unlock Vault**
   - Master password derives a key (Argon2id / PBKDF2)
   - Vault file header stores salt + params

2. **Save Vault**
   - Encrypt payload locally
   - Write to local file + backups
   - Upload encrypted blob to active cloud provider (if enabled)

3. **Load Vault**
   - Local file loads first
   - Active cloud provider syncs latest encrypted blob (Tier B/C)

### ☁️ Provider Configuration UI

- **Local Storage**: choose folder + backup retention
- **Google Drive**: Connect / Disconnect via OAuth, shows account email
- **S3-Compatible**: endpoint, region, bucket, keys, path prefix + Test Connection

### ✅ Self-Test Harness

Run a vault self-test in Electron:

```
npm run test:vault
```

Tests include:
- Encrypt → decrypt roundtrip
- Provider selection persistence
- Local versioning retention
- S3 signed request creation

### ⚠️ Notes

- Google Drive OAuth requires `PASSGEN_GOOGLE_CLIENT_ID` + `PASSGEN_GOOGLE_CLIENT_SECRET`.
- Cloud providers only store encrypted blobs (zero-knowledge).
- Dropbox and OneDrive are placeholders and can be wired later.
