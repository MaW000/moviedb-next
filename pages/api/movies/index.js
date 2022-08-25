import Movie from "../../../utils/models/movie";
import dbConnect from "../../../utils/dbConnect";

dbConnect();

export default async function handler(req, res) {
const { method } = req;
switch (method) {
    case "GET":
    try {
        const movie = await Movie.find({});
        res.status(200).json({success: true, data: movie });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
    }
    break;

    case "POST":
    try {
        const { Title, Year, Rated, imdbRating, Poster, Plot } = req.body;

        if (!Title && !Year) throw "invalid data";
        const movie = await Movie.create({ Title, Year, Rated, imdbRating, Poster, Plot });

        res.status(201).json({success:true, data: movie});
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
    }
    break;
    }
}