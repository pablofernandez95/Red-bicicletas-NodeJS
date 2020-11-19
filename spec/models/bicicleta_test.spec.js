var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');

describe('Testing Bicicletas', function(){
    beforeAll(function(done) {
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, {useNewUrlParser: true});

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function(){
            console.log('We are connected to the test database');
            done();
        });
    });

    afterEach(function(done) {
        Bicicleta.deleteMany({}, function(err, success){
            if(err) console.log(err);
            done();
        });
    });

    describe('Bicicleta.createInstance', () => {
       it('crea una instancia de Bicicleta', () =>{
        var bici = Bicicleta.createInstance(1, "verde", "urbana", [-34.5 , -54.1]);

        expect(bici.code).toBe(1);
        expect(bici.color).toBe("verde");
        expect(bici.modelo).toBe("urbana");
        expect(bici.ubicacion[0]).toEqual(-34.5);
        expect(bici.ubicacion[1]).toEqual(-54.1);
       })
    });

    describe('Bicicletas.allBicis', () => {
        it('comienza vacia', (done) => {
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });

    describe('Bicicleta.add', () => {
        it('agrega solo una bici', (done) => {
            var aBici = new Bicicleta({code: 1, color: "verde", modelo:"urbana"});
            Bicicleta.add(aBici, function(err, newBici){
                if (err) console.log(err);
                Bicicleta.allBicis(function(err, bicis) {
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);

                    done();
                });
            });
        });
    });

    describe("Bicicleta.findByCode", () => {
      it("debe devolver la bici con code 1", (done) => {
        Bicicleta.allBicis(function (err, bicis) {
          expect(bicis.length).toBe(0);

          var aBici = new Bicicleta({
            code: 1,
            color: "verde",
            modelo: "urbana",
          });
          Bicicleta.add(aBici, function (err, newBici) {
            if (err) console.log(err);

            var aBici2 = new Bicicleta({
              code: 2,
              color: "roja",
              modelo: "urbana",
            });
            Bicicleta.add(aBici2, function (err, newBici) {
              if (err) console.log(err);
              Bicicleta.findByCode(1, function (error, targetBici) {
                expect(targetBici.code).toBe(aBici.code);
                expect(targetBici.color).toBe(aBici.color);
                expect(targetBici.modelo).toBe(aBici.modelo);

                done();
              });
            });
          });
        });
      });
    });
});



/*
// Previo a cada test setea el array de bicis como vacio 
beforeEach(() => {Bicicleta.allBicis =[] });
beforeEach(() => console.log('testeando...'));

// Inicio de Tests  
describe('Bicicleta.allBicis',() => {
    it('comienza vacia', ()=> {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicleta.add',()=>{
    it('Agrego Bicicleta',()=>{
        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta (1, 'Rojo', 'Urbana',[-34.564522,-58.516748]); 
        Bicicleta.add(a);

        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    });
});

describe('Bicicleta.findById',()=>{
    it('Debe devolver Bici con ID 1', () =>{
        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta (1, 'Rojo', 'Urbana',[-34.564522,-58.516748]); 
        var b = new Bicicleta (2, 'Verde', 'Urbana',[-34.564522,-58.516748]); 

        Bicicleta.add(a);
        Bicicleta.add(b);

        var targetBici = Bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(a.color);
        expect(targetBici.modelo).toBe(a.modelo);
    })
})

describe('Bicicleta.removeById',()=>{
    it('Debe eliminar Bici con ID 1', () =>{
        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta (1, 'Rojo', 'Urbana',[-34.564522,-58.516748]);

        Bicicleta.add(a);

        var targetBici = Bicicleta.removeById(1);
        expect(Bicicleta.allBicis.length).toBe(0);
    })
})
*/