import React from "react";
/* Switch: Para saber qual rota vai ser chamada.
Route são as rotas. */
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Grafico from "../Grafico/Grafico"
import TabeladeClientes from "../Crud/TabeladeClientes"
import Home from "../Home/Home"
import CadastrodeCliente from "../Crud/CadastrodeCliente";
//Função direta pra ficar mais limpo
const Routes = () => {
    //Aqui vai usar o switch.
    return (
        <Switch>
            {/*path: Parâmetros que o usuário vai ver. 
            exact: Cair exatamento oque foi escrito no parâmetro*/}
            <Route path="/" exact><Home/></Route>
            <Route path="/Grafico"><Grafico/></Route>
            <Route path="/TabeladeClientes"><TabeladeClientes/></Route>
            <Route path="/CadastrodeCliente"><CadastrodeCliente/></Route>
        </Switch>
    )
}
export default Routes