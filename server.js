const express = require("express");
const cors = require("cors");
const app = express();
require('./Config/dbConnect')
require('dotenv').config()
// const ownerRoutes = require('./Routes/owners.routes')
// const adminRoutes = require('./Routes/admin.routes')
const authRoutes = require('./Routes/auth.routes')
const stadiumRoutes = require('./Routes/stadiums.routes')
const reservationRoutes = require('./Routes/reservation.routes')
const bodyParser=require('body-parser');
const { twilio } = require("twilio");
const jwt = require('jsonwebtoken');
app.use(cors());
app.use(bodyParser.json())
// app.use('/owner',ownerRoutes)
// app.use('/admin',adminRoutes)
app.use('/auth',authRoutes)
app.use('/stadiums',stadiumRoutes)
app.use('/reservation',reservationRoutes)


// const httpServer = require('http').createServer(app);
// const Message = require("./models/Message")
// const io = require('socket.io')(httpServer, {
//   cors: {origin : '*'}
// });
// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('message',async (req) => {
//     try {
//       const decoded=jwt.verify(req.token,process.env.TOKEN_SECRET_KEY)
//       req.from=decoded.user.id
//       const ms=await Message.create(req)
//       console.log(ms);
//     } catch (error) {
//       socket.disconnect()
//     }
//     io.emit('message', req);
//   });
//   socket.on('disconnect', () => {
//     console.log('a user disconnected!');
//   });
// });
// httpServer.listen(3001, () => console.log(`listening on port 3001`));

const PORT =3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });