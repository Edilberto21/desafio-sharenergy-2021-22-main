import "./CadastrodeCliente.css";
import React from "react"
import { useState } from "react";
import axios from "axios";
function CadastrodeCliente() {

    const [numeroCliente, setnumeroCliente] = useState(0)
    const [nomeCliente, setnomeCliente] = useState("")
    const [usinaId, setusinaId] = useState(0)
    const [percentualDeParticipacao, setpercenDeParticipacao] = useState(0)
    const [listaClientes, setlistaClientes] = useState([])
    /*Com o axios fazemos pedidos para
    que ele possa fazer operações com o banco
    de dados com url do MongoDB. */
    const addCliente = () => {

        /*Foi criado /addCliente no index.js
        que é do servidor. */
        axios.post('http://localhost:3001/adicionar', {

            //Enviando para o backend
            numeroCliente: numeroCliente,
            nomeCliente: nomeCliente,
            usinaId: usinaId,
            percentualDeParticipacao: percentualDeParticipacao
        }).then((resposta) => {
            /* O que estou fazendo aqui
            Não quero ficar atualizando o banco 
            toda vez e nem a página, ai fazendo um set
            vai direto o cliente criado.*/
            setlistaClientes([...listaClientes,
            { _id: resposta.data._id, numeroCliente: numeroCliente, nomeCliente: nomeCliente, usinaId: usinaId, percentualDeParticipacao: percentualDeParticipacao }])
        })
    }
    return (
        <form >
            {/* onChange: sempre quando acontecer
algo na entrada do valor  mudará a função
que colocarmos*/}
            {/* onClick: sempre quando aperta no botão chama
a função para addCliente */}
            {/* Setando valores no target.value */}
            <label>Número do cliente:</label>
            <input
                type="number"
                onChange={(e) => { setnumeroCliente(e.target.value) }} />
            <label>Nome do cliente:</label>
            <input
                type="text"
                onChange={(e) => { setnomeCliente(e.target.value) }} />
            <label>Id da usina:</label>
            <input
                type="number"
                onChange={(e) => { setusinaId(e.target.value) }} />
            <label>Percentual de participação:</label>
            <input
                type="number"
                onChange={(e) => { setpercenDeParticipacao(e.target.value) }} />
            <button onClick={addCliente}>Adicionando Cliente</button>
        </form >
    )
}
export default CadastrodeCliente