var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');

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