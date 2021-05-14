import os
from flask import Flask, render_template, url_for, request
import redis
app = Flask(__name__)

redis_host = "redis"
redis_port = 6379
redis_password = ""

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/average', methods=["POST"])
def average():
    average = get_redis() 
    return 'Hello, the average of the numbers entered is: '+ str(average)

def get_redis():
    r = redis.StrictRedis(host=redis_host, port=redis_port, password=redis_password)
    num = r.lrange("num", 0, -1)
    num = list(map(int, num))
    r.delete("num")
    if not num:
        average = "N/A"
    else:
        average = round(sum(num)/len(num), 2)
    return str(average)

if __name__ == '__main__':
   app.run(host="0.0.0.0", port=5001, debug=True)