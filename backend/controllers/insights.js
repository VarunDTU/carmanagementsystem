import Insight from "../models/insight.js";
export async function getInsights(req,res) {
    try {
        const {car_id} = req.params;
        const insights = await Insight.find({car_id});
        if(!insights) return res.status(404).json({message: "Insights not found"});
        
        res.status(200).json(insights);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
