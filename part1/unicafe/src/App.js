import React from "react";
import { useState } from "react";
import Button from "./Button";
import Statistics from "./Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const average = () => (all ? (good - bad) / all : all);
  const positive = () => (all ? (good / all) * 100 + "%" : all + "%");

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        handleClick={() => {
          setGood((prevGood) => prevGood + 1);
          setAll((prevAll) => prevAll + 1);
        }}
        text="good"
      />
      <Button
        handleClick={() => {
          setNeutral((prevNeutral) => prevNeutral + 1);
          setAll((prevAll) => prevAll + 1);
        }}
        text="neutral"
      />
      <Button
        handleClick={() => {
          setBad((prevBad) => prevBad + 1);
          setAll((prevAll) => prevAll + 1);
        }}
        text="bad"
      />
      <h1>statistics</h1>
      {all ? (
        <table>
          <Statistics
            good={good}
            bad={bad}
            neutral={neutral}
            all={all}
            average={average()}
            positive={positive()}
          />
        </table>
      ) : (
        <div>No feedback given</div>
      )}
    </div>
  );
};

export default App;
