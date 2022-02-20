import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios";
import qs from "qs";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const code = req.query.code;

    const authOpts = {
        url: "https://accounts.spotify.com/api/token",
        form: {
            code: code,
            redirect_uri: "https://miaz.xyz/api/callback",
            grant_type: "authorization_code"
        },
        headers: {
            "Authorization": `Basic ${Buffer.from(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        json: true
    };

    const authRes = await axios.post(authOpts.url, qs.stringify(authOpts.form), {
        headers: authOpts.headers,
        validateStatus: () => true
    });

    if (authRes.status === 200) {
        res.redirect("/");
        res.end();
    } else {
        res.send("fail");
        res.status(500);
        res.end();
    }
}