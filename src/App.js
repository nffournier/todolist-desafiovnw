import React, { useState } from "react";
import styled from "styled-components";
import TodoImage from "./TodoList.png";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: none;
    outline-style: none;
    list-style: none;
    font-family: 'Mulish', sans-serif;
    background-color: #f7f4f7;
    }
`;

const TodoContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    text-align: center;
    margin-top: 3em;
    text-transform: uppercase;
    font-weight: 800;
    color: #764678;
    text-align: center;
  }
`;

const InputBox = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;

  input {
    display: flex;
    height: 60px;
    width: 300px;
    background: #4d274f;
    border: none;
    padding: 20px;
    font-size: 1em;
    margin: 30px 0;
    border-radius: 10px;
    color: white;
  }
  input::placeholder {
    color: white;
    font-weight: 300;
    letter-spacing: 0.4px;
  }
  button {
    font-size: 1em;
    background: #8c5e8e;
    border: none;
    color: white;
    cursor: pointer;
    padding: 10px 25px;
    height: 60px;
    letter-spacing: 0.4px;
    border-radius: 10px;
  }
  button:hover {
    background: #c29fc4;
    color: #4d274f;
    font-weight: 800;
    text-transform: uppercase;
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 80%;

  img {
    width: 26em;
    margin: 0 auto;
  }
  ul {
    margin: 10px auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    border-bottom: solid #4d274f 2px;
    padding: 20px;
  }
  li {
    width: 600px;
    text-align: center;
    font-size: 1.3em;
    font-weight: 900;
  }
  .buttonDelete {
    background: #4d274f;
    border: none;
    color: white;
    cursor: pointer;
    padding: 10px 15px;
    border-radius: 10px;
  }
  .buttonDelAll {
    width: 250px;
    margin: 15px auto;
    background: #376f90;
    border: none;
    color: white;
    cursor: pointer;
    padding: 20px 15px;
    border-radius: 10px;
    text-transform: uppercase;
  }
  @media screen and (min-width: 300px and max-width: 900px) {
    ul,
    li {
      max-width: 100%;
      flex-wrap: wrap;
    }
    img {
      width: 50px;
      margin: 0 auto;
    }
  }
`;

export default function App() {
  const [lista, setLista] = useState([]); //Const para armazenar uma lista
  const [input, setInput] = useState(""); //const para pegar informações digitadas no input

  function ButtonAdd() {
    if (!input) {
      return alert("Digite uma tarefa!");
    }
    setLista([...lista, { input, id: Date.now() }]);
    //Date.now: é um gerador de id's aleatórias
    setInput("");
  }

  function Deletar(id) {
    setLista(
      lista.filter((item) => {
        return item.id !== id;
      })
    );
  }
  function DeletarAll() {
    setLista([]);
  }

  return (
    <TodoContainer>
      <GlobalStyle />
      <h1> Lista de tarefas </h1>
      <InputBox>
        <input
          type="text"
          placeholder="Digite sua tarefa aqui"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => ButtonAdd()}> Adicionar tarefa </button>
      </InputBox>
      <ListContainer>
        {lista.length < 1 ? (
          <img src={TodoImage} alt="Icone Todo List" />
        ) : (
          lista.map((item) => (
            <ul>
              {/* Cada tarefa vai ter uma chave/id (key) específica*/}
              <li key={item}> {item.input} </li>
              <button onClick={() => Deletar(item.id)} className="buttonDelete">
                Apagar tarefa
              </button>
            </ul>
          ))
        )}
        {lista.length > 0 && (
          <button
            type="submit"
            onClick={() => DeletarAll()}
            className="buttonDelAll"
          >
            Apagar todas as tarefas
          </button>
        )}
      </ListContainer>
    </TodoContainer>
  );
}
