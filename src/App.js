import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Web3 from 'web3';


const web3ws = new Web3(new Web3.providers.WebsocketProvider("wss://ws-nd-077-563-121.p2pify.com/7fcebda3ab510c1e4313e383dc64d887"));

function App() {

  const [, setSub] = useState();
  const [arrayje,] = useState([]);
  const [, setBlcok] = useState();

  let listItems;

  useEffect(() => {
    var subscription = web3ws.eth.subscribe('newBlockHeaders', function (error, result) {
      if (!error) {
        return;
      }
      console.error(error);
    })
      .on("connected", function (subscriptionId) {
        setSub(subscriptionId);
      })
      .on("data", function (blockHeader) {
        console.log(blockHeader);
        setBlcok(blockHeader);
        arrayje.push({ id: blockHeader.number, gas: blockHeader.gasUsed });
      })
      .on("error", console.error);

    return function cleanup() {
      subscription.unsubscribe(function (error, success) {
        if (success) {
          console.log('Successfully unsubscribed!');
        }
      });
    };

  }, [arrayje]);

  if (arrayje !== undefined) {
    if (arrayje !== []) {
      listItems = arrayje.map((d, index) => <div key={index} className='card'>
        <div className="card-header">
        Block {d.id}:
        </div>
        <div className='card-body text-center'>
          <div>The gas cost was: {d.gas} Wei</div>
        </div>
      </div>);
    }
  }

  return (
    <div className="App">

      <h1>Welcome to the Polygon testnet!</h1>
      <h2>Here are the newest blocks that were added to the blockchain:</h2>
      <div>
        {listItems}
      </div>

    </div>
  );
}

export default App;
