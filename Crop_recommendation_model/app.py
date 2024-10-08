from flask import Flask,request,render_template
from flask_cors import CORS
import numpy as np
import pandas
import sklearn
import pickle

# importing model
model = pickle.load(open('model.pkl','rb'))
#sc = pickle.load(open('standscaler.pkl','rb'))
#ms = pickle.load(open('minmaxscaler.pkl','rb'))

# creating flask app
app = Flask(__name__)
CORS(app)

@app.route("/predict",methods=['POST'])
def predict():
    data = request.get_json()
    N = data['Nitrogen']
    P = data['Phosporus']
    K = data['Potassium']
    temp = data['Temperature']
    humidity = data['Humidity']
    ph = data['Ph']
    rainfall = data['Rainfall']
    print(N,P,K,temp,humidity,ph,rainfall)
    feature_list = [N, P, K, temp, humidity, ph, rainfall]
    single_pred = np.array(feature_list).reshape(1, -1)
    #final_features=single_pred
    #scaled_features = ms.transform(single_pred)
    #final_features = sc.transform(scaled_features)
    prediction = model.predict(single_pred)

    crop_dict = {1: "Rice", 2: "Maize", 3: "Jute", 4: "Cotton", 5: "Coconut", 6: "Papaya", 7: "Orange",
                 8: "Apple", 9: "Muskmelon", 10: "Watermelon", 11: "Grapes", 12: "Mango", 13: "Banana",
                 14: "Pomegranate", 15: "Lentil", 16: "Blackgram", 17: "Mungbean", 18: "Mothbeans",
                 19: "Pigeonpeas", 20: "Kidneybeans", 21: "Chickpea", 22: "Coffee"}
    if prediction[0] in crop_dict:
        crop = crop_dict[prediction[0]]
        result = "{} is the best crop to be cultivated right there".format(crop)
    else:
        result = "Sorry, we could not determine the best crop to be cultivated with the provided data."
    print(result)
    # return render_template('index.html',result = result)
    return result




# python main
if __name__ == "__main__":
    app.run(debug=True, port=10000, host='0.0.0.0')
