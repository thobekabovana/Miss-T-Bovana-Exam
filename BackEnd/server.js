const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const multer = require("multer");
const { getFirestore } = require("firebase-admin/firestore");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Firebase Admin with service account credentials
const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // Replace with your Firebase Storage bucket name
});

const db = getFirestore();
const auth = admin.auth();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configure multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// User Registration Endpoint
app.post("/register", async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const userRecord = await auth.createUser({
            email,
            password,
            displayName: name,
        });

        res.status(201).json({ message: "User registered successfully", user: userRecord });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// User Login Endpoint
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userRecord = await auth.getUserByEmail(email);
        if (userRecord) {
            // For a real application, you would need to verify the password here
            res.status(200).json({ message: "Login successful", user: userRecord });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Add Product Endpoint
app.post("/add-product", upload.array("images", 10), async (req, res) => {
    const { productName, productDescription, price, userId } = req.body;
    const images = req.files; // Access uploaded files

    try {
        // Check if at least 3 images are uploaded
        if (!productName || !productDescription || !price || images.length < 3) {
            return res.status(400).json({ error: "All fields are required, including at least 3 images." });
        }

        // Upload images to Firebase Storage and get URLs
        const imageUrls = [];
        for (const image of images) {
            const fileName = `${Date.now()}-${image.originalname}`;
            const blob = admin.storage().bucket().file(`products/${fileName}`);

            await blob.save(image.buffer, {
                metadata: { contentType: image.mimetype },
                public: true,
            });

            // Add URL to imageUrls array
            const imageUrl = `https://storage.googleapis.com/${process.env.FIREBASE_STORAGE_BUCKET}/products/${fileName}`;
            imageUrls.push(imageUrl);
        }

        // Save product data to Firestore
        await db.collection("AddProduct").add({
            productName,
            productDescription,
            price,
            userId,
            images: imageUrls,
        });

        res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
        console.error("Error adding product:", error.message);
        res.status(500).json({ error: "Failed to add product: " + error.message });
    }
});

// Fetch Products Endpoint
app.get("/products", async (req, res) => {
    try {
        // Fetch products from Firestore
        const snapshot = await db.collection("AddProduct").get();
        const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

// Add Product to Cart Endpoint
app.post("/add-to-cart", async (req, res) => {
    const { userId, productId } = req.body;

    try {
        // Retrieve the product from the 'AddProduct' collection
        const productDoc = await db.collection("AddProduct").doc(productId).get();

        if (!productDoc.exists) {
            return res.status(404).json({ error: "Product not found" });
        }

        const product = { id: productDoc.id, ...productDoc.data() };

        // Check if the user's cart already exists; if not, create it
        const cartRef = db.collection("carts").doc(userId);
        const cartDoc = await cartRef.get();
        
        if (!cartDoc.exists) {
            // Create a new cart for the user
            await cartRef.set({ products: [product] });
        } else {
            // Update the existing cart
            await cartRef.update({
                products: admin.firestore.FieldValue.arrayUnion(product),
            });
        }

        res.status(201).json({ message: "Product added to cart successfully", product });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ error: "Failed to add product to cart: " + error.message });
    }
});

// Fetch Cart by User ID Endpoint
app.get("/cart/:userId", async (req, res) => {
    const userId = req.params.userId;

    try {
        const cartRef = db.collection("carts").doc(userId);
        const cartDoc = await cartRef.get();
        if (!cartDoc.exists) {
            return res.status(404).send({ message: 'Cart not found' });
        }
        res.status(200).send(cartDoc.data());
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
