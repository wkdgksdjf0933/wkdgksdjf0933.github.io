	
# -*- coding: utf-8 -*- 

from flask import Flask, render_template,redirect, url_for, abort

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('w.html')

@app.route('/c')
def novel():
    return render_template('/웹소설/c.html')

@app.route('/fr')
def notice():
    return render_template('/공지/fr.html')

@app.route('/login')
def login():
    return render_template('/로그인/login2.html')

@app.route('/epw')
def notice_post():
    return render_template('/공지/epw.html')

@app.route('/login2')
def login2():
     return render_template('/로그인/login.html')

@app.route('/login3')
def login3():
    return render_template('/로그인/login3.html')

@app.errorhandler(404)
def page_not_found(error):
    return render_template('/error/error.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)