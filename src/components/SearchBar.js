import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import LoadingScreen from "./LodingScreen";

export default function Searchbar() {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  // const [searchText, setSearchText] = useState("");

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  async function fetchSearchResults(searchText) {
    // console.log("Search text", searchText);
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/searchResult?searchText=${searchText}`
      );
      if (response.data && response.data.searchResult.length > 0) {
        setSearchResult(response.data.searchResult);
      }
      setLoading(false);
    } catch (err) {
      console.log("error in searching result");
      setLoading(false);
    }
    // console.log("response in search result", response.data);
    setLoading(false);
  }

  console.log("search result ----", searchResult);

  // useEffect(() => {
  //   console.log("inside use effect", searchText);
  //   if (searchText.length > 0) {
  //     fetchSearchResults();
  //   } else {
  //     setSearchResult([]);
  //   }
  // }, [searchText]);
  const optimizedFunc = useCallback(debounce(fetchSearchResults), []);

  const buttonHandler = () => {
    setSearchResult([]);
    //setSearchText("");
  };

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <article
          style={{
            display: "flex",
            flexDirection: "row",
            // alignItems: "center",
            // justifyContent: "center",
            // width: "100%",
            // height : "1rem"
            marginBottom: "0",
          }}
        >
          <input
            type="text"
            // value={searchText}
            // placeholder="search ..."
            onChange={(e) => optimizedFunc(e.target.value)}
            // onFocus={}
            style={{
              borderStyle: "none",
              // borderBottom: "2px solid grey",
              boxShadow: "0 0 10px rgba(0,0,0,0.5)",
              // width : "100px"
              borderRadius: "0",
              height: "1rem",
              width: "30vw",
            }}
          />
        </article>

        <div
          style={{
            // borderStyle: "none",
            // borderBottom: "2px solid grey",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            // width : "100px"
            borderRadius: "0",
            // height: "1rem",
            width: "31vw",
            backgroundColor: "lightgray",
            position: "fixed",
            top: "15vh",
            left: "61vh",
            // width: "30vw",
            backgroundColor: "white",
            // border: " 1px solid #ccc",
            borderTop: "0",
            marginTop: "0",
            // display: "none",
          }}
        >
          {loading ? (
            <p style={{ color: "black" }}>
              <i>Loading...</i>
            </p>
          ) : (
            searchResult &&
            searchResult.map((item) => (
              <li key={item._id} style={{ color: "black", listStyle: "none" }}>
                <i>{item.title}</i>
              </li>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
