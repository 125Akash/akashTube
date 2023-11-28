import { createContext, useState, useEffect } from "react";

import { fetchDataFromApi } from "../utils/api";
export const Context = createContext();
export const AppContext = (props) => {
  const [loading, setLoading] = useState(false);
  const [SearchResults, setSearchResults] = useState([]);
  const [seletedCategory, setSelectedCategory] = useState("New");
  const [mobileMenu, setmobileMenu] = useState(false);

  useEffect(() => {
    fetchSeletedCategoryData(seletedCategory);
  }, [seletedCategory]);

  const fetchSeletedCategoryData = (query) => {
    setLoading(true);
    fetchDataFromApi(`search/?q=${query}`).then(({ contents }) => {
      setSearchResults(contents);
      setLoading(false);
    });
  };

  return (
    <Context.Provider
      value={{
        loading,
        setLoading,
        SearchResults,
        setSearchResults,
        seletedCategory,
        setSelectedCategory,
        mobileMenu,
        setmobileMenu,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
