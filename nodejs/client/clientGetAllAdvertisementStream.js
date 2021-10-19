const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")

const packageDef = protoLoader.loadSync("../../proto/advertisement.proto", {})
const grpcObject = grpc.loadPackageDefinition(packageDef)

const advertisementPackage = grpcObject.hu.fluffy;

const client = new advertisementPackage.AdvertisementService("localhost:9090", grpc.credentials.createInsecure());

const call = client.getAllAdvertisementStream();

call.on("data", function(advertisement) {
    console.log(advertisement)
});


call.on('end', function() {
    console.log("No more message")
});