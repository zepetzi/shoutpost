const { fsdb, storage, storageRef, imagesRef, thumbsRef, logger, path, onObjectFinalized, sharp } = require("./firebase-admin");
const { v4: uuid } = require('uuid'); 
const { onCall, HttpsError } = require("firebase-functions/v2/https");

exports.thumbnailgen = storage.onObjectFinalized((request) => {

    
    //placeholder for thumbnail generator if needed

});
