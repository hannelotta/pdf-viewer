var express = require("express");
var fs = require("fs");

var app = express();
app.use(express.json({ limit: "10mb" }));

app.get("/health", function(req, res) {
    res.sendStatus(200);
});

app.post("/saveAsPdf", function(req, res) {
    let pdfData = Buffer.from(req.body.pdfData, 'base64');
    let fileNameWithExtension = req.body.filename;
    let directory = "pdfFiles/";

    fs.writeFileSync(directory + fileNameWithExtension, pdfData);
    res.sendStatus(200);
})

app.listen(5000);
