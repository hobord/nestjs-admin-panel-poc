npm set strict-ssl false = false
yarn
export PORT=9090
node src/server.js &
export PORT=4200
npm run start:docker-compose
