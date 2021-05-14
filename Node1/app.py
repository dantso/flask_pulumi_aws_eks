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

@app.route('/sub', methods=["POST"])
def sub():
    num = request.form["num"]
    set_redis(num)
    return "You entered: " + num
        
def set_redis(num):
    r = redis.StrictRedis(host=redis_host, port=redis_port, password=redis_password)
    r.lpush("num", num)

if __name__ == '__main__':
   app.run(host="0.0.0.0", port=5000, debug=True)