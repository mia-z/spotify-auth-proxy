import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios";
import qs from "qs";
import NextCors from "nextjs-cors";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    await NextCors(req, res, {
        methods: ["GET", "POST"],
        // origin: "http://localhost:3000",
		// origins: ["http://localhost:3000", "https://miaz.xyz", "https://www.miaz.xyz"],
        origin: ["http://localhost:3000", "https://miaz.xyz", "https://www.miaz.xyz", "https://preview.miaz.xyz"],
        optionsSuccessStatus: 200
    });

	const refresh = req.query.refresh_token;

    const authOpts = {
        url: "https://accounts.spotify.com/api/token",
        form: {
            refresh_token: refresh,
            grant_type: "refresh_token"
        },
        headers: {
            "Authorization": `Basic ${Buffer.from(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET).toString("base64")}`,
        },
        json: true
    };

    const refreshRes = await axios.post(authOpts.url, qs.stringify(authOpts.form), {
        headers: authOpts.headers,
        validateStatus: () => true
    });

    if (refreshRes.status === 200) {
        res.send(refreshRes.data);
    } else {
        res.send("fail");
        res.status(500);
        res.end();
    }
}
