# ai-incident-log-api

This is a RESTful API built using **Node.js**, **Express**, and **MongoDB** to log and manage AI-related safety incidents. It's intended for learning and prototyping.


## Step 1: Environment Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) installed locally or via cloud (MongoDB Atlas)
- `curl` or [Postman](https://www.postman.com/) for testing


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

 `models/Incident.js`:

```js
const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  severity: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true
  },
  reported_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Incident', incidentSchema);
```

## Step 7: Define the API Routes

 `routes/incidents.js`:

```js
const express = require('express');
const router = express.Router();
const Incident = require('../models/Incident');

// GET all incidents
router.get('/', async (req, res) => {
  const incidents = await Incident.find();
  res.json(incidents);
});

// POST new incident
router.post('/', async (req, res) => {
  const { title, description, severity } = req.body;
  if (!title || !description || !['Low', 'Medium', 'High'].includes(severity)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const incident = new Incident({ title, description, severity });
  await incident.save();
  res.status(201).json(incident);
});

// GET by ID
router.get('/:id', async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) return res.status(404).json({ error: 'Not found' });
    res.json(incident);
  } catch {
    res.status(404).json({ error: 'Invalid ID format or not found' });
  }
});

// DELETE by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Incident.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  } catch {
    res.status(404).json({ error: 'Invalid ID format or not found' });
  }
});

module.exports = router;
```

## Step 8: Main Server File

 `app.js`:

```js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const incidentsRouter = require('./routes/incidents');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/incidents', incidentsRouter);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(' Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(` Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error(' MongoDB Error:', err);
  });
```


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
