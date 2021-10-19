const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")

const packageDef = protoLoader.loadSync("../../proto/advertisement.proto", {})
const grpcObject = grpc.loadPackageDefinition(packageDef)

const advertisementPackage = grpcObject.hu.fluffy;

const server = new grpc.Server();
server.bind("localhost:9090", grpc.ServerCredentials.createInsecure())

server.addService(advertisementPackage.AdvertisementService.service, {
    "addAdvertisement": addAdvertisement,
    "getAllAdvertisement": getAllAdvertisement,
    "getAllAdvertisementStream": getAllAdvertisementStream
})

server.start()

const adds = [{
    user: "Béla",
    message: "Eladó alig használt GPU",
    condition: "new"
}, {
    user: "Jóska",
    message: "Eladó új szirszar",
    condition: "used"
}]

function addAdvertisement(call, callback) {
    adds.push(call.request.advertisement)
    callback(null, {})
}

function getAllAdvertisement(call, callback) {
    callback(null, { "advertisement": adds })
}

function getAllAdvertisementStream(call, callback) {
    adds.forEach(ad => {
        call.write(ad)
    });
    call.end()
}