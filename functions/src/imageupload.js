// const {app} = require("./firebase-admin");
const {fsdb, imgStorage, imgStorageRef, thumbStorage, thumbStorageRef, pfpStorage, pfpStorageRef } = require("./firebase-admin");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions/v2")
const { v4: uuid } = require('uuid'); 


exports.imageupload = onCall((request) => {

    


});
