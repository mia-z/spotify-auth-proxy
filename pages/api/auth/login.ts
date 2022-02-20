import { NextApiRequest, NextApiResponse } from "next"
import { randomUUID } from "crypto";
import NextCors from "nextjs-cors";

export default async (req: NextApiRequest, res: NextApiResponse) => {

	await NextCors(req, res, {
        methods: ["GET", "POST"],
        origin: "*",
        optionsSuccessStatus: 200
    });

	const scope = "streaming \ user-read-email \ user-read-private";
	const state = randomUUID();
	const qParams = new URLSearchParams({
		response_type: "code",
		client_id: process.env.SPOTIFY_CLIENT_ID,
		scope: scope,
		redirect_uri: "https://miaz.xyz/api/auth/callback",
		state: state
	});

	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
	res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
	res.redirect("https://accounts.spotify.com/authorize/?" + qParams.toString());
}