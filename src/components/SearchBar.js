import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSearchResult } from "../graphql/query";
import classes from "../styles/central.module.css";
import Modal from "./Modal";

function Searchbar({ showSearchBar, setShowSearchbar }) {
  const [searchText, setSearchText] = useState("");
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["allProducts", { searchText: searchText }],
    queryFn: (data) =>
      fetchSearchResult(Object.assign({}, data, { searchText })),
    enabled: searchText !== "" && searchText !== undefined,
  });
  console.log("isLoading", isLoading);
  console.log("isError", isError);

  console.log("error", error?.response.data?.errors[0]);

  console.log("data", data);

  // if (data) {
  //   setShowSearchbar(true);
  // }
  function clickHandler(id) {
    const item = data && data.find((item) => item._id === id);
    setSelectedItem(item);
    setShowModal(!showModal);
  }

  const props = {
    setShowModal: setShowModal,
    title: selectedItem?.title,
    imageUrl:
      process.env.REACT_APP_BACKEND_URI + "image/" + selectedItem?.imageUrl,
    _id: selectedItem?._id,
    price: selectedItem?.price,
    description: selectedItem?.description,
  };

  return (
    <div style={{ width: "100%" }}>
      {showModal && <Modal {...props} />}
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
            marginBottom: "0",
          }}
        >
          <input
            type="text"
            value={searchText}
            placeholder="search ..."
            onChange={(e) => setSearchText(e.target.value)}
            style={inputStyle}
          />
        </article>
        {!showModal && data && (
          <div style={searchBar}>
            {data.map((item) => (
              <li
                key={item._id}
                className={classes.searchBarItem}
                onClick={() => clickHandler(item._id)}
              >
                <p>{item.title}</p>
              </li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Searchbar;

const searchBar = {
  // borderStyle: "none",
  // borderBottom: "2px solid grey",
  boxShadow: "0 0 10px rgba(0,0,0,0.5)",
  // width : "100px"
  borderRadius: "0",
  // height: "1rem",
  width: "30rem",
  // height: "30rem",
  backgroundColor: "lightgray",
  position: "absolute",
  top: "10rem",
  // left: "40rem",
  // width: "30vw",
  // border: " 1px solid #ccc",
  borderTop: "0",
  marginTop: "0",
  // display: "none",
  zIndex: "999",
};

const inputStyle = {
  borderStyle: "none",
  // borderBottom: "2px solid grey",
  boxShadow: "0 0 10px rgba(0,0,0,0.5)",
  // width : "100px"
  borderRadius: "0",
  height: "1rem",
  width: "30vw",
};
