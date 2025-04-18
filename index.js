import express from "express";
import axios from "axios"; // لجلب الروابط والتحقق منها
import { initializeApp, credential, database } from "firebase-admin"; // استيراد Firebase Admin SDK

// تهيئة Firebase
initializeApp({
  credential: credential.applicationDefault(), // استخدم المفتاح الخاص بك هنا إذا كنت تحتاجه
  databaseURL: "https://uptimex-monitor-default-rtdb.firebaseio.com/" // ضع هنا رابط قاعدة البيانات الخاص بك في Firebase
});

const app = express();
const PORT = process.env.PORT || 3000;

// دالة للتحقق من الرابط
const checkLink = async (url) => {
  try {
    const response = await axios.get(url); // إرسال طلب GET للتحقق من الرابط
    return response.status === 200; // إذا كانت الاستجابة ناجحة، نرجع true
  } catch (error) {
    console.error(`Error checking ${url}:`, error.message);
    return false; // إذا حدث خطأ، نرجع false
  }
};

// دالة للتحقق من جميع الروابط في قاعدة البيانات (links)
const checkAllLinks = async () => {
  try {
    // استرجاع جميع الروابط من قاعدة البيانات "links" في Firebase
    const snapshot = await database().ref("links").once("value");
    const links = snapshot.val();

    if (links) {
      for (const [id, linkData] of Object.entries(links)) {
        const url = linkData.url; // الحصول على الرابط من البيانات
        const isUp = await checkLink(url); // التحقق من حالة الرابط
        console.log(`Link ${url} is ${isUp ? "up" : "down"}`);

        // تحديث حالة الرابط في قاعدة البيانات
        await database().ref(`links/${id}`).update({ isUp });
      }
    }
  } catch (error) {
    console.error("Error checking all links:", error.message);
  }
};

// المسار الأساسي
app.get("/", (req, res) => {
  res.send("UptimeX backend running!");
});

// المسار الخاص بالتحقق من الروابط يدويًا
app.get("/check-links", async (req, res) => {
  try {
    await checkAllLinks(); // تنفيذ التحقق من جميع الروابط
    res.send("All links checked successfully!");
  } catch (error) {
    res.status(500).send("Error checking links");
  }
});

// الاستماع على المنفذ المحدد
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// تحقق من الروابط كل 5 دقائق
setInterval(checkAllLinks, 5 * 60 * 1000); // 5 * 60 * 1000 يعني كل 5 دقائق

