const admin = require("firebase-admin");

// Variable to hold the service account credentials
let serviceAccount;

if (process.env.NODE_ENV === "production") {
  // If in production (Vercel), use the environment variable
  serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
} else {
  // If in local development, use the file directly
  serviceAccount = require("../config/serviceAccountKey.json");
}

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
