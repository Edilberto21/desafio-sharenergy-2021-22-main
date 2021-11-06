//Servidor do node com o mongodb
const express = require("express");

//Permiti fazer conexão do frontend com backend.
const cors = require('cors')

const app = express();

//Modela os dados da aplicação.
const mongoose = require("mongoose");

//Pegando o modelo para inserir depois na tabela.
const ClientesModelo = require("./models/Clientes");

app.use(cors())

//Middleware para receber dados no backend.
app.use(express.json())

/// Conexão com o banco de dados.
mongoose.connect(

  //Chama o banco de dados.
  "mongodb+srv://teste123:12345678aA@crud.5iwhh.mongodb.net/Sharenergy?retryWrites=true&w=majority",
  { useNewUrlParser: true }

);

//Se ir para a está rota irá inserir os dados.
app.post("/adicionar", async (req, res) => {
  const numeroCliente = req.body.numeroCliente 
  const nomeCliente = req.body.nomeCliente
  const usinaId = req.body.usinaId
  const percentualDeParticipacao = req.body.percentualDeParticipacao
  //Linha que será inserida no banco de dados.
  const cliente = new ClientesModelo({ numeroCliente: numeroCliente, nomeCliente: nomeCliente, usinaId: usinaId, percentualDeParticipacao: percentualDeParticipacao });
  await cliente.save();
  res.send(cliente);

});

//Se ir para a está rota irá ler os dados.
app.get("/leitura", async (req, res) => {
  /*Pesquisando no banco de dados,
  podemos especifica os que pode ser mostrados.*/
  ClientesModelo.find({}, (err, resultado) => {
    if (err) {
      res.send(err);
    } else {
      res.send(resultado);
    }
  });
});

app.put('/atualizar', async (req,res) => {
  const novonumeroCliente = req.body.novonumeroCliente
  const novonomeCliente = req.body.novonomeCliente
  const novousinaId = req.body.novousinaId
  const novopercentualDeParticipacao = req.body.novopercentualDeParticipacao
  const id = req.body.id
  try {

    await ClientesModelo.findById(id, (error, clienteAtualizar) => {
      clienteAtualizar.numeroCliente = Number(novonumeroCliente)
      clienteAtualizar.nomeCliente = String(novonomeCliente)
      clienteAtualizar.usinaId = Number(novousinaId)
      clienteAtualizar.percentualDeParticipacao = Number(novopercentualDeParticipacao)
     
      //Depois de atualizar, salvar.
      clienteAtualizar.save()
    })
  } catch(err) {
    console.log(err)
  }

  res.send('Cliente Atualizado')
})

/*Passamos através dos parêmetros quando
é excluir.*/
app.delete('/excluir/:id', async (req, res) => {
  const id = req.params.id 
  await ClientesModelo.findByIdAndRemove(id).exec()
  res.send('Cliente Excluido')
})

//Porta de conexão
app.listen(3001, () => {
  console.log("Você está conectado!");
});
