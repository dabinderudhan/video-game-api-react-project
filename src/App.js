import "./App.css";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((response) => response.json());
function App() {
  const [gameTitle, setGameTitle] = useState("");
  const [searchGames, setSearchGames] = useState([]);
  // const [gameDeals, setGameDeals] = useState([]);

  const { data } = useSWR(
    "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=3",
    fetcher
  );

  const searchGame = () => {
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=3`)
      .then((response) => response.json())
      .then((data) => setSearchGames(data));
  };

  // useEffect(() => {
  //   fetch(
  //     `https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=3`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => setGameDeals(data));
  // }, []);

  return (
    <div className="App">
      <div className="searchSection">
        <h1>Search for a Game</h1>
        <input
          type="text"
          placeholder="Minecraft..."
          onChange={(e) => setGameTitle(e.target.value)}
        ></input>
        <button onClick={searchGame}>Search game title</button>
        <div className="games">
          {searchGames.map((game, key) => {
            return (
              <div className="game" key={key}>
                <h5>{game.external}</h5>
                <img src={game.thumb} alt={game.external} />
                <p>$ {game.cheapest}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="dealsSection">
        <h1>Latest deals 🎆</h1>
        <div className="games">
          {data &&
            data.map((game, key) => {
              return (
                <div className="game" key={key}>
                  <h3>{game.title}</h3>
                  <img src={game.thumb} alt={game.title} />
                  <p>Normal Price : $ {game.normalPrice}</p>
                  <p>Deal Price : $ {game.salePrice}</p>
                  <h3>You saved ${Math.floor(game.savings)}%</h3>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
