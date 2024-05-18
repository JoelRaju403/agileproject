import requests
import json
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
from app.forms import LoginForm
from flask_login import current_user, login_user
import sqlalchemy as sa
from app import db
from flask_login import logout_user
from flask_login import login_required
from flask import request
from urllib.parse import urlsplit
from app.forms import RegistrationForm
from datetime import datetime, timezone
from app.forms import EditProfileForm
from flask import jsonify
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)


@app.route('/', methods=['GET', 'POST'])
@app.route('/home', methods=['GET', 'POST'])
def home():
    #if current_user.is_authenticated:
     #   return redirect(url_for('home'))
    form = LoginForm()
    if form.validate_on_submit():
        user = db.session.scalar(
            sa.select(User).where(User.username == form.username.data))
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get('next')
        if not next_page or urlsplit(next_page).netloc != '':
            next_page = url_for('explore')
        return redirect(next_page)
    elif request.referrer == request.url:
        # If the form was submitted without anything, redirect to login page to try again.
        return redirect(url_for('login'))
    return render_template('home.html', form=form, page='home', current_user=current_user)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('explore'))
    form = LoginForm()
    if form.validate_on_submit():
        user = db.session.scalar(
            sa.select(User).where(User.username == form.username.data))
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return render_template('Login.html', title='Sign In', form=form)
        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get('next')
        if not next_page or urlsplit(next_page).netloc != '':
            next_page = url_for('explore')
        return redirect(next_page)
    return render_template('Login.html', title='Sign In', form=form, page='login')


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('home'))


@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('explore'))
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Congratulations, you are now a registered user!')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form, page='register')


@app.route('/create')
@login_required
def create():
  return render_template('Create.html')



@app.route('/user/<username>')
@login_required
def user(username):
    user = db.first_or_404(sa.select(User).where(User.username == username))
    user_sets = Sets.query.filter_by(userId=user.id).all() 
    user_flashcards = db.session.query(Cards).join(Sets, Cards.setId == Sets.id).filter(Sets.userId == current_user.id).all()
    return render_template('user.html', user=user, user_sets=user_sets, user_flashcards=user_flashcards)
  

@app.before_request
def before_request():
    if current_user.is_authenticated:
        current_user.last_seen = datetime.now(timezone.utc)
        db.session.commit()


@app.route('/edit_profile', methods=['GET', 'POST'])
@login_required
def edit_profile():
    form = EditProfileForm(original_username=current_user.username, original_email=current_user.email)
    if form.validate_on_submit():
        current_user.username = form.username.data
        current_user.email = form.email.data
        db.session.commit()
        flash('Your changes have been saved.')
        return redirect(url_for('user', username=current_user.username)) 
    elif request.method == 'GET':
        form.username.data = current_user.username
        form.email.data = current_user.email
       # form.about_me.data = current_user.about_me
    return render_template('edit_profile.html', title='Edit Profile',
                           form=form)

@app.route('/explore')
@login_required
def explore():
  user = current_user
  category = 'inspirational'
  api_url = 'https://api.api-ninjas.com/v1/quotes?category={}'.format(category)
  quote = None
  author = None
  response = requests.get(api_url, headers={'X-Api-Key': '54BNuKnSnAeD1L+DHawYTw==4eLn0FXxFEnC1EmI'})
  if response.status_code == requests.codes.ok:
    data=response.json()
    quote = data[0].get('quote')
    author= data[0].get('author')
  else:
    print("Error:", response.status_code, response.text)

  mycards = Sets.query.filter_by(userId=current_user.id)    

  return render_template('Explore.html', user=user, cards=mycards, quote=quote, author=author)


@app.route('/search', methods=['POST'])
def search_request():
  data = request.json
  query=data.get('term')

  search_cards = Sets.query.filter_by(subject=query, public = 1).all()
  results = [{'subject': card.subject, 'title': card.title} for card in search_cards]
  
  mycards = Sets.query.filter_by(userId=current_user.id)    

  print(results)
  
  return jsonify({'results': results}), 200
    
    


@app.route('/save_flashcards', methods=['POST'])
def save_flashcards():
  data = request.json

  subject = data.get('subject')
  title = data.get('title')
  public = data.get('public')

  set_obj = Sets(userId=current_user.id, subject=subject, title=title, public=public)
  db.session.add(set_obj)
  db.session.commit()

  set_id = set_obj.id
  

  flashcards = data.get('flashcards')
  if flashcards is None:
    return jsonify({'error': 'No flashcards data provided'}), 400

  flashcards = data.get('flashcards')
  for flashcard_info in flashcards:
    question= flashcard_info.get('my_question')
    answer = flashcard_info.get('my_answer')

    card = Cards(question=question, answer=answer, setId=set_id)
    db.session.add(card)
  
  db.session.commit()

  return jsonify({'message': 'Flashcards saved successfully'}), 200

@app.route('/delete_user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
  user = User.query.get(user_id)
  if user:
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User is deleted'}), 200
  else:
    return jsonify({'error' : 'User not found'}), 404


@app.route('/upload', methods=['GET', 'POST'])
def upload():
  return render_template('upload.html')

@app.route('/answer', methods=["GET", "POST"])
def answer():
    if request.method == "POST":
        data = request.json
        prompt_text = data.get('prompt')
        if prompt_text:
            chat_completion = client.chat.completions.create(
                            model="gpt-3.5-turbo",
                            messages=[
        {
            "role": "system",
            "content": "You are a helpful assistant that converts text into a series of flashcards.Each set of flashcards has one Subject and Title.The Subject name has to be a max of two words and the Title name has to be a maximum of 4 words.You are creating one set. Each flashcard has a question, an answer.",
        },
        {
            "role": "user",
            "content": f'Convert the following text into flashcards with questions, answers, subjects, and titles: "{prompt_text}"',
        }
            ],
                    )
            generated_text = chat_completion.choices[0].message.content
            print(type(generated_text))

            print(generated_text)
            response = parse_generated_text(generated_text)

            
            return response
        else:
            return jsonify({"error": "No prompt provided"}), 400
    else:
        return jsonify({"error": "Only POST requests are supported for this endpoint"}), 405

def parse_generated_text(generated_text):
   
    lines = generated_text.split('\n')
    user_id = current_user.id
    
    title = lines[1].replace('Title: ', '').strip().replace('-', '')
    subject = lines[0].replace('Subject: ', '').strip().replace('-', '')
    flashcards = []

    for line in lines[2:]:
        if line.startswith('Question:'):
            # Start a new flashcard
            flashcard = {}
            # Add the question to the current flashcard
            flashcard['my_question'] = line.replace('Question:', '').strip()
        elif line.startswith('Answer:'):
            # Add the answer to the current flashcard
            flashcard['my_answer'] = line.replace('Answer:', '').strip()
            # Add the completed flashcard to the list
            flashcards.append(flashcard)
    
    store_flashcards(title, subject, flashcards, user_id)
    return jsonify({'title':title, 
                    'subject':subject, 
                    'flashcards':flashcards
    })



def store_flashcards(title, subject, flashcards, user_id):
    # Create a new Sets object and add it to the database
    set_obj = Sets(userId=user_id, subject=subject, title=title, public=True)
    db.session.add(set_obj)
    db.session.commit()  # Commit the Sets object to the database to get its id

    set_id = set_obj.id  # Now you can get the id

    # Create a new Cards object for each flashcard and add it to the database
    for flashcard in flashcards:
        card = Cards(question=flashcard['my_question'], answer=flashcard['my_answer'], setId=set_id)
        
        db.session.add(card)

    db.session.commit()  # Commit the Cards objects to the database



    

if __name__ == "__main__":
    app.run(debug=True)