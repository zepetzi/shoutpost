// const {app} = require("./firebase-admin");
const {fsdb, storage, storageRef, imagesRef, thumbsRef} = require("./firebase-admin");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions/v2")
const { v4: uuid } = require('uuid'); 


exports.imageupload = onCall((request) => {

    


});
