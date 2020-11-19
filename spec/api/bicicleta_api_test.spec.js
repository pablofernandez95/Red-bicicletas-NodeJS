var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');

var base_url = "http://localhost:3000/api/bicicletas";

describe("Bicicleta API", ()=>{
    beforeEach(function(done){
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, {useNewUrlParser: true});

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'conection errror'));
        db.once('open', function() {
            console.log('We are connected to test database');
            done();
        });
    });

    afterEach(function(done) {
        Bicicleta.deleteMany({}, function(err, success){
            if (err) console.log(err);
            done();
        });
    });

    describe("GET Bicicletas /", () => {
        it("Status 200", (done) =>{
            request.get(base_url, function(error, response, body) {
                var result = JSON.parse(body);
                expect(response.statusCode).toBe(200);
                expect(result.bicicletas.length).toBe(0);
                done();
            });
        });
    });

    describe("POST Bicicletas /create", () => {
        it("Status 200", (done) => {
            var headers = { 'content-type': 'application/json'};
            var aBici = '{"code": 10, "color": "rojo", "modelo": "urbana", "lat": -34.2, "lng": -54.7}';
            request.post({
                headers: headers,
                url: base_url + '/create',
                body: aBici
            }, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                var bici = JSON.parse(body).bicicleta;
                console.log(bici);
                expect(bici.color).toBe("rojo");
                expect(bici.ubicacion[0]).toBe(-34);
                expect(bici.ubicacion[1]).toBe(-54);
                done();
            });
        });
    });

    
});

/*
describe('Bicicleta API', ()=> {
    describe('GET Bicicleta / ', ()=>{
        it('Status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);

            var a = new Bicicleta (1, 'Rojo', 'Urbana',[-34.564522,-58.516748]);
            Bicicleta.add(a);

            request.get('http://localhost:3000/api/bicicletas',function(error,response,body){
                expect(response.statusCode).toBe(200);
            });
        });
    });


    describe('POST Bicicleta /create ', ()=>{
        it('Status 200', (done) => {
            var headers = {'content-type': 'application/json'};
            var aBici = '{ "id":2, "color": "verde", "modelo":"Mountain Bike", "lat": -38, "lng":-60 }';
            
            request.post({
                headers: headers,
                url: 'http://localhost:3000/api/bicicletas/create',
                body: aBici,
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(2).color).toBe("verde");
                done();
            });
        });
    });
});
*/