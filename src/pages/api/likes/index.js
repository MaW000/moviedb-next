import Like from "../../../utils/models/likes";
import dbConnect from "../../../utils/dbConnect";

dbConnect();

export default async function handler(req, res) {
const { method } = req;
switch (method) {
    case "GET":
    try {
        const like = await Like.find({});
        res.status(200).json({success: true, data: like });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
    }
    break;

    case "POST":
    try {
        const imdbID  = req.body;
        const like = await Like.create({ imdbID });

        res.status(201).json({success:true, data: like});
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
    }
    break;
    }
}

