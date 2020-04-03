const server = require("./app");
const port = 3001;

let usuarios = [
  {
    nombre: "diego",
    apellido: "maradona",
    usuario: "dieguito",
    password: 1234,
    saldo: 0
  }
];
server.listen(port, () => console.log(`server running on port ${port}`));
