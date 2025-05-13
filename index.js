const express = require("express");
const path = require("path");
const { createServer } = require("http");

const usersRouter = require("./server/routes/users.router");
const screen1EventsRouter = require("./server/routes/screen1Events.router");
const dbRouter = require("./server/routes/db.router"); // Add our new router
const { initSocketInstance } = require("./server/services/socket.service");

const PORT = 5050;

const app = express();
const httpServer = createServer(app);

// Middlewares
app.use(express.json());
app.use("/app1", express.static(path.join(__dirname, "app1")));
app.use("/app2", express.static(path.join(__dirname, "app2")));
app.use("/app3", express.static(path.join(__dirname, "app3"))); // Add our new app

// Routes
app.use("/", usersRouter);
app.use("/", screen1EventsRouter);
app.use("/api", dbRouter); // Add our new routes under /api prefix

// Services
initSocketInstance(httpServer);

// Main route
app.get("/", (req, res) => {
  res.redirect("/app3"); // Redirect to our new app
});

httpServer.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
