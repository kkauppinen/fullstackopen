import { useState } from "react";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticsLine = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
);

const Table = ({ rows }) => {
  return (
    <table>
      <tbody>
        {rows.map((row, index) => (
          <TableRow key={"row" + index} cells={row} />
        ))}
      </tbody>
    </table>
  );
};

const TableRow = ({ cells }) => {
  return (
    <tr>
      {cells.map((cell, index) => (
        <td key={"cell" + index}>{cell}</td>
      ))}
    </tr>
  );
};

const Feedback = ({ handleGood, handleNeutral, handleBad }) => {
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text={"Good"} handleClick={handleGood} />
      <Button text={"Neutral"} handleClick={handleNeutral} />
      <Button text={"Bad"} handleClick={handleBad} />
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const positive = bad > 0 ? (good / all) * 100 : 100;
  const average = (good - bad) / all;
  const data = [
    ["Good", good],
    ["Neutral", neutral],
    ["Bad", bad],
    ["All", all],
    ["Average", average],
    ["Positive", positive],
  ];
  return (
    <div>
      <h2>Statistics</h2>
      {good === 0 && neutral === 0 && bad === 0 && <p>No feedback given</p>}
      {(good > 0 || neutral > 0 || bad > 0) && (
        <div>
          <Table rows={data} />
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <>
      <Feedback
        handleGood={handleGood}
        handleNeutral={handleNeutral}
        handleBad={handleBad}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
