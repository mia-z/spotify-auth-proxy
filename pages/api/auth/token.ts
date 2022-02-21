import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

export default async (req: NextApiRequest, res: NextApiResponse) => {

	// await NextCors(req, res, {
    //     methods: ["GET", "POST"],
    //     // origin: "http://localhost:3000",
	// 	// origins: ["http://localhost:3000", "https://miaz.xyz", "https://www.miaz.xyz"],
    //     origin: ["http://localhost:3000", "https://miaz.xyz", "https://www.miaz.xyz"],
    //     optionsSuccessStatus: 200
    // });

    res.json({
        access_token: req.body.access_token
    });
}