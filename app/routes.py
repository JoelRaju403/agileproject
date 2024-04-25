from flask import render_template
from app import app

@app.route('/')
@app.route('/home')
def home():
  return render_template('home.html')

@app.route('/login')
def login():
  return render_template('Login.html')


@app.route('/create')
def create():
  return render_template('Create.html')