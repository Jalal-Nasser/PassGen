# Data Persistence & Update Safety

## Overview
PassGen uses **browser localStorage** for all local data storage. This ensures that **user data persists across app updates** and is **never deleted during installation or updates**.

## What Gets Preserved During App Updates

### ✅ Premium Subscription
- **Key**: `passgen-premium`
- **Value**: `'true'` or `'false'`
- **Behavior**: Premium status persists across updates. If a user activates premium, it remains active after updating the app.

### ✅ Encrypted Passwords (Vault)
- **Key**: `passgen-vault-data`
- **Value**: Encrypted JSON array of password entries
- **Encryption**: AES-256 with master password as key
- **Behavior**: All stored passwords persist across updates. No password loss during update.

### ✅ Master Password Hash
- **Key**: `passgen-master-hash`
- **Value**: SHA-256 hash of user's master password
- **Behavior**: Persists across updates. User can unlock vault with same master password after update.

### ✅ Installation ID
- **Key**: `passgen-install-id`
- **Value**: UUID-format unique identifier
- **Behavior**: Persists across updates. Used for activation code generation/verification.

### ✅ Storage Configuration
- **Key**: `passgen-storage-config`
- **Value**: JSON config object (provider: local | google-drive | s3)
- **Behavior**: Cloud storage settings (if configured) persist across updates.

### ✅ Passkey Credential
- **Key**: `passgen-passkey-credential`
- **Value**: JSON object with credentialId and publicKey
- **Behavior**: Biometric/Windows Hello registration persists across updates.

### ✅ User Email
- **Key**: `passgen-user-email`
- **Value**: User's email address
- **Behavior**: Persists across updates.

### ✅ Onboarding Status
- **Key**: `passgen-onboarding-complete`
- **Value**: `'true'` or `'false'`
- **Behavior**: Persists across updates. Returning users skip onboarding wizard.

## What Gets Cleared Only On User Request

The following are **only cleared** when the user explicitly clicks "Reset App" (Menu → Reset App):
- All `passgen-*` keys
- Master password hash
- Vault data
- Premium status
- Passkey credential

**Updates do not trigger a reset**, so no automatic data loss occurs.

## Update Process (No Data Loss)
1. User downloads and installs new PassGen version
2. Electron/NSIS installer replaces the application code
3. Browser localStorage remains untouched
4. App launches → checks localStorage → finds existing data
5. All passwords, premium status, master hash loaded
6. User can immediately access vault with existing master password
7. No re-authentication or data re-entry required

## Technical Implementation

### Storage Manager (src/services/storageManager.ts)
- Uses localStorage for vault data: `passgen-vault-data`
- All entries are encrypted before storage
- No in-memory persistence; data re-decrypted on each session

### Config Store (src/services/configStore.ts)
- Uses localStorage for all configuration:
  - Premium status
  - Master password hash
  - Installation ID
  - Storage config
  - Passkey credential
  - User email

### Data Never Cleared Automatically
The only functions that clear data are:
1. `resetApp()` - **User-triggered** via Menu → Reset App
2. Password deletion - **User-triggered** for individual entries

## Migration & Backup

### Export Vault Backup (Premium)
Users can export encrypted vault as JSON file for backup/migration:
```
Actions → Export Vault Backup → Save to file
```

### Import Vault Backup (Premium)
Users can restore vault from backup file:
```
Actions → Import Vault Backup → Select backup file
```

## Summary

✅ **Premium subscriptions** persist across updates  
✅ **All stored passwords** persist across updates  
✅ **Master password** setting persists across updates  
✅ **Installation ID** persists across updates  
✅ **Biometric passkey** registration persists across updates  

**Data is only lost if:**
- User explicitly clicks "Reset App"
- User uninstalls app and deletes AppData/localStorage
- Hard disk failure

**Safe to update!** All user data is preserved.
