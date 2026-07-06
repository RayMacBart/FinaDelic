import fetchDerivedKeyBase64 from "./backendDataCommunication/keyDerivationPoster.js";


function sleep(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
}

class Crypting {
   
   timespan;
   appData;
   
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

   
   decryptData = async (keyOBJ, ivU8A, ciphertextU8A) => {
      console.log('ciphertextU8A in decryptFunc:', ciphertextU8A);
      const decryptedBinary = await crypto.subtle.decrypt(
       {
         name: "AES-GCM",
         iv: ivU8A
       },
       keyOBJ,
       ciphertextU8A
     );

     return new TextDecoder().decode(decryptedBinary);
   }


   setEncryptedLocals = async () => {
      const updatedDataAndTimeObj = {data: this.appData.data, 
                                    timeObj: {
                                       startdate: this.timespan.start.toISOString(),
                                       enddate: this.timespan.end.toISOString(),
                                       rollingEndDate: this.timespan.rollingEndDate
                                    }};
      const updatedDataAndTimeObjString = JSON.stringify(updatedDataAndTimeObj);
      const ciphertextBase64 = await this.encryptDataToBase64(this.appData.keyOBJ, this.appData.ivU8A, updatedDataAndTimeObjString);
      const ivBase64 = this.uint8ArrayToBase64(this.appData.ivU8A);
      console.log('setting local salt:', this.appData.saltB64);
      const storageItem = JSON.stringify({ciphertext: ciphertextBase64, iv: ivBase64, salt: this.appData.saltB64});
      localStorage.setItem(this.appData.storeID, storageItem);
      this.appData.dumpPath(this.appData.getBagPath());
   }


   getDecryptedLocals = async (storeID) => {
      const storeObj = JSON.parse(localStorage.getItem(storeID));
      console.log('fetch key with salt:', storeObj.salt);
      const keyBase64 = await fetchDerivedKeyBase64(storeObj.salt);
      const keyU8A = this.base64ToUint8Array(keyBase64);
      const keyOBJ = await crypto.subtle.importKey("raw", keyU8A, { name: "AES-GCM" }, false, ["decrypt"]);
      const ivBase64 = storeObj.iv;
      const ivU8A = this.base64ToUint8Array(ivBase64);
      const ciphertextBase64 = storeObj.ciphertext;
      const ciphertextU8A = this.base64ToUint8Array(ciphertextBase64);
      
      console.log("keyBase64:", keyBase64);
      // console.log("KeyU8A:", keyU8A);
      // console.log("KeyU8A length:", keyU8A.length);
      // console.log("KeyObj:", keyOBJ);
      
      console.log("ivBase64:", ivBase64);
      // console.log("IV:", ivU8A);
      // console.log("IV length:", ivU8A.length);
      
      console.log("ciphertextBase64:", ciphertextBase64);
      console.log("Ciphertext:", ciphertextU8A);
      console.log("Ciphertext length:", ciphertextU8A.length);

      try {
         const decryptedDataString = await this.decryptData(keyOBJ, ivU8A, ciphertextU8A);
         const localObj = JSON.parse(decryptedDataString);
         const cipherpathBase64 = localStorage.getItem(`path:${storeID}`);
         console.log('attempt to decrypt pathB64:', cipherpathBase64);
         const cipherpathU8A = this.base64ToUint8Array(cipherpathBase64);
         console.log('AFTER DATA DECRYPTION // BEFORE PATH DECRYPTION!!!');
         const decryptedTaggedPath = await this.decryptData(keyOBJ, ivU8A, cipherpathU8A);
         const decryptedPath = decryptedTaggedPath.replace('1X2Y3Z4A5B6C7D8E9F', '');
         return {dataAndTimeObj: localObj, decryPath: decryptedPath};
      } catch (e) {
         if (e.name === 'OperationError') {
            console.warn('in Operation Error Handler!');
            if (localStorage.getItem(`path:${storeID}`)) {
               localStorage.removeItem(`path:${storeID}`);
            }
            if (localStorage.getItem(storeID)) {
               localStorage.removeItem(storeID);
            }
            console.log('sleeping...');
            await sleep(8000);
            location.reload();
         }
      }
   }
}

const crypting = new Crypting();

export default crypting;
