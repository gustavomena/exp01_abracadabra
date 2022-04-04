
const express = require('express')
const app = express()
const exphbs= require('express-handlebars')
const { dirname } = require('path/posix')

app.listen(3000, () => {
    console.log('server UP')
})

// app.set('view engine', 'handlebars')
// app.engine(
//     'handlebars', exphbs.engine({
//         layoutsDir: __dirname + '/views',
//         partialsDir:__dirname+'/views/component'
//     })
// )

app.use(express.static('assets'))


app.get('/abracadabra', (_, res) => {
    res.sendFile(__dirname + '/index.html')
})



let users = {users:["Juan", "Jocelyn", "Astrid", "Maria", "Ignacia", "Javier", "Brian"]};
app.get('/abracadabra/usuarios', (_, res) => {
    res.json((users))
    })


app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    let usuario = req.params.usuario;
    let nombre = (users.users.includes(usuario))
    
    nombre === true
      ? next()
      : res.sendFile(__dirname + '/assets/who.jpeg');    
})
app.get('/abracadabra/juego/:usuario', (req, res) => {
    res.redirect('http://localhost:3000/abracadabra');
});


app.get('/abracadabra/conejo/:n', (req, res) => {
    const random = Math.floor(Math.random() * 4 + 1)
    const n = req.params.n 
    random == n
        ? res.sendFile(__dirname + '/assets/conejito.jpg')
        : res.sendFile(__dirname + '/assets/voldemort.jpg')
})


app.get('*', (req, res) => {
    res.sendFile(__dirname + "/assets/notfound.png");
})