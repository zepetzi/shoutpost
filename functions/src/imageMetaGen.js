const { onObjectFinalized } = require("firebase-functions/v2/storage");
const { getFirestore, app, fsdb } = require("./firebase-admin");
const { v4: uuid } = require('uuid'); 
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions/v2");
const { doc, setDoc, } = require("firebase-admin/firestore"); 


// fsdb = getFirestore();

const imagemetagen = onCall(async (request) => {

    try {

        console.log ("test 1 -------------------------------------------------"); 
    
        const { uploadedBy, imageName, thumbName, imageWidth, imageHeight } = request.data;
        if (!uploadedBy || !imageName || !thumbName || !imageWidth || !imageHeight) {
            throw new HttpsError('invalid metadata', 'one or more fields are invalid')
        }

        const data = {
            user_id: uploadedBy,
            image_name: imageName,
            thumb_name: thumbName,
            width: imageWidth,
            height: imageHeight,
        }

        console.log ("test 2 -------------------------------------------------"); 
        const res = await fsdb.collection('images').doc(imageName).set(data);

        return {
            status: 'success',
            message: 'img metadata created and uploaded successfully'
            };

    } catch(error) {

        console.error('Error in metadata upload:', error);
        if (error instanceof HttpsError) {
            throw error;
        } else {
            throw new HttpsError('internal', 'image metadata generation failed', { originalError: error.message });
        }
    }

});

module.exports = { imagemetagen };
