import React, { useCallback, useRef, useState } from "react";
import Searchbar from "../components/SearchBar";
import ProductPage from "../components/ProductPage";

import { getAllProducts } from "../graphql/query";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "./Error";

const ProductHome = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  });

  console.log("isLoading", isLoading);
  console.log("isError", isError);

  console.log("error", error?.response.data?.errors[0]);

  console.log("data", data);

  if (isLoading) {
    return "Loading Data...";
  }
  if (isError) {
    // return "Some Error";
    return <ErrorPage text={error?.response.data?.errors[0]} />;
  }

  // function closeSearchBar(e) {
  //   if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
  //     setShowSearchResult(false);
  //   }
  // }

  return (
    <div>
      <Searchbar
        showSearchBar={showSearchBar}
        setShowSearchBar={setShowSearchBar}
      />
      <ProductPage {...data} />,
    </div>
  );
};

export default ProductHome;
