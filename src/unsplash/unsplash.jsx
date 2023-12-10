import React, { useEffect, useState } from "react";
import "./unsplash.css";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const Unsplash = () => {
  const [query, setQuery] = useState("cat");
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [theme, setTheme] = useState("");
  const secretKey = "Wgmx55aoKRHqiRNjS0ET2q_85a4eL4Hx4WZpjZDup1w";
  const url = `https://api.unsplash.com/search/photos/?query=${query}&client_id=${secretKey}`;

  const pattern = /[A-Za-z]/gi;
  const handlerSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataArr = Array.from(formData.entries());
    const formDataObject = Object.fromEntries(formDataArr);
    setQuery(() => formDataObject.category);
    setloading(true);
  };
  const handlerClick = () => {
    if (theme === "dark") {
      document.body.setAttribute("data-theme", "light");
      setTheme("light");
    } else {
      document.body.setAttribute("data-theme", "dark");
      setTheme("dark");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const dataObj = await response.json();
        console.log(dataObj);
        const arrayData = dataObj.results;
        setData(arrayData);
      } catch {
        console.error("something not work", onerror);
      }
      setloading(false);
    };
    fetchData();
  }, [query]);

  return (
    <div>
      <div className={"theme-mode"}>
        {theme === "light" ? (
          <MdOutlineLightMode onClick={handlerClick} />
        ) : (
          <MdOutlineDarkMode onClick={handlerClick} />
        )}
      </div>

      <h1 className={"title"}>unsplash images</h1>
      <form onSubmit={(e) => handlerSubmit(e)}>
        <input
          className={"category"}
          name={"category"}
          type={"text"}
          placeholder={query}
          required={true}
          pattern={"[A-Z(s|S)a-z]+"}
        />
        <button className={"search-btn"} type={"submit"}>
          submit
        </button>
      </form>
      <article className={"images-section"}>
        {loading ? (
          <div>
            <h1>loading ...</h1>
          </div>
        ) : (
          data.map((imageObj) => {
            return (
              <div
                key={imageObj.id}
                style={{ backgroundImage: `url(${imageObj.urls.small})` }}
                className={"image"}
              ></div>
            );
          })
        )}
        {data.length || loading ? "" : <h1> No Picture found</h1>}
      </article>
    </div>
  );
};

export default Unsplash;
