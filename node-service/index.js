var PROTO_PATH = __dirname + '/../go-service/greeter.proto';
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
// Suggested options for similarity to existing grpc.load behavior
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
// The protoDescriptor object has the full package hierarchy
var greeter_proto = protoDescriptor.greeter;


// server
const express = require('express')
const app = express()
const port = 3000
const grpcIP = process.env.GRPC_HOST
const grpcPort = process.env.GRPC_PORT

app.get('/', (req, res) => {
    var name = "NO QUERY"
    if (req.query.who) {
        name = req.query.who
    }

    var client = new greeter_proto.Greeter((grpcIP).toString()+":"+(grpcPort).toString(),
        grpc.credentials.createInsecure());

    client.sayHello({ Name: name }, function (err, response) {
        res.send(response.WelcomeMessage)
    });
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
