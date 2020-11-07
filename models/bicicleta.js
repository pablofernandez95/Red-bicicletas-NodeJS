var Bicicleta = function (id, color, modelo, ubicacion){
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
}

Bicicleta.prototype.toString = function(){
    return 'id: '+this.id + ' | color: '+this.color;
}


Bicicleta.allBicis = [];
Bicicleta.add = function(aBici){
    Bicicleta.allBicis.push(aBici);
}

Bicicleta.findById = function(aBiciId){
    var aBici = Bicicleta.allBicis.find(x=> x.id == aBiciId);
    
    if (aBici)
        return aBici;
    else
        throw new Error (`No existe una bicicleta con el id ${aBiciId}`)
}

Bicicleta.removeById = function(aBiciId){
   // Bicicleta.findById(aBiciId);
    for(var i=0; i<Bicicleta.allBicis.length; i++){
        if(Bicicleta.allBicis[i].id == aBiciId){
            Bicicleta.allBicis.splice(i, 1);
            break;
        }
    }
}

//Seteando bicicletas por default
var a = new Bicicleta (1, 'Rojo', 'Urbana',[-34.564522,-58.516748]); 
var b = new Bicicleta (2, 'Amarillo', 'Mountain Bike',[-34.5994149,-58.5144537]); 
var c = new Bicicleta (3, 'Verde', 'Freestyle',[-34.605202,-58.491114]); 
var d = new Bicicleta (4, 'Gris', 'Urbana',[-34.571240,-58.441714]); 
var e = new Bicicleta (5, 'Gris', 'Freestyle',[-34.594144,-58.430437]); 
var f = new Bicicleta (6, 'Azul', 'Mountain Bike',[-34.5859898,-58.3964441]); 
Bicicleta.add(a);
Bicicleta.add(b);
Bicicleta.add(c);
Bicicleta.add(d);
Bicicleta.add(e);
Bicicleta.add(f);

//Exporto el modelo
module.exports = Bicicleta;