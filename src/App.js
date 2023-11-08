import { useEffect, useRef, useState } from "react";
import "./styles.css";

const listOfFruits = ["Apple", "Banana", "Orange", "Gauvava", "PineApple"];

export default function App() {
  const isMountRef = useRef(false);
  const timerRef = useRef(null);
  const [data, setData] = useState(listOfFruits);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterQuery = () => {
    const searchText = searchQuery.trim();
    console.log(">>>>>>>>searchText ", searchText);

    if (!searchText) {
      setData(listOfFruits);
    } else {
      const filterData = listOfFruits.filter((item) => {
        return item.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
      });
      setData(filterData);
    }
  };

  useEffect(() => {
    if (isMountRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        filterQuery();
      }, 500);
    }
  }, [searchQuery]);

  useEffect(() => {
    isMountRef.current = true;
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div className="autoSearch">
        <input type="search" onChange={handleChange} value={searchQuery} />
        <ul className="searchResult">
          {data.map((fruit) => {
            return <li>{fruit}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
