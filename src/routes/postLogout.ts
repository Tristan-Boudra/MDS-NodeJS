import {Application} from "express-ws";
import bodyParser from "body-parser";

export function postLogout(app: Application) {
    app.post(
        '/logout',
        bodyParser.urlencoded(),
        async (req, res) => {
        try {
            res.clearCookie('ssid');
            res.redirect('/login');
        } catch (e) {
            console.error(e)
            res.status(500).send('Internal Server Error')
        }
        }
    )
}