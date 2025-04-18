import express from "express";
import { checkAllLinks } from "./checkLinks.js";
import * as admin from "firebase-admin";

// إعداد Firebase
admin.initializeApp({
  credential: admin.credential.cert({
  "type": "service_account",
  "project_id": "uptimex-monitor",
  "private_key_id": "761587f90c41d8a682951d9cd8c689e7e06178d1",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9Th8YMfsMYxZE\nuZ0/nvZPweKNen/Gn1Oh8xcEd+p559iHazGNmPAnlPDHC8ASebsF/jiQOohp3VAM\noveBd8IsocpaoVX/Qez+JkEjPr/haaLmnIR8NAdEMFGuqJ9g6U74h+MtXn37Vz+g\nzkf4oywyDo/DaG64c2JHdhL3tzuAgtN+hHgxioBGOSmvLozzjeFW5bC/T+eb2iaT\nzmgBO+x0hF/xYzYlWa/ssBYgbgsmdI2ezoYaEZWD7fCWQs2UGhCxvzafKzGcN3am\nqrvAStx0aUdjLusIT69ThIDssMga9TdtER//3hlx0q1oBkPAwjIccV3mQQNeldCy\nj80OWZo3AgMBAAECggEARAfPJOLRVaJGXmxWFocJ/Z+vyyg6wyZ+57R0kSaHHUg0\niHX9WOWdaJwd62pNnFYi4AR8T1i5rVHbcq8eQ2jGX0PFdMyGGzWV9b/JqODkFB3i\nbP3SntATzG2Q7TOsEyfFOYucGLHclHbGZwO62Z/KQjL5d0AQijjtGMFWD6/JsmSz\nMACNK7vvQ0FAOAqs/Ctzkn9zdm7DDj9bjmDuBhUDpzk18DTuCbzsVb2ZbtLQPnXc\neVs/Y0NPRYEaQzxuMAzstpT3dU0X7t4Lvj4QBbaR5OVbfkHn5XsrSBy2NQabA4Jj\nYpikw1l4G9H7PFj0IYqAQ3+87eQ1hMC21YlZlVsgAQKBgQDncgY8Z661F4xjB57W\ndDuDuRIO7uNgg0+yOWG642n0lrEWXwVA/NFftiL9JRdC/Hohn2e0O9say3gCVDvO\n85jh289WkTNxKzTzJhs0QaY5ZFhwZL+X14kvzfFCT4WLivryO841VH0O/0iBrRRc\n51QYDiXIYlG9rywqrJdDuJsYXQKBgQDRY5U4hkgFoDwK5r9Pd2dpdwLfJDnQ3hRv\nVZfYhL5iV5k7NWEbbwWjfQ1HzaQCaTdYs6pgfi75O8LNg94cDniFwQyXmFpj9q8Y\nEHQ+aQGZBmv3TWtulqe1DSP1YK6KXZIyAgAN1+uGY9JEnjQoTOxX0RPtXgJdlnmy\nTZ77FpADowKBgQCcuM+UM7lQE0QTAuQB3+81AStDRWxevExJKSYOgVQMNcZwmaNb\nIFc+8ny64lTgHUsuXVzB5Q43FLSNDzD4sGdD+a5qtiQZa+KNC668MgA3OMXSRcaf\nMWpKHrBR8LtDhLbtNKYr4qxUbXVRqjvxtQtyxpG7ISisw2Oq+ffr+aO8WQKBgCND\nTxUW4Dg6VQJM+/kJFdxYE566vhXj4LMjShBHwrxTHlYvVixFlUCEReFKy40wZQbG\nMzJO7eBBZTwxMg2tjjSQX2uEV+yv1asK0ljUXFWGFFawriAQtSuzi9O+NYbN3VoY\npiOuslaOpxGxRv1mfwMHDgESrPlP5yzVD6ofkZ9bAoGBANn1G3XM3086VzSYuVZr\n92QNS3IFnPyyFDpGdJ/+UIjurxAzC+shhMh0pStHI8V/y8Eq66sx84rTOZ8xQLQu\nU3Cl9Su6faZKx3NZ28R2yUT6RR1Ey8jX3CFZjwuzJj4Z014dF/ijCq5EIRVGni0c\ncabc75j6Vs4FiX/ZRnWQkoCY\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@uptimex-monitor.iam.gserviceaccount.com",
  "client_id": "107484982779526819506",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40uptimex-monitor.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

// إعداد Express
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("UptimeX backend running!");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// تحقق من جميع الروابط كل 5 دقائق
setInterval(checkAllLinks, 5 * 60 * 1000);


