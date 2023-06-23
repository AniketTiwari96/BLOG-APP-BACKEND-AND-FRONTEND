
const express=require('express')
const app=express()
const port=4000
const path = require('path')
const http = require('http').createServer(app)


const bodyParser = require('body-parser')



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

const router=require('./router/create_router')

app.get('/', (req, res) => {
    res.render('like-dislike');
});


app.use('/image', express.static('Images'));
app.use('/image', express.static(path.join(__dirname, 'Images')));


app.use(express.json())

app.use('/',router)



http.listen(port,()=>{
    console.log(`this server is runing on ${port}`);
})

// ===============
app.use(express.static(__dirname+"/public"))

// app.get('/',(req,res)=>{
//     res.sendFile(__dirname+'/ChatPage.html');
//     // res.sendFile(__dirname+'/index.html')
// })


const io = require('socket.io')(http)

io.on('connection',(socket)=>{
    console.log('conneted..');
    socket.on('message',(msg)=>{
        console.log('================',msg);
        socket.broadcast.emit('message',msg)
        
    })
})
// ===============



