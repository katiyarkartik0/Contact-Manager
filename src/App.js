import { useEffect, useState } from "react";
import { Form } from "./Components/Form/Form";
import { Profile } from "./Components/Profile/Profile";
import "./App.css";
import { Navbar } from "./Components/Navbar";
import { createContext } from "react";
import _ from "lodash";

const handleSearchContext = createContext();

export default function App() {
  const [profiles, setProfiles] = useState({});
  const [searchFor, setSearchFor] = useState("");
  const [renderProfileCard, setRenderProfileCard] = useState();

  const handleSearch = (search) => {
    setSearchFor(search);
  };

  const updateProfiles = (newEntry) => {
    const { uniqueID } = newEntry;
    setProfiles(() => {
      return { ...profiles, [uniqueID]: newEntry };
    });
  };

  useEffect(() => {
    const handleDelete = (id) => {
      const deepClone = _.cloneDeep(profiles);
      delete deepClone[id];
      setProfiles(deepClone);
    };

    const matchItemToSearch = (item) => {
      return item.toLowerCase().includes(searchFor.toLowerCase());
    };

    const handleObjectFiltering = (dataObject) => {
      let resultantArray = [];
      Object.entries(dataObject).forEach((item) => {
        const { firstName, lastName, email } = item[1];
        if (
          matchItemToSearch(firstName) ||
          matchItemToSearch(lastName) ||
          matchItemToSearch(email)
        ) {
          resultantArray = [...resultantArray, item[1]];
        }
      });
      return resultantArray;
    };

    const handleObjectMapping = (dataObject) => {
      let resultantArray = [];
      Object.entries(dataObject).forEach((item) => {
        resultantArray = [
          ...resultantArray,
          <div className="displayProfile" key={item[1].uniqueID}>
            <Profile details={item[1]} handleDelete={handleDelete} />
          </div>,
        ];
      });
      return resultantArray;
    };

    setRenderProfileCard(
      searchFor.length
        ? handleObjectFiltering(profiles).map((item) => {
            return (
              <div className="displayProfile" key={item.uniqueID}>
                <Profile details={item} handleDelete={handleDelete} />
              </div>
            );
          })
        : handleObjectMapping(profiles),
    );
  }, [profiles, searchFor]);

  return (
    <>
    
      <handleSearchContext.Provider value={handleSearch}>
        <Navbar />
      </handleSearchContext.Provider>
      <br></br>
      <div className="formArea">
      <Form updateProfiles={updateProfiles} />
      </div>
      <br></br>
      <div className="displaySection">{renderProfileCard}</div>
    </>
  );
}

export { handleSearchContext };
