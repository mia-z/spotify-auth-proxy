import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios";
import qs from "qs";
import NextCors from "nextjs-cors";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    await NextCors(req, res, {
        methods: ["GET", "POST"],
        // origin: "http://localhost:3000",
		// origins: ["http://localhost:3000", "https://miaz.xyz", "https://www.miaz.xyz"],
        origin: ["http://localhost:3000", "https://miaz.xyz", "https://www.miaz.xyz"],
        optionsSuccessStatus: 200
    });

	const code = req.query.code;

    const authOpts = {
        url: "https://accounts.spotify.com/api/token",
        form: {
            code: code,
            redirect_uri: "https://miaz.xyz/api/auth/callback",
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
        res.redirect("http://localhost:3000/no-log?token=" + authRes.data.access_token);
    } else {
        res.send("fail");
        res.status(500);
        res.end();
    }
}