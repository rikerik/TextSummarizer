import React, { useState } from "react";
import axios from "axios";

const Summarizer = () => {
  //defining state variables using useState hook
  const [inputText, setInputText] = useState("");
  const [summarizedText, setSummarizedText] = useState("");

  //function to handle input events
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const summarizeText = async () => {
    try {
      //send post request to the spring backend
      const response = await axios.post("http://localhost:8080/api/summarize", {
        text: inputText,
      });
      //set the text which was returned by server
      setSummarizedText(response.data["Summarized text"]);
    } catch (error) {
      if (error.response) {
        //server responded with a status code other than 2xx
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        //no response received (e.g., network error)
        console.error("Network Error:", error.request);
      } else {
        //something else happened while setting up the request
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div>
      <h2>Text Summarizer</h2>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        rows={6}
        cols={50}
      />
      <br />
      <button onClick={summarizeText}>Summarize</button>
      <br />
      <h3>Summarized Text:</h3>
      <p>{summarizedText}</p>
    </div>
  );
};

export default Summarizer;
