// function to read from the input text boxes
function readInputText(botName, clearInput) {
  let inputTextObj = document.getElementById(`input-text-${botName}`);
  let text = inputTextObj.value;
  if (clearInput == true) {
    inputTextObj.value = "";
  }
  return text;
}

function handleChatMessage(sender, receiver, chatMessage) {
  if (sender == "user_text") {
    chatMessage = "You wrote: " + chatMessage;
  }
  if (sender == "user_speech") {
    chatMessage = "You said: " + chatMessage;
  }

  let message = {
    sender: sender,
    receiver: receiver,
    content: chatMessage,
  };
  manager.publish("new_chat_message", message);
}

// declaring the variables for the two button elements
const btnTextPico = document.getElementById("text-pico");
const btnTextBit = document.getElementById("text-bit");

// adding the event listeners for the buttons
btnTextPico.addEventListener("click", function () {
  let text = readInputText("pico", true);
  handleChatMessage("user_text", "pico", text);
});

btnTextBit.addEventListener("click", function () {
  let text = readInputText("bit", true);
  handleChatMessage("user_text", "bit", text);
});

const btnTalkPico = document.getElementById("talk-to-pico");
const btnTalkBit = document.getElementById("talk-to-bit");

btnTalkPico.addEventListener("click", function () {
  let text;
  listen((result) => {
    text = result;
    handleChatMessage("user_speech", "pico", text);
  });
});

btnTalkBit.addEventListener("click", function () {
  let text;
  listen((result) => {
    text = result;
    handleChatMessage("user_speech", "bit", text);
  });
});

let subBallon = manager.subscribe("speech_event", (message) => {
  let eventType = message.eventType;
  let bot = message.bot;
  let text = message.speech;
  if (eventType == "start") {
    showTextBalloon(bot, text);
  } else {
    hideTextBalloon(bot);
  }
});

let subChatMessage = manager.subscribe("new_chat_message", (message) => {
  let sender = message.sender;
  let bot = message.receiver;
  let text = message.content;
  speak(bot, text);
});
