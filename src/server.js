
import { default as express } from "express"; // require eiluite pakeista i import 
import { readFile, writeFile } from "fs/promises";
import Handlebars from "handlebars";

const app = express(); // paleidziama funkcija is node_modules
const port = 3000;

app.use(express.static("web")); // tikrina ar web direktorijoje yra failai, pats automatiskai perskaito
app.use(express.json()); // ateina duomenys json 

app.get("/zmones", async (req, res) => { // kreipiamasi i /zmones, vykdoma aprasyta salyga
    res.type("application/json");
    try {
        const fZmones = await readFile("zmones.json", { // perskaito zmones.json faila ir nusiuncia atgal
            encoding: "utf8"
        });
        res.send(fZmones);
    } catch (err) {
        res.send("[]");
    }
});
app.post("/zmones/add", async (req, res) => { // jei rasoma i /zmones/add
    const zmogus = req.body;
    res.type("application/json");
    try {
        const fZmones = await readFile("zmones.json", { // perskaito faila
            encoding: "utf8"
        });
        const zmones = JSON.parse(fZmones);
        let nextId = 0;
        for (const z of zmones) {
            if (nextId < z.id) {
                nextId = z.id;
            }
        }
        nextId++;
        zmogus.id = nextId;
        zmones.push(zmogus); // prideda nauja zmogu
        await writeFile("zmones.json", JSON.stringify(zmones), {
            encoding: "utf8"
        });
        res.send(zmogus); // atgal issiunciama
    } catch (err) {
        res.send("null");
    }
});
app.delete("/zmones/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    res.type("application/json");
    try {
        const fZmones = await readFile("zmones.json", {
            encoding: "utf8"
        });
        const zmones = JSON.parse(fZmones);
        const index = zmones.findIndex(z => z.id === id);
        if (index >= 0) {
            zmones.splice(index, 1); // splice  keičia masyvo turinį, pašalindamas arba pakeisdamas esamus elementus
            await writeFile("zmones.json", JSON.stringify(zmones), {
                encoding: "utf8"
            });
        }
        res.send("null");
    } catch (err) {
        res.send("null");
    }
});
app.get("/zmones/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    res.type("application/json");
    try {
        const fZmones = await readFile("zmones.json", {
            encoding: "utf8"
        });
        const zmones = JSON.parse(fZmones);
        const zmogus = zmones.find(z => z.id === id);
        res.send(JSON.stringify(zmogus));
    } catch (err) {
        res.send("null");
    }
});

app.get('/labas', (req, res) => {
    res.send('Labas') // israsoma narsykleje 
});


app.get("/h/zmones", async (req, res) => {
    res.type("text/html");
    try {
        const html = await readFile("./view/zmones.handlebars", {
            encoding: "utf-8"
        });
        const fZmones = await readFile("zmones.json", {
            encoding: "utf-8"
        });
        const zmones = JSON.parse(fZmones);
        const template = Handlebars.compile(html);
        res.send(template({zmones}));
    }
    catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});