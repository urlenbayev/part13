import express from "express";
import { User, Blog, Reading, Session } from "../models/index.js";
import { userFinder, tokenExtractor } from "../middleware/middleware.js";
import bcrypt from "bcrypt";
const router = express.Router();

/**
|--------------------------------------------------
GET http://localhost:3001/api/users
Get all users
Example data
[
	{
		"id": 14,
		"name": "hillary",
		"username": "potus1990@gmail.com",
		"created_at": "2025-08-12 01:33:28.749 +00:00",
		"updated_at": "2025-08-12 01:35:21.345 +00:00",
    "blogs": 
    [
      {
				"id": 17,
				"author": "anonymous",
				"url": "somerandomlink",
				"title": "Rise flags",
				"likes": 0,
				"user_id": 14,
				"userId": 14
			},
      ...
    ]
	},
  ...
]
|--------------------------------------------------
*/
router.get("/", tokenExtractor, async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["password_hash"] },
    include: {
      model: Blog,
    },
  });

  if (users.length === 0) {
    return res.status(404).json({ error: "Users do not exist" });
  }
  return res.status(200).json(users);
});

/**
|--------------------------------------------------
GET http://localhost:3001/api/users/:id
Get a certain user with their reading lists
Example data
[
  {
	"name": "Muller",
	"username": "potus1970@gmail.com",
	"readings": [
		{
			"id": 10,
			"author": "sadsad",
			"url": "sasaslink",
			"title": "sad",
			"likes": 0,
			"year": null,
			"readinglists": {
				"id": 1,
				"read": false
			}
		}
	]
  },
  ...
]
|--------------------------------------------------
*/
router.get("/:id", tokenExtractor, async (req, res) => {
  const { id } = req.params,
    { read } = req.query,
    query = {
      attributes: ["name", "username"],
      include: [
        {
          model: Blog,
          as: "readings",
          attributes: { exclude: ["user_id", "created_at", "updated_at"] },
          through: {
            model: Reading,
            as: "readinglists",
            attributes: ["id", "read"],
          },
        },
      ],
    };
  if (read) {
    query.include[0].through.where = { read: read };
  }
  const result = await User.findByPk(id, query);
  res.status(200).json(result);
});
/**
|--------------------------------------------------
POST http://localhost:3001/api/users
create a new user
|--------------------------------------------------
*/
router.post("/", async (req, res) => {
  const { name, username, password } = req.body;
  if (!password) {
    return res.status(400).json({ error: "Password is required!" });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = {
    name: name,
    username: username,
    password_hash: passwordHash,
  };
  const addedUser = await User.create(newUser);
  // eslint-disable-next-line no-unused-vars
  const { password_hash, ...result } = addedUser.dataValues;
  return res.status(201).json(result);
});

/**
|--------------------------------------------------
PUT http://localhost:3001/api/users/:username
update user's username
|--------------------------------------------------
*/
router.put("/:username", tokenExtractor, userFinder, async (req, res) => {
  const { username } = req.body;
  //only authorized owner can update username
  if (req.user.id !== req.decodedToken.id) {
    return res.status(403).json({ error: "forbidden" });
  }

  if (!username) {
    return res.status(400).json({ error: "username is required" });
  }

  req.user.username = username;
  await req.user.save();
  return res.status(200).json({ username: req.user.username });
});

export default router;
