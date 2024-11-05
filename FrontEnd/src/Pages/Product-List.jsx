import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct, updateProduct, addToCart } from '../features/ProductListSlice'; // Adjust import based on your file structure

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error, successMessage } = useSelector((state) => state.products);
  const [editProduct, setEditProduct] = useState(null);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      alert(successMessage);
      dispatch({ type: 'products/resetSuccessMessage' });
    }
  }, [successMessage, dispatch]);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productDescription", productDescription);
    formData.append("price", price);
    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(updateProduct({ productId: editProduct, productData: formData }));
    setEditProduct(null);
    dispatch(fetchProducts());
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleEditChange = (product) => {
    setEditProduct(product.id);
    setProductName(product.productName);
    setProductDescription(product.productDescription);
    setPrice(product.price);
    setImages([]);
  };

  const handleAddToCart = (productId) => {
    const userId = "USER_ID"; // Replace with actual user ID
    dispatch(addToCart({ userId, productId }));
  };

  if (loading) {
    return <p className="text-black">Loading products...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl text-black mb-4">Product List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {products.map((product) => (
          <div key={product.id} className="bg-grey-400 p-4 rounded-lg shadow-md flex flex-col">
            {product.images && product.images.length > 0 && (
              <div className="relative mb-4">
                <img
                  src={product.images[0]}
                  alt={`Product image`}
                  className="w-full h-40 object-cover rounded"
                />
                {/* Add more images for swipe functionality here (if implementing carousel) */}
              </div>
            )}
            <h3 className="text-2xl text-black">{product.productName}</h3>
            <p className="text-gray-600">{product.productDescription}</p>
            <p className="text-green-600 font-bold">Price: ${product.price}</p>
            <div className="mt-4 flex flex-col space-y-2">
              <button 
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition" 
                onClick={() => handleDelete(product.id)}>Delete</button>
              <button 
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition" 
                onClick={() => handleEditChange(product)}>Update</button>
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition" 
                onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      {editProduct && (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
          <form 
            onSubmit={handleUpdate}
            className="bg-gray-300 p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl text-black text-center mb-6">Update Product</h2>

            <div className="mb-4">
              <label className="block text-black mb-2">Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full p-2 rounded bg-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring focus:ring-gray-400"
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-black mb-2">Product Description</label>
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="w-full p-2 rounded bg-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring focus:ring-gray-400"
                placeholder="Enter product description"
                rows="4"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-black mb-2">Price ($)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 rounded bg-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring focus:ring-gray-400"
                placeholder="Enter price"
                min="0"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-black mb-2">Product Images (3 or more)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-gray-400 bg-gray-200 p-2 rounded focus:outline-none"
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
              >
                {loading ? "Submitting..." : "Update Product"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductList;
