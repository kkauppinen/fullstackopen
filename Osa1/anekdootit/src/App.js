import { useState, useEffect } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(7).fill(0));
  const [mostVotesIndex, setMostVotesIndex] = useState(undefined);

  useEffect(() => {
    const isVoted = votes.findIndex((amount) => amount > 0);
    if (isVoted >= 0) {
      const mostVotes = Math.max(...votes);
      const index = votes.findIndex((vote) => vote === mostVotes);
      setMostVotesIndex(index);
    }
  }, [votes]);

  const getAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const handleVote = () => {
    const currentIndex = selected;
    const newVotes = [...votes];
    newVotes[currentIndex] += 1;
    setVotes(newVotes);
  };

  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
      </div>
      <div>
        <Button handleClick={getAnecdote} text={"Next Anecdote"} />
        <Button handleClick={handleVote} text={"Vote"} />
      </div>
      <h2>Anecdote with most votes</h2>
      <div>
        <p>{anecdotes[mostVotesIndex]}</p>
        {mostVotesIndex === undefined && <p>No anecdotes voted</p>}
        {mostVotesIndex >= 0 && <p>has {votes[mostVotesIndex]} votes</p>}
      </div>
    </>
  );
};

export default App;
