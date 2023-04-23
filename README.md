# Practica 11
## Índice

  1. Tareas Previas
  2. Ejercicios
  3. Test


### Tareas Previas

  - Acepte la asignación de GitHub Classroom asociada a esta práctica.

### Ejercicio

Para implementar la aplicación de funko Pops en un servidor se han llevado a cabo las siguientes modificaciones:

El directorio donde se almacenara la base de datos de usuarios y sus FunkoPops sera __./src/FunkoPopApp/funkos/...__.

Las clases _funko_, _funkoPopGenre_ y _funkoPopType_ se han quedado igual que en anteriores practicas:

```
/**
 * Enum for the different types of Funko Pops
 */
export enum FunkoPopType {
    "Pop!",
    "Pop! Rides",
    "Vynil Soda",
    "Vynil Gold",
    "Pop! Rocks",
  }
```

```
/**
 * Enum for the different types of Funko Pops
 */
export enum FunkoPopType {
    "Pop!",
    "Pop! Rides",
    "Vynil Soda",
    "Vynil Gold",
    "Pop! Rocks",
  }
```

```
import { FunkoPopType } from "./funkoPopType.js";
import { FunkoPopGenre } from "./funkoPopGenre.js";

/**
 * @class FunkoPop
 * @description This class represents a Funko Pop figure.
 */
export class FunkoPop {
  private id_: number;
  private name_: string;
  private description_: string;
  private type_: FunkoPopType;
  private genre_: FunkoPopGenre;
  private franchise_: string;
  private num_: number;
  private exclusive_: boolean;
  private specialFeatures_: string;
  private marketValue_: number;

  /**
   * @constructor
   * @param id unique identifier for the Funko Pop
   * @param name name of the Funko Pop
   * @param description description of the Funko Pop
   * @param type type of the Funko Pop
   * @param genre genre of the Funko Pop
   * @param franchise franchise of the Funko Pop
   * @param num number of the Funko Pop of the franchise
   * @param exclusive boolean value if the Funko Pop is exclusive
   * @param specialFeatures special features of the Funko Pop
   * @param marketValue market value of the Funko Pop
   */
  constructor(
    id: number,
    name: string,
    description: string,
    type: FunkoPopType,
    genre: FunkoPopGenre,
    franchise: string,
    num: number,
    exclusive: boolean,
    specialFeatures: string,
    marketValue: number
  ) {
    this.id_ = id;
    this.name_ = name;
    this.description_ = description;
    this.type_ = type;
    this.genre_ = genre;
    this.franchise_ = franchise;
    this.num_ = num;
    this.exclusive_ = exclusive;
    this.specialFeatures_ = specialFeatures;
    this.marketValue_ = marketValue;
  }
  /**
   * @description Getter for id
   */
  get ID(): number {
    return this.id_;
  }

  /**
   * @description Setter for id
   */
  set ID(id: number) {
    this.id_ = id;
  }

  /**
   * @description Getter for name
   */
  get Name(): string {
    return this.name_;
  }

  /**
   * @description Setter for name
   */
  set Name(name: string) {
    this.name_ = name;
  }

  /**
   * @description Getter for description
   */
  get Description(): string {
    return this.description_;
  }

  /**
   * @description Setter for description
   */
  set Description(description: string) {
    this.description_ = description;
  }

  /**
   * @description Getter for type
   */
  get Type(): FunkoPopType {
    return this.type_;
  }

  /**
   * @description Setter for type
   */
  set Type(type: FunkoPopType) {
    this.type_ = type;
  }

  /**
   * @description Getter for genre
   */
  get Genre(): FunkoPopGenre {
    return this.genre_;
  }

  /**
   * @description Setter for genre
   */
  set Genre(genre: FunkoPopGenre) {
    this.genre_ = genre;
  }

  /**
   * @description Getter for franchise
   */
  get Franchise(): string {
    return this.franchise_;
  }

  /**
   * @description Setter for franchise
   */
  set Franchise(franchise: string) {
    this.franchise_ = franchise;
  }

  /**
   * @description Getter for num
   */
  get Num(): number {
    return this.num_;
  }

  /**
   * @description Setter for num
   */
  set Num(num: number) {
    this.num_ = num;
  }

  /**
   * @description Getter for exclusive
   */
  get Exclusive(): boolean {
    return this.exclusive_;
  }

  /**
   * @description Setter for exclusive
   */
  set Exclusive(exclusive: boolean) {
    this.exclusive_ = exclusive;
  }

  /**
   * @description Getter for specialFeatures
   */
  get SpecialFeatures(): string {
    return this.specialFeatures_;
  }

  /**
   * @description Setter for specialFeatures
   */
  set SpecialFeatures(specialFeatures: string) {
    this.specialFeatures_ = specialFeatures;
  }

  /**
   * @description Getter for marketValue
   */
  get MarketValue(): number {
    return this.marketValue_;
  }

  /**
   * @description Setter for marketValue
   */
  set MarketValue(marketValue: number) {
    this.marketValue_ = marketValue;
  }
}
```

Despues, hemos creado _app.ts_ para implentar el servidor HTTP con Express

```
import express from "express";
import { FunkoPop } from "./funko.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { FunkoPopType } from "./funkoPopType.js";
import { FunkoPopGenre } from "./funkoPopGenre.js";
import fs from "fs";

const app = express();

/**
 * Usaremos el verbo Get para obtener los FunkoPops de un usuario o un FunkoPop en concreto
 */
app.get("/funkos", (req, res) => {
  if (!req.query.userName) {
    return res.status(400).json({
      success: false,
      error: "No se ha introducido el nombre de usuario",
    });
  } else {
    //Buscamos la carpeta del usuario
    const userName = req.query.userName;
    const userFolder = join(
      dirname(fileURLToPath(import.meta.url)),
      `../../src/FunkoPopApp/funkos/${userName}`
    );
    //Si no existe devolvemos error
    if (!fs.existsSync(userFolder)) {
      return res.status(400).json({
        success: false,
        error: "No existe el usuario",
      });
    }
    //Buscamos los ficheros de los FunkoPops
    const funkoPops = fs.readdirSync(userFolder);
    //Si no hay ninguno devolvemos un mensjae de que no hay FunkoPops
    if (funkoPops.length === 0) {
      res.send(`En el directorio del usuaruio ${userName} no hay FunkoPops`);
    }
    //Si hay un id devolvemos el FunkoPop con ese id
    if (req.query.id) {
      if (funkoPops.includes(`${req.query.id}.json`)) {
        const id = req.query.id;
        const funkoPopFile = fs.readFileSync(
          join(userFolder, `${id}.json`),
          "utf-8"
        );
        const funkoPop = JSON.parse(funkoPopFile);
        return res.status(200).json({
          success: true,
          funkoPop: funkoPop,
        });
      } else {
        return res.status(400).json({
          success: false,
          error: "No existe el FunkoPop con ese id",
        });
      }
    } else {
      //Si no hay id devolvemos todos los FunkoPops
      const funkoPopsArray: FunkoPop[] = [];
      funkoPops.forEach((funkoPop) => {
        const funkoPopFile = fs.readFileSync(
          join(userFolder, funkoPop),
          "utf-8"
        );
        funkoPopsArray.push(JSON.parse(funkoPopFile));
      });
      return res.status(200).json({
        success: true,
        funkoPops: funkoPopsArray,
      });
    }
  }
});

/**
 * Usaremos el verbo Post para añadir un FunkoPop a un usuario
 */
app.post("/funkos", (req, res) => {
  if (
    !req.query.userName ||
    !req.query.id ||
    !req.query.name ||
    !req.query.description ||
    !req.query.type ||
    !req.query.genre ||
    !req.query.franchise ||
    !req.query.number ||
    !req.query.exclusive ||
    !req.query.specialFeatures ||
    !req.query.marketValue
  ) {
    return res.status(400).json({
      success: false,
      error: "No se han introducido todos los datos",
    });
  } else {
    //Buscamos la carpeta del usuario
    const userName = req.query.userName;
    const userFolder = join(
      dirname(fileURLToPath(import.meta.url)),
      `../../src/FunkoPopApp/funkos/${userName}`
    );
    //Si no existe lo creamos
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder);
    }
    //Buscamos los ficheros de los FunkoPops
    const funkoPops = fs.readdirSync(userFolder);
    const id = parseInt(req.query.id as string);

    if (funkoPops.includes(`${id}.json`)) {
      return res.status(400).json({
        success: false,
        error: "Ya existe un FunkoPop con ese id",
      });
    } else {
      const name = req.query.name as string;
      const description = req.query.description as string;
      const type = req.query.type as unknown;
      const genre = req.query.genre as unknown;
      const franchise = req.query.franchise as string;
      const number = parseInt(req.query.number as string);
      const exclusive = req.query.exclusive as string;
      const specialFeatures = req.query.specialFeatures as string;
      const marketValue = parseInt(req.query.marketValue as string);

      //Comprobamos que las opciones son correctas
      if (!Object.values(FunkoPopType).includes(type as FunkoPopType)) {
        return res.status(400).json({
          success: false,
          error: "El tipo introducido no es correcto",
        });
      } else if (
        !Object.values(FunkoPopGenre).includes(genre as FunkoPopGenre)
      ) {
        return res.status(400).json({
          success: false,
          error: "El género introducido no es correcto",
        });
      } else if (exclusive !== "true" && exclusive !== "false") {
        return res.status(400).json({
          success: false,
          error: "El valor de exclusive debe ser true o false",
        });
      } else if (marketValue < 0) {
        return res.status(400).json({
          success: false,
          error: "El valor de marketValue debe ser mayor que 0",
        });
      } else {
        const funkoType = type as FunkoPopType;
        const funkoGenre = genre as FunkoPopGenre;
        const funkoExclusive = exclusive === "true" ? true : false;
        const newFunkoPop = new FunkoPop(
          id,
          name,
          description,
          funkoType,
          funkoGenre,
          franchise,
          number,
          funkoExclusive,
          specialFeatures,
          marketValue
        );
        const funkoPopFile = JSON.stringify(newFunkoPop);
        fs.writeFileSync(join(userFolder, `${id}.json`), funkoPopFile);
        return res.status(200).json({
          success: true,
          funkoPop: newFunkoPop,
        });
      }
    }
  }
});

/**
 * Usaremos el verbo delete para borrar un FunkoPop de un usuario
 */
app.delete("/funkos", (req, res) => {
  if (!req.query.userName || !req.query.id) {
    return res.status(400).json({
      success: false,
      error: "No se han introducido todos los datos",
    });
  } else {
    //Buscamos la carpeta del usuario
    const userName = req.query.userName;
    const userFolder = join(
      dirname(fileURLToPath(import.meta.url)),
      `../../src/FunkoPopApp/funkos/${userName}`
    );
    //Si no existe devolvemos error
    if (!fs.existsSync(userFolder)) {
      return res.status(400).json({
        success: false,
        error: "No existe el usuario",
      });
    } else {
      //Buscamos los ficheros de los FunkoPops
      const funkoPops = fs.readdirSync(userFolder);
      const id = parseInt(req.query.id as string);

      if (funkoPops.includes(`${id}.json`)) {
        fs.unlinkSync(join(userFolder, `${id}.json`));
        return res.status(200).json({
          success: true,
          message: "FunkoPop eliminado correctamente",
        });
      } else {
        return res.status(400).json({
          success: false,
          error: "No existe el FunkoPop con ese id",
        });
      }
    }
  }
});


/**
 * Usaremos el verbo patch para modificar un FunkoPop de un usuario
 */
app.patch("/funkos", (req, res) => {
  if (
    !req.query.userName ||
    !req.query.id ||
    !req.query.name ||
    !req.query.description ||
    !req.query.type ||
    !req.query.genre ||
    !req.query.franchise ||
    !req.query.number ||
    !req.query.exclusive ||
    !req.query.specialFeatures ||
    !req.query.marketValue
  ) {
    return res.status(400).json({
      success: false,
      error: "No se han introducido todos los datos",
    });
  } else {
    //Buscamos la carpeta del usuario
    const userName = req.query.userName;
    const userFolder = join(
      dirname(fileURLToPath(import.meta.url)),
      `../../src/FunkoPopApp/funkos/${userName}`
    );
    //Si no existe devolvemos error
    if (!fs.existsSync(userFolder)) {
      return res.status(400).json({
        success: false,
        error: "No existe el usuario",
      });
    } else {
      //Buscamos los ficheros de los FunkoPops
      const funkoPops = fs.readdirSync(userFolder);
      const id = parseInt(req.query.id as string);

      if (funkoPops.includes(`${id}.json`)) {
        const name = req.query.name as string;
        const description = req.query.description as string;
        const type = req.query.type as unknown;
        const genre = req.query.genre as unknown;
        const franchise = req.query.franchise as string;
        const number = parseInt(req.query.number as string);
        const exclusive = req.query.exclusive as string;
        const specialFeatures = req.query.specialFeatures as string;
        const marketValue = parseInt(req.query.marketValue as string);

        //Comprobamos que las opciones son correctas
        if (!Object.values(FunkoPopType).includes(type as FunkoPopType)) {
          return res.status(400).json({
            success: false,
            error: "El tipo introducido no es correcto",
          });
        } else if (
          !Object.values(FunkoPopGenre).includes(genre as FunkoPopGenre)
        ) {
          return res.status(400).json({
            success: false,
            error: "El género introducido no es correcto",
          });
        } else if (exclusive !== "true" && exclusive !== "false") {
          return res.status(400).json({
            success: false,
            error: "El valor de exclusive debe ser true o false",
          });
        } else if (marketValue < 0) {
          return res.status(400).json({
            success: false,
            error: "El valor de marketValue debe ser mayor que 0",
          });
        } else {
          const funkoType = type as FunkoPopType;
          const funkoGenre = genre as FunkoPopGenre;
          const funkoExclusive = exclusive === "true" ? true : false;
          const newFunkoPop = new FunkoPop(
            id,
            name,
            description,
            funkoType,
            funkoGenre,
            franchise,
            number,
            funkoExclusive,
            specialFeatures,
            marketValue
          );
          const funkoPopFile = JSON.stringify(newFunkoPop);
          fs.writeFileSync(join(userFolder, `${id}.json`), funkoPopFile);
          return res.status(200).json({
            success: true,
            funkoPop: newFunkoPop,
          });
        }
      } else {
        return res.status(400).json({
          success: false,
          error: "No existe el FunkoPop con ese id",
        });
      }
    }
  }
});

/**
 * Con listen le decimos en que puerto queremos que escuche
 */
app.listen(3004, () => {
  console.log("Servidor escuchando en el puerto 1423");
})
```

Vamos a ver las 4 funcionalidades que nos ofrece la aplicacion:

- __Get__: Lo usaremos para ver todos los funkos de un usuario o un funko en concreto. Primero se comprueba que se ha introducido un nombre de usuario. Si es así, buscaremos si existe ese usuario buscando su directorio y comprobaremos si hay FunkoPops registrados o no. Finalmente, en caso que haya un id en la petición, devolveremos un objeto json con ese funko. En caso de que no, devolveremos un json con todos los funkos de ese usuario. Ademas tenemos comprobacion de errores, si por ejemplo el id introducido no existe o si no existe el usuario.

- __Post__: Lo usaremos para añadir un FunkoPop a la lista de un usuario. En primer lugar, comprobaremos que se han introducido todos los datos necesarios del Funko. Buscamos la carpeta del usuario y comprobamos si ya existe un Funko con ese ID. En caso de que no, manejaremos la posibilidad de errores como el tipo, genero, exclusivo o valor de mercados sean incorrectos. Si esta todo bien, añadiremos al directorio el Funko y devolveremos un json con la informacion del funko.

- __Delete__: Con Delete podremos borrar un Funko del directorio de un usuario. Comprobaremos que se introduce tanto el usuario como el ID del funko. Si el usuario existe, buscaremos el Funko con ese ID y lo eliminaremos, si no existe el usuario o el Funko, devolveremos un mensaje de error.

- __Patch__: Lo usaremos para modificar un Funko existente.Comprobaremos que estan todos los datos  y buscamos el directorio del usuario. Comprobamos que los datos estan introducidos correctamente como en __Post__. Si es asi, sobreescribiremos el fichero del Funko para modificar los datos. Además, tenemos todos los posibles errores como ID o usuario no existentes.

Finalmente tenemos __listen__ para el puerto queremos que escuche el servidor.

Para comprobar la funcionlidad de todo, hemos usado la extension de VSCode _Thunder Client_, donde hemos usado ejemplos de posibles peticiones para comprobar el correcto funcionamiento del servidor, además de la contemplación de errores.

Para no poner todos los posibles escenarios del servidor y sus peticiones, en los Test hemos probado su total funcionalidad para listar, añadir, modificar o eliminar funkos, asi como algunos de sus errores.



### Tests

Los tests estan hechos usando el paquete _request_ para llevar a cabo peticiones HTTP mientras el servidor Express se esta ejecutando.
```

  Express Test
    ✔ Add Funko
    ✔ Add Funko without description should be error
    ✔ Get All Funkos
    ✔ Get Funko by id
    ✔ Get Funko by id not found
    ✔ Update Funko by id
    ✔ Update Funko type error
    ✔ Delete Funko by id
    ✔ Delete Funko by id not found

  FunkoPop Tests
    ✔ should create a FunkoPop object
    ✔ Get ID
    ✔ Set ID
    ✔ Get Name
    ✔ Set Name
    ✔ Get Description
    ✔ Set Description
    ✔ Get Type
    ✔ Set Type
    ✔ Get Genre
    ✔ Set Genre
    ✔ Get Franchise
    ✔ Set Franchise
    ✔ Get Number
    ✔ Set Number
    ✔ Get Exclusive
    ✔ Set Exclusive
    ✔ Get Special Features
    ✔ Set Special Features
    ✔ Get MarketValue
    ✔ Set MarketValue


  30 passing (24ms)

------------------|---------|----------|---------|---------|-------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------|---------|----------|---------|---------|-------------------
All files         |     100 |      100 |     100 |     100 |                   
 funko.ts         |     100 |      100 |     100 |     100 |                   
 funkoPopGenre.ts |     100 |      100 |     100 |     100 |                   
 funkoPopType.ts  |     100 |      100 |     100 |     100 |                   
------------------|---------|----------|---------|---------|-------------------
```

```

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
```