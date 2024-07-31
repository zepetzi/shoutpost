const { onObjectFinalized } = require("firebase-functions/v2/storage");
const { getFirestore, app, fsdb } = require("./firebase-admin");
const { v4: uuid } = require('uuid'); 
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions/v2");
const { FieldValue } = require('firebase-admin/firestore');

exports.postgen = onCall((request) => {
 

    const newCanvasData = { 
        ...request.data,
        created_at: FieldValue.serverTimestamp(),
        current_depth: 0,
        current_posts: [],
        set_name: 'None',
        set_theme: 'None'
    }
});
