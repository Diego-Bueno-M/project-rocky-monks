const database1 = require('./database/broken_database_1.json');
const database2 = require('./database/broken_database_2.json');
const fs = require("fs");

const fixDatabaseName = (database) => {
  const wrongA = 'æ';
  const wrongO = 'ø';
  database.forEach((data) => {
    if(data.nome.includes(wrongA)) {
      const index = data.nome.indexOf(wrongA);
      let newName = '';
      if(index == 0) {
        newName = data.nome.replace(wrongA, 'A');
      } else {
        newName = data.nome.replaceAll(wrongA, 'a');
      };
      data.nome = newName;
    };
    if(data.nome.includes(wrongO)) {
      const index = data.nome.indexOf(wrongO);
      let newName = '';
      if(index == 0) {
        newName = data.nome.replace(wrongO, 'O');
      } else {
        newName = data.nome.replaceAll(wrongO, 'o');
      };
      data.nome = newName;
    };
  });
  return database;
};

const fixDatabaseBrand = (database) => {
  const wrongA = 'æ';
  const wrongO = 'ø';
  database.forEach((data) => {
    if(data.marca.includes(wrongA)) {
      const index = data.marca.indexOf(wrongA);
      let newName = '';
      if(index == 0) {
        newName = data.marca.replace(wrongA, 'A');
      } else {
        newName = data.marca.replaceAll(wrongA, 'a');
      };
      data.marca = newName;
    };
    if(data.marca.includes(wrongO)) {
      const index = data.marca.indexOf(wrongO);
      let newName = '';
      if(index == 0) {
        newName = data.marca.replace(wrongO, 'O');
      } else {
        newName = data.marca.replaceAll(wrongO, 'o');
      };
      data.marca = newName;
    };
  });
  return database;
};

const fixDatabaseSells = (database) => {
  database.forEach((data) => {
    if(typeof(data.vendas) === 'string') {
      data.vendas = parseInt(data.vendas);
    }
  });
  return database;
};

const fixDataBase = (database) => {
  if(!database[0].nome) {
    return fixDatabaseBrand(database);
  } else {
    const fixedName = fixDatabaseName(database);
    const fixedDatabase = fixDatabaseSells(fixedName);
    return fixedDatabase
  }
};

const fixedDatabase1 = JSON.stringify(fixDataBase(database1));
const fixedDatabase2 = JSON.stringify(fixDataBase(database2));

const createJSON = (fileName, data) => {
  fs.writeFile(fileName, data, err => {
    if(err) throw err;
    console.log('Arquivo criado com sucesso!')
  });
};

createJSON('fixed_database_1.json', fixedDatabase1);
createJSON('fixed_database_2.json', fixedDatabase2);
