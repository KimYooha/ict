require("dotenv").config(); 

const path = require("path");
const express = require("express");
const colors = require("colors");
//const dotenv = require("dotenv");
const socketio = require("socket.io");
const dialogflow = require("@google-cloud/dialogflow");
const uuid = require("uuid");
const app = express();

require("dotenv").config(); 
console.log("Project ID :", process.env.PROJECT_ID)
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;
const projectId = 'cookingchatbot'
var context
//var context = 'projects/cookingchatbot/agent/sessions/5bd81f18-c941-4a8c-9e61-1b9be8c5ab20/contexts/cookingstep1-followup';
var i=0


const server = app.listen(
  PORT,
  console.log(
    `Server is runnig on ${process.env.NODE_ENV} mode at port ${PORT} with ${process.env.PROJECT_ID}`.yellow
      .bold
  )
);

const io = socketio(server);
io.on("connection", function (socket) {
  console.log("a user connected");



  //제스쳐 보내는 부분
  socket.on('gesture', (msg) => {
    console.log("get file");
    console.log(msg);
    io.emit("number", msg);
  });  



  

  socket.on("chat message", (message) => {
    console.log(message);
    const sessionId = uuid.v4();
    const callapibot = async (projectId = process.env.PROJECT_ID) => {
      try {
        
        const sessionClient = new dialogflow.SessionsClient({
          keyFilename: "./cookingchatbot-ee82511365a7.json",
        });
        const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
        var context = 'projects/cookingchatbot/agent/sessions/5bd81f18-c941-4a8c-9e61-1b9be8c5ab20/contexts/cookingstep'+String(i)+'-followup'
        const request = {
           session: sessionPath,
           queryInput: {
             text: {
               text: message,
               languageCode: "ko-KR",
             },
           },
            
           queryParams: {
             contexts: [
             {
             "name": context,
             "lifespanCount": 9
             },
             ]
             },
         }
        const responses = await sessionClient.detectIntent(request);

        console.log("Detected intent");
        console.log(context)
        const result = responses[0].queryResult.fulfillmentText;
        settime = 0
        var intent = responses[0].queryResult.intent.displayName;
        if (intent.indexOf('step') != -1) {
          var context = responses[0].queryResult.outputContexts[0].name;
        } else if (intent.indexOf('타이머') != -1) {
          var settime = responses[0].queryResult.parameters.fields.duration_kor.stringValue;
          console.log('타이머 시간:', settime);
          io.emit("gettime", settime);
        } else if (intent.indexOf('유튜브') != -1) {
          var play = true
          console.log('영상재생:',play)
          io.emit("youtube", play);
        }
        socket.emit("bot reply", result);
        console.log(result);
        console.log('입력된 intent :' , intent)
        
        console.log('입력된 context :' , context);
        
        
        if (intent.indexOf('step') != -1) {
          i += 1
        }
        
        console.log(i)
        if (result.intent) {
          console.log(`  Intent: ${result.intent.displayName}`);
        } else {
          console.log(`  No intent matched.`);
        }
      } catch (error) {
        console.log(error);
      }
    return settime
    };
    
    callapibot();
    //console.log('왜 알아먹질 못하니',settime)
  });
  
});


