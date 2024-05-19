import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
 
  #Cryptographic key for signature/tokens to defend web forms against CSRF
  SECRET_KEY = os.environ.get('SECRET_KEY')
  
  SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')

  #Email errors in deployment
  MAIL_SERVER = os.environ.get('MAIL_SERVER')
  MAIL_PORT = int(os.environ.get('MAIL_PORT') or 25)
  MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS') is not None
  MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
  MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
  ADMINS = ['']


#class DemploymentConfig(Config):
  #SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
   #     'sqlite:///' + os.path.join(basedir, 'app.db')

#class TestConfig(Config):
 # SQLALCHEMY_DATABASE_URI = "sqlite:///:memory"
  #TESTING = True
