import axios from 'axios';
import * as admin from 'firebase-admin';

const db = admin.database();

export const checkAllLinks = async () => {
  const ref = db.ref('links');  // تعديل هنا ليكون مرجعا لقاعدة البيانات
  const snapshot = await ref.once('value');
  const links = snapshot.val();

  if (links) {
    for (const key in links) {
      const link = links[key];
      try {
        const response = await axios.get(link.url);
        const status = response.status;
        console.log(`Link: ${link.url} Status: ${status}`);

        // تحديث حالة الرابط في Firebase
        const statusRef = db.ref(`links/${key}/status`);
        await statusRef.set(status);
      } catch (error) {
        console.error(`Error checking ${link.url}: ${error}`);
        const statusRef = db.ref(`links/${key}/status`);
        await statusRef.set("down");
      }
    }
  }
};


