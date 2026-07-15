import express, { Application, Request, Response } from "express";

const app : Application = express();

app.get("/", (req : Request, res : Response) => {
    res.send("Hello World! B7A4")
})

export default app;