const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getStorage} = require("firebase-admin/storage");
const { onObjectFinalized } = require("firebase-functions/v2/storage");
const { logger } = require("firebase-functions/logger");
// const { path } = require("path");
// const { thumbnailgen } = require('./thumbnailgen')
// const functions = require('firebase-functions/v2/https');
const admin = require('firebase-admin');
const app = admin.initializeApp();

const sharp = require("sharp");

// const app = initializeApp({
//     credential: cert(serviceAccount),
//     storageBucket: 'shoutpost-17849.appspot.com'
// });

const fsdb = getFirestore(app);
const imgStorage = getStorage();    
// const thumbStorage = getStorage(app, 'post_thumbs');
// const pfpStorage = getStorage(app, 'user_pfps');

module.exports = { 
    app, 
    fsdb, 
    imgStorage,
    logger, 
    getFirestore
};

