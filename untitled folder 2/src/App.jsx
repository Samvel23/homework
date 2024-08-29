import React, { useState } from "react";
import "./App.css";

/* This component return a div that 
  can be themed with button click 
  and its renders styles based on the button click
*/
function ThemeSwitcher(props) {
  const [theme, setTheme] = useState(true);

  return (
    <>
      <button onClick={() => setTheme(!theme)}>
        Click to Change Theme to {theme ? "Light" : "Dark"}
      </button>
      <div className="contianer" style={props.render(theme)}></div>
    </>
  );
}

/* This component returns the style based on the theme */
export default function App() {
  return (
    <>
      <ThemeSwitcher
        render={(theme) => ({
          backgroundColor: theme ? "lightblue" : "grey",
          color: theme ? "black" : "white",
          height: "100vh",
          width: "100vw",
          margin: "0",
          padding: "0",
        })}
      />
    </>
  );
}
