const {onObjectFinalized} = require("firebase-functions/v2/storage");
const { app, fsdb, imgStorage, imgStorageRef, thumbStorage, thumbStorageRef, pfpStorage, pfpStorageRef } = require("./firebase-admin");
const { v4: uuid } = require('uuid'); 
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions/v2");
const { doc, setDoc } = require("firebase/firestore"); 

exports.imgmetagen = onCall((request) => {

    const uploadedBy  = request.data.uploadedBy
    const imageID = request.data.imageID
    const imageRef = request.data.imageRef 
    const imageName = request.data.imageName
    const imageThumb = request.data.imageThumb
    const imageWidth = request.data.imageWidth
    const imageHeight = request.data.imageHeight
    const canvasID = request.data.canvasID


    setDoc(doc(fsdb, "images", ), {
        image_ID:imageID,
        image_ref:imageRef,
        width:imageWidth,
        height:imageHeight,
        user_id:uploadedBy
    })


});

