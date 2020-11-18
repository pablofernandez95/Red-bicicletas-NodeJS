var Bicicleta = require('../../models/bicicleta');

/* Previo a cada test setea el array de bicis como vacio */ 
beforeEach(() => {Bicicleta.allBicis =[] });
beforeEach(() => console.log('testeando...'));

/* Inicio de Tests */ 
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