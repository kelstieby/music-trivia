import React, { useState } from "react";

import Trivia from "./components/Trivia";
import Start from "./components/Start";

const App = () => {

  const [page, setPage] = useState("Start");

  const changePage = (newPage) => {
    setPage(newPage);
    console.log(newPage);
  }

  return (
    <div>
      {/* {page === 'Start' && <div><Start handleStart={changePage}/></div>}
      {page === 'Trivia' && <div><Trivia /></div>} */}
      <Trivia />
    </div>
  );
};

export default App;
