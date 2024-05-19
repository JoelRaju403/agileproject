### Agile Web Development Project

## Purpose of the Web Application.
This is a Flask web application that allows users to create their own flashcards and study them.
Users can request/search for other users' flashcards to learn as well as request GPT-4 Turbo to summarise and compile their notes into a series of flashcards.

## Architecture of the Web Application

In our database we have three tables in our database.
One for storing the User Information: 
Table Name: User 
Columns:  
        id - INTEGER  
        name - VARCHAR(64)
        email - VARCHAR(120)  
        password_hash - VARCHAR(256)  
Primary Key: [ 'id' ]

One for storing the Sets Information: 
Table Name: Sets
Columns:
      userId - INTEGER
      id - INTEGER
      subject - VARCHAR(100)
      title - VARCHAR(100)
      public - BOOLEAN
      cards - CARDS
Primary key: ['id']
Foreign key: userID -> User.id

One for storing the Flashcard Information: 
Table Name: Cards
Columns:
        userId - INTEGER
        id - INTEGER
        setId - INTEGER
        question - VARCHAR(400)
        answer - VARCHAR(400)
Primary key: ['id']
Foreign key: setId -> Sets.id

## Learn
Users can head to the learn page to study flashcards created by them or others around the world.

## Create
Either through AI or through the create page users can generate their own flashcards to study.

## Explore
Users can search and explore other flashcard sets created by other users.
        

## HOW TO  RUN THE FLASK APPLICATION        

1. Unzip the project folder

2. Open a virtual environment within the project folder. Ensure that you have python downloaded.

   ```
   python -m venv venv
   ```

   ```
   source venv/bin/activate
   ```

3. Install the required Python packages by running the following command in the terminal:
   ```
   pip install -r requirements.txt
   ```

   Downloads all the required packages to run our web application.

4. Export the Openai API key, to use the AI feature.
   ```
    echo "export OPENAI_API_KEY='ENTER_YOUR_API_KEY'" >> ~/.zshrc
    source ~/.zshrc
   ```
   Export the ZenQuotes API key
    ```
      echo "export QUOTES_API='ENTER_YOUR_API_KEY'" >>  ~/.zshrc
      source ~/.zshrc
    ```
   This will allow the web application to access the OpenAI API and the Quotes API.

5. Run the following command in the terminal to start the Flask development server:

   ```
   flask run
   ```

6. Open a web browser and navigate to `http://127.0.0.1:5000/` to view the home page of the web application.      

7. From here head to http://127.0.0.1:5000/login to register an account.
8. http://127.0.0.1:5000/explore to discover new flashcards.
9. http://127.0.0.1:5000/create to create new flashcards.
10. http://127.0.0.1:5000/upload to use AI to gnerate new flashcards.
11. http://127.0.0.1:5000/learn to study the flashcards


## Created By:
⁠
Andy Lee (23351433), Umar Shaheen (23357119), Joel Raju (23366017)
