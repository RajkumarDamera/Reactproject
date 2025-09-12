import { configureStore, createSlice } from "@reduxjs/toolkit";
// -------------------- Load from localStorage --------------------
const loadFromStorage = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (e) {
    return fallback;
  }
};

// -------------------- Auth Slice --------------------
const authSlice = createSlice({
  name: "auth",
  initialState: loadFromStorage("auth", { user: null, users: [] }),
  reducers: {
    signup: (state, action) => {
      const { username, email, password } = action.payload;
      const exists = state.users.find(
        (u) => u.username === username || u.email === email
      );
      if (!exists) {
        state.users.push({ username, email, password });
        state.user = { username, email }; // auto login
      }
    },
    login: (state, action) => {
      const { username, password } = action.payload;
      const user = state.users.find(
        (u) => u.username === username && u.password === password
      );
      state.user = user ? { username: user.username, email: user.email } : null;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { signup, login, logout } = authSlice.actions;

// -------------------- Products Slice --------------------
const Productslice = createSlice({
  name: "Products",
  initialState: {
    Veg: [
      {
        id: 1001,
        name: "Tomato",
        price: 140,
        Imageurl: "imaes/picks/tomato.jpg",
        Discription: "This product is directly organized by farmers",
      },

      {
        id: 1003,
        name: "Cauliflower",
        price: 280,
        Imageurl: "imaes/picks/Cauliflower (1).jpg",
        Discription: "This product is directly organized by farmers",
      },
      {
        id: 1004,
        name: "Potato",
        price: 335,
        Imageurl: "imaes\/picks/Potato.jpg",
        Discription: "Freshly harvested potatoes directly from farms",
      },
      {
        id: 1005,
        name: "Onion",
        price: 450,
        Imageurl: "imaes/picks/onion5.jpg",
        Discription: "Farm fresh onions with natural flavor",
      },
      {
        id: 1006,
        name: "Carrot",
        price: 60,
        Imageurl: "imaes/picks/carrots.jpg",
        Discription: "Fresh organic carrots from local farmers",
      },
      {
        id: 1007,
        name: "Cabbage",
        price: 55,
        Imageurl: "imaes/picks/cabbage (1).jpg",
        Discription: "Crisp and fresh cabbage straight from the field",
      },
      {
        id: 1009,
        name: "Lady Finger",
        price: 65,
        Imageurl: "imaes/picks/Ladiesfinger (1).jpg",
        Discription: "Tender lady finger sourced directly from farmers",
      },
      {
        id: 1011,
        name: "Bottle Gourd",
        price: 45,
        Imageurl: "imaes/picks/bottlegourd (1).jpg",
        Discription: "Fresh bottle gourd with natural taste",
      },
      {
        id: 1014,
        name: "Beans",
        price: 75,
        Imageurl: "imaes/picks/Beans.jpg.jpg",
        Discription: "Farm fresh beans rich in fiber",
      },
     
      {
        id: 1018,
        name: "Beetroot",
        price: 60,
        Imageurl: "imaes/picks/Beetroot.jpg",
        Discription: "Farm fresh beetroot full of nutrients",
      },
  
     
    ],

    Nonveg: [
  { id: 2002, name: "Chicken Drumsticks", price: 1, Imageurl: "imaes/picks/chiken.jpg", Discription: "Juicy chicken drumsticks perfect for grilling" },
  { id: 2004, name: "Chicken Wings", price: 180, Imageurl: "imaes/picks/Chicken Wings.webp", Discription: "Tender chicken wings for snacks and meals" },
  { id: 2005, name: "Fish Fillet", price: 300, Imageurl: "imaes/picks/Fish Fillet.webp", Discription: "Fresh fish fillet perfect for frying or grilling" },
  { id: 2008, name: "Mutton Leg", price: 200, Imageurl: "imaes/picks/Mutton Leg.webp", Discription: "Fresh mutton leg, ideal for roasting or curries" },
  { id: 2010, name: "Eggs (12 pcs)", price: 70, Imageurl: "imaes/picks/Eggs (12 pcs).webp", Discription: "Fresh farm eggs, 12 pieces per pack" },
  { id: 2011, name: "Shrimp", price: 450, Imageurl: "imaes/picks/Shrimp.webp", Discription: "Fresh and juicy shrimp for cooking" },
  { id: 2013, name: "Lobster", price: 150, Imageurl: "imaes/picks/Lobster.avif", Discription: "Premium live lobster for gourmet meals" },
  { id: 2016, name: "Goat Meat", price: 95, Imageurl: "imaes/picks/Goat Meat.webp", Discription: "Fresh goat meat, perfect for curries" },
  { id: 2017, name: "Crab Claws", price: 70, Imageurl: "imaes/picks/Crab Claws.webp", Discription: "Premium crab claws, fresh and tasty" },
  { id: 2018, name: "Prawns Large", price: 500, Imageurl: "imaes/picks/Prawns Large.webp", Discription: "Large prawns, perfect for grilling or curries" },

],
  
   Fastfood: [
  { id: 3001, name: "Cheese Burger", price: 99, Imageurl: "imaes/picks/Cheese Burger.webp", Discription: "Delicious cheesy burger with fresh veggies" },
  { id: 3002, name: "Veggie Burger", price: 89, Imageurl: "imaes/picks/Veggie Burger.webp", Discription: "Healthy veggie burger with fresh ingredients" },
  { id: 3004, name: "Pizza Margherita", price: 199, Imageurl: "imaes/picks/thinly-sliced-pepperoni-is-popular-pizza-topping-american-style-pizzerias-isolated-white-background-still-life.jpg", Discription: "Classic Italian pizza with cheese and tomato" },
  { id: 3005, name: "Hawaiian Pizza", price: 250, Imageurl: "imaes/picks/hawaiian-pizza.jpg", Discription: "Tasty pepperoni pizza with extra cheese" },
  { id: 3009, name: "Cheese Fries", price: 80, Imageurl: "imaes/picks/french-fries.jpg", Discription: "French fries topped with melted cheese" },
  { id: 3013, name: "Grilled Sandwich", price: 110, Imageurl: "imaes/picks/salmon-wrap-sandwich-roll-with-cheese-vegetables-isolated-white-background.jpg", Discription: "Toasted sandwich with veggies and cheese" },
  { id: 3015, name: "Panner Wrap", price: 100, Imageurl: "imaes/picks/sandwich.jpg", Discription: "Classic hot dog with ketchup and mustard" },
  { id: 3018, name: "Falafel Wrap", price: 140, Imageurl: "imaes/picks/tortilla-wrap-with-falafel-vegetables-isolated-white-background.jpg", Discription: "Crispy falafel with fresh vegetables in wrap" },
  { id: 3019, name: "Mozzarella Sticks", price: 120, Imageurl: "imaes/picks/breaded-torpedo-shrimps-isolated-white-background.jpg", Discription: "Crispy fried mozzarella sticks with dipping sauce" },
  { id: 3020, name: "Chicken Tikka Roll", price: 150, Imageurl: "imaes/picks/delicious-rolled-dessert.jpg", Discription: "Spicy chicken tikka wrapped in a soft roll" }
],

   Perfumes: [
  { id: 4001, name: "Axe Perfume", price: 150, Imageurl: "imaes/picks/Axe Perfume.avif", Discription: "Long-lasting fragrance for men" },
  { id: 4002, name: "Dior Perfume", price: 500, Imageurl: "imaes/picks/Dior Perfume.avif", Discription: "Premium imported fragrance" },
  { id: 4003, name: "Chanel No.5", price: 200, Imageurl: "imaes/picks/Chanel No.5.avif", Discription: "Classic perfume for women" },
  { id: 4004, name: "Calvin Klein CK One", price: 250, Imageurl: "imaes/picks/Calvin Klein CK One.avif", Discription: "Unisex fragrance with fresh scent" },
  { id: 4005, name: "Hugo Boss", price: 350, Imageurl: "imaes/picks/Hugo Boss.avif", Discription: "Elegant fragrance for men" },
  { id: 4006, name: "Versace Eros", price: 450, Imageurl: "imaes/picks/Versace Eros.avif", Discription: "Powerful and seductive aroma" },
  { id: 4007, name: "Paco Rabanne 1 Million", price: 500, Imageurl: "imaes/picks/Paco Rabanne.avif", Discription: "Luxury men’s fragrance" },
  { id: 4008, name: "Gucci Bloom", price: 100, Imageurl: "imaes/picks/Gucci Bloom.avif", Discription: "Floral fragrance for women" },
  { id: 4009, name: "Dolce & Gabbana Light Blue", price: 400, Imageurl: "imaes/picks/Dolce & Gabbana Light Blue.avif", Discription: "Fresh citrus fragrance for women" },
  { id: 4010, name: "Armani Code", price: 500, Imageurl: "imaes/picks/Armani Code.webp", Discription: "Intense and sophisticated men’s perfume" },
  ],

    Medicen: [
  { id: 5001, name: "Paracetamol", price: 30, Imageurl: "imaes/picks/Paracetamol.avif", Discription: "Used for fever and pain relief" },
  { id: 5002, name: "Amoxicillin", price: 120, Imageurl: "imaes/picks/Amoxicillin.avif", Discription: "Antibiotic for infections" },
  { id: 5003, name: "Ibuprofen", price: 50, Imageurl: "imaes/picks/Ibuprofen.avif", Discription: "Pain reliever and anti-inflammatory" },
  { id: 5004, name: "Cough Syrup", price: 80, Imageurl: "imaes/picks/Cough Syrup.webp", Discription: "Relieves cough and cold symptoms" },
  { id: 5005, name: "Vitamin C Tablets", price: 60, Imageurl: "imaes/picks/Vitamin C Tablets.avif", Discription: "Boosts immunity" },
  { id: 5006, name: "Multivitamins", price: 150, Imageurl: "imaes/picks/Multivitamins.avif", Discription: "Daily essential vitamins" },
  { id: 5007, name: "Antacid Tablets", price: 40, Imageurl: "imaes/picks/Antacid Tablets.avif", Discription: "Relieves acidity and heartburn" },
  { id: 5008, name: "Metformin", price: 100, Imageurl: "imaes/picks/Metformin.avif", Discription: "Used for controlling blood sugar" },
  { id: 5009, name: "Insulin", price: 400, Imageurl: "imaes/picks/Insulin.avif", Discription: "For diabetic patients" },
  { id: 5010, name: "Aspirin", price: 35, Imageurl: "imaes/picks/Aspirin.avif", Discription: "Used for pain relief and blood thinning" },
    ],
Milk: [
  { id: 6001, name: "Amul Milk", price: 50, Imageurl: "imaes/picks/Amul Milk.avif", Discription: "Fresh cow milk packed hygienically" },
  { id: 6002, name: "Nandini Milk", price: 445, Imageurl: "imaes/picks/Nandini Milk.avif", Discription: "Popular Karnataka brand fresh milk" },
  { id: 6003, name: "Britannia Milk", price: 228, Imageurl: "imaes/picks/Britannia Milk.avif", Discription: "Rich and fresh milk for daily use" },
  { id: 6004, name: "Mother Dairy Milk", price: 350, Imageurl: "imaes/picks/Mother Dairy Milk.avif", Discription: "Farm fresh cow milk" },
  { id: 6005, name: "Himalaya Milk", price: 155, Imageurl: "imaes/picks/Himalaya Milk.avif", Discription: "Pure and healthy milk" },
],
  },
  reducers: {},
});

// -------------------- Cart Slice --------------------
const cartSlice = createSlice({
  name: "cart",
  initialState: loadFromStorage("cart", []),
  reducers: {
    addToCart: (state, action) => {
      const item = state.find((i) => i.id === action.payload.id);
      if (item) item.quantity += 1;
      else state.push({ ...action.payload, quantity: 1 });
    },
    removeFromCart: (state, action) => state.filter((i) => i.id !== action.payload),
    increaseQuantity: (state, action) => {
      const item = state.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    clearCart: () => [],
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;

// -------------------- Wishlist Slice --------------------
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: loadFromStorage("wishlist", []),
  reducers: {
    addToWishlist: (state, action) => {
      if (!state.find((i) => i.id === action.payload.id)) state.push(action.payload);
    },
    removeFromWishlist: (state, action) => state.filter((i) => i.id !== action.payload),
    clearWishlist: () => [],
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

// -------------------- Orders Slice --------------------
const ordersSlice = createSlice({
  name: "orders",
  initialState: loadFromStorage("orders", []),
  reducers: {
    placeOrder: (state, action) => {
      state.push({
        orderId: Date.now(),
        items: action.payload.items,
        total: action.payload.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        email: action.payload.email,
        date: new Date().toISOString(),
      });
    },
    clearOrders: () => [],
  },
});

export const { placeOrder, clearOrders } = ordersSlice.actions;

// -------------------- Store --------------------
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    Products: Productslice.reducer,
    cart: cartSlice.reducer,
    wishlist: wishlistSlice.reducer,
    orders: ordersSlice.reducer,
  },
});

// -------------------- Persist Data --------------------
store.subscribe(() => {
  localStorage.setItem("auth", JSON.stringify(store.getState().auth));
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
  localStorage.setItem("wishlist", JSON.stringify(store.getState().wishlist));
  localStorage.setItem("orders", JSON.stringify(store.getState().orders));
});

export default store;