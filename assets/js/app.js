const LIVORA = {
  phoneLocal: "0717227327",
  phoneIntl: "94717227327",
  whatsappBase: "https://wa.me/94717227327",
  cartKey: "livora_cart_v1",
};

function formatLKR(value){
  try {
    return "LKR " + Number(value).toLocaleString("en-LK");
  } catch {
    return "LKR " + value;
  }
}

function $(sel, root=document){ return root.querySelector(sel); }
function $all(sel, root=document){ return [...root.querySelectorAll(sel)]; }

async function loadProducts(){
  const res = await fetch("products/products.json");
  if(!res.ok) throw new Error("Failed to load products.json");
  return await res.json();
}

function getCart(){
  try {
    return JSON.parse(localStorage.getItem(LIVORA.cartKey) || "[]");
  } catch {
    return [];
  }
}
function saveCart(cart){
  localStorage.setItem(LIVORA.cartKey, JSON.stringify(cart));
  updateCartBadge();
}
function updateCartBadge(){
  const cart = getCart();
  const count = cart.reduce((a,i)=>a+(i.qty||1),0);
  $all("[data-cart-count]").forEach(el=>el.textContent = String(count));
}

function addToCart(item){
  const cart = getCart();
  const key = `${item.id}|${item.size}|${item.color}`;
  const existing = cart.find(x => x.key === key);
  if(existing){
    existing.qty += item.qty || 1;
  } else {
    cart.push({
      key,
      id: item.id,
      name: item.name,
      priceLKR: item.priceLKR,
      size: item.size,
      color: item.color,
      qty: item.qty || 1,
      image: item.image || ""
    });
  }
  saveCart(cart);
}

function removeFromCart(key){
  const cart = getCart().filter(x => x.key !== key);
  saveCart(cart);
}

function cartTotal(cart){
  return cart.reduce((sum,i)=>sum + (Number(i.priceLKR)||0) * (Number(i.qty)||1), 0);
}

function buildWhatsAppOrderMessage(cart, customer){
  const lines = [];
  lines.push("Hi Livora Furniture, I’d like to place an order.");
  lines.push("");
  lines.push("Items:");
  cart.forEach((i, idx)=>{
    const line = `${idx+1}) ${i.name} | Size: ${i.size} | Color: ${i.color} | Qty: ${i.qty} — ${formatLKR(i.priceLKR)}`;
    lines.push(line);
  });
  lines.push("");
  lines.push("Total: " + formatLKR(cartTotal(cart)));
  lines.push("");
  lines.push("Customer Details:");
  lines.push("Name: " + (customer.name || ""));
  lines.push("City: " + (customer.city || ""));
  lines.push("Address: " + (customer.address || ""));
  if(customer.note) lines.push("Note: " + customer.note);
  lines.push("");
  lines.push("Please confirm availability and delivery time. Thank you.");
  return encodeURIComponent(lines.join("\n"));
}

function openWhatsAppMessage(encodedMsg){
  const url = `${LIVORA.whatsappBase}?text=${encodedMsg}`;
  window.open(url, "_blank");
}

function setActiveNav(){
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  $all(".nav-links a").forEach(a=>{
    const href = (a.getAttribute("href")||"").toLowerCase();
    if(href === path) a.classList.add("active");
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  updateCartBadge();
  setActiveNav();
});