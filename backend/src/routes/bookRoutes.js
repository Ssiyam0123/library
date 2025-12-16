import express from "express";
import Book from "../models/book.js";
import cloudinary from "../utils/cloudinary.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

//get all books
router.get("/", async (req, res) => {
  try {
    const page = req?.query.page || 1;
    const limit = req?.query.limit || 5;
    const skip = (page - 1) * limit;

    const books = await Book.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username profileImage");

      const totalBooks = await Book.countDocuments();

    res.send({
      books,
      currentPage : page,
      totalBooks,
      totalPages : Math.ceil(totalBooks/limit),
    })
  } catch (error) {
    console.log("error while fetching books", error);
  }
});

//get single book
router.get("/:id", async (req, res) => {
  try {
    const { id } = req?.params;
    const book = await Book.findById({ _id: new ObjectId(id) });
    if (!book) {
      res.status().json({ message: "book not found" });
    }

    res.status(200).json({ book }, { message: "book fetched successfully" });
  } catch (error) {
    res.status(400).json({ error: error });
    console.log("error while fetching single book", error);
  }
});

//post single book
router.post("/", protect, async (req, res) => {
  try {
    const { title, caption, rating, image } = req?.body;

    if ((!title || !caption || !rating || !image)) {
      return res.status(400).json({ message: "please previde all fields." });
    }

    const uploadRes = await cloudinary.uploader.upload(image);
    const imageUrl = uploadRes.secure_url;

    const newBook = new Book({
      title,
      caption,
      rating,
      image: imageUrl,
      user: req?.user?._id,
    });
    await newBook.save();

    res.status(201).json(newBook);
  } catch (error) {
    console.log("error while creating book");
  }
});

export default router;
