import {Application} from "express-ws";
import bodyParser from "body-parser";

export function getDeleteAccount(app: Application) {
    app.get('/delete-account', (req, res) => {
        res.render('delete-account');
    })
}