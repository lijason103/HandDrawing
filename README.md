# HandDrawing

## Installation
- Run `pip install -r requirements.txt`
- Navigate to `client` folder and run `yarn install`

## Running app locally
We need 2 terminals. One for running client and one for running the server.

In the first terminal
- `cd ./server`
- `flask run`

In the second terminal
- `cd ./client`
- `yarn start`

Open http://localhost:3000/ in the browser. Port `5000` is used for API call.

## Running image processing demo page locally
- `cd ./experiment`
- `streamlit run image_processing_visualization/app.py`

Open http://localhost:8501/ in the browser. 
