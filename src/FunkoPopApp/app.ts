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
 * Con listen le decimos en que puerto 
 */
app.listen(3004, () => {
  console.log("Servidor escuchando en el puerto 1423");
})
