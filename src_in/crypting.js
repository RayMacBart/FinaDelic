import fetchDerivedKeyBase64 from "./backendDataCommunication/keyDerivationPoster.js";

class Crypting {

   base64ToUint8Array(base64) {
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
         bytes[i] = binary.charCodeAt(i);
      }
      return bytes;
   }


   uint8ArrayToBase64(bytes) {
      let binary = "";
      for (let i = 0; i < bytes.length; i++) {
         binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
   }



   encryptDataToBase64 = async (keyOBJ, ivU8A, plaintextData) => {

      const dataU8A = new TextEncoder().encode(plaintextData);

      const ciphertextBuffer = await crypto.subtle.encrypt(
         {
            name: "AES-GCM",
            iv: ivU8A
         },
         keyOBJ,
         dataU8A
      );

      // Convert ArrayBuffer → Uint8Array
      const ciphertextBytes = new Uint8Array(ciphertextBuffer);

      // Convert Uint8Array → Base64
      let binary = "";
      for (let i = 0; i < ciphertextBytes.length; i++) {
         binary += String.fromCharCode(ciphertextBytes[i]);
      }
      const base64 = btoa(binary);

      return base64;
   }

   
   decryptData = async (keyOBJ, ivU8A, ciphertext) => {
      const decryptedBinary = await crypto.subtle.decrypt(
       {
         name: "AES-GCM",
         iv: ivU8A
       },
       keyOBJ,
       ciphertext
     );

     
     return new TextDecoder().decode(decryptedBinary);
   }

   getDecryptedLocals = async (storeID) => {
      const storeObj = JSON.parse(localStorage.getItem(storeID));
      const keyBase64 = await fetchDerivedKeyBase64(storeObj.salt);
      const keyU8A = this.base64ToUint8Array(keyBase64);
      const keyOBJ = await crypto.subtle.importKey("raw", keyU8A, { name: "AES-GCM" }, false, ["decrypt"]);
      const ivBase64 = storeObj.iv;
      const ivU8A = this.base64ToUint8Array(ivBase64);
      const ciphertextBase64 = storeObj.ciphertext;
      const ciphertextU8A = this.base64ToUint8Array(ciphertextBase64);
      
      console.log("KeyU8A:", keyU8A);
      console.log("KeyU8A length:", keyU8A.length);
      console.log("KeyObj:", keyOBJ);

      console.log("IV:", ivU8A);
      console.log("IV length:", ivU8A.length);

      console.log("Ciphertext:", ciphertextU8A);
      console.log("Ciphertext length:", ciphertextU8A.length);


      const decryptedDataString = await this.decryptData(keyOBJ, ivU8A, ciphertextU8A);
      const localObj = JSON.parse(decryptedDataString);
      const cipherpathBase64 = localStorage.getItem(`path:${storeID}`)
      const cipherpathU8A = this.base64ToUint8Array(cipherpathBase64);
      const decryptedPath = await this.decryptData(keyOBJ, ivU8A, cipherpathU8A);
      return {dataAndTimeObj: localObj, decryPath: decryptedPath};
   }
}

const crypting = new Crypting();

export default crypting;
