const {useState,useEffect,useMemo}=React,h=React.createElement;
const money=n=>"₹"+n.toLocaleString("en-IN");
function load(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}}
function useStore(k,d){const [v,s]=useState(()=>load(k,d));useEffect(()=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},[v]);return [v,s]}
const T=["S","M","L","XL"],J=["30","32","34","36"],F=["7","8","9","10"];
const sizesOf=c=>c==="Footwear"?F:(c==="Jeans"||c==="Trousers")?J:T;
const lbl=(c,s)=>c==="Footwear"?"UK "+s:c==="Jeans"||c==="Trousers"?"Waist "+s:s;
const CATS=["Shirts","T-Shirts","Jeans","Trousers","Footwear"];
const PROD=[
[1,"Oxford Button-Down","Shirts",1499,1999,"#6c8ebf","Washed cotton oxford with a soft collar."],
[2,"Linen Casual Shirt","Shirts",1699,2299,"#d9cbb0","Breathable linen for hot Hyderabad afternoons."],
[3,"Checked Flannel Shirt","Shirts",1599,2199,"#9b3d3d","Brushed cotton that gets softer with every wash."],
[4,"Mandarin Collar Shirt","Shirts",1399,1899,"#2f4a3a","Clean collarless neckline for festive evenings."],
[5,"Heavy Cotton Tee","T-Shirts",699,999,"#f2f2f2","240 GSM cotton that holds its shape."],
[6,"Striped Crew Tee","T-Shirts",799,1099,"#1d2f5c","Navy and white stripes, regular fit."],
[7,"Polo T-Shirt","T-Shirts",899,1299,"#2a6f6a","Piqué polo with a two-button placket."],
[8,"Oversized Graphic Tee","T-Shirts",999,1399,"#e3a72f","Drop-shoulder cut in mustard."],
[9,"Slim Fit Indigo Jeans","Jeans",1799,2499,"#27375f","Dark indigo with a little stretch."],
[10,"Straight Fit Stone Jeans","Jeans",1899,2599,"#8aa0bd","Stone wash, straight from hip to hem."],
[11,"Black Tapered Jeans","Jeans",1999,2699,"#222","Tapered leg that works with sneakers or boots."],
[12,"Relaxed Mid-Blue Jeans","Jeans",1699,2299,"#5b78a6","Roomy through the thigh, easy all day."],
[13,"Chino Trousers","Trousers",1599,2199,"#b9a07a","Khaki stretch chinos for work or weekends."],
[14,"Pleated Formal Trousers","Trousers",1899,2599,"#3b3f4a","Charcoal pleats with a clean break."],
[15,"Olive Cargo Trousers","Trousers",1799,2399,"#6b7048","Six pockets and a tapered ankle."],
[16,"Charcoal Joggers","Trousers",1099,1499,"#4a4d55","Soft fleece with an elastic cuff."],
[17,"White Court Sneakers","Footwear",2499,3499,"#f4f4f4","Leather-look upper, cushioned sole."],
[18,"Brown Leather Loafers","Footwear",2999,3999,"#6b4226","Slip-on loafers with a flexible sole."],
[19,"Canvas Slip-ons","Footwear",1299,1799,"#3c5a7a","Light canvas for everyday errands."],
[20,"Chelsea Boots","Footwear",3499,4699,"#2b2018","Pull-on boots with elastic side panels."]
].map(([id,name,cat,price,mrp,color,desc])=>({id,name,cat,price,mrp,color,desc}));
const D={Shirts:"M30 20L42 14Q50 22 58 14L70 20L84 34L74 44L68 38V84H32V38L26 44L16 34Z","T-Shirts":"M32 20L42 15Q50 22 58 15L68 20L82 32L74 42L68 37V82H32V37L26 42L18 32Z",Jeans:"M30 14H70L74 88H55L50 40L45 88H26Z",Trousers:"M32 14H68L70 88H54L50 36L46 88H30Z",Footwear:"M14 62Q14 50 26 48L38 46Q46 56 58 54L84 56Q90 58 90 68V72H14Z"};
function Art({cat,color}){return h("svg",{viewBox:"0 0 100 100","aria-hidden":"true"},
 h("path",{d:D[cat],fill:color,stroke:"rgba(0,0,0,.25)",strokeWidth:1.2,strokeLinejoin:"round"}),
 cat==="Shirts"?h("path",{d:"M50 22V84",stroke:"rgba(0,0,0,.25)"}):null,
 cat==="Footwear"?h("path",{d:"M14 70H90",stroke:"rgba(0,0,0,.3)",strokeWidth:3}):null)}
function Modal({onClose,side,label,children}){
 useEffect(()=>{const f=e=>e.key==="Escape"&&onClose();addEventListener("keydown",f);return()=>removeEventListener("keydown",f)},[]);
 return h("div",{className:"ov"+(side?" side":""),onMouseDown:e=>e.target===e.currentTarget&&onClose()},
  h("div",{className:"modal",role:"dialog","aria-modal":"true","aria-label":label},
   h("button",{className:"btn ghost x",onClick:onClose,"aria-label":"Close"},"✕"),children))}
function Detail({p,onClose,add,wished,toggle}){
 const [s,setS]=useState(null),[err,setErr]=useState(false);
 return h(Modal,{onClose,label:p.name},h("div",{className:"two"},
  h("div",{className:"tile",style:{borderRadius:10}},h(Art,{cat:p.cat,color:p.color})),
  h("div",null,h("h2",null,p.name),
   h("p",{className:"price"},h("b",null,money(p.price)),h("s",null,money(p.mrp)),h("span",{className:"off"},Math.round(100-p.price*100/p.mrp)+"% off")),
   h("p",null,p.desc),
   h("label",null,p.cat==="Footwear"?"UK size":(p.cat==="Jeans"||p.cat==="Trousers")?"Waist (inches)":"Size"),
   h("div",{className:"sizes",role:"group","aria-label":"Sizes"},sizesOf(p.cat).map(z=>h("button",{key:z,className:"chip","aria-pressed":s===z,onClick:()=>{setS(z);setErr(false)}},z))),
   err?h("p",{className:"err",role:"alert"},"Pick a size to add this to your cart."):null,
   h("div",{className:"sizes"},
    h("button",{className:"btn",onClick:()=>s?(add(p,s),onClose()):setErr(true)},"Add to cart"),
    h("button",{className:"btn ghost","aria-pressed":wished,onClick:()=>toggle(p.id)},wished?"Remove from wishlist":"Save to wishlist")))))}
function Auth({users,setUsers,setUser,onClose,say}){
 const [m,setM]=useState("login"),[f,setF]=useState({name:"",email:"",pw:""}),[err,setErr]=useState("");
 const set=k=>e=>setF({...f,[k]:e.target.value});
 const go=()=>{const email=f.email.trim().toLowerCase();
  if(!/^\S+@\S+\.\S+$/.test(email))return setErr("Enter a valid email address.");
  if(f.pw.length<6)return setErr("Password needs at least 6 characters.");
  let name;
  if(m==="signup"){name=f.name.trim();if(!name)return setErr("Enter your name.");if(users[email])return setErr("This email already has an account. Log in instead.");setUsers({...users,[email]:{name,pw:f.pw}})}
  else{const u=users[email];if(!u||u.pw!==f.pw)return setErr("Email or password is incorrect.");name=u.name}
  setUser({email,name});say("Welcome, "+name);onClose()};
 return h(Modal,{onClose,label:"Account"},h("h2",null,m==="login"?"Log in":"Create account"),
  m==="signup"?h("div",null,h("label",{htmlFor:"an"},"Name"),h("input",{id:"an",value:f.name,onChange:set("name")})):null,
  h("label",{htmlFor:"ae"},"Email"),h("input",{id:"ae",type:"email",value:f.email,onChange:set("email")}),
  h("label",{htmlFor:"ap"},"Password"),h("input",{id:"ap",type:"password",value:f.pw,onChange:set("pw")}),
  err?h("p",{className:"err",role:"alert"},err):null,
  h("div",{className:"sizes"},h("button",{className:"btn",onClick:go},m==="login"?"Log in":"Create account"),
   h("button",{className:"btn ghost",onClick:()=>{setM(m==="login"?"signup":"login");setErr("")}},m==="login"?"New here? Create account":"Have an account? Log in")))}
function Checkout({total,onClose,place}){
 const [f,setF]=useState({name:"",phone:"",addr:"",pin:"",pay:"Cash on delivery"}),[err,setErr]=useState("");
 const set=k=>e=>setF({...f,[k]:e.target.value});
 const submit=()=>{
  if(!f.name.trim()||!f.addr.trim())return setErr("Enter your name and full address.");
  if(!/^\d{10}$/.test(f.phone))return setErr("Enter a 10-digit mobile number.");
  if(!/^\d{6}$/.test(f.pin))return setErr("Enter a 6-digit pincode.");
  place(f.name.trim()+", "+f.addr.trim()+" – "+f.pin+", "+f.pay)};
 const fld=(l,k,p)=>h("div",{key:k},h("label",{htmlFor:"c"+k},l),h("input",{id:"c"+k,value:f[k],onChange:set(k),style:{width:"100%"},...p}));
 return h(Modal,{onClose,label:"Checkout"},h("h2",null,"Delivery details"),
  fld("Full name","name"),fld("Mobile number","phone",{inputMode:"numeric",maxLength:10}),fld("Address","addr"),fld("Pincode","pin",{inputMode:"numeric",maxLength:6}),
  h("label",{htmlFor:"cpay"},"Payment"),
  h("select",{id:"cpay",value:f.pay,onChange:set("pay")},h("option",null,"Cash on delivery"),h("option",null,"UPI on delivery")),
  err?h("p",{className:"err",role:"alert"},err):null,
  h("div",{className:"sizes"},h("button",{className:"btn",onClick:submit},"Place order · "+money(total))))}
function App(){
 const [cart,setCart]=useStore("ryw_cart",[]),[wish,setWish]=useStore("ryw_wish",[]),[users,setUsers]=useStore("ryw_users",{}),[user,setUser]=useStore("ryw_user",null),[orders,setOrders]=useStore("ryw_orders",[]);
 const [q,setQ]=useState(""),[cat,setCat]=useState("All"),[sort,setSort]=useState("new"),[onlyWish,setOnlyWish]=useState(false);
 const [view,setView]=useState("shop"),[item,setItem]=useState(null),[drawer,setDrawer]=useState(false),[auth,setAuth]=useState(false),[checkout,setCheckout]=useState(false),[toast,setToast]=useState("");
 const say=m=>{setToast(m);setTimeout(()=>setToast(""),2200)};
 const list=useMemo(()=>{
  let l=PROD.filter(p=>(cat==="All"||p.cat===cat)&&p.name.toLowerCase().includes(q.trim().toLowerCase())&&(!onlyWish||wish.includes(p.id)));
  if(sort==="lo")l=[...l].sort((a,b)=>a.price-b.price);
  if(sort==="hi")l=[...l].sort((a,b)=>b.price-a.price);
  return l},[q,cat,sort,onlyWish,wish]);
 const lines=cart.map(c=>({...c,p:PROD.find(p=>p.id===c.id)})).filter(l=>l.p);
 const sub=lines.reduce((s,l)=>s+l.p.price*l.qty,0),ship=sub===0||sub>=1999?0:99,total=sub+ship,count=lines.reduce((s,l)=>s+l.qty,0);
 const add=(p,size)=>{setCart(c=>{const i=c.findIndex(x=>x.id===p.id&&x.size===size);return i<0?[...c,{id:p.id,size,qty:1}]:c.map((x,j)=>j===i?{...x,qty:x.qty+1}:x)});say("Added to cart")};
 const qty=(i,d)=>setCart(c=>c.map((x,j)=>j===i?{...x,qty:x.qty+d}:x).filter(x=>x.qty>0));
 const toggle=id=>setWish(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);
 const place=a=>{const o={id:"RYW"+Date.now().toString().slice(-8),date:new Date().toLocaleDateString("en-IN"),email:user.email,items:lines.map(l=>({name:l.p.name,size:lbl(l.p.cat,l.size),qty:l.qty})),total,addr:a};
  setOrders(os=>[o,...os]);setCart([]);setCheckout(false);setView("orders");say("Order placed")};
 const myOrders=user?orders.filter(o=>o.email===user.email):[];
 const go=()=>{setDrawer(false);user?setCheckout(true):setAuth(true)};
 return h("div",null,
  h("header",{className:"top"},
   h("button",{className:"brand",onClick:()=>setView("shop")},"Rare Your Wear"),
   h("button",{className:"btn ghost",onClick:()=>setView("orders")},"My orders"),
   user?h("button",{className:"btn ghost",onClick:()=>{setUser(null);say("Logged out")}},"Log out ("+user.name.split(" ")[0]+")"):h("button",{className:"btn ghost",onClick:()=>setAuth(true)},"Log in"),
   h("button",{className:"btn",onClick:()=>setDrawer(true)},"Cart ("+count+")")),
  h("main",{className:"wrap"},
   view==="shop"?h("div",null,
    h("section",{className:"hero"},h("h1",null,"Wear it hard. Wear it again."),h("p",null,"Shirts, tees, denim, trousers and shoes made to be worn out, not kept for best.")),
    h("div",{className:"bar"},
     h("input",{type:"search","aria-label":"Search clothes",placeholder:"Search shirts, jeans, boots",value:q,onChange:e=>setQ(e.target.value)}),
     h("select",{"aria-label":"Sort",value:sort,onChange:e=>setSort(e.target.value)},h("option",{value:"new"},"Featured"),h("option",{value:"lo"},"Price: low to high"),h("option",{value:"hi"},"Price: high to low"))),
    h("div",{className:"bar",role:"group","aria-label":"Categories"},
     ["All",...CATS].map(c=>h("button",{key:c,className:"chip","aria-pressed":cat===c,onClick:()=>setCat(c)},c)),
     h("button",{className:"chip","aria-pressed":onlyWish,onClick:()=>setOnlyWish(!onlyWish)},"Wishlist ("+wish.length+")")),
    list.length?h("div",{className:"grid"},list.map(p=>h("article",{className:"card",key:p.id},
     h("button",{className:"tile","aria-label":"View "+p.name,onClick:()=>setItem(p)},h(Art,{cat:p.cat,color:p.color})),
     h("button",{className:"heart","aria-pressed":wish.includes(p.id),"aria-label":"Save "+p.name+" to wishlist",onClick:()=>toggle(p.id)},wish.includes(p.id)?"♥":"♡"),
     h("div",{className:"info"},h("h3",null,p.name),h("div",{className:"mute"},p.cat),
      h("div",{className:"price"},h("b",null,money(p.price)),h("s",null,money(p.mrp)),h("span",{className:"off"},Math.round(100-p.price*100/p.mrp)+"% off")))))):
    h("p",null,onlyWish?"Your wishlist is empty. Tap the heart on any item to save it.":"Nothing matches. Clear the search or pick another category.")
   ):h("div",null,h("h2",null,"My orders"),
    !user?h("p",null,"Log in to see your orders. ",h("button",{className:"btn",onClick:()=>setAuth(true)},"Log in")):
    myOrders.length?myOrders.map(o=>h("div",{className:"card",style:{padding:14,marginBottom:12},key:o.id},
     h("b",null,"Order "+o.id),h("span",{className:"mute"}," · "+o.date),
     o.items.map((it,i)=>h("div",{key:i},it.qty+" × "+it.name+" ("+it.size+")")),
     h("p",null,h("b",null,"Total "+money(o.total))),h("small",{className:"mute"},"Delivering to "+o.addr))):
    h("p",null,"No orders yet. Your first order will show up here."))),
  h("footer",{className:"wrap mute"},h("small",null,"Demo store: accounts, cart and orders are saved in this browser only. Delivery is free on orders of ₹1,999 and above.")),
  item?h(Detail,{p:item,onClose:()=>setItem(null),add,wished:wish.includes(item.id),toggle}):null,
  drawer?h(Modal,{side:1,onClose:()=>setDrawer(false),label:"Cart"},h("h2",null,"Your cart"),
   lines.length?h("div",null,
    lines.map((l,i)=>h("div",{className:"row",key:l.id+l.size},
     h("div",{className:"mini"},h(Art,{cat:l.p.cat,color:l.p.color})),
     h("div",{style:{flex:1}},h("b",null,l.p.name),h("div",{className:"mute"},lbl(l.p.cat,l.size)+" · "+money(l.p.price))),
     h("div",null,h("button",{className:"chip","aria-label":"Remove one",onClick:()=>qty(i,-1)},"−"),h("span",{style:{margin:"0 8px"}},l.qty),h("button",{className:"chip","aria-label":"Add one",onClick:()=>qty(i,1)},"+")))),
    h("p",null,"Subtotal "+money(sub)),h("p",null,"Delivery "+(ship?money(ship):"Free")),h("p",null,h("b",null,"Total "+money(total))),
    h("button",{className:"btn",style:{width:"100%"},onClick:go},user?"Check out":"Log in to check out")):
   h("p",null,"Your cart is empty. Add a shirt or a pair of jeans to start.")):null,
  auth?h(Auth,{users,setUsers,setUser,onClose:()=>setAuth(false),say}):null,
  checkout?h(Checkout,{total,onClose:()=>setCheckout(false),place}):null,
  toast?h("div",{className:"toast",role:"status"},toast):null)}
ReactDOM.createRoot(document.getElementById("root")).render(h(App));
