import torch
import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)

from sentence_transformers import SentenceTransformer, util
model = SentenceTransformer('bert-base-multilingual-uncased')
def build_ngrams(text, n):
    word_doc = []
    doc_list = text.split()
    if len(doc_list) <= n:
        word_doc.append(' '.join(doc_list))
    else :
        for i in range(n, len(doc_list) +1):
            word_doc.append(' '.join(doc_list[i-n : i]))
    return word_doc

def preprocess_text(text):
    text = text.lower()
    text = text.replace('\n', '').replace('\t', '').replace('\r', '').replace('\ufeff', '').replace('“','').replace('”','')
    text = text.translate(str.maketrans('','', '!"#$%&()*+,-./:;<=>?@[\\]^_`{|}~\t\n'))
    doc = text.split()
    text = ' '.join(doc)
    return text


def gather_ngrams(ds, n):
    ngrams = []
    for text in ds:
        n_list = build_ngrams(text, n)
        ngrams.extend(n_list)
    return ngrams

def create_embedder(phrases):
    emb = model.encode(phrases)
    emb = torch.tensor(emb) 
    emb /= emb.norm(dim=-1, p=2).unsqueeze(-1) 
    return emb

def generate_ngram_model(ngrams, ngram_n):
    embedings = create_embedder(ngrams)
    torch.save(embedings, f'embedings-ngram-{ngram_n}.pt')
    with open('tokenized.txt', 'w', encoding="utf8") as ngram_file:
        ngram_file.write(str(ngrams))
    print(f'created embedings-ngram-{ngram_n}.pt and tokenized.txt')

def predict(text, ngram_n, ngrams):
    phrase = create_embedder([text])
    print('loading_embbedings')
    embedings =torch.load(f'model/embedings-ngram-{ngram_n}.pt')
    print('loading_complete')
    sims = embedings @ phrase.t()
    return sims[:,0]


def final_ngram_result(text,ngrams, ngram_n, range ):
    no_of_results = 25
    if no_of_results < 1:
        raise Exception("Sorry, no numbers below one")
    if no_of_results > len(ngrams):
        no_of_results = len(ngrams)
    print(no_of_results,len(ngrams) )
    sims = predict(text, ngram_n, ngrams)
    ind = np.argpartition(sims, -1 * no_of_results )[ -1 * no_of_results:]
    resp = []
    # check = []
    # final_obj = {}
    # obj_score = {}
    for i in ind:
        similarity = sims[i]
        index_max = i
        if similarity >= 1:
            return []
#         if ngrams[int(index_max)] not in check:
#             check.append(ngrams[int(index_max)])
#             if obj_score.get(similarity) == None:
#                 obj_score[similarity] = ngrams[int(index_max)]
#                 final_obj[ngrams[int(index_max)]] = []
#             final_obj[obj_score[similarity]].append({"text": ngrams[int(index_max)], "index" : index_max,'similarity': similarity})
        resp.append({"text": ngrams[int(index_max)], "index" : index_max,'similarity': similarity})
        # resp.append(ngrams[int(index_max)])
        resp = list(reversed(sorted(resp, key=lambda d: d['similarity']) ))
    return [x['text'] for x in resp][:range] #

def read_tokenizer(link):
    with open(link, "r", encoding="utf8") as f:
        return eval(f.read())
# read_tokenizer('/kaggle/working/tokenized.txt')