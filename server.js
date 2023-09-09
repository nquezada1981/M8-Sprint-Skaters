import express from 'express';
import hbs from 'hbs';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import {Skater} from './Skater.js';
import axios from 'axios';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const skater = new Skater();
const secret = "springM8"
let skaters = await skater.getskaters();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', async (req, res) => {
    try{
        
        res.render('index', { skaters });
    }
    catch{
        res.status(400).redirect('/');
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/registro', (req, res) => {
    res.render('registro');
});

app.get ('/admin', (req, res) => {
    res.render('admin');
});

app.get ('/datos', (req, res) => {
    res.render('datos');
})

app.post('/login', async (req, res) => {
//    admin validado then
let user = req.body; //email, pasword
//console.log(user);

try {
    //console.log(await skater.validuser(user.email,user.password));
    if(await skater.validuser(user.email,user.password)){
    const selectskater =  await skater.getSkater(user.email,user.password)  
    console.log(selectskater);  
    const token = jwt.sign(selectskater[0],secret,{expiresIn:"3m"})
    res.redirect(`/?token=${token}`);
    } else {
        res.status(400).redirect('/login');
    }

} catch (error) { 
    console.log(error);   
}
  });

app.post('/registro', async (req, res) => {
     // recepcion del formulario    
    try{
        console.log(req.body);
        await skater.newSkater(req.body.email, req.body.nombre, req.body.password, req.body.years, req.body.especialidad, req.body.foto);
        res.status(200).redirect('/');
    }
    catch{
        res.status(400).redirect('/registro');
    }

 
});



app.listen(3000, () => {
    console.log('Server on port 3000');
});