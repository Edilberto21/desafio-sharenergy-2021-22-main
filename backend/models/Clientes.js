const mongoose = require("mongoose");

//Schema é a configuração lógica para um banco de dados.
const Clientesschema = new mongoose.Schema({
  numeroCliente: {
    type: Number,
    required: true,
  },
  nomeCliente: {
    type: String,
    required: false,
  },
  usinaId: {
    type: Number,
    required: true,
  },
  percentualDeParticipacao: {
    type: Number,
    required: true,
  }
});

/*Instância  para fazer as solicitaçẽos
ClientesModelo serve para inserir os dados no banco de dados */
const ClientesModelo = mongoose.model("clientes", Clientesschema);

//Exportando o modelo.
module.exports = ClientesModelo;