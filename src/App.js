import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Component/Login";
import Home from "./Component/Home";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState();
  const fetchData = async () => {
    try {
      const config = {
        method: "GET",
        headers: {
          Authorization: "Bearer keyfXgn8PL6pB3x32",
        },
      };
      const res = await fetch(
        "https://api.airtable.com/v0/appjWdL7YgpxIxCKA/credenitals?maxRecords=3&view=Grid%20view",
        config
      );
      const result = await res.json();
      setData(result);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login data={data} />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
