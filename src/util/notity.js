import admin from "../auth/admin";

const notity = (token, msg) =>{

    var message = {
        data: {
            body: msg,
        },
    };

    var options = {
        priority: "high",
        timeToLive: 60 * 60 * 24,
    };
    
    admin
    .messaging()
    .sendToDevice(token, message, options)
    .then((response) => {
        console.log("Successfully sent message:", response);
    })
    .catch((error) => {
        console.log("Error sending message:", error);
    });
}

export default notity;