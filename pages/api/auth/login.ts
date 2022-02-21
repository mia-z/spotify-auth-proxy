import { NextApiRequest, NextApiResponse } from "next"
import { randomUUID } from "crypto";
import NextCors from "nextjs-cors";

export default async (req: NextApiRequest, res: NextApiResponse) => {

	await NextCors(req, res, {
        methods: ["GET", "POST"],
        // origin: "http://localhost:3000",
		// origins: ["http://localhost:3000", "https://miaz.xyz", "https://www.miaz.xyz"],
        origin: ["http://localhost:3000", "https://miaz.xyz", "https://www.miaz.xyz"],
        optionsSuccessStatus: 200
    });

	const scope = "streaming \ user-read-email \ user-read-private";
	const state = randomUUID();
	const qParams = new URLSearchParams({
		response_type: "code",
		client_id: process.env.SPOTIFY_CLIENT_ID,
		scope: scope,
		redirect_uri: process.env.AUTH_CALLBACK_URI,
		state: state
	});

	res.redirect("https://accounts.spotify.com/authorize/?" + qParams.toString());
}