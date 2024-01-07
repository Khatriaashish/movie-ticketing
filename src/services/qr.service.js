const QRCode = require('qrcode');

const generateQR = async (path, filename, text)=>{
    try{
        QRCode.toFile(path+filename, text, {
            color: {
              dark: '#00F',  // Blue dots
              light: '#0000' // Transparent background
            }
          }, function (err) {
            if (err) throw err
            console.log('done')
          })
    }
    catch(err){
        return console.error(err)
    }
};

module.exports = generateQR;