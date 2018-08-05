const fs = require("fs")

module.exports = {
    
    readFile(fPath) {
        return new Promise(function (resolve, reject) {
            fs.readFile(fPath, 'utf-8', function(err, data) {
                if (err) reject(err);
                else resolve(data);
            });
        });
    },
    
    writeFile(fPath, content) {
        return new Promise(function(resolve, reject) {
            fs.writeFile(fPath, content, function(err, data) {
                if (err) reject(err);
                else resolve("Successed");
            });
        });
    }
}