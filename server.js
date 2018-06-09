const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getcurrentYear',() => {
return new Date().getFullYear();
})
app.set('view engine','hbs');

app.use((req,res,next) => {
var now = new Date().toString();
var resultToshow = `${now} : ${req} : ${res}`;
console.log(now);
fs.appendFile('server.log', resultToshow + '\n' , (error) => {
    console.log(error);
});
next();

});
// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname+'/public'));
app.get('/',(req,res) => {
//    res.send('<h1> Express Framework! </h1>');
res.send({
    name:'Ab',
    likes:[
        'bikes',
        'auto'
    ]
})
});
app.get('/bad',(req,res) => {
    res.send('Bad Request');
})

app.get('/about',(req,res) => {
   // res.send('About page');
   res.render('about.hbs',{
       pageTitle: 'About Page'
    
   });
})
app.listen(3000, () => {
    console.log('Server is up and running');
});