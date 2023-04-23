
import 'mocha'
import { expect } from "chai";
import request from 'request';

describe('Express Test', () => {
  it('Add Funko', () => {
    const url = `http://localhost:3004/funkos?userName=TestUser1&id=11&name=test&description=Hola&type=Pop!&genre=Deportes&franchise=quetal&number=123&exclusive=true&specialFeatures=nada&marketValue=123`;

    request.post({url: url, json: true, }, (error: Error, response:any) => {
      expect(response.body).to.be.eql({funkoPop: {
            "id_": 11,
            "name_": "test",
            "description_": "Hola",
            "type_": "Pop!",
            "genre_": "Deportes",
            "franchise_": "quetal",
            "num_": 123,
            "exclusive_": true,
            "specialFeatures_": "nada",
            "marketValue_": 123
          },
          "success": true,
        });
    });
  });
  it('Add Funko without description should be error' , () => {
    const url = `http://localhost:3004/funkos?userName=TestUser1&id=20&name=test&type=Pop!&genre=Deportes&franchise=quetal&number=123&exclusive=true&specialFeatures=nada&marketValue=123`;

    request.post({url: url, json: true, }, (error: Error, response:any) => {
      expect(response.body).to.be.eql({
        "success": false,
        "error": "No se han introducido todos los datos"
      });
    });
  });
  it('Get All Funkos', () => {
    const url = `http://localhost:3004/funkos?userName=TestUser1`;

    request.get({url: url, json: true, }, (error: Error, response:any) => {
      expect(response.body).to.be.eql({
        funkoPops: [
          {
            "id_": 1,
            "name_": "Tails",
            "description_": "The best Tails Funko ever",
            "type_": "Pop!",
            "genre_": "Animación",
            "franchise_": "Sonic",
            "num_": 2,
            "exclusive_": false,
            "specialFeatures_": "None",
            "marketValue_": 15
          },
          {
            "id_": 11,
            "name_": "test",
            "description_": "Hola",
            "type_": "Pop!",
            "genre_": "Deportes",
            "franchise_": "quetal",
            "num_": 123,
            "exclusive_": true,
            "specialFeatures_": "nada",
            "marketValue_": 123
          },
        ],
        "success": true,
      });
    });
  });
  it('Get Funko by id', () => {
    const url = `http://localhost:3004/funkos?userName=TestUser1&id=1`;

    request.get({url: url, json: true, }, (error: Error, response:any) => {
      expect(response.body).to.be.eql({
        funkoPop: {
          "id_": 1,
          "name_": "Tails",
          "description_": "The best Tails Funko ever",
          "type_": "Pop!",
          "genre_": "Animación",
          "franchise_": "Sonic",
          "num_": 2,
          "exclusive_": false,
          "specialFeatures_": "None",
          "marketValue_": 15
        },
        "success": true,
      });
    });
  });

  it('Get Funko by id not found', () => {
    const url = `http://localhost:3004/funkos?userName=TestUser1&id=2`;

    request.get({url: url, json: true, }, (error: Error, response:any) => {
      expect(response.body).to.be.eql({
        "success": false,
        "error": "No existe el FunkoPop con ese id"
      });
    });
  });

  it('Update Funko by id', () => {
    const url = `http://localhost:3004/funkos?userName=TestUser1&id=11&name=test&description=Hola&type=Pop!&genre=Deportes&franchise=quetal&number=123&exclusive=true&specialFeatures=nada&marketValue=123`;

    request.patch({url: url, json: true, }, (error: Error, response:any) => {
      expect(response.body).to.be.eql({
        funkoPop: {
          "id_": 11,
          "name_": "test",
          "description_": "Hola",
          "type_": "Pop!",
          "genre_": "Deportes",
          "franchise_": "quetal",
          "num_": 123,
          "exclusive_": true,
          "specialFeatures_": "nada",
          "marketValue_": 123
        },
        "success": true,
      });
    });
  });

  it('Update Funko type error', () => {

    const url = `http://localhost:3004/funkos?userName=TestUser1&id=11&name=test&description=Hola&type=TEST&genre=Deportes&franchise=quetal&number=123&exclusive=true&specialFeatures=nada&marketValue=123`;

    request.patch({url: url, json: true, }, (error: Error, response:any) => {
      expect(response.body).to.be.eql({
        "success": false,
        "error": "El tipo introducido no es correcto"
      });
    });
  });


  it('Delete Funko by id', () => {
    const url = `http://localhost:3004/funkos?userName=TestUser1&id=11`;

    request.delete({url: url, json: true, }, (error: Error, response:any) => {
      expect(response.body).to.be.eql({
        "success": true,
        "message": "FunkoPop eliminado correctamente"
      });
    });
  });
  
  it ('Delete Funko by id not found', () => {
    const url = `http://localhost:3004/funkos?userName=TestUser1&id=12`;

    request.delete({url: url, json: true, }, (error: Error, response:any) => {
      expect(response.body).to.be.eql({
        "success": false,
        "error": "No existe el FunkoPop con ese id"
      });
    });
  });
});