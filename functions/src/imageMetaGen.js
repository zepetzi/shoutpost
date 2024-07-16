const {onObjectFinalized} = require("firebase-functions/v2/storage");
const { fsdb, storage, storageRef, imagesRef, thumbsRef } = require("./firebase-admin");
const { v4: uuid } = require('uuid'); 
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const {logger} = require("firebase-functions/v2");

exports.imgmetagen = onCall((request) => {

    


});
