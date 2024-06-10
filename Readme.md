### Dependencies
```
node v18.17.1
npm v9.6.7
python v3.11.5
pip v24.0    (No need to install separately will be include when you create venv)
docker v24.0.6
docker-compose v2.21.0
```
### Start Database service
Run: `docker-compose up --build` from root directory(where docker-compose.yml is located)

### Local python setup (optional)
1. cd `<project root>`
2. `python -m venv venv`
3. `source venv/bin/activate`
4. `pip install -r backend/requirements.txt`

### Copy environment file
1. Create .env file and copy environment to `.env` file

### Migrate Database
`python manage.py migrate`

### Setup frontend 
```
cd frontend;
npm install
npm start
```

### Endpoints

frontend [http://localhost:3000](http://localhost:3000)  
backend [http://localhost:8000](http://localhost:8000)  
database `localhost:5444 `