const admin = require('firebase-admin');
const db = admin.firestore();
const bucket = admin.storage().bucket();

// Fetch all products
exports.getAllProducts = async (req, res) => {
  try {
    const snapshot = await db.collection('products').get();
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('products').doc(id).delete();
    res.status(200).json({ message: 'Product deleted', productId: id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, productDescription, price } = req.body;

    // Upload images to Firebase Storage and get their URLs
    const imageUrls = [];
    if (req.files) {
      for (const file of req.files) {
        const blob = bucket.file(`products/${Date.now()}_${file.originalname}`);
        const blobStream = blob.createWriteStream({
          metadata: { contentType: file.mimetype },
        });

        await new Promise((resolve, reject) => {
          blobStream.on('finish', async () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            imageUrls.push(publicUrl);
            resolve();
          });
          blobStream.on('error', (error) => reject(error));
          blobStream.end(file.buffer);
        });
      }
    }

    // Update product details in Firestore
    const productData = { productName, productDescription, price, images: imageUrls };
    await db.collection('products').doc(id).update(productData);

    res.status(200).json({ id, ...productData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
