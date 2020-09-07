import express, {
  Application, Request, Response
} from 'express';

const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const PORT: string = process.env.PORT || '3001';
const PlacesApiKey = process.env.GOOGLE_API_KEY;

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const getNearbyRestaurants = async (lat: string, long: string) => {
  try {
    return await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&rankby=distance&type=restaurant&key=${PlacesApiKey}`);
  }
  catch (err) {
    console.log(err.message);
  }
};

app.post('/nearbyRestaurants', async (req: Request, res: Response) => {
  const { latitude, longitude } = req.body;
  if (res.statusCode === 200 && latitude && longitude) {
    const result = await getNearbyRestaurants(latitude, longitude);
    console.log('restaurants here', result.data.results);
    res.send(result.data.results);
  }
});

const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`server started listening at http://localhost:${PORT}`);
    });
  }
  catch (error) {
    console.error(error.message);
  }
};

startServer();
