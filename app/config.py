import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
  #Cryptographic key for signature/tokens --> should change the key after adding to github
  # THe first option is to get the secret key (found in server) but if cannot find than use hardcoded key.
  SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'

  SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
  

  #Email errors in deployment
  MAIL_SERVER = os.environ.get('MAIL_SERVER')
  MAIL_PORT = int(os.environ.get('MAIL_PORT') or 25)
  MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS') is not None
  MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
  MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
  ADMINS = ['']
