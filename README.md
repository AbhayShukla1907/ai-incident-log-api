# ai-incident-log-api

For this backend assignment, I built a simple RESTful API using Node.js, Express, and MongoDB to log and manage AI safety-related incidents. The main goal was to create a system where incidents like model bias or unsafe behavior could be reported, retrieved, and deleted.

The API has the following core functionalities:

POST /incidents: Add a new incident (with title, description, severity).

GET /incidents: Retrieve all incidents.

GET /incidents/:id: Fetch a specific incident by its ID.

DELETE /incidents/:id: Delete an incident by ID.

I structured the project cleanly with routes, models, and environment configuration, and made sure it was easy to test using tools like curl or Postman. I’ve also added a detailed README.md that includes setup instructions, environment config, and sample commands to run/test the app locally.

## Step 1: Environment Setup

### Prerequisites

 [Node.js](https://nodejs.org/) (v14 or higher)
 
 [MongoDB](https://www.mongodb.com/try/download/community) installed locally or via cloud (MongoDB Atlas)
 
 `curl` or [Postman](https://www.postman.com/) for testing


## Step 2: Create Project Directory

```bash
mkdir ai-incident-log-api
cd ai-incident-log-api
npm init -y
```

## Step 3: Install Required Packages

```bash
npm install express mongoose dotenv
npm install --save-dev nodemon
```

## Step 4: Project Structure

```
ai-incident-log-api/
│
├── models/
│   └── Incident.js
│
├── routes/
│   └── incidents.js
│
├── .env
├── app.js
├── package.json
└── README.md
```

## Step 5: Setup Environment Variables

Create a `.env` file in the root:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/incident-log
```

## Step 6: Create the Incident Model

 The model is defined in models/Incident.js. It includes fields like:

title

description

severity (Low, Medium, High)

reported_at (auto-generated timestamp)



## Step 7: Define the API Routes

All logic to handle requests is in routes/incidents.js, including:

GET /incidents

POST /incidents

GET /incidents/:id

DELETE /incidents/:id


## Step 8: Main Server File

 `app.js`:

## Step 9: Run Your Project

Start MongoDB in a separate terminal if needed:

```bash
mongod
```

Then run the server:

```bash
node app.js
# or
npx nodemon app.js
```
![Screenshot 2025-04-07 095101](https://github.com/user-attachments/assets/4ef7150e-ef21-4c3d-83c6-311537a91277)


## Step 10: Test API Using Postman or curl

### POST `/incidents`

```bash
curl -X POST http://localhost:3000/incidents \
  -H "Content-Type: application/json" \
  -d '{
    "title": "AI Bias Detected",
    "description": "System showed racial bias in image analysis.",
    "severity": "High"
}'
```

### GET `/incidents`

```bash
curl http://localhost:3000/incidents
```
![Screenshot 2025-04-06 214313](https://github.com/user-attachments/assets/2b7e53d5-441e-4c02-b895-c11554ee7ae8)


### GET `/incidents/:id`

```bash
curl http://localhost:3000/incidents/YOUR_INCIDENT_ID_HERE
```
![Screenshot 2025-04-06 214328](https://github.com/user-attachments/assets/04d5473f-abcb-4111-95ef-f83013327565)


### DELETE `/incidents/:id`

```bash
curl -X DELETE http://localhost:3000/incidents/YOUR_INCIDENT_ID_HERE
```
![Screenshot 2025-04-06 215116](https://github.com/user-attachments/assets/4c6bc204-2113-44cb-b9c2-1f855f8e6225)


## Author

**Abhay Kumar Shukla**  
GitHub: [AbhayShukla1907](https://github.com/AbhayShukla1907)
