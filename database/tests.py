import requests
import json
from flask import jsonify


url = "http://127.0.0.1:5000/users/change-password"
obj = {
   'username': 'hdash4',
   'password': 'newpassword1!',
   'user_type': 0
}
x = requests.put(url, json = json.dumps(obj))
assert x[1] == 200