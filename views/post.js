const postsList = document.getElementById("posts-list");

const sendFile = (myFile, ws) => {
  const reader = new FileReader();

  reader.readAsDataURL(myFile);

  reader.onload = () => {
    const dataUrl = reader.result;
    ws.send(dataUrl);
    addImage(dataUrl);
  };
};

let ws;
function connect() {
  ws = new WebSocket("ws://localhost:3000/ws-posts");

  ws.onmessage = (event) => {
    const { type, data } = JSON.parse(event.data);
    console.log(type);
    if (type === "post") {
      addMessage(data.msg);
    }
  };
}

connect();

function addMessage(content) {
  const message = document.createElement("li");
  message.innerText = content;
  postsList.prepend(message);
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const inputText = document.querySelector("#post-area");
  const inputFile = document.getElementById("my-files");
  const file = inputFile.files[0];
  const postValue = inputText.value.trim();
  if (postValue !== "") {
    ws.send(postValue);
    addMessage(postValue);
    inputText.value = "";
  }
});