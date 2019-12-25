const fs = require('fs');
const writeToFile = (path, data) => {
    fs.writeFile(path, JSON.stringify(data), (err) => {
        if (err) {
            console.log(`error writing to ${path}`);
        }
        else {
            console.log(`succesfully wrote to ${path}`);
        }
    });
};
exports.writeFile = writeToFile;