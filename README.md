
# React-Express app

This is an example of react and express app. All the configurations have been made and all you have to do is clone and start developing.

## Installation

Clone the project and install it by using npm.

```bash
git clone https://github.com/popopolyakov/listReactExpressLerna.git
cd listReactExpressLerna
npm install
```

## Docker
Из-за lerna и монорепозитория размер Docker контейнера получился большой.
https://hub.docker.com/r/popopolyakov/test-lerna-react

![мем по ситуации с docker и lerna](https://github.com/{username}/{repository}/raw/{branch}/{path}/image.png)

## Usage
To run the app on development mode, go to the root directory and run the following command:
```bash
npm run dev 
```
It will run the app on two different ports- 8080 for the client and 3000 for the express app.
___
To run it in production mode (on port 3000):
```bash
npm start
```
