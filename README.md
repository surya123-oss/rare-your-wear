# Rare Your Wear – Men's Clothing Store

A responsive men's clothing storefront built with **React 18**, **HTML** and **CSS**. Browse shirts, T-shirts, jeans, trousers and footwear, save favourites, build a cart and place an order.

**Live demo:** https://YOUR-USERNAME.github.io/rare-your-wear/ (after you enable GitHub Pages, see below)

## Features

- Product catalogue with 20 items in 5 categories and discount percentages
- Search, category filters, price sorting and a wishlist filter
- Product detail view with size selection (S–XL, waist sizes, UK shoe sizes)
- Shopping cart with quantity controls, delivery charge (free above ₹1,999) and totals
- Signup and login with form validation
- Checkout form with phone and pincode validation, then order history under "My orders"
- Responsive layout, keyboard-accessible, light and dark mode

## Tech stack

| Layer | Technology |
|-------|------------|
| UI | React 18 (loaded from cdnjs, no build step) |
| Styling | Plain CSS with CSS variables |
| State | React hooks (`useState`, `useEffect`, `useMemo`) |
| Storage | Browser `localStorage` |

## Project structure

```
rare-your-wear/
├── index.html      # page shell and script tags
├── css/style.css   # all styles and theme variables
├── js/app.js       # products, components and app logic
└── README.md
```

## Run locally

No installation needed.

1. Download or clone the repository.
2. Open `index.html` in a browser (internet is needed for React and fonts).

Or serve it with Python: `python -m http.server 8000` and open http://localhost:8000.

## Deploy on GitHub Pages

1. Push this folder to a new GitHub repository named `rare-your-wear`.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. After a minute your site is live at `https://YOUR-USERNAME.github.io/rare-your-wear/`.

## Limitations

This is a front-end demo. Accounts, cart and orders are stored in the browser only, and passwords are not hashed, so do not use real passwords.

## Roadmap

- REST API with Spring Boot or Node.js and Express
- MySQL database: `users`, `products`, `categories`, `orders`, `order_items`
- Password hashing and token-based login
- Admin panel to add and edit products
- Real product images and payment gateway

## Author

V S Surya Teja – [GitHub](https://github.com/surya123-oss) · [LinkedIn](https://linkedin.com/in/surya-teja-vs-2a59b2192)
