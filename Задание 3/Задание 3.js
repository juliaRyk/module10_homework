const wsUrl = "wss://echo-ws-service.herokuapp.com/";

const btnSend = document.querySelector('.j-btn-sent');
const inputMessage = document.querySelector('.input');
const output = document.getElementById("output");

let websocket = new WebSocket(wsUrl);

websocket.onopen = function(o) {
    console.log("CONNECTED");
};

websocket.onerror = function(o) {
    console.log(o.data)
};

websocket.onmessage = function(o) {
  console.log(o.data);
  addMessage(o.data, 'flex-start');
};

btnSend.addEventListener('click', () => {
    let message = inputMessage.value;
    websocket.send(message);
    addMessage(message);
    messageInput.value = ''
})

function addMessage(message, position='flex-end') {
    let element = `<p class='message-window' style='align-self: ${position}'>${message}</p>`;
    let chat = output.innerHTML;
    output.innerHTML = chat + element;
}

const btnGeoLoc = document.querySelector('.j-btn-geoloc');

const error = () => {
    output.textContent = "Позиция не может быть определена";
}

const success = (position) => {
    console.log('position', position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    output.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
    mapLink.href = `https://www.openstreetmap.org/${latitude}/${longitude}`;
}

btnGeoLoc.addEventListener('click', () => {
  mapLink.href = '';
  mapLink.textContent = '';
  
  if (!navigator.geolocation) {
    output.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    output.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});