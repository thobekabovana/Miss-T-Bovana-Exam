import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { submitProduct } from "../features/AddproductSlice";

export default function ProductForm() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.product);

  const handleImageChange = async (productId, images)  => {
    const uploadPromises = images.map(async (image) => {
        const storageRef = firebase.storage().ref(); // Assuming you've initialized firebase storage
        const fileRef = storageRef.child(`images/${productId}/${image.name}`);
        await fileRef.put(image); // Upload the image file
        const url = await fileRef.getDownloadURL(); // Get the URL after upload
        return url;
    });
    const urls = await Promise.all(uploadPromises);

    await admin.firestore().collection('AddProducts').doc(productId).update({
        images: urls, // Store the image URLs in Firestore
    });

    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length < 3) {
      alert("Please upload at least three images.");
      return;
    }
    setImages(selectedFiles);
  };

  // In your product submission function



  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productName || !price || !productDescription || images.length < 3) {
      alert("Please fill in all fields and upload at least 3 images");
      return;
    }

    dispatch(
      submitProduct(
        {
          productName,
          productDescription,
          price,
          userId: "someUserId", // Replace with actual userId
        },
        images
      )
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl text-white text-center mb-6">Add a Product</h2>

        <div className="mb-4">
          <label className="block text-white mb-2">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-gray-600"
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white mb-2">Product Description</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-gray-600"
            placeholder="Enter product description"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-white mb-2">Price ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-gray-600"
            placeholder="Enter price"
            min="0"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white mb-2">Product Images (3 or more)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-gray-400 bg-gray-700 p-2 rounded focus:outline-none"
            required
          />
          {images.length > 0 && images.length < 3 && (
            <p className="text-red-500 mt-2">Please select at least 3 images.</p>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-gray-600 text-white py-2 px-6 rounded hover:bg-gray-500 focus:outline-none"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Product"}
          </button>

        </div>

        <p className="text-gray-400 text-center">
                     To Go To your Products <Link to="/productList" className="text-white hover:underline">Click here</Link>
                </p>
      </form>
    </div>
  );
}
