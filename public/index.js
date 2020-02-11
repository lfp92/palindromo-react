const { Fragment, useState, useEffect } = React;

function Header(props) {
  return (
    <header className="header">
      <h4>Verificador de palíndromos</h4>
      <Button setList={props.setList} />
    </header>
  );
}

function Button(props) {
  return (
    <button
      onClick={e => props.setList([])}
      data-test={props.dataTest || "limpar-dados"}
      className="btnApagarHistorico"
    >
      {props.label || "Apagar histórico"}
    </button>
  );
}

function checkPalindrome(value) {
  const semEspaco = value.replace(/ /g, "");
  if (Array.from(semEspaco).join("") === Array.from(semEspaco).reverse().join("")) {
    return true;
  } else {
    return false;
  }
}

function Input(props) {
  let [value, setValue] = useState("");

  function handleInput(event) {
    if (event.key !== "Enter") return;
    if (value.trim() === "") return;

    props.addToList({ text: value, isPalindrome: checkPalindrome(value) });
    setValue("");
  }

  return (
    <div className="pad">
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        data-test="entrada"
        onKeyUp={handleInput}
        className="inputPalindromo"
      ></input>
    </div>
  );
}

function Main(props) {
  function addToList(newItem) {
    props.setList([newItem, ...props.list]);
  }

  return (
    <main className="app">
      <Input addToList={addToList} />
      <Table>
        {props.list.map((item, index) => (
          <TableRowData
            key={index}
            text={item.text}
            isPalindrome={item.isPalindrome}
          />
        ))}
      </Table>
    </main>
  );
}

function TableRowData(props) {
  return (
    <tr className="trowbody">
      <td>{props.text}</td>
      <td data-verificado={props.isPalindrome ? "positivo" : "negativo"}>
        {props.isPalindrome ? "sim" : "não"}
      </td>
    </tr>
  );
}

function Table(props) {
  return (
    <table className="table">
      <thead>
        <tr className="trowhead">
          <th>Frase</th>
          <th>Palíndromo</th>
        </tr>
      </thead>
      <tbody className="tablebody">{props.children}</tbody>
    </table>
  );
}

function App() {
  let [list, setList] = useState([]);
  return (
    <Fragment>
      <Header setList={setList} />
      <Main list={list} setList={setList} />
    </Fragment>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
