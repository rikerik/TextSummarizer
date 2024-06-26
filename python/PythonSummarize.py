from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)
#initializing pipeline with the transformers library
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

#defining route
@app.route('/summarize', methods=['POST'])
def summarize():
    #extract json data from the post request
    data = request.get_json()
    #extracting the text field
    text = data['text']  
    #generate the summary with the pipeline
    summary = summarizer(text, max_length=300, min_length=20, do_sample=True)
    #extract the text from the summary
    summarized_text = summary[0]['summary_text']
    #return the text in json format
    return jsonify({"Summarized text": summarized_text})

#run flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
