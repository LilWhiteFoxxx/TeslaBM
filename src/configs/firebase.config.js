const admin = require('firebase-admin');
const serviceAccount = require('./ex9-firebase-firebase-adminsdk-er64y-1c6a69e850.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://ex9-firebase.appspot.com',
});

const bucket = admin.storage().bucket();

module.exports = { bucket };
