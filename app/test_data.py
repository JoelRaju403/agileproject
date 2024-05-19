from app import db
from app.models import *

#Unit Test to see if the card sets labelled public show up
set1 = Sets(id = 1, subject = "Test", title="this is the first test", public = 1)
set2 = Sets(id = 2, subject = "Test", title ="this is the second test", public = 1)
set3 = Sets (id = 3, subject = "Test", title = "this is the third test and is not to show up", public = 0)



def add_test_sets_to_db():
    db.session.add_all([set1,set2,set3])
    db.session.commit()
