ChemicalizeMarvinJs.createEditor("#marvin-test").then(function (marvin) {
    function showDialog() {
        marvin.exportStructure("smiles").then(function (smiles) {
            SubmittedSmiles(smiles);
        });
    }

    console.log("I am here");
});
