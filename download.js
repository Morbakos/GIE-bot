let request = require(`request`);
let fs = require(`fs`);

function download(url, missionName) {
    console.log("Téléchargement du fichier " + missionName);

    // Si le fichier existe déjà, on renvoie une erreur
    if (fs.existsSync(`${process.env.TMP_DIR}/${missionName}.pbo`)) {
        console.log("Mission " + missionName + " already exists");
        return false;
    } else {
        request.get(url)
            .on('error', console.error)
            .pipe(fs.createWriteStream(`${process.env.TMP_DIR}/${missionName}.pbo`));
        return true;
    }
}

module.exports = { download };