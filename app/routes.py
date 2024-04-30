from flask import render_template, flash, redirect, url_for, request
from app import app
from app.forms import LoginForm
from flask_login import current_user, login_user
import sqlalchemy as sa
from app import db
from app.models import User
from app.models import Sets
from app.models import Cards
from flask_login import logout_user
from flask_login import login_required
from flask import request
from urllib.parse import urlsplit
from app.forms import RegistrationForm
from flask import jsonify
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

@app.route('/explore')
def explore():
  return render_template('Explore.html')



@app.route('/save_flashcards', methods=['POST'])
def save_flashcards():
  data = request.json

  subject = data.get('subject')
  title = data.get('title')

  set_obj = Sets(userId=1, subject=subject, title=title)
  set_id=set_obj.id
  db.session.add(set_obj)

  flashcards = data.get('flashcards')
  for flashcard_info in flashcards:
    question= flashcard_info.get('my_question')
    answer = flashcard_info.get('my_answer')

    card = Cards(question=question, answer=answer, setId=set_id)
    db.session.add(card)
  
  db.session.commit()

  return jsonify({'message': 'Flashcards saved successfully'}), 200

