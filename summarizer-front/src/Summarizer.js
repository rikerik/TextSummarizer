import React, { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { FaUpload } from "react-icons/fa"; // Importing an upload icon
import "./App.css"; // Importing the CSS file

const Summarizer = () => {
  const [inputText, setInputText] = useState("");
  const [summarizedText, setSummarizedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    setFileName(uploadedFile.name); // Set the file name
  };

  const summarize = async () => {
    setIsLoading(true);
    // Check if inputText is not empty or file is present
    if (inputText) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/summarize",
          { text: inputText }, // Send text directly as the request body
          {
            headers: {
              "Content-Type": "application/json", // Specify JSON content type
            },
          }
        );
        setSummarizedText(response.data["Summarized text"]);
      } catch (error) {
        if (error.response) {
          console.error("Server Error:", error.response.data);
        } else if (error.request) {
          console.error("Network Error:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      } finally {
        setIsLoading(false);
        // After summarization, reset inputText
        setInputText("");
      }
    } else if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://localhost:8080/api/summarize",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setSummarizedText(response.data["Summarized text"]);
      } catch (error) {
        if (error.response) {
          console.error("Server Error:", error.response.data);
        } else if (error.request) {
          console.error("Network Error:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      } finally {
        setIsLoading(false);
        // After summarization, reset file and fileName
        setFile(null);
        setFileName("");
      }
    } else {
      // Handle the case where neither inputText nor file is present
      console.log("Please input text or upload a file.");
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h2>Text Summarizer</h2>
        <div className="textarea-container">
          <textarea
            value={inputText}
            onChange={handleInputChange}
            rows={6}
            cols={50}
          />
          <div className="file-upload-container">
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="fileUpload"
            />
            <label htmlFor="fileUpload" className="upload-icon-label">
              <FaUpload size={24} />
            </label>
            {fileName && <p className="file-name">Uploaded file: {fileName}</p>}
          </div>
        </div>
        <br />

        <button onClick={summarize} className="button">
          Summarize
        </button>
        <br />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <h3>Summarized Text:</h3>
            <p>{summarizedText}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Summarizer;
