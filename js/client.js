const { chartreuse } = require("color-name");

const socket=io('http://localhost:8000');

const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp')
const messageContainer=document.querySelector(".container")

const append = (message,position)=>{
    const messageElemnent = document.createElement('div');
    messageElemnent.innerText=message;
    messageElemnent.classList.add('message');
    messageElemnent.classList.add(position);
    messageContainer.append(messageElemnent);
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.ariaValueMax;
    append('you: ${message}','right');
    socket.emit('send',message);
    messageInput.value=''
})

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
    append('${name} joined the chat','right')
})

socket.on('receive', data =>{
    append('${data.name}: ${data.message}','left')
})

socket.on('left', name=>{
    append('${name) left the chat','left')
})