from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from myfunc import *
from random import randint
from simplet5 import SimpleT5

app = Flask(__name__)
CORS(app)

ngrams_value = 3
ngrams = read_tokenizer('model/tokenized.txt')
t5Model = SimpleT5()
t5Model.load_model(model_type='t5', model_dir='model/simplet5-epoch-2-train-loss-0.5067-val-loss-0.3787')

@app.get("/")
def index():
    return render_template("index.html", context={"response" : "hello 1"})

@app.post("/t5")
def return_response():
    data = request.json
    text = data.get("text")
    print(text)
    if text == None:
        return jsonify({"error" : "invalid message"})
    r = t5Model.predict(text)
    
    return jsonify({"message" : r})

@app.post("/ngram")
def return_response():
    data = request.json
    text = data.get("text")
    print(text)
    if text == None:
        return jsonify({"error" : "invalid message"})
    r = final_ngram_result(text,ngrams, ngrams_value, randint(5, 25))
    
    return jsonify({"message" : r})


if __name__ == "__main__":
    app.run(debug = True, port = 4000, host="0.0.0.0")





print(model)