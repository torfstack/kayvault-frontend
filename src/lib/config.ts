let localhost="http://localhost:8080";
let okteto="https://kayvault-torfstack.cloud.okteto.net"

let secretPath = "/secret"

let backendUrl = okteto 
let backendSecretsUrl = backendUrl + secretPath
export default backendSecretsUrl
