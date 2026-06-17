require('dotenv').config();
const crypto = require('crypto');
const argon2 = require('argon2');

class Crypt {

   constructor() {
      this.ALGO = 'aes-256-gcm';
      this.IV_LENGTH = 12;   // GCM standard
      this.SALT_LENGTH = 16; // for Argon2
      this.KEY_VERSION = 1;  // for future rotation
      this.MASTER_PASSWORD = process.env.APP_ENCRYPTION_PASSWORD;
   }
   // ALGO = 'aes-256-gcm';
   // IV_LENGTH = 12;   // GCM standard
   // SALT_LENGTH = 16; // for Argon2
   // KEY_VERSION = 1;  // for future rotation
   
   // MASTER_PASSWORD = process.env.APP_ENCRYPTION_PASSWORD;
   
   // Derive a 32-byte key from master password + salt (Base64)
   async #deriveKey(masterPassword, saltBase64) {
     const salt = Buffer.from(saltBase64, 'base64');
   
     const key = await argon2.hash(masterPassword, {
       type: argon2.argon2id,
       salt,
       hashLength: 32, // 32 bytes = 256-bit key
       raw: true       // get raw bytes (Buffer)
     });
   
     return key; // Buffer(32)
   }
   
   // Encrypt: returns one Base64 "envelope" string
   // aad: optional string or Buffer (e.g. userId, tenantId, recordId)
   async encrypt(text, aad) {
     if (!this.MASTER_PASSWORD) {
       throw new Error('APP_ENCRYPTION_PASSWORD is not set');
     }
   
     const salt = crypto.randomBytes(this.SALT_LENGTH);
     const key = await this.#deriveKey(this.MASTER_PASSWORD, salt.toString('base64'));
   
     const iv = crypto.randomBytes(this.IV_LENGTH);
     const cipher = crypto.createCipheriv(this.ALGO, key, iv);
   
     if (aad !== undefined) {
       const aadBuf = Buffer.isBuffer(aad) ? aad : Buffer.from(String(aad), 'utf8');
       cipher.setAAD(aadBuf);
     }
   
     let ciphertext = cipher.update(text, 'utf8', 'base64');
     ciphertext += cipher.final('base64');
   
     const authTag = cipher.getAuthTag();
   
     // Build envelope: version | salt | iv | authTag | ciphertext
     const envelope = JSON.stringify({
       v: this.KEY_VERSION,
       s: salt.toString('base64'),
       i: iv.toString('base64'),
       t: authTag.toString('base64'),
       c: ciphertext
     });
   
     // Store as single Base64 string in DB
     return Buffer.from(envelope, 'utf8').toString('base64');
   }
   
   // Decrypt: takes the Base64 envelope string from DB
   // aad: must be the same value used during encrypt()
   async decrypt(envelopeBase64, aad) {
     if (!this.MASTER_PASSWORD) {
       throw new Error('APP_ENCRYPTION_PASSWORD is not set');
     }
   
     const json = Buffer.from(envelopeBase64, 'base64').toString('utf8');
     const { v, s, i, t, c } = JSON.parse(json);
   
     if (v !== this.KEY_VERSION) {
       // here you could handle old key versions
       throw new Error(`Unsupported key version: ${v}`);
     }
   
     const key = await this.#deriveKey(this.MASTER_PASSWORD, s);
   
     const ivBuf = Buffer.from(i, 'base64');
     const tagBuf = Buffer.from(t, 'base64');
     const ctBuf = Buffer.from(c, 'base64');
   
     const decipher = crypto.createDecipheriv(this.ALGO, key, ivBuf);
   
     if (aad !== undefined) {
       const aadBuf = Buffer.isBuffer(aad) ? aad : Buffer.from(String(aad), 'utf8');
       decipher.setAAD(aadBuf);
     }
   
     decipher.setAuthTag(tagBuf);
   
     let decrypted = decipher.update(ctBuf, 'base64', 'utf8');
     decrypted += decipher.final('utf8');
   
     return decrypted;
   }
}

const cry = new Crypt();

module.exports = cry;