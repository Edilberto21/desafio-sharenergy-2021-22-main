import "./TabeladeClientes.css";
import { useState, useEffect } from 'react'
import axios from 'axios'
import iconeadd from '../Image/iconadicionar.png'
import iconrem from '../Image/iconremover.png'
import cliente from '../Image/user.png'
import dadosUsina from '../Grafico/dadosUsina.json'
function App() {
  const [numeroCliente, setnumeroCliente] = useState(0)
  const [nomeCliente, setnomeCliente] = useState("")
  const [usinaId, setusinaId] = useState(0)
  const [percentualDeParticipacao, setpercenDeParticipacao] = useState(0)
  const [listaClientes, setlistaClientes] = useState([])

  //Atualizado pelo id.
  const atualizarCliente = (id) => {
    const novonumeroCliente = prompt({nomeCliente})
    const novonomeCliente = prompt({numeroCliente})
    const novousinaId = prompt("Digite o novo id da Usina: ")
    const novopercentualDeParticipacao = prompt("Digite o percentual de participação do cliente: ")
    axios.put('http://localhost:3001/atualizar', {
      novonumeroCliente: novonumeroCliente, novonomeCliente: novonomeCliente, novousinaId: novousinaId, novopercentualDeParticipacao: novopercentualDeParticipacao, id: id
    /*Quando o valor no backend ser atualizado 
    o frontend também será atualizado. */
    }).then(() => {
      setlistaClientes(listaClientes.map((dados) => {
        return dados._id == id 
        ? {_id: id, numeroCliente: novonumeroCliente, nomeCliente: novonomeCliente, usinaId: novousinaId, percentualDeParticipacao: novopercentualDeParticipacao} 
        : dados;
      }))
    });
  }

  const removerCliente = (id) => {
    axios.delete(`http://localhost:3001/excluir/${id}`).then(() => {
      /* Filtrado os dados que estão na lista
      só os que não foram excluidos. */
      setlistaClientes(listaClientes.filter((dados) => {
        return dados._id != id
      }))
    })
  }

  /*useEffect: função para renderizar os dados
  que vão ser inseridos e mostrar na página.*/
  useEffect(() => {
    axios.get('http://localhost:3001/leitura', {

      //Resposta dos dados.  
    }).then(resposta => {

      /*Pegando os dados que foram inseridos
       no banco de dados.*/
      setlistaClientes(resposta.data)
    }).catch(() => {
      console.log("Erro")
    })
  }, [])
  function percentual(percentualDeParticipacao) {
      const h = dadosUsina.map((props) => props.tempo_h);
      const hr = h[1] - h[0];
      const k = dadosUsina.map((props) => props.potencia_kW);
      const kw = k.reduce((a,b) => a + b);
      const defixado = kw.toFixed(0);
      const kwhpreco = (defixado * hr) * 0.95;
      const precopercencliente = (percentualDeParticipacao * kwhpreco) / 100
      return precopercencliente.toFixed(2)
  }
  return (
    <div>
      <button><a href="./CadastrodeCliente">Novo Cliente</a></button>
        {/* Mapeando elementos da lista. */}
        {listaClientes.map((dados) => {
          return (
            <table>
              <tr>
              <thead>
                <th>Nome do Cliente</th>
                <th>Numero do Cliente</th>
                <th>Id da usina</th>
                <th>Percentual de participação</th>
                <th>Percentual por preço</th>
                <th>Botões</th>
              </thead>
              <tbody>
                <td>
                <img src={cliente} />
                {dados.nomeCliente}</td>
                <td>{dados.numeroCliente}</td>
                <td>{dados.usinaId}</td>
                <td>{dados.percentualDeParticipacao}%</td>
                <td>R${percentual(dados.percentualDeParticipacao)}</td>
                <td><button onClick={ () => {atualizarCliente(dados._id)}}><img src={iconeadd} /></button>
                <button onClick={ () => {removerCliente(dados._id)}}><img src={iconrem} /></button></td>
              </tbody>
              </tr>
            </table>
          )
        })}
    </div>
  )
}

export default App;
