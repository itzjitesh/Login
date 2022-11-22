const express = require("express");
const app = express();
const signup = require("./routes/signup");
const login = require("./routes/login");
const {User} = require("./db/validate");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/login", login);
app.use("/signup", signup);

app.get("/", async(req, res)=>{
    const user = await User.find();
    if (!user) res.status(404).send("No user found");

    res.send(user);
});

app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
});
