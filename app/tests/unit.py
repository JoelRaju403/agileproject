from unittest import TestCase
import json

from app import create_app, db
from app.routes import delete_user


class FlaskTestCase(TestCase):
    
    def setUp(self):
        testApp=create_app(TestConfig)
        self.app_context = testApp.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app.context.pop()

    @mock.patch('app.controllers.User.query')
    def test_delete_existing_user(self, mock_user_query):
        # Mock the User.query.get method to return a user
        mock_user = mock.MagicMock()
        mock_user_query.get.return_value = mock_user

        # Call the delete_user function
        response, status_code = delete_user(1)

        # Assertions
        self.assertEqual(status_code, 200)
        self.assertEqual(response, {'message': 'User is deleted'})