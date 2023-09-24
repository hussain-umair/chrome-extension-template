import React, { useEffect, useState } from "react";
import "./App.css";
import { DOMMessage, DOMMessageResponse } from "./types";

function App() {
  const [title, setTitle] = useState("");
  const [headLines, setHeadLines] = useState<string[]>([]);

  useEffect(() => {
    console.log("chrome.tabs=> ", chrome.tabs);
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          chrome.tabs.sendMessage(
            tabs[0].id || 0,
            { type: "GET_DOM" } as DOMMessage,
            (response: DOMMessageResponse) => {
              console.log("res=> ", response);
              setTitle(response.title);
              setHeadLines(response.headlines);
            }
          );
        }
      );
  }, []);

  return (
    <div className="App">
      <h1>SEO Extension built with React!</h1>

      <ul className="SEOForm">
        <li className="SEOValidation">
          <div className="SEOValidationField">
            <span className="SEOValidationFieldTitle">Title</span>
            <span
              className={`SEOValidationFieldStatus ${
                title.length < 30 || title.length > 65 ? "Error" : "Ok"
              }`}
            >
              {title.length} Characters
            </span>
          </div>
          <div className="SEOVAlidationFieldValue">{title}</div>
        </li>

        <li className="SEOValidation">
          <div className="SEOValidationField">
            <span className="SEOValidationFieldTitle">Main Heading</span>
            <span
              className={`SEOValidationFieldStatus ${
                headLines.length !== 1 ? "Error" : "Ok"
              }`}
            >
              {headLines.length}
            </span>
          </div>
          <div className="SEOVAlidationFieldValue">
            <ul>
              {headLines.map((headline, index) => (
                <li key={index}>{headline}</li>
              ))}
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default App;
