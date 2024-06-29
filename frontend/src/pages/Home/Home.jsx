import { useState } from "react";
import { Input } from "@/components/ui/input";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searches, setSearches] = useState([]);
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    if (searchQuery.trim() === "") return;

    setSearches((prevSearches) => [searchQuery, ...prevSearches]);
    setResults([`Result for "${searchQuery}"`]);
    setSearchQuery("");
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePreviousSearchClick = (query) => {
    setSearchQuery(query);
    setResults([`Result for "${query}"`]);
  };

  return (
    <div className="flex flex-col items-center p-5">
      <div className="text-3xl font-bold text-slate-900 mb-5">
        Search Page
      </div>
      <div className="flex items-center w-full max-w-lg space-x-3 mb-5">
        <Input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 flex-grow shadow-sm sm:text-sm border rounded-md"
          placeholder="Enter Pincode"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Search
        </button>
      </div>

      {results.length > 0 && (
        <div className="w-full max-w-lg">
          <div className="text-lg font-medium text-gray-800 mb-3">
            Search Results:
          </div>
          <ul className="list-disc list-inside space-y-1">
            {results.map((result, index) => (
              <li key={index} className="text-gray-700">
                {result}
              </li>
            ))}
          </ul>
        </div>
      )}

      {searches.length > 0 && (
        <div className="w-full max-w-lg mb-5">
          <div className="text-lg font-medium text-gray-800 mb-3">
            Previous Searches:
          </div>
          <ul className="list-disc list-inside space-y-1">
            {searches.map((search, index) => (
              <li key={index}>
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handlePreviousSearchClick(search)}
                >
                  {search}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};

export default Home;
