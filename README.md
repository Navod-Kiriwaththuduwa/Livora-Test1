# Livora Furniture — Static Website (GitHub Pages)

This is a simple static website (HTML/CSS/JS) for **Livora Furniture**.

## Features
- Luxury classic design theme (ivory / navy / gold)
- Product catalog from `products/products.json`
- Product detail page (sizes, colors, stock)
- Cart (stored in browser localStorage)
- Checkout sends order via WhatsApp (no online payment)
- Call button and WhatsApp buttons throughout

## Run locally
Some browsers restrict `fetch()` when opening files directly.
Use a simple local server:

### Windows (Python 3)
```bash
python -m http.server 8000
```

Open:
`http://localhost:8000`

## Deploy to GitHub Pages
1. Create a GitHub repo (e.g., `livora-furniture-site`)
2. Upload all files in this folder to the repo root
3. GitHub → **Settings → Pages**
4. Source: **Deploy from a branch**
5. Branch: `main` / root
6. Save — GitHub will show your site URL

## Edit products
Edit `products/products.json`:
- `priceLKR` is a number
- `stockStatus`: `in_stock`, `low_stock`, `out_of_stock`, `pre_order`
- Put images in `products/images/` and update `images` paths

## Contact
WhatsApp / Call: 0717227327
Email: furniturelivora@gmail.com
