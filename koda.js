function funkcija() {
    //console.log("halo");
    $.ajax({
        url: 'https://api.sledilnik.org/api/stats',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            var json;
            var preverjanje;
            if (data[data.length - 1].hasOwnProperty('tests.performed.today')) {
                json = data[data.length - 1];
                preverjanje = 1;
                console.log("1");
            } else {
                json = data[data.length - 2];
                preverjanje = 2;
                console.log(data.length - 2);
            }

            console.log(json);
            var dan = json.day;
            var mesec = json.month;
            var leto = json.year;

            var izpis = dan + '.' + mesec + '.' + leto;
            document.getElementById("datum").innerHTML = 'Podatki za: ' + "<b>" + izpis + "</b>";

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
            regije(data);
        }
    });
}

function graf (data, preverjanje) {
    //console.log("graf" + data);

    var shramba = [];
    var shramba2 = [];
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
    indeks = 0;
    for (let i = data.length - preverjanje; i > data.length - preverjanje - 7; i--) {
        console.log(data[i]);

        shramba2[indeks] = data[i].statePerTreatment.deceased;
        dnevi[indeks] = data[i].day;
        meseci[indeks] = data[i].month - 1;

        indeks++;
    }

    console.log(shramba);

    var chart = new CanvasJS.Chart("graf1", {
        backgroundColor: null,
        animationEnabled: true,
        theme: "light1",
        axisX:{
            valueFormatString: "D.M.YYYY" ,
            labelAngle: -50,
            labelFontSize: 13,
            labelFontColor: "white",
            labelFontFamily: "Century Gothic",
        },
        axisY:{
            labelFontColor: "white",
            labelFontFamily: "Century Gothic",
            gridThickness: 3,
        },
        data: [{
            type: "line",
            lineColor: "rgb(211, 60, 0)",
            markerColor: "rgb(211, 60, 0)",
            lineThickness: 6,
            markerSize: 15,
            indexLabelFontSize: 16,
            indexLabelOririentation: "horizontal",
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
    var chart2 = new CanvasJS.Chart("graf2", {
        animationEnabled: true,
        backgroundColor: null,
        theme: "light1",
        axisX:{
            valueFormatString: "D.M.YYYY" ,
            labelAngle: -50,
            labelFontSize: 13,
            labelFontColor: "white",
            labelFontFamily: "Century Gothic",
        },
        axisY:{
            labelFontColor: "white",
            labelFontFamily: "Century Gothic",
            gridThickness: 3,
        },
        data: [{
            type: "line",
            lineColor: "rgb(211, 60, 0)",
            markerColor: "rgb(211, 60, 0)",
            indexLabelFontSize: 16,
            lineThickness: 6,
            markerSize: 15,
            dataPoints: [
                { x: new Date(2021, meseci[6], dnevi[6]), y: shramba2[6] },
                { x: new Date(2021, meseci[5], dnevi[5]), y: shramba2[5] },
                { x: new Date(2021, meseci[4], dnevi[4]), y: shramba2[4] },
                { x: new Date(2021, meseci[3], dnevi[3]), y: shramba2[3] },
                { x: new Date(2021, meseci[2], dnevi[2]), y: shramba2[2] },
                { x: new Date(2021, meseci[1], dnevi[1]), y: shramba2[1] },
                { x: new Date(2021, meseci[0], dnevi[0]), y: shramba2[0] },

            ]
        }]
    });
    chart2.render();
}

function regije (data) {

    var dan = [];
    var endanprej = [];

    var day;
    var month;
    var year;

    for (let i = data.length - 1; i > 0; i--) {
        if (data[i].statePerRegion.kr != null && data[i].statePerRegion.kk != null && data[i].statePerRegion.ms != null) {
            day = data[i].day;
            month = data[i].month;
            year = data[i].year;

            dan = data[i].statePerRegion;
            endanprej = data[i-1].statePerRegion;
            break;
        }
    }

    //console.log(dan);
    //console.log(endanprej);

    var izpis = day + '.' + month + '.' + year;
    document.getElementById("datumregije").innerHTML = 'Podatki za: ' + "<b>" + izpis + "</b>";

    var pomurska = dan.ms - endanprej.ms;
    var podravska = dan.mb - endanprej.mb;
    var koroska = dan.sg - endanprej.sg;
    var savinjska = dan.ce - endanprej.ce;
    var zasavska = dan.za - endanprej.za;
    var posavska = dan.kk - endanprej.kk;
    var jugovzhodna = dan.nm - endanprej.nm;
    var osrednjeslo = dan.lj - endanprej.lj;
    var gorenjska = dan.kr - endanprej.kr;
    var primorska = dan.po - endanprej.po;
    var goriska = dan.ng - endanprej.ng;
    var obalna = dan.kp - endanprej.kp;

    document.getElementById("pomurska").innerHTML = pomurska;
    document.getElementById("podravska").innerHTML = podravska;
    document.getElementById("koroska").innerHTML = koroska;
    document.getElementById("savinjska").innerHTML = savinjska;
    document.getElementById("zasavska").innerHTML = zasavska;
    document.getElementById("posavska").innerHTML = posavska;
    document.getElementById("jugovzhodna").innerHTML = jugovzhodna;
    document.getElementById("osrednjeslo").innerHTML = osrednjeslo;
    document.getElementById("gorenjska").innerHTML = gorenjska;
    document.getElementById("primorska").innerHTML = primorska;
    document.getElementById("goriska").innerHTML = goriska;
    document.getElementById("obalna").innerHTML = obalna;
}