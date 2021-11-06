import styled from "styled-components"
//Não precisa criar um componente já pode direto exportar.
export const AreaHeader = styled.div`
    {*Largura*}
    height: 60px;
    width: 100%;
    {*Cor do fundo *}
    background-color: #DCDCDC;
    {*Cor dos textos*}
    color: #000;
    {*Classe container*}
    .container{
        padding: 5px 20px;
        display: flex;
        align-items: center;
    }
    {*Isola os items ao colocar flex*}
    .logo{
        flex: 1;
        img {
            height: 50px;
            width: 50px;
            border-radius: 10px; 
        }
    }
    nav{
        {*Configurando ul*}
        ul{
            display: flex;
        }
        li{
            {*Tirando as bolinhas*}
            list-style: none;
            margin-left: 20px;
            a {
                color: #000;
                text-decoration: none;
            }
            a:hover {
                background-color: #2E2E2E;
                border-radius: 100px;
            }
        }
    }
`;