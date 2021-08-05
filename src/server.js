
import { default as express } from "express"; // require eiluite pakeista i import 

const app = express(); // paleidziama funkcija is node_modules
const port = 3000;

app.use(express.static("web")); // tikrina ar web direktorijoje yra failai, pats automatiskai perskaito

app.get('/labas', (req, res) => {
    res.send('Labas') // israsoma narsykleje 
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});