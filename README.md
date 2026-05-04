# Quiz Builder
Quiz Builder web application where users can create custom quizzes with various types of questions
## 1. Setting up environment
- Clone repository from GitHub
- Run ```npm install``` in root folder
- Create ```.env``` files in ```/apps/frontend``` and ```/apps/backend```
- **/apps/frontend/.env**
```
VITE_SERVER_URL="YOUR_SERVER_URL"
```
- **/apps/backend/.env**
```
DATABASE_URL="YOUR_DB_URL"

ORIGIN="YOUR_ORIGIN_URL"
PORT = 3001
```
## 2. Database initialization
- Go to the backend folder: ```cd apps/backend```
- Generate Prisma Client: ```npx prisma generate```
- Apply the Prisma schema to the database: ```npx prisma db push```
- Make sure that DATABASE_URL in ```/apps/backend/.env``` points to a valid PostgreSQL database. For example: ```DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/quiz_builder"```
- If you are using a local PostgreSQL database, create the database before running Prisma commands: ```CREATE DATABASE quiz_builder;```
- After this, Prisma can create all required tables automatically using: ```npx prisma db push```

## 3. Running application
- To launch application run ```npm run dev``` in root folder
## 4. Creating simple quiz
- When your app is running click **Go to quizzes** button on the main page
- Click **Create quiz** button to create a new quiz
- Enter quiz title
- Now you can add questions: enter question title, select type, add answers and set correct one(s)
- When you are ready, click **Create quiz** button in the end of the form
- Navigate to ```/quizzes``` page by clicking **Back to quizzes** button on top
- There you can view all your quizzes
- To view details click on the quiz card
- To delete quiz click on **TrashCan** button and confirm your action
