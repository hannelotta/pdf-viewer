# PDF viewer

Simple tool for viewing PDFs from Base64 encoded string.

Can be used with Postman.

## How to use

When an API endpoint returns Base64 encoded string, you can set up a Post-response script in Postman to send the data to this PDF viewer. The file is saved as PDF in a local folder.

Run this PDF viewer:
```
npm install
npm run start
```

In Postman, open the request, select Scripts -> Post-response, and type in the following:

```
var response = pm.response.json();

const timestamp = pm.variables.replaceIn('{{$timestamp}}')

let pdfData = {
    pdfData: Buffer.from(pm.response.json()[0].Base64EncodedData, 'base64'),
    filename: timestamp + '_' + pm.response.json()[0].AttachmentMetadata.Name
} 

var request = {
    url: 'http://localhost:5000/saveAsPdf',
    method : 'POST',
    header: {
		'Content-Type': 'application/json'
	},
    body : {
        mode: 'raw',
        raw: JSON.stringify(pdfData)
    }
};

pm.sendRequest(request, function (err, res) {
  console.log(err ? err : res.text());
});
```

Modify the fields in `pm.response.json()` object to match the API response field names.

Send the request in Postman. If the Post-response script was executed successfully, you should see a generated PDF file in the project folder `pdfFiles`.

Credit goes to [Mohammed Ali El Malhouf](https://medium.com/younited-tech-blog/serve-yourself-combining-postman-and-express-3fd1dd9f545c).
