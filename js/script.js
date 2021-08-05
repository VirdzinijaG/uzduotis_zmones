function parodytiZmones() {
    const list = getZmones();
    const div = document.getElementById("sarasas");
    let str = "<ul>";
    for (const zmogus of list) {
        str += "<li>" + "vardas ir pavarde: " +  zmogus.vardas + " " + zmogus.pavarde + " " + "gimimo data: " + zmogus.gimimoData + " " + "alga: " + zmogus.alga + "</li>";
    }
    str += "</ul>";
    div.innerHTML = str;
};