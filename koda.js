
function funkcija() {
    //console.log("halo");
    $.ajax({
        url: 'https://api.sledilnik.org/api/stats',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data.length);
            var json;
            var preverjanje;
            if (data[data.length - 1].hasOwnProperty('performed.today')) {
                json = data[data.length - 1];
                preverjanje = 1;
            } else {
                json = data[data.length - 2];
                preverjanje = 2;
            }

            console.log(json);
            var dan = json.day;
            var mesec = json.month;
            var leto = json.year;

            var izpis = 'Podatki za: ' + dan + '.' + mesec + '.' + leto;
            document.getElementById("datum").innerHTML = izpis;

            var testidanes = json.tests.performed.today;
            var pozitivnidanes = json.cases.confirmedToday;
            var hospitaliziranidanes = json.statePerTreatment.inHospital;
            var umrlidanes = json.statePerTreatment.deceased;
            var cepljenidanes = json.vaccination.administered.today;

            var testiskupni = json.tests.performed.toDate;
            var pozitivniskupni = json.cases.confirmedToDate;
            var hospitaliziraniskupni = json.statePerTreatment.inHospitalToDate;
            var umrliskupni = json.statePerTreatment.deceasedToDate;
            var cepljeniskupni = json.vaccination.administered.toDate;

            document.getElementById("testiranjadanes").innerHTML = testidanes;
            document.getElementById("pozitivnidanes").innerHTML = pozitivnidanes;
            document.getElementById("hospitaliziranidanes").innerHTML = hospitaliziranidanes;
            document.getElementById("umrlidanes").innerHTML = umrlidanes;
            document.getElementById("cepljenidanes").innerHTML = cepljenidanes;

            document.getElementById("testiranjaskupni").innerHTML = testiskupni;
            document.getElementById("pozitivniskupni").innerHTML = pozitivniskupni;
            document.getElementById("hospitaliziraniskupni").innerHTML = hospitaliziraniskupni;
            document.getElementById("umrliskupni").innerHTML = umrliskupni;
            document.getElementById("cepljeniskupni").innerHTML = cepljeniskupni;

            graf(data, preverjanje);
        }
    });
}

function graf (data, preverjanje) {
    //console.log("graf" + data);

    var shramba = [];
    var dnevi = [];
    var meseci = [];
    var indeks = 0;

    for (let i = data.length - preverjanje; i > data.length - preverjanje - 7; i--) {
        console.log(data[i]);

        shramba[indeks] = data[i].cases.confirmedToday;
        dnevi[indeks] = data[i].day;
        meseci[indeks] = data[i].month - 1;

        indeks++;
    }

    console.log(shramba);

    var chart = new CanvasJS.Chart("graf1", {
        animationEnabled: true,
        theme: "light1",
        title:{
            text: "Simple Line Chart"
        },
        data: [{
            type: "line",
            indexLabelFontSize: 16,
            dataPoints: [
                { x: new Date(2021, meseci[6], dnevi[6]), y: shramba[6] },
                { x: new Date(2021, meseci[5], dnevi[5]), y: shramba[5] },
                { x: new Date(2021, meseci[4], dnevi[4]), y: shramba[4] },
                { x: new Date(2021, meseci[3], dnevi[3]), y: shramba[3] },
                { x: new Date(2021, meseci[2], dnevi[2]), y: shramba[2] },
                { x: new Date(2021, meseci[1], dnevi[1]), y: shramba[1] },
                { x: new Date(2021, meseci[0], dnevi[0]), y: shramba[0] },

            ]
        }]
    });
    chart.render();

}

