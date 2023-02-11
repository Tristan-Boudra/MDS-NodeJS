import {Application} from "express-ws";
import path from "path";

export function postProfile(app: Application) {
    app.post('/profile', (req, res) => {
        res.sendFile(path.join(__dirname, '../../pages/profile.html'))
    })
}