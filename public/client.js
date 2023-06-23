

const socket = io()


let name;
let textarea= document.querySelector('#textarea')
let massageArea =  document.querySelector('.massageArea')

// this loop for condition 
do{
    name = prompt('Please enter your name ')
}while(!name)

textarea.addEventListener('keyup',(event)=>{
    if(event.key === 'Enter'){
        sendMessage(event.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user:name,
        message:message.trim()
    }
    //append
    appendMessage(msg,'outgoing')
    textarea.value = ''

    scrollToBottom()


    // send to server
    socket.emit('message',msg)
}

// this function for sand message
function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let classname  = type
    mainDiv.classList.add(classname,'message')

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `

    mainDiv.innerHTML  = markup
    massageArea.appendChild(mainDiv);
    
}

// recieve message 

socket.on('message',(msg)=>{
    // console.log('======',msg);
    appendMessage(msg,'incoming')
    scrollToBottom
})

function scrollToBottom(){
    massageArea.scrollTop = massageArea.scrollHeight
}