fs = require('fs')
function readAndParseJSON(filePath) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const parsedJSON = JSON.parse(fileContent);
      return parsedJSON;
    } catch (error) {
      console.error('Erro ao ler ou fazer o parse do arquivo JSON:', error);
      return null;
    }
  }
      

module.exports = readAndParseJSON