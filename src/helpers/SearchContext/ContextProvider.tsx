import { useEffect, useState, createContext, useContext } from "react";

export const SearchContext = createContext({
  search: "",
  setSearch: (search: string) => {},
});

export const useSearchContext = () => {
  return useContext(SearchContext);
};

export function SearchContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (search === "") return;
    console.log(search);
  }, [search]);

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}
