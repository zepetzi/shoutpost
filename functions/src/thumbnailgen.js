const { fsdb, imgStorage, imgStorageRef, thumbStorage, thumbStorageRef, pfpStorage, pfpStorageRef, logger, path, onObjectFinalized, sharp } = require("./firebase-admin");
const { v4: uuid } = require('uuid'); 
const { onCall, HttpsError } = require("firebase-functions/v2/https");

exports.thumbnailgen = imgStorage.onObjectFinalized((request) => {

    
    //placeholder for thumbnail generator if needed

});
