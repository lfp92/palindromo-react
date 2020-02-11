const { Fragment, useState, useEffect } = React;

const Header = ({ setList }) => (
  <header className="header">
    <h4>Verificador de palíndromos</h4>
    <Button setList={setList} />
  </header>
);

const Button = ({
  label = "Apagar histórico",
  dataTest = "limpar-dados",
  setList
}) => (
  <button
    onClick={e => setList([])}
    data-test={dataTest}
    className="btnApagarHistorico"
  >
    {label}
  </button>
);

const removeSpaces = value =>
  Array.from(value.toLowerCase()).reduce((x, y) => x + y.trim());

const checkPalindrome = value => {
  let reverseValue = Array.from(value)
    .reverse()
    .reduce((x, y) => x + y);
  let isPalindrome =
    removeSpaces(reverseValue) === removeSpaces(value) ? true : false;
  return isPalindrome;
};
const Input = ({ addToList }) => {
  let [value, setValue] = useState("");

  const handleInput = event => {
    if (event.key !== "Enter") return;
    if (value.trim() === "") return;

    addToList({ text: value, isPalindrome: checkPalindrome(value) });
    setValue("");
  };

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
};

const Main = ({ list, setList }) => {
  const addToList = newItem => setList([newItem, ...list]);

  return (
    <main className="app">
      <Input addToList={addToList} />
      <Table>
        {list.map((item, index) => (
          <TableRowData
            key={index}
            text={item.text}
            isPalindrome={item.isPalindrome}
          />
        ))}
      </Table>
    </main>
  );
};

const TableRowData = ({ text, isPalindrome }) => (
  <tr className="trowbody">
    <td>{text}</td>
    <td data-verificado={isPalindrome ? "positivo" : "negativo"}>
      {isPalindrome ? "sim" : "não"}
    </td>
  </tr>
);

const Table = ({ children = null }) => (
  <table className="table">
    <thead>
      <tr className="trowhead">
        <th>Frase</th>
        <th>Palíndromo</th>
      </tr>
    </thead>
    <tbody className="tablebody">{children}</tbody>
  </table>
);

const App = () => {
  let [list, setList] = useState([]);
  return (
    <Fragment>
      <Header setList={setList} />
      <Main list={list} setList={setList} />
    </Fragment>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
