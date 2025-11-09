# EcoExchange


Community reuse platform — full-stack example (React + Express + MongoDB)


## Features
- Add items (name, image URL, condition, location, description)
- Items board with search and filter by conditionlocationstatus
- Toggle item status (available  exchanged)


## Tech
- Frontend React (Vite)
- Backend Node.js, Express, Mongoose
- Database MongoDB (Atlas or local)


## Quick setup


### Backend
1. `cd server`
2. copy `.env.example` to `.env` and set `MONGO_URI` and `PORT` if you want
3. `npm install`
4. `npm run dev` (uses nodemon)


### Frontend
1. `cd client`
2. `npm install`
3. set `VITE_API_URL` in `client.env` if backend is not at default `httplocalhost5000`
4. `npm run dev`


The frontend expects the backend endpoints
- `GET items`
- `POST items`
- `PUT itemsid` (body `{ status available  exchanged }`)




## Deployment
- Deploy the server on RenderHerokuRender and set `MONGO_URI` in environment.
- Deploy client to VercelNetlify and set `VITE_API_URL` to the server URL.




## Notes
- For image uploads consider adding Cloudinary in backend and uploading from the client.
- Pagination and infinite scroll are left as bonus tasks.
