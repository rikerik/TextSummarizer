Text Summarization Project

This project aims to provide a simple web application for text summarization. It utilizes Python Transformers for text summarization, with a Spring Boot backend serving the summarization API and a React frontend for user interaction.
Features

    Summarize text received from a Spring Boot backend using Python Transformers.
    Upload PDF files or input text directly in the React frontend for summarization.
    Visualize the summarized text in the React frontend.
    Real-time feedback and loading indicators for user interaction.

Installation
Python Setup

    Install Python:

bash

# For Windows or macOS
https://www.python.org/downloads/

# For Linux (using apt package manager)
sudo apt-get update
sudo apt-get install python3

    Install virtualenv (optional but recommended):

bash

pip install virtualenv

    Create a virtual environment:

bash

# Create a virtual environment named 'venv'
virtualenv venv

# Activate the virtual environment
# For Windows
venv\Scripts\activate
# For macOS/Linux
source venv/bin/activate

Backend Setup

    Clone the repository:

bash

git clone <repository_url>

    Navigate to the backend directory and install dependencies:

bash

cd backend
mvn install

    Start the Spring Boot server:

bash

mvn spring-boot:run

Frontend Setup

    Navigate to the frontend directory and install dependencies:

bash

cd ../frontend
npm install

    Start the React development server:

bash

npm start

    Access the application in your web browser at http://localhost:3000.

Usage

    Upload a PDF file or input text directly into the textarea in the React frontend.
    Click the "Summarize" button to initiate the summarization process.
    View the summarized text displayed in the frontend.

Technologies Used

    Python Transformers: Powerful NLP library for text summarization.
    Spring Boot: Backend framework for serving the summarization API.
    React: Frontend library for building the user interface.
    Axios: HTTP client for making requests from the React frontend to the Spring Boot backend.
    Maven: Dependency management and build tool for the Spring Boot backend.
    Node.js: JavaScript runtime environment for running the React frontend.



