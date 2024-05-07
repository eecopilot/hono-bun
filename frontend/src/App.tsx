import { useState } from 'react';

import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className='flex flex-col'>
        <button onClick={() => setCount((count) => count + 1)}>up</button>
        <button onClick={() => setCount((count) => count - 1)}>down</button>
        <p className='text-3xl text-center'>{count}</p>
      </div>
    </>
  );
}

export default App;
