import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartById } from '../features/CartSlice'; // Adjust the import based on your file structure

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const [selectedItems, setSelectedItems] = useState([]);
  const userId = "USER_ID"; // Replace with the actual user ID

  useEffect(() => {
    dispatch(fetchCartById(userId));
  }, [dispatch, userId]);

  const handleSelectItem = (item) => {
    if (selectedItems.includes(item.id)) {
      setSelectedItems(selectedItems.filter(id => id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item.id]);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      if (selectedItems.includes(item.id)) {
        return total + item.price;
      }
      return total;
    }, 0).toFixed(2);
  };

  if (loading) {
    return <p className="text-white">Loading cart...</p>; // Loading state
  }

  if (error) {
    return <p className="text-red-500">{error}</p>; // Error state
  }

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl text-gray-800 mb-4">Your Cart</h2>
      <div className="flex flex-col">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border-b border-gray-300">
              <span className="text-gray-700">{item.productName}</span>
              <span className="text-gray-800">${item.price.toFixed(2)}</span>
              <input 
                type="checkbox" 
                checked={selectedItems.includes(item.id)} 
                onChange={() => handleSelectItem(item)} 
              />
            </div>
          ))
        ) : (
          <p className="text-gray-600">Your cart is empty.</p>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-xl text-gray-800">Total: ${calculateTotal()}</h3>
      </div>
    </div>
  );
};

export default Cart;
