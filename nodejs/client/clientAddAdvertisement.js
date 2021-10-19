const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")

const packageDef = protoLoader.loadSync("../../proto/advertisement.proto", {})
const grpcObject = grpc.loadPackageDefinition(packageDef)

const advertisementPackage = grpcObject.hu.fluffy;

const client = new advertisementPackage.AdvertisementService("localhost:9090", grpc.credentials.createInsecure());

client.addAdvertisement({
    advertisement: {
        user: "Asd",
        message: "Message",
        condition: "new"
    }
}, (err, response) => {})