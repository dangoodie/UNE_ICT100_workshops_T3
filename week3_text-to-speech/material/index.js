// function to read from the input text boxes
function readInputText(botName, clearInput) {
  let inputTextObj = document.getElementById(`input-text-${botName}`);
  let text = inputTextObj.value;
  if (clearInput == true) {
    inputTextObj.value = "";
  }
  return text;
}

const btnTextPico = document.getElementById("text-pico");
btnTextPico.addEventListener("click", () => {
  let text = readInputText("pico", true);
  if (text != "") {
    showTextBalloon("pico", text);
    speak("pico", text);
  }
});

const btnTextBit = document.getElementById("text-bit");
btnTextBit.addEventListener("click", () => {
  let text = readInputText("bit", true);
  if (text != "") {
    showTextBalloon("bit", text);
    speak("bit", text);
  }
});
