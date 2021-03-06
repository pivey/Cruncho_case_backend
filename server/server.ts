import express, {
  Application, Request, Response
} from 'express';
import { NearbyPlacesObj } from '../types';

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

const baseURL = 'https://maps.googleapis.com/maps/api/place/';

const getNearbyRestaurants = async (lat: string, long: string) => {
  try {
    return await axios.get(`${baseURL}nearbysearch/json?location=${lat},${long}&rankby=distance&type=restaurant&key=${PlacesApiKey}`);
  }
  catch (err) {
    console.log(err.message);
  }
};

app.post('/nearbyRestaurants', async (req: Request, res: Response) => {
  const { latitude, longitude } = req.body;
  if (res.statusCode === 200 && latitude && longitude) {
    const result = await getNearbyRestaurants(latitude, longitude);
    const output = result.data.results.reduce((acc: any[], el: NearbyPlacesObj) => {
      if (el.business_status === 'OPERATIONAL') {
        acc.push({
          location: { ...el.geometry.location },
          open: el.opening_hours?.open_now || false,
          photoReference: el?.photos?.[0].photo_reference,
          icon: el.icon,
          name: el.name,
          placeId: el.place_id,
          priceLevel: el.price_level,
          rating: el.rating,
          types: el.types,
          userRatingTotal: el.user_ratings_total,
          vicinity: el.vicinity
        });
      }
      return acc;
    }, []);
    res.send(output);
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
