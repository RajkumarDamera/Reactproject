import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "./store";
import { addToCart } from "./store";

function Wishlist() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist || []);

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleMoveToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item.id));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1029/1029183.png"
          alt="Empty Wishlist"
          className="w-32 h-32 mb-4 opacity-80"
        />
        <h2 className="text-xl font-semibold text-gray-600">
          Your wishlist is empty!
        </h2>
        <p className="text-gray-400 mt-2">Start adding your favorite items ✨</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold text-pink-600 mb-8 text-center">
        💖 My Wishlist
      </h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2 p-4 flex flex-col border border-gray-100"
          >
            {/* Product Image */}
            <div className="overflow-hidden rounded-xl">
              <img
                src={item.image || item.Imageurl}
                alt={item.name}
                className="w-full h-60 object-cover rounded-xl transition-transform duration-300 hover:scale-110"
              />
            </div>

            {/* Product Details */}
            <div className="mt-4 flex-1">
              <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
              {item.description && (
                <p className="text-gray-500 text-sm mt-1">{item.description}</p>
              )}
              <p className="text-green-600 font-extrabold mt-3 text-lg">
                ₹{item.price}
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => handleMoveToCart(item)}
              >
                Move to Cart 🛒
              </button>
              <button
                onClick={() => handleRemove(item.id)}
              >
                Remove ❌
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
