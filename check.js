import fetch from "node-fetch";
import db from "./firebase.js";

export async function checkAllLinks() {
  const snapshot = await db.ref("urls").once("value");
  const data = snapshot.val();

  if (!data) return;

  for (const userId in data) {
    for (const linkId in data[userId]) {
      const link = data[userId][linkId];
      try {
        const res = await fetch(link.url, { method: 'HEAD', timeout: 5000 });
        const status = res.ok ? "active" : "down";
        await db.ref(`urls/${userId}/${linkId}`).update({
          status,
          lastChecked: new Date().toISOString(),
        });
        console.log(`Checked: ${link.url} => ${status}`);
      } catch (err) {
        await db.ref(`urls/${userId}/${linkId}`).update({
          status: "down",
          lastChecked: new Date().toISOString(),
        });
        console.log(`Failed: ${link.url} => down`);
      }
    }
  }
}
