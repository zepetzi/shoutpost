const { onObjectFinalized } = require("firebase-functions/v2/storage");
const { getFirestore, app, fsdb } = require("./firebase-admin");
const { v4: uuid } = require('uuid'); 
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions/v2");
const { FieldValue } = require('firebase-admin/firestore');

const canvasgen = onCall(async (request) => {
 
    //data incoming to cloud function
    const { owner, canvas_id } = request.data


    try {
        
        //create object for firestore
        const newCanvasData = { 
            owner: owner,
            canvas_id: canvas_id,
            created_at: FieldValue.serverTimestamp(),
            current_depth: 0,
            current_posts: [],
            set_name: 'None',
            set_theme: 'None'
        }

        //upload to firestore
        const res = await fsdb.collection('canvases').doc(canvas_id).set(newCanvasData);

        //send success message as return to client
        return {
            status: 'success',
            message: 'canvas data created successfully',
            data: { }
            };

    } catch(error) {

        console.error('Error in canvas data creation:', error);
        if (error instanceof HttpsError) {
            throw error;
        } else {
            throw new HttpsError('internal', 'canvas data creation failed', { originalError: error.message });
        }
    }


});


module.exports = { canvasgen };
