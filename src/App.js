import React from 'react';
import { MemoryGameClass } from './components/MemoryGameClass';
import { MemoryGameFunction } from './components/MemoryGameFunction';

function App() {
  return (
    <div className="App">
      {/* Uncomment one of the components below to test */}

      {/* <MemoryGameClass /> */}
      <MemoryGameFunction />
    </div>
  );
}

export default App;

