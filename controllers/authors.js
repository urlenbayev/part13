import express from "express";
const router = express.Router();
import { Blog } from "../models/index.js";
import sequelize from "../utils/db.js";
/**
|--------------------------------------------------
GET http://localhost:3001/api/authors
Get all of the authors ordered by likes and articles
Example data
[
	{
		"author": "trump",
		"articles": "1",
		"likes": "500000"
	},
	{
		"author": "OBAMA",
		"articles": "1",
		"likes": "100000"
	},
	{
		"author": "Klemon",
		"articles": "13",
		"likes": "50"
	},
	{
		"author": "anonymous",
		"articles": "5",
		"likes": "0"
	}
]
|--------------------------------------------------
*/
router.get("/", async (req, res) => {
  const rows = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("id")), "articles"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    group: ["author"],
    order: [
      [sequelize.fn("SUM", sequelize.col("likes")), "DESC"],
      [sequelize.fn("COUNT", sequelize.col("id")), "DESC"],
    ],
  });

  if (rows.length === 0) {
    return res.status(404).json({ error: "Authors do not exist" });
  }
  res.status(200).json(rows);
});

export default router;
