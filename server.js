import express from 'express';
import hbs from 'hbs';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import {Skater} from './Skater.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const skater = new Skater();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', async (req, res) => {
    try{
        const skaters = await skater.getskaters();
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
    res.render('index');
//    usuario skater validado then
    // res.render('index');

  });

app.post('/registro', async (req, res) => {
     // recepcion del formulario    
    try{
        console.log(req.body);
        await skater.newSkater(req.body.email, req.body.nombre, req.body.password, req.body.years, req.body.especialidad, req.body.foto);
        res.status(200).redirect('/registro');
    }
    catch{
        res.status(400).redirect('/registro');
    }

 
});



app.listen(3000, () => {
    console.log('Server on port 3000');
});