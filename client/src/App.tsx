import React, { useState } from 'react';
import './App.css';
import GraphqlProvider from './GraphqlProvider'
import Dogs from './Dog';

function App() {
  const [idState, changeIdState] = useState<number | void>(undefined)
  const [bredForState, changeBredForState] = useState('')
  const [breedGroupState, changeBreedGroupState] = useState('')
  const [nameState, changeNameState] = useState('')
  const [limitState, changeLimitState] = useState(10);


  function handleIdChange(event: React.FormEvent<HTMLInputElement>) {
    const input = parseInt(event.currentTarget.value);
    if (isNaN(input)) return changeIdState(undefined);

    changeIdState(input);
  }
  function handleBredForChange(event: React.FormEvent<HTMLInputElement>) {
    changeBredForState(event.currentTarget.value);
  }
  function handleBreedGroupChange(event: React.FormEvent<HTMLInputElement>) {
    changeBreedGroupState(event.currentTarget.value);
  }
  function handleNameChange(event: React.FormEvent<HTMLInputElement>) {
    changeNameState(event.currentTarget.value);
  }
  function handleLimitChange(event: React.FormEvent<HTMLInputElement>) {
    changeLimitState(parseInt(event.currentTarget.value));
  }

  return (
    <div className="App">
      <div>
        <label>id</label>
        <input onChange={handleIdChange} type="number" />
      </div>
      <div>
        <label>Bred for</label>
        <input onChange={handleBredForChange} />
      </div>
      <div>
        <label>Breed group</label>
        <input onChange={handleBreedGroupChange} />
      </div>
      <div>
        <label>Name</label>
        <input onChange={handleNameChange} />
      </div>
      <div>
        <label>Limit</label>
        <input type="range" min={1} max={100} onChange={handleLimitChange} /> {limitState}
      </div>
      <GraphqlProvider>
        <Dogs id={idState} bredFor={bredForState} breedGroup={breedGroupState} name={nameState} limit={limitState}></Dogs>
      </GraphqlProvider>
    </div>
  );
}

export default App;
