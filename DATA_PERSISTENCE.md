# Data Persistence & Update Safety

## Overview
PassGen stores the **encrypted vault file on disk** and keeps lightweight app settings in localStorage and electron-store. This ensures user data persists across updates without exposing plaintext or the master password.

## What Gets Preserved During App Updates

### ✅ Encrypted Vault File (Local Tier A)
- **Path**: `%APPDATA%/PassGen/Vault/passgen-vault.pgvault` (Electron userData)
- **Format**: JSON wrapper containing header + ciphertext
- **Encryption**: Argon2id-derived key (or PBKDF2 fallback) + authenticated encryption
- **Behavior**: Vault persists across updates; backups stored in `VaultBackups/` when enabled.

### ✅ Premium Subscription
- **Key**: `passgen-premium`
- **Value**: `'true'` or `'false'`
- **Behavior**: Premium status persists across updates.

### ✅ Premium Tier (if set)
- **Key**: `passgen-premium-tier`
- **Value**: `free | pro | cloud | byos`
- **Behavior**: Persists across updates for tier gating.

### ✅ Installation ID
- **Key**: `passgen-install-id`
- **Value**: UUID-format unique identifier
- **Behavior**: Persists across updates. Used for activation code verification.

### ✅ Passkey Credential
- **Key**: `passgen-passkey-credential`
- **Value**: JSON object with credentialId and publicKey marker
- **Behavior**: Persists across updates for passkey unlock.

### ✅ User Email / Hints
- **Keys**: `passgen-user-email`, `passgen-password-hint`
- **Behavior**: Persist across updates.

### ✅ Storage Settings (non-secret)
- **Store**: electron-store (`passgen-settings.json`)
- **Values**: active provider ID + local vault path
- **Behavior**: Persists across updates.

## What Is NOT Stored
- **Master Password**: never stored. Only the vault header stores salt + KDF parameters.
- **Provider Secrets**: tokens/keys are stored **inside the encrypted vault payload** only.

## What Gets Cleared Only On User Request
The following are cleared when the user explicitly resets the app:
- `passgen-*` localStorage keys (premium status, passkeys, onboarding)
- Encrypted vault file and backups (if removed by the user)

## Update Process (No Data Loss)
1. User installs a new PassGen version
2. App code is replaced by the installer
3. Vault file + local settings remain untouched
4. App launches, detects vault file, and prompts for master password
5. User unlocks vault with existing password

## Migration & Backup

### Export Vault Backup (Premium)
Users can export an encrypted vault file for backup:
```
Actions → Export Vault Backup → Save file
```

### Import Vault Backup (Premium)
Users can restore a vault backup:
```
Actions → Import Vault Backup → Select backup file
```

## Summary

✅ Encrypted vault file persists across updates
✅ Premium status and passkeys persist across updates
✅ Master password is never stored
✅ Provider secrets remain encrypted inside the vault

**Safe to update!** All user data stays intact.
