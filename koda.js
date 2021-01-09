function funkcija() {
    //console.log("halo");
    $.ajax({
        url: 'https://api.sledilnik.org/api/stats',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data.length);
            var json;
            if (data[data.length - 1].hasOwnProperty('performed.today')) {
                json = data[data.length - 1];
            } else {
                json = data[data.length - 2]
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
        }
    });
}