import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import { GOOGLE_API as API_KEY } from "../apikey";
const API_KEY = process.env.REACT_APP_GOOGLE_API;
const weather_KEY = process.env.REACT_APP_API_KEY;
export default function SearchBar() {
  const navigate = useNavigate();

  const [recommends, setRecommends] = useState([]);
  const [query, setQuery] = useState("");
  const onHandleChange = async () => {
    if (query.trim() === "") {
      setRecommends([]);
      return;
    }
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=${query}&key=${API_KEY}`
      )
      .then((res) => {
        // console.log("Search: ", res);
        setRecommends(res.data.predictions);
      });
  };

  return (
    <div className="ring-2 m-4 px-8 py-4 text-2xl mx-auto text-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onHandleChange();
        }}
      >
        <input
          className="p-2 m-2 border-2 border-blue-300 outline-none"
          placeholder="Search Bar"
          onChange={(e) => {
            setQuery(e.target.value);
            onHandleChange();
          }}
          value={query}
        ></input>
      </form>
      <div className="text-left text-lg">
        <ul>
          {recommends.map((i, index) => {
            return (
              <li key={index}>
                <button
                  className="p-2  ring-2 w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("i: ", i);
                    navigate(`/${i.terms[0].value}`);
                  }}
                >
                  {i.description.trim()}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
