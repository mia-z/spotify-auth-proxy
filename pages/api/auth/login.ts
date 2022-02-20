import { NextApiRequest, NextApiResponse } from "next"
import { randomUUID } from "crypto";

export default (req: NextApiRequest, res: NextApiResponse) => {
	const scope = "streaming \ user-read-email \ user-read-private";
	const state = randomUUID();
	const qParams = new URLSearchParams({
		response_type: "code",
		client_id: process.env.SPOTIFY_CLIENT_ID,
		scope: scope,
		redirect_uri: "https://miaz.xyz/api/callback",
		state: state
	});

	res.redirect("https://accounts.spotify.com/authorize/?" + qParams.toString());
}