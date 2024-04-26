import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
  #Cryptographic key for signature/tokens --> should change the key after adding to github
  # THe first option is to get the secret key (found in server) but if cannot find than use hardcoded key.
  SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'

  SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')