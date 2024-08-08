const { onObjectFinalized } = require("firebase-functions/v2/storage");
const { getFirestore, app, fsdb } = require("./firebase-admin");
const { v4: uuid } = require('uuid'); 
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions/v2");
const { FieldValue } = require('firebase-admin/firestore');

exports.postgen = onCall((request) => {

    const { postID, canvasID, uploadedBy, postCaption, isPromoted, thumbName, imageName } = request.data;

    const post_id = postID;
    const canvas_id = canvasID;
    const user_id = uploadedBy;
    const post_caption = postCaption;
    const is_promoted = isPromoted;
    const image_name = imageName;
    const thumb_name = thumbName;
    const created_at = FieldValue.serverTimestamp()
    const x_pos = Math.random() * (1300 - 0) + 0;
    const y_pos = Math.random() * (720 - 0) + 0;
    const post_comments = [];
    const post_likes = []
    // const post_depth = 0;
    const by_canv_owner = false;

    //need to download document or make a snapshot and check if uploading user is canvas owner


    return {
        status: 'success',
        message: 'post created successfully'
        };

});

