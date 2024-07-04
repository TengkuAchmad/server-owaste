// ENVIRONMENT 
require('dotenv').config()

// LIBRARY IMPORT 
const admin             = require('firebase-admin')
const { initializeApp } = require('firebase/app')

// SERVICE ACCOUNT KEY
const serviceAccount    = require('../../credentials/certi-owaste-firebase.json'); 

// CONSTANTS
const { BUCKET_URL }    = process.env

// INITIALIZE APP
var firebaseConfig = {
  credentials: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET_URL
}

const app = initializeApp(firebaseConfig);

exports.default = app