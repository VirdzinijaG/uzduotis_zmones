let nextId = 4;
const zmones = [
    {
        id: 1,
        vardas: "Jonas",
        pavarde: "Jonaitis",
        gimimoData: new Date(1999, 7, 4),
        alga: 5000.01
    },
    {
        id: 2,
        vardas: "Petras",
        pavarde: "Petraitis",
        gimimoData: new Date(1985, 1, 3),
        alga: 938.51
    },
    {
        id: 3,
        vardas: "Antanas",
        pavarde: "Antanaitis",
        gimimoData: new Date(1940, 11, 11),
        alga: 438.51
    },
    {
        id: 4,
        vardas: "Ona",
        pavarde: "Oniene",
        gimimoData: new Date(1994, 06, 30),
        alga: 900.00
    },
    {
        id: 5,
        vardas: "Janina",
        pavarde: "Janaite",
        gimimoData: new Date(1987, 12, 13),
        alga: 1300.50
    }
];

function getZmones() {
    return zmones.slice(0);
}

/*
    {
        vardas: "Petras",
        pavarde: "Petraitis",
        gimimoData: "1985-12-31",
        alga: 938.51
    }
*/

function addZmogus(zmogus) {
    if (typeof zmogus !== "object") {
        return;
    }
    if (typeof zmogus.vardas !== "string") {
        return;
    }
    if (typeof zmogus.pavarde !== "string") {
        return;
    }
    // 2021-08-25
    if (typeof zmogus.gimimoData === "string") {
        let dateTest = new Date(zmogus.gimimoData);
        if (isNaN(dateTest.getTime())) {
            return;
        }
    } else if (!(zmogus.gimimoData instanceof Date)) {
        return;
    }
    if (typeof zmogus.alga !== "number") {
        return;
    }
    zmogus = Object.assign({}, zmogus, {id: nextId++});
    if (typeof zmogus.gimimoData === "string") {
        zmogus.gimimoData = new Date(zmogus.gimimoData);
    }
    zmones.push(zmogus);
}

function deleteZmogus(id) {
    const index = zmones.findIndex(z => z.id === id);
    if (index >= 0) {
        zmones.splice(index, 1);
    }
}

function getZmogus(id) {
    return zmones.find(z => z.id === id);
}
