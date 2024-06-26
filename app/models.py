from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timezone
from typing import Optional
import sqlalchemy as sa
import sqlalchemy.orm as so
from app import db
from flask_login import UserMixin
from app import login
from hashlib import md5

@login.user_loader
def load_user(id):
    return db.session.get(User, int(id))


class User(UserMixin, db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    username: so.Mapped[str] = so.mapped_column(sa.String(64), index=True,
                                                unique=True)
    email: so.Mapped[str] = so.mapped_column(sa.String(120), index=True,
                                             unique=True)
    password_hash: so.Mapped[Optional[str]] = so.mapped_column(sa.String(256))

   
    
    sets = db.relationship('Sets', backref='user', lazy=True)
    

    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def avatar(self, size):
        digest = md5(self.email.lower().encode('utf-8')).hexdigest()
        return f'https://www.gravatar.com/avatar/{digest}?d=identicon&s={size}'

    def __repr__(self):
        return '<User {}>'.format(self.username)



class Sets(db.Model):
    userId = db.Column(db.Integer, db.ForeignKey('user.id'))
    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String(100), nullable = False)
    title = db.Column(db.String(100),nullable=False)
    public = db.Column(db.Boolean, nullable=False, default=False)

    cards = db.relationship('Cards', backref='set', lazy=True)



class Cards(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    setId=db.Column(db.Integer, db.ForeignKey(Sets.id))
    question=db.Column(db.String(400), nullable=False)
    answer=db.Column(db.String(400), nullable=False)


