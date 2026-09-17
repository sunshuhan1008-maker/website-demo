const money = new Intl.NumberFormat("zh-CN", { style: "currency", currency: "CNY", maximumFractionDigits: 0 });

const auctionProducts = [
  { id: "GE-243-001", title: "1999 Pokemon Base Set Shadowless Missing Attack Error Holo Ninetales #12", short: "1999 Pokemon Base Set Shadowless Ninetales #12", sport: "宝可梦（英文）", series: "Pokemon Base Set Shadowless", grade: "PSA 9", cert: "136633117", type: "竞拍", price: 4520, current: 4520, bids: 14, ends: "04天 17时", seller: "Daisuki Collection", stock: "托管仓", watchers: 48, favorite: true, image: "./assets/fanatics-01.jpg", population: "PSA 同级存世量 8 · 暂无更高评分" },
  { id: "GE-243-002", title: "2009 Pokemon Platinum Holo Palkia G LV.X #125", short: "2009 Pokemon Platinum Palkia G LV.X #125", sport: "宝可梦（日文）", series: "Pokemon Platinum", grade: "PSA 10", cert: "41055599", type: "竞拍", price: 7410, current: 7410, bids: 13, ends: "04天 17时", seller: "KetchumAllCollectibles", stock: "托管仓", watchers: 70, favorite: false, image: "./assets/fanatics-02.jpg", population: "PSA 10 GEM MINT" },
  { id: "GE-243-003", title: "2002 Pokemon Neo Destiny 1st Edition Holo Dark Gengar #6", short: "2002 Pokemon Neo Destiny Dark Gengar #6", sport: "宝可梦（英文）", series: "Neo Destiny 1st Edition", grade: "PSA 10", cert: "26763370", type: "竞拍", price: 9400, current: 9400, bids: 10, ends: "04天 17时", seller: "Smpratte Collection", stock: "托管仓", watchers: 48, favorite: true, image: "./assets/fanatics-03.jpg", population: "PSA 10 GEM MINT" },
  { id: "GE-243-004", title: "2007 Pokemon Diamond & Pearl Secret Wonders Reverse Holo Salamence #18", short: "2007 Pokemon Secret Wonders Salamence #18", sport: "宝可梦（英文）", series: "Diamond & Pearl Secret Wonders", grade: "PSA 10", cert: "67304294", type: "竞拍", price: 1010, current: 1010, bids: 16, ends: "04天 17时", seller: "Your Consignment Partner", stock: "托管仓", watchers: 50, favorite: false, image: "./assets/fanatics-04.jpg", population: "PSA 同级存世量 3" },
  { id: "GE-243-005", title: "2011 Pokemon Call Of Legends Reverse Holo Deoxys #2", short: "2011 Pokemon Call Of Legends Deoxys #2", sport: "宝可梦（英文）", series: "Call Of Legends", grade: "PSA 10", cert: "61807988", type: "竞拍", price: 760, current: 760, bids: 10, ends: "04天 17时", seller: "Moving Pokemon", stock: "托管仓", watchers: 43, favorite: false, image: "./assets/fanatics-05.jpg", population: "PSA 同级存世量 5" },
  { id: "GE-243-006", title: "2008 Pokemon Diamond & Pearl Majestic Dawn Holo Moltres #10", short: "2008 Pokemon Majestic Dawn Moltres #10", sport: "宝可梦（日文）", series: "Diamond & Pearl Majestic Dawn", grade: "PSA 10", cert: "44755834", type: "竞拍", price: 10850, current: 10850, bids: 27, ends: "04天 17时", seller: "GIOVANNI VAULT", stock: "托管仓", watchers: 63, favorite: false, image: "./assets/fanatics-06.jpg", population: "PSA 10 GEM MINT" },
  { id: "GE-243-007", title: "2011 Pokemon Call Of Legends Prerelease Holo Snorlax #33", short: "2011 Pokemon Call Of Legends Snorlax #33", sport: "宝可梦（英文）", series: "Call Of Legends Prerelease", grade: "PSA 10", cert: "65183420", type: "竞拍", price: 7410, current: 7410, bids: 15, ends: "04天 17时", seller: "Skully's Auction Block", stock: "托管仓", watchers: 70, favorite: true, image: "./assets/fanatics-07.jpg", population: "PSA 10 GEM MINT" },
  { id: "GE-243-008", title: "2007 Pokemon EX Power Keepers Reverse Holo Blaziken #5", short: "2007 Pokemon EX Power Keepers Blaziken #5", sport: "宝可梦（日文）", series: "EX Power Keepers", grade: "PSA 10", cert: "66741016", type: "竞拍", price: 1810, current: 1810, bids: 10, ends: "04天 17时", seller: "Northside Collectibles", stock: "托管仓", watchers: 58, favorite: false, image: "./assets/fanatics-08.jpg", population: "PSA 同级存世量 19" },
  { id: "GE-BN-001", title: "Pokemon Base Set Holo Ninetales #12 收藏级单卡", short: "Pokemon Base Set Holo Ninetales #12", sport: "宝可梦（英文）", series: "Pokemon Base Set", grade: "PSA 9", cert: "136633117", type: "一口价", price: 5280, current: 5280, bids: 0, ends: "立即购买", seller: "镖卡认证卖家", stock: "现货", watchers: 26, favorite: false, image: "./assets/fanatics-01.jpg", population: "平台已完成实物核验" },
  { id: "GE-BN-002", title: "Pokemon Platinum Palkia G LV.X #125 高分收藏卡", short: "Pokemon Platinum Palkia G LV.X #125", sport: "宝可梦（日文）", series: "Pokemon Platinum", grade: "PSA 10", cert: "41055599", type: "一口价", price: 8200, current: 8200, bids: 0, ends: "立即购买", seller: "镖卡认证卖家", stock: "现货", watchers: 35, favorite: false, image: "./assets/fanatics-02.jpg", population: "平台已完成实物核验" },
  { id: "GE-PA-001", title: "Dark Gengar 1st Edition Holo #6", short: "Dark Gengar 1st Edition Holo #6", sport: "宝可梦（英文）", series: "Neo Destiny 1st Edition", grade: "PSA 10", cert: "26763370", type: "竞拍", price: 28600, current: 26800, bids: 18, ends: "07天 12时", seller: "镖卡认证卖家", stock: "托管仓", watchers: 91, favorite: true, image: "./assets/fanatics-03.jpg", population: "PSA 10 GEM MINT" },
  { id: "GE-PA-002", title: "Salamence Reverse Holo #18 PSA 10", short: "Salamence Reverse Holo #18", sport: "宝可梦（其他语言）", series: "Secret Wonders", grade: "PSA 10", cert: "67304294", type: "竞拍", price: 16800, current: 15200, bids: 12, ends: "07天 12时", seller: "镖卡认证卖家", stock: "托管仓", watchers: 62, favorite: false, image: "./assets/fanatics-04.jpg", population: "PSA 10 GEM MINT" }
];

const catalogCards = auctionProducts.slice(0, 8).map((item, index) => ({
  ...item,
  catalogId: `CAT-${String(index + 1).padStart(3, "0")}`,
  release: ["1999", "2009", "2002", "2007", "2011", "2008", "2011", "2007"][index],
  collection: ["基础系列", "白银风暴", "新命运", "神秘奇迹", "传说召唤", "曙光", "传说召唤", "EX力量守护者"][index],
  collected: index === 0 || index === 2
}));

const b2bProducts = [
  { id: "B2B-001", title: "GECA G3 磁吸保护 [PSA35pt（薄）] 适用 PSA35pt 评级卡", category: "卡砖", pack: "盒装", sku: "2 个 SKU", price: 63, image: "./assets/card-01.png", tint: "blue", stock: 28 },
  { id: "B2B-002", title: "GECA 评级卡保护壳内胆 适配 35PT–130PT 卡砖", category: "卡套", pack: "其他", sku: "2 个 SKU", price: 5.8, image: "./assets/card-02.png", tint: "paper", stock: 96 },
  { id: "B2B-003", title: "GECA 半刚性卡夹 评级卡夹 适用球星卡 TCG 高清保护", category: "卡夹", pack: "单包", sku: "2 个 SKU", price: 17, image: "./assets/card-03.png", tint: "warm", stock: 48 },
  { id: "B2B-004", title: "G3 磁吸保护 [PSA35pt（薄）] 适用 PSA评级卡", category: "卡砖", pack: "盒装", sku: "2 个 SKU", price: 9.5, image: "./assets/card-04.png", tint: "lavender", stock: 112 },
  { id: "B2B-005", title: "GECA 看卡品便携放大镜 [方便携带]", category: "展示用品", pack: "单品", sku: "1 个 SKU", price: 39, image: "./assets/card-05.png", tint: "dark", stock: 23 },
  { id: "B2B-006", title: "GECA 水晶盾 适配评级卡 PSA / CGC 保护套", category: "卡套", pack: "整箱", sku: "3 个 SKU", price: 29, image: "./assets/card-06.png", tint: "ice", stock: 64 },
  { id: "B2B-007", title: "GECA 3PT 高清卡夹 适合展示收藏卡", category: "展示用品", pack: "盒装", sku: "2 个 SKU", price: 49, image: "./assets/card-07.png", tint: "lavender", stock: 17 },
  { id: "B2B-008", title: "GECA 评级卡保护内胆 适配 PSA / BGS", category: "卡套", pack: "整箱", sku: "4 个 SKU", price: 18, image: "./assets/card-08.png", tint: "paper", stock: 80 }
];

const offerRecords = [
  { id: "OF-001", status: "pending", statusLabel: "待我处理", detailState: "rejected", validUntil: "2026-08-08 10:00:00", myOffer: 32, otherOffer: null, remaining: 3, rejection: "您的议价已被拒绝", sellerNew: false, image: "./assets/fanatics-02.jpg" },
  { id: "OF-002", status: "negotiating", statusLabel: "议价中", detailState: "negotiating", validUntil: "2026-08-08 10:00:00", myOffer: 32, otherOffer: null, remaining: 3, rejection: "", sellerNew: false, image: "./assets/fanatics-02.jpg" },
  { id: "OF-003", status: "pending", statusLabel: "待我处理", detailState: "seller-pending", validUntil: "2026-08-08 10:00:00", myOffer: 32, otherOffer: 88, remaining: 3, rejection: "", sellerNew: true, image: "./assets/fanatics-02.jpg" },
  { id: "OF-004", status: "accepted", statusLabel: "已接受", detailState: "accepted", validUntil: "2026-08-08 10:00:00", myOffer: 32, otherOffer: 32, remaining: 3, rejection: "", sellerNew: true, image: "./assets/fanatics-02.jpg" },
  { id: "OF-005", status: "expired", statusLabel: "已过期", detailState: "expired", validUntil: "-", myOffer: 32, otherOffer: 32, remaining: 3, rejection: "", sellerNew: false, image: "./assets/fanatics-02.jpg" },
  { id: "OF-006", status: "canceled", statusLabel: "已取消", detailState: "canceled", validUntil: "-", myOffer: 32, otherOffer: 32, remaining: 3, rejection: "", sellerNew: false, image: "./assets/fanatics-02.jpg" },
  { id: "OF-007", status: "expired", statusLabel: "已过期", detailState: "seller-expired", validUntil: "-", myOffer: 25, otherOffer: 25, remaining: 2, rejection: "", sellerNew: false, image: "./assets/fanatics-02.jpg" }
];

const offerProductTitle = "喷子拍卖 2004-05 upper deck ultimate LeBron James 终极收藏 克里夫兰骑士 勒布朗 詹姆斯 25编 patch 签字 PA 卡签...";

const state = {
  page: "home",
  auctionMode: "auction",
  search: "",
  favoritesOnly: false,
  catalogOnly: false,
  catalogSport: "all",
  offerStatus: "all",
  b2bCategory: "热销商品",
  cart: [],
  drawer: null,
  loggedIn: false,
  auctionMenuOpen: false,
  loading: true,
  error: false,
  toastTimer: null
};

const app = document.querySelector("#app");
const globalSearch = document.querySelector("#globalSearch");
const cartCount = document.querySelector("#cartCount");

const formatPrice = (value) => money.format(value);
const formatOfferPrice = (value) => value === null || value === undefined ? "-" : `¥ ${Number(value).toFixed(2)}`;
const findAuction = (id) => auctionProducts.find((item) => item.id === id);
const findB2B = (id) => b2bProducts.find((item) => item.id === id);

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => toast.classList.remove("visible"), 2600);
}

function setLoading(page = state.page) {
  state.loading = true;
  state.error = false;
  renderPage();
  setTimeout(() => {
    if (state.page === page) {
      state.loading = false;
      renderPage();
    }
  }, 360);
}

function skeletonGrid(count = 8) {
  return `<div class="skeleton-grid">${Array.from({ length: count }, () => `<div class="skeleton-card"><div class="skeleton-image"></div><div class="skeleton-line long"></div><div class="skeleton-line"></div><div class="skeleton-line short"></div></div>`).join("")}</div>`;
}

function statusBlock(type, title, copy, action = "") {
  const icon = type === "error" ? "!" : type === "empty" ? "⌕" : "○";
  return `<div class="state-block ${type}"><span class="state-icon">${icon}</span><strong>${title}</strong><p>${copy}</p>${action}</div>`;
}

function getAuctionProducts() {
  const keyword = state.search.trim().toLowerCase();
  let result = auctionProducts.filter((item) => {
    const mode = state.auctionMode === "all" || (state.auctionMode === "buy" && item.type === "一口价") || (state.auctionMode === "auction" && item.type === "竞拍");
    const matched = [item.title, item.short, item.series, item.sport, item.grade, item.cert, item.id, item.seller].join(" ").toLowerCase().includes(keyword);
    return mode && matched && (!state.favoritesOnly || item.favorite);
  });
  if (state.search.trim().toLowerCase() === "error") return null;
  return result;
}

function renderHeaderState() {
  const privatePages = ["bids", "orders", "offers", "favorites"];
  document.querySelectorAll(".nav-link").forEach((link) => link.classList.toggle("active", link.dataset.page === state.page || (link.dataset.page === "auction" && privatePages.includes(state.page))));
  globalSearch.value = state.search;
  globalSearch.placeholder = state.page === "b2b" ? "请搜索卡具、保护套、展示用品" : state.page === "catalog" ? "请搜索球员、系列、编号" : "请搜索球员、系列、评级";
  cartCount.textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector("#cartButton").hidden = !state.loggedIn;
  document.querySelector("#favoriteButton").hidden = !state.loggedIn;
  document.querySelector("#registerButton").hidden = state.loggedIn;
  document.querySelector(".login-button").textContent = state.loggedIn ? "G" : "登录";
  document.querySelector(".login-button").dataset.action = state.loggedIn ? "logout" : "login-demo";
  document.querySelector(".login-button").setAttribute("aria-label", state.loggedIn ? "退出登录" : "登录");
  document.querySelector(".login-button").classList.toggle("logged-in", state.loggedIn);
  const auctionPopover = document.querySelector("#auctionPopover");
  auctionPopover.innerHTML = state.loggedIn
    ? `<button data-action="navigate" data-page="bids">我参与的竞价</button><button data-action="navigate" data-page="orders">我的订单</button><button data-action="navigate" data-page="offers">我的议价</button><button data-action="navigate" data-page="favorites">我的收藏</button>`
    : `<div class="popover-locked">登录后查看订单与竞价</div>`;
  auctionPopover.hidden = !state.auctionMenuOpen;
}

function renderAuctionCard(item) {
  const isBuy = item.type === "一口价";
  return `<article class="product-card auction-card">
    <div class="product-art">
      <button class="card-favorite ${item.favorite ? "active" : ""}" data-action="favorite-item" data-id="${item.id}" aria-label="${item.favorite ? "取消收藏" : "收藏"}"><span>${item.favorite ? "♥" : "♡"}</span><small>${item.watchers}</small></button>
      <button class="art-open" data-action="detail" data-id="${item.id}" aria-label="查看商品详情"><img src="${item.image}" alt="${esc(item.short)}" /></button>
    </div>
    <div class="product-body">
      <h2 class="product-title">${esc(item.short)}</h2>
      <div class="tag-row"><span>${esc(item.series)}</span><b>${item.grade}</b></div>
      <div class="price-row"><strong>${formatPrice(isBuy ? item.price : item.current)}</strong><span>${item.bids ? `${item.bids} 次出价` : "现货"}</span></div>
      <p class="bid-meta"><span>${isBuy ? "一口价" : "当前最高价"}</span><b>${item.ends}</b></p>
      ${isBuy ? `<button class="primary-button full" data-action="buy" data-id="${item.id}">立即购买</button>` : ""}
    </div>
  </article>`;
}

function renderAuction() {
  const result = getAuctionProducts();
  const list = state.loading ? skeletonGrid() : state.error ? statusBlock("error", "加载失败", "拍卖场次暂时无法加载，请稍后重试。", `<button class="primary-button compact" data-action="retry">重新加载</button>`) : result === null ? statusBlock("error", "连接暂时不可用", "模拟接口返回异常，你可以重试当前列表。", `<button class="primary-button compact" data-action="retry">重新加载</button>`) : !result.length ? statusBlock("empty", "没有找到相关藏品", "试试清除筛选，或搜索其他球员、系列和评级。", `<button class="ghost-button compact" data-action="clear-search">清除条件</button>`) : `<div class="product-grid">${result.map(renderAuctionCard).join("")}</div>`;
  return `<div class="page-shell auction-page">
    <section class="content-section auction-list-section" id="auction-list">
      <div class="section-heading"><div><p class="eyebrow">MARKETPLACE</p><h2>全球市场</h2><p>按体育项目、评级和交易方式发现下一张收藏卡。</p></div><div class="section-heading-actions"><button class="outline-button" data-action="favorite-filter">${state.favoritesOnly ? "显示全部" : "只看收藏"}</button></div></div>
      <div class="market-layout">
        <aside class="filter-panel">
          <div class="filter-header"><strong>筛选 <span>${state.favoritesOnly ? 1 : 0}</span></strong><button data-action="reset-filters">重置所有</button></div>
          <div class="filter-box"><label class="toggle-row"><span>只看评级</span><input type="checkbox" checked /><i></i></label><label class="toggle-row"><span>只看限量</span><input type="checkbox" /><i></i></label><label class="toggle-row"><span>只看签名</span><input type="checkbox" /><i></i></label></div>
          <fieldset class="filter-box"><legend>价格区间</legend><div class="range-fields"><span>¥ 0</span><span>¥ 80,000</span></div><input class="range" type="range" min="0" max="80000" value="80000" /></fieldset>
          <label class="filter-box"><span class="field-label">排序方式</span><select data-filter="sort"><option value="featured">推荐排序</option><option value="ending">即将结束</option><option value="price">价格优先</option></select></label>
          <fieldset class="filter-box"><legend>分类</legend><label class="check-row"><input type="checkbox" checked />宝可梦卡</label><label class="check-row"><input type="checkbox" />篮球卡</label><label class="check-row"><input type="checkbox" />足球卡</label><label class="check-row"><input type="checkbox" />TCG</label></fieldset>
          <fieldset class="filter-box"><legend>评级公司</legend><label class="check-row"><input type="checkbox" checked />PSA</label><label class="check-row"><input type="checkbox" />BGS</label><label class="check-row"><input type="checkbox" />CGC</label></fieldset>
        </aside>
        <div class="market-content"><div class="section-toolbar"><div class="segmented"><button class="segment ${state.auctionMode === "auction" ? "active" : ""}" data-action="set-mode" data-mode="auction">竞价</button><button class="segment ${state.auctionMode === "buy" ? "active" : ""}" data-action="set-mode" data-mode="buy">一口价</button></div><div class="toolbar-actions"><span class="result-count">${state.loading ? "正在加载" : result && `${result.length} 件藏品`}</span><select aria-label="排序" data-filter="sort"><option>即将结束</option><option>最新上架</option><option>价格最低优先</option></select></div></div>${list}</div>
      </div>
    </section>
  </div>`;
}

function renderHome() {
  const marketPicks = auctionProducts.slice(0, 5);
  const storePicks = b2bProducts.slice(0, 4);
  return `<div class="page-shell home-page">
    <section class="home-hero">
      <div class="home-hero-copy"><p class="eyebrow">COLLECT WHAT MOVES YOU</p><h1>收藏热爱<br /><em>从这一张开始</em></h1><p>全球精选体育卡 · 正品保障 · 收藏新体验</p><button class="primary-button" data-action="navigate" data-page="auction">立即探索 <span>→</span></button></div>
      <div class="home-hero-display"><div class="home-hero-glow"></div><img src="./assets/fanatics-03.jpg" alt="精选收藏卡" /><span>PSA 10<br /><b>GEM MINT</b></span></div>
      <aside class="home-login-panel">${state.loggedIn ? `<span class="avatar large">G</span><strong>Hi，下午好</strong><small>你的收藏与交易都在这里</small><button class="primary-button full" data-action="account">进入我的账户</button><div class="home-login-links"><span>竞价记录</span><span>商品收藏</span><span>物流关注</span></div>` : `<span class="home-login-mark">G</span><strong>Hi，下午好</strong><small>登录后发现更多精彩</small><button class="primary-button full" data-action="login-demo">立即登录</button><div class="home-login-links"><span>竞价记录</span><span>商品收藏</span><span>物流关注</span></div>`}</aside>
    </section>
    <section class="home-feature-links"><button data-action="navigate" data-page="auction"><span>01</span><strong>宝可梦高评分卡牌拍卖</strong><small>登录后发现更多精彩拍品</small></button><button data-action="navigate" data-page="b2b"><span>02</span><strong>卡牌保护与收藏周边</strong><small>卡套、卡砖和展示用品</small></button><button data-action="navigate" data-page="catalog"><span>03</span><strong>图鉴资料库</strong><small>评级与市场信息一站查询</small></button></section>
    <section class="home-section"><div class="home-section-head"><div><p class="eyebrow">GLOBAL MARKET</p><h2>全球市场</h2><p>从每周拍卖和一口价市场中，找到值得收藏的卡。</p></div><button class="text-link" data-action="navigate" data-page="auction">查看更多 <span>→</span></button></div><div class="home-product-row">${marketPicks.map(renderAuctionCard).join("")}</div></section>
    <section class="home-section store-section"><div class="home-section-head"><div><p class="eyebrow">GECA STORE</p><h2>镖卡商店</h2><p>卡套、卡砖、展示用品和收藏周边，给卡片完整的保护。</p></div><button class="text-link" data-action="navigate" data-page="b2b">查看更多 <span>→</span></button></div><div class="home-store-tabs"><button class="active">最热竞价</button><button>竞价最高</button><button>即将结束</button><button>最新上架</button></div><div class="home-product-row">${storePicks.map(renderB2BCard).join("")}</div></section>
  </div>`;
}

function renderOffersPage() {
  const tabs = [
    ["all", "全部"],
    ["pending", "待我处理"],
    ["negotiating", "议价中"],
    ["accepted", "已成交"],
    ["expired", "已过期"],
    ["canceled", "已取消"]
  ];
  const records = offerRecords.filter((record) => state.offerStatus === "all" || record.status === state.offerStatus);
  const cards = records.length ? records.map((record) => `<article class="offer-card">
    <div class="offer-card-head"><span>有效期：${record.validUntil}</span><strong class="offer-status ${record.status}">${record.statusLabel}</strong></div>
    <div class="offer-product"><img src="${record.image}" alt="2004-05 Upper Deck Ultimate LeBron James" /><div class="offer-product-copy"><strong>${offerProductTitle}</strong>${record.rejection ? `<span class="offer-rejection">ⓘ ${record.rejection}</span>` : ""}<div class="offer-product-meta"><span>一口价：¥88.00</span><span>⌁ 剩余${record.remaining}次议价</span></div></div></div>
    <div class="offer-values"><div><span>我的议价</span><strong>${formatOfferPrice(record.myOffer)}</strong>${record.sellerNew ? "" : ""}</div><i></i><div><span>对方报价</span><strong>${formatOfferPrice(record.otherOffer)}</strong>${record.sellerNew ? `<b>最新出价</b>` : ""}</div></div>
    <div class="offer-actions">${record.status === "pending" || record.status === "negotiating" ? `<button class="outline-button" data-action="offer-action" data-id="${record.id}" data-operation="cancel">取消议价</button><button class="outline-button" data-action="open-offer" data-id="${record.id}">议价</button>${record.otherOffer ? `<button class="primary-button" data-action="offer-action" data-id="${record.id}" data-operation="accept">接受报价</button>` : ""}` : record.status === "accepted" ? `<button class="primary-button" data-action="open-offer" data-id="${record.id}">查看订单</button>` : `<button class="outline-button" data-action="open-offer" data-id="${record.id}">查看议价</button>`}</div>
  </article>`).join("") : statusBlock("empty", "暂无议价记录", "你发出的报价和收到的回复会显示在这里。", `<button class="ghost-button compact" data-action="navigate" data-page="auction">继续逛市场</button>`);
  return `<div class="page-shell offers-page"><div class="offers-mobile-head"><button class="icon-button" data-action="navigate" data-page="auction" aria-label="返回拍卖">‹</button><h1>我的议价</h1><span></span></div><div class="offers-page-head"><div><p class="eyebrow">MY OFFERS</p><h2>我的议价</h2><p>跟进报价、回复和成交状态。</p></div><button class="outline-button" data-action="refresh-offers">↻ 刷新记录</button></div><div class="offers-summary"><span><strong>${offerRecords.length}</strong>条议价记录</span><span>最后更新：今天 12:00</span><select aria-label="议价排序"><option>按更新时间排序</option><option>按有效期排序</option></select></div><div class="offer-tabs">${tabs.map(([value, label]) => `<button class="${state.offerStatus === value ? "active" : ""}" data-action="offer-filter" data-status="${value}">${label}</button>`).join("")}</div><div class="offer-refresh"><span>↑</span><div><strong>松开立刻刷新</strong><small>最后更新：今天12:00</small></div></div><div class="offer-list">${cards}</div></div>`;
}

function renderOfferDialog(record) {
  const hasSellerOffer = record.otherOffer !== null && record.otherOffer !== undefined;
  const canNegotiate = record.status === "pending" || record.status === "negotiating";
  const isAccepted = record.status === "accepted";
  const detailState = record.detailState || record.status;
  const statusCopy = {
    rejected: "本次议价未达成",
    negotiating: "报价已发出，等待对方回复",
    "seller-pending": "卖家已还价，请确认是否接受",
    accepted: "报价已接受，订单已经生成",
    expired: "议价有效期已结束",
    canceled: "这条议价已取消",
    "seller-expired": "卖家还价已过期"
  }[detailState] || "议价信息已更新";
  const userMessage = (amount, date, tag = "", note = "") => `<div class="offer-message buyer"><div class="offer-message-bubble"><strong>议价金额：${formatOfferPrice(amount)}</strong>${note ? `<span>${note}</span>` : ""}<time>${date}</time></div><span class="offer-message-avatar">G</span>${tag ? `<em>${tag}</em>` : ""}</div>`;
  const sellerMessage = (amount, date, tag = "") => `<div class="offer-message seller"><span class="offer-message-avatar">S</span><div class="offer-message-bubble"><strong>议价金额：${formatOfferPrice(amount)}</strong><time>${date}</time></div>${tag ? `<em>${tag}</em>` : ""}</div>`;
  const timeline = {
    accepted: `${userMessage(record.myOffer, "2026-08-08 10:00:00", "已过期")}${userMessage(record.otherOffer, "2026-08-08 18:00:00", "已接受")}`,
    expired: `${userMessage(record.myOffer, "2026-08-08 10:00:00", "已过期")}${userMessage(record.otherOffer, "2026-08-08 18:00:00", "已拒绝")}`,
    canceled: `${userMessage(record.myOffer, "2026-08-08 10:00:00", "已过期")}${userMessage(record.otherOffer, "2026-08-08 18:00:00", "已取消")}`,
    negotiating: `${userMessage(record.myOffer, "2026-08-08 10:00:00", "已过期")}${userMessage(record.myOffer, "2026-08-08 18:00:00")}`,
    "seller-expired": `${userMessage(record.myOffer, "2026-08-08 10:00:00", "已过期", "便宜点吧，我还买你们店的其他卡")}${sellerMessage(record.otherOffer, "2026-08-08 18:00:00", "已过期")}`,
    "seller-pending": `${userMessage(record.myOffer, "2026-08-08 10:00:00", "已拒绝")}${userMessage(record.myOffer, "2026-08-08 12:00:00")}${userMessage(record.myOffer, "2026-08-08 16:00:00")}${sellerMessage(record.otherOffer, "2026-08-08 18:00:00")}`,
    rejected: `${userMessage(record.myOffer, "2026-08-08 10:00:00", "已拒绝")}`
  }[detailState] || userMessage(record.myOffer, "2026-08-08 10:00:00");
  const messageCount = (timeline.match(/offer-message /g) || []).length;
  const actionBlock = canNegotiate ? `<form class="offer-dialog-form" data-form="offer" data-id="${record.id}"><label>提交新的议价<input name="amount" type="number" min="1" step="1" value="${record.myOffer}" ${record.remaining <= 0 ? "disabled" : ""} /></label><button class="primary-button" type="submit" ${record.remaining <= 0 ? "disabled" : ""}>发送议价</button></form><div class="offer-dialog-actions"><button class="outline-button" data-action="offer-action" data-id="${record.id}" data-operation="cancel">取消议价</button>${hasSellerOffer ? `<button class="primary-button" data-action="offer-action" data-id="${record.id}" data-operation="accept">接受报价</button>` : ""}</div>` : isAccepted ? `<div class="offer-dialog-actions"><button class="primary-button full" data-action="offer-action" data-message="订单详情已打开">查看订单</button></div>` : `<div class="offer-dialog-actions"><button class="outline-button" data-action="restart-offer" data-id="${record.id}">重新议价</button></div>`;
  return `<div class="drawer-layer offer-dialog-layer"><button class="drawer-backdrop" data-action="close-drawer" aria-label="关闭议价窗口"></button><section class="offer-dialog-panel" role="dialog" aria-modal="true" aria-label="议价详情"><header class="offer-dialog-top"><div><span class="eyebrow">OFFER DETAIL</span><strong>议价详情</strong></div><div class="offer-dialog-top-right"><span class="offer-status-chip ${record.status}">${record.statusLabel}</span><button class="icon-button" data-action="close-drawer" aria-label="关闭">×</button></div></header><div class="offer-dialog-body"><aside class="offer-dialog-product"><div class="offer-dialog-image"><img src="${record.image}" alt="2004-05 Upper Deck Ultimate LeBron James" /></div><span class="offer-dialog-label">商品信息</span><h2>${offerProductTitle}</h2><div class="offer-dialog-facts"><div><span>一口价</span><strong>¥ 88.00</strong></div><div><span>运费</span><strong>¥ 18.00</strong></div><div><span>剩余议价</span><strong>${record.remaining} 次</strong></div><div><span>有效期</span><strong>${record.validUntil}</strong></div></div></aside><main class="offer-dialog-main"><div class="offer-dialog-status"><span class="status-mark ${record.status}">${isAccepted ? "✓" : record.status === "expired" || record.status === "canceled" ? "-" : "•"}</span><div><strong>${statusCopy}</strong><small>${record.rejection || "议价信息和操作会实时同步到这里"}</small></div></div><section class="offer-dialog-section"><div class="offer-dialog-section-head"><h3>报价会话</h3><span>共 ${messageCount} 条</span></div><div class="offer-dialog-thread">${timeline}</div></section><section class="offer-dialog-section offer-dialog-operation"><div class="offer-dialog-section-head"><h3>${canNegotiate ? "继续议价" : "处理结果"}</h3><span>${canNegotiate ? `剩余 ${record.remaining} 次` : ""}</span></div>${actionBlock}</section></main></div></section></div>`;
}

function renderAccountPage(kind) {
  if (kind === "offers") return renderOffersPage();
  const pageData = {
    bids: { eyebrow: "MY BIDS", title: "我参与的竞价", copy: "查看正在参与和已经结束的竞价。", action: "返回拍卖", empty: false },
    orders: { eyebrow: "MY ORDERS", title: "我的订单", copy: "统一查看卡片交易和周边采购订单。", action: "继续逛市场", empty: false },
    offers: { eyebrow: "MY OFFERS", title: "我的议价", copy: "查看你发出的报价和平台回复。", action: "继续找卡", empty: false },
    favorites: { eyebrow: "MY COLLECTION", title: "我的收藏", copy: "收藏的卡片和商品会集中显示在这里。", action: "继续浏览", empty: false }
  }[kind];
  if (!pageData) return renderAuction();
  const favoriteItems = auctionProducts.filter((item) => item.favorite);
  const body = kind === "favorites" ? `<div class="account-product-grid">${favoriteItems.map(renderAuctionCard).join("")}</div>` : `<div class="account-records">${(kind === "bids" ? auctionProducts.slice(0, 4) : kind === "orders" ? auctionProducts.slice(1, 4) : auctionProducts.slice(2, 5)).map((item, index) => `<article class="account-record"><img src="${item.image}" alt="${esc(item.short)}" /><div class="account-record-main"><strong>${esc(item.short)}</strong><span>${item.grade} · ${kind === "bids" ? `${item.bids} 次出价` : kind === "orders" ? "平台闭环订单" : "报价 ¥" + (item.current - 200)}</span></div><div class="account-record-status"><b>${kind === "bids" ? (index === 0 ? "领先" : "已出局") : kind === "orders" ? (index === 0 ? "待支付" : "运输中") : (index === 0 ? "待回复" : "已回复")}</b><small>${kind === "orders" ? "查看详情 →" : "更新于刚刚"}</small></div></article>`).join("")}</div>`;
  return `<div class="page-shell account-page"><div class="account-page-head"><div><p class="eyebrow">${pageData.eyebrow}</p><h1>${pageData.title}</h1><p>${pageData.copy}</p></div><button class="outline-button" data-action="navigate" data-page="auction">${pageData.action}</button></div><div class="account-page-tabs"><button class="active">全部</button><button>进行中</button><button>已完成</button></div>${body}</div>`;
}

function renderCatalogCard(item) {
  return `<article class="catalog-card"><button class="catalog-image" data-action="catalog-detail" data-id="${item.id}"><img src="${item.image}" alt="${esc(item.short)}" /><span>${item.release}</span></button><div class="catalog-card-body"><div class="catalog-card-top"><span>${item.collection}</span><button class="mini-heart ${item.collected ? "active" : ""}" data-action="catalog-favorite" data-id="${item.catalogId}">${item.collected ? "♥" : "♡"}</button></div><h3>${esc(item.short)}</h3><p>${item.sport} · ${item.series}</p><div class="catalog-card-bottom"><strong>${item.grade}</strong><span>市场有货</span></div></div></article>`;
}

function renderCatalog() {
  const keyword = state.search.trim().toLowerCase();
  const cards = catalogCards.filter((item) => [item.title, item.short, item.player, item.series, item.collection, item.cert].join(" ").toLowerCase().includes(keyword) && (!state.catalogOnly || item.collected));
  const content = state.loading ? skeletonGrid(6) : state.search.trim().toLowerCase() === "error" ? statusBlock("error", "图鉴服务暂时不可用", "资料库连接失败，请重新加载。", `<button class="primary-button compact" data-action="retry">重新加载</button>`) : !cards.length ? statusBlock("empty", "暂无匹配卡片", "没有找到符合条件的图鉴资料。", `<button class="ghost-button compact" data-action="clear-search">清除搜索</button>`) : `<div class="catalog-grid">${cards.map(renderCatalogCard).join("")}</div>`;
  return `<div class="page-shell catalog-page"><section class="catalog-intro"><div><p class="eyebrow">CARD CATALOGUE</p><h1>收藏卡图鉴</h1><p>把每一张卡的身份、评级和市场信息查清楚，再决定是否收藏。</p></div><div class="catalog-stats"><div><strong>24,980</strong><span>卡片资料</span></div><div><strong>8,430</strong><span>评级记录</span></div><div><strong>¥ 1.2M</strong><span>今日成交</span></div></div></section><div class="catalog-toolbar"><div class="catalog-tabs"><button class="active">全部卡片</button><button>体育卡</button><button>TCG</button><button>新近更新</button></div><button class="outline-button" data-action="catalog-only">${state.catalogOnly ? "查看全部" : "我的收藏"}</button></div><section class="catalog-section"><div class="section-heading compact-heading"><div><h2>热门卡片</h2><p>公开资料库 · 支持关联市场商品</p></div><span class="muted-label">${state.loading ? "" : `${cards.length} 条结果`}</span></div>${content}</section></div>`;
}

function renderB2BCard(item) {
  return `<article class="b2b-card"><button class="b2b-image ${item.tint}" data-action="b2b-detail" data-id="${item.id}"><img src="${item.image}" alt="${esc(item.title)}" /><span class="b2b-art-label">GECA<br /><b>${item.category}</b></span></button><div class="b2b-body"><div class="b2b-meta"><span>${item.pack}</span><small>${item.sku}</small></div><h3>${esc(item.title)}</h3><div class="b2b-price"><strong>${formatPrice(item.price)}</strong><span>${item.stock} 件库存</span></div><button class="primary-button full" data-action="add-cart" data-id="${item.id}">加入购物车</button></div></article>`;
}

function renderB2B() {
  const products = b2bProducts.filter((item) => state.b2bCategory === "热销商品" || item.category === state.b2bCategory || (state.b2bCategory === "整箱周边" && item.pack === "整箱") || [item.title, item.category].join(" ").toLowerCase().includes(state.search.trim().toLowerCase()));
  const content = state.loading ? skeletonGrid(8) : state.search.trim().toLowerCase() === "error" ? statusBlock("error", "商城加载失败", "商品服务暂时无法响应，请稍后再试。", `<button class="primary-button compact" data-action="retry">重新加载</button>`) : !products.length ? statusBlock("empty", "暂无相关商品", "换一个关键词或选择其他分类。", `<button class="ghost-button compact" data-action="clear-search">清除搜索</button>`) : `<div class="b2b-grid">${products.map(renderB2BCard).join("")}</div>`;
  const categories = ["热销商品", "卡牌", "卡夹", "评级卡周边", "收藏产品", "展示用品", "周边产品"];
  return `<div class="page-shell b2b-page"><section class="b2b-hero"><div class="b2b-hero-copy"><p class="eyebrow">GECA SUPPLY STORE</p><h1>卡牌专用卡具<br /><em>& 全套周边</em></h1><p>从保护、收纳到展示，让每一张收藏卡都被认真对待。</p><button class="primary-button" data-action="scroll-list">浏览热销商品 <span>→</span></button></div><div class="b2b-hero-visual"><div class="sleeve sleeve-one"></div><div class="sleeve sleeve-two"></div><div class="sleeve sleeve-three"></div><img src="./assets/card-03.png" alt="卡牌周边" /></div><div class="b2b-side-banner"><span>整箱原盒卡牌专区</span><strong>SEALED BOXES</strong><small>收藏周边 · 采购直达</small></div></section><section class="b2b-shop" id="b2b-list"><div class="b2b-controls"><div class="category-tabs">${categories.map((category) => `<button class="${state.b2bCategory === category ? "active" : ""}" data-action="b2b-category" data-category="${category}">${category}</button>`).join("")}</div><div class="b2b-sort"><button class="icon-button" aria-label="搜索">⌕</button><select><option>全部售卖形式</option><option>盒装</option><option>单包</option><option>整箱</option></select><select><option>全部包装</option><option>标准装</option><option>高端装</option></select></div></div><div class="section-heading compact-heading"><div><h2>卡牌保护与收藏周边</h2><p>为卡店、藏家和批量采购者准备的常用商品。</p></div><span class="muted-label">${state.loading ? "" : `${products.length} 件商品`}</span></div>${content}</section></div>`;
}

function renderProductDetailDrawer(item) {
  const isBuy = item.type === "一口价";
  const shownPrice = isBuy ? item.price : item.current;
  const bidEntries = [item.current, Math.max(0, item.current - 200), Math.max(0, item.current - 500), Math.max(0, item.current - 700), Math.max(0, item.current - 900), Math.max(0, item.current - 1100)].map((price, index) => `<div class="detail-bid-entry"><span class="detail-bid-avatar">${index === 0 ? "领" : "出"}</span><strong>${index === 0 ? "领先" : "出局"}</strong><small>${formatPrice(price)}</small></div>`).join("");
  const tags = isBuy ? `<span>PSA 10</span><span>套出</span><span>连号</span><span>LOT</span>` : `<span>PSA 9</span>`;
  const auctionPanel = !isBuy ? `<section class="product-detail-section auction-history-section"><div class="product-section-head"><h3>竞价记录</h3><button class="text-link" data-action="toast" data-message="全部竞价记录已打开">查看全部 <span>→</span></button></div><div class="detail-bid-strip">${bidEntries}</div></section><section class="product-detail-section price-breakdown"><div><span>起拍价</span><strong>${formatPrice(Math.max(100, item.price - 2500))}</strong></div><div><span>我的账户授信额度 ⓘ</span><strong>¥5,000.00 <button data-action="toast" data-message="充值流程已准备好">充值</button></strong></div><div><span>我的单标授信额度 ⓘ</span><strong>¥5,000.00 <button data-action="toast" data-message="充值流程已准备好">充值</button></strong></div><div><span>运费 ⓘ</span><strong>¥18.00</strong></div></section>` : `<section class="product-detail-section price-breakdown buy-shipping"><div><span>运费 ⓘ</span><strong>¥18.00</strong></div></section>`;
  const sellerName = isBuy ? "宝可梦旗舰店" : esc(item.seller);
  const releaseYear = (item.title.match(/\b(19|20)\d{2}\b/) || ["2021"])[0];
  return `<div class="drawer-layer"><button class="drawer-backdrop" data-action="close-drawer" aria-label="关闭商品详情"></button><aside class="side-drawer product-detail-drawer"><div class="drawer-top"><span>${isBuy ? "一口价商品详情" : "竞拍商品详情"}</span><button class="icon-button" data-action="close-drawer" aria-label="关闭">×</button></div><div class="product-detail-body"><div class="detail-visual"><button class="card-favorite ${item.favorite ? "active" : ""}" data-action="favorite-item" data-id="${item.id}" aria-label="收藏商品"><span>${item.favorite ? "♥" : "♡"}</span><small>${item.watchers}</small></button><img src="${item.image}" alt="${esc(item.title)}" /><div class="detail-dots"><i class="active"></i><i></i></div></div><div class="product-detail-heading">${isBuy ? `<span class="vault-badge">▣ VAULT</span>` : ""}<h2>${esc(item.title)}</h2><div class="detail-subline">${isBuy ? "⌁ 10次议价" : ""}</div><div class="detail-tags">${tags}</div></div>${auctionPanel}<section class="product-detail-section"><div class="product-section-head"><h3>商品属性</h3><button class="text-link" data-action="toast" data-message="全部商品属性已打开">全部属性 <span>→</span></button></div><dl class="detail-attributes"><div><dt>物品编号</dt><dd>${item.cert ? `CS${item.cert}` : item.id}</dd></div><div><dt>厂商</dt><dd>${item.seller || "GECA"}</dd></div><div><dt>系列</dt><dd>${esc(item.series)}</dd></div><div><dt>年代</dt><dd>${releaseYear}</dd></div><div><dt>是否新秀</dt><dd>是</dd></div></dl></section><section class="product-detail-section seller-section"><div class="seller-heading"><span class="seller-avatar">G</span><div><strong>${sellerName}</strong><small>${isBuy ? "企业店铺" : "认证卖家"}</small></div><div class="seller-actions"><button data-action="toast" data-message="店铺客服已连接">▱</button><button data-action="toast" data-message="聊天窗口已打开">▢</button></div></div><div class="seller-stats"><div><span>好评率</span><strong>99.8%</strong></div><div><span>好评数</span><strong>1,994</strong></div><div><span>差评数</span><strong>3</strong></div></div></section><section class="product-detail-section detail-copy-section"><h3>商品详情</h3><div class="detail-copy"><strong>▧ 实拍图</strong><p>卡品需逐图核对，请仔细看图，对卡品细节有异议的一定私信和我确认再出价，一旦出价、议价视为认同图片所见卡品。卡品要求非常高的买家请购买评级卡。</p><img src="${item.image}" alt="商品实拍图" /><strong>▣ 快递发货</strong><p>快递只发顺丰，中标后，默认陆运到付，如需空运、寄付、保价等请提前说明。高价卡请耐心操作，快递造成的丢失损坏请自行联系快递处理。</p></div></section></div><div class="detail-buybar"><div><small>${isBuy ? "价格" : "当前出价"}</small><strong>${formatPrice(shownPrice)}</strong><span>${isBuy ? "( ≈ $ 788.16 )" : `· 剩余 ${item.ends}`}</span></div>${isBuy ? `<button class="outline-button" data-action="toast" data-message="议价窗口已打开">议价</button><button class="primary-button" data-action="buy" data-id="${item.id}">购买</button>` : `<button class="primary-button" data-action="bid" data-id="${item.id}">立即竞价</button>`}</div></aside></div>`;
}

function renderDrawer() {
  if (!state.drawer) return "";
  const { type, id } = state.drawer;
  if (type === "offer") {
    const record = offerRecords.find((item) => item.id === id);
    return record ? renderOfferDialog(record) : "";
  }
  const item = type === "b2b" ? findB2B(id) : findAuction(id);
  if (!item) return "";
  if (type === "detail") return renderProductDetailDrawer(item);
  const isB2B = type === "b2b";
  const isBuy = item.type === "一口价";
  let inner = "";
  if (type === "detail") inner = `<div class="drawer-product"><div class="drawer-art"><img src="${item.image}" alt="${esc(item.title)}" /></div><div class="drawer-kicker"><span>${item.type}</span><span>${item.grade}</span></div><h2>${esc(item.title)}</h2><p class="drawer-muted">${item.population}</p><div class="drawer-price"><strong>${formatPrice(isBuy ? item.price : item.current)}</strong><span>${isBuy ? "平台一口价" : `${item.bids} 次出价`}</span></div><div class="drawer-facts"><div><small>证书编号</small><strong>PSA ${item.cert}</strong></div><div><small>卖家</small><strong>${item.seller}</strong></div><div><small>库存状态</small><strong>${item.stock}</strong></div><div><small>剩余时间</small><strong>${item.ends}</strong></div></div><div class="drawer-actions"><button class="primary-button full" data-action="${isBuy ? "buy" : "bid"}" data-id="${item.id}">${isBuy ? "立即购买" : "去竞价"}</button><button class="outline-button full" data-action="favorite-item" data-id="${item.id}">${item.favorite ? "♥ 已收藏" : "♡ 收藏商品"}</button></div><div class="drawer-section"><h3>出价记录</h3><div class="bid-history"><div><span>匿名用户 42</span><strong>${formatPrice(item.current)}</strong><small>刚刚</small></div><div><span>匿名用户 31</span><strong>${formatPrice(Math.max(0, item.current - 200))}</strong><small>2 分钟前</small></div><div><span>匿名用户 08</span><strong>${formatPrice(Math.max(0, item.current - 500))}</strong><small>8 分钟前</small></div></div></div></div>`;
  if (type === "bid") inner = `<div class="drawer-product compact-product"><div class="mini-product"><img src="${item.image}" alt="${esc(item.short)}" /><div><strong>${esc(item.short)}</strong><span>${item.grade} · 当前价 ${formatPrice(item.current)}</span></div></div><div class="drawer-heading"><span>本次出价</span><strong>${formatPrice(item.current + 200)}</strong></div><form class="trade-form" data-form="bid" data-id="${item.id}"><label>出价金额<input name="amount" type="number" min="${item.current + 100}" step="100" value="${item.current + 200}" /></label><p>最低加价 ¥100 · 可用授信额度 ¥3,000</p><button class="primary-button full" type="submit">确认出价</button></form><div class="drawer-section"><h3>出价记录</h3><div class="bid-history"><div><span>匿名用户 42</span><strong>${formatPrice(item.current)}</strong><small>领先</small></div><div><span>匿名用户 31</span><strong>${formatPrice(item.current - 200)}</strong><small>2 分钟前</small></div></div></div></div>`;
  if (type === "buy") inner = `<div class="drawer-product compact-product"><div class="mini-product"><img src="${isB2B ? item.image : item.image}" alt="${esc(item.title)}" /><div><strong>${esc(item.title)}</strong><span>${isB2B ? `${item.pack} · ${item.sku}` : `${item.grade} · ${item.cert}`}</span></div></div><div class="checkout-lines"><div><span>商品金额</span><strong>${formatPrice(item.price)}</strong></div><div><span>国内配送</span><strong>待确认</strong></div><div class="total"><span>应付金额</span><strong>${formatPrice(item.price)}</strong></div></div><form class="trade-form" data-form="buy" data-id="${item.id}"><label>收货地址<select><option>上海市 · 徐汇区 · 收藏卡仓库</option><option>北京市 · 朝阳区 · 默认地址</option></select></label><button class="primary-button full" type="submit">确认购买并支付</button></form><p class="drawer-note">订单创建后将锁定商品，支付完成后进入发货流程。</p></div>`;
  if (type === "b2b") inner = `<div class="drawer-product compact-product"><div class="drawer-b2b-image ${item.tint}"><img src="${item.image}" alt="${esc(item.title)}" /><span>GECA<br /><b>${item.category}</b></span></div><div class="drawer-kicker"><span>${item.pack}</span><span>${item.sku}</span></div><h2>${esc(item.title)}</h2><p class="drawer-muted">适合卡店和收藏者批量采购，支持国内配送。</p><div class="drawer-price"><strong>${formatPrice(item.price)}</strong><span>${item.stock} 件库存</span></div><label class="quantity-field">采购数量<input id="b2bQty" type="number" value="1" min="1" max="${item.stock}" /></label><button class="primary-button full" data-action="add-cart" data-id="${item.id}">加入购物车</button><button class="outline-button full" data-action="buy-b2b" data-id="${item.id}">立即购买</button></div>`;
  return `<div class="drawer-layer"><button class="drawer-backdrop" data-action="close-drawer" aria-label="关闭"></button><aside class="side-drawer"><div class="drawer-top"><span>${type === "bid" ? "出价" : type === "buy" ? "确认订单" : isB2B ? "商品详情" : "商品详情"}</span><button class="icon-button" data-action="close-drawer" aria-label="关闭">×</button></div>${inner}</aside></div>`;
}

function renderPage() {
  renderHeaderState();
  const page = state.page === "home" ? renderHome() : state.page === "catalog" ? renderCatalog() : state.page === "b2b" ? renderB2B() : ["bids", "orders", "offers", "favorites"].includes(state.page) ? renderAccountPage(state.page) : renderAuction();
  app.innerHTML = page + renderDrawer();
  document.body.classList.toggle("no-scroll", Boolean(state.drawer));
}

function navigate(page) {
  if (["bids", "orders", "offers", "favorites"].includes(page) && !state.loggedIn) {
    return showToast("请先登录后查看账户内容");
  }
  if (state.page === page) return;
  state.page = page;
  state.search = "";
  state.drawer = null;
  state.auctionMenuOpen = false;
  setLoading(page);
}

function openDrawer(type, id) {
  state.drawer = { type, id };
  renderPage();
}

function clearSearch() {
  state.search = "";
  globalSearch.value = "";
  renderPage();
}

function addToCart(id) {
  if (!state.loggedIn) return showToast("请先登录后使用购物车");
  const item = findB2B(id);
  if (!item) return;
  const existing = state.cart.find((cartItem) => cartItem.id === id);
  if (existing) existing.quantity += 1;
  else state.cart.push({ id, quantity: 1 });
  showToast(`${item.category} 已加入购物车`);
  state.drawer = null;
  renderPage();
}

function toggleFavorite(id) {
  const item = findAuction(id);
  if (item) item.favorite = !item.favorite;
  const card = catalogCards.find((catalogItem) => catalogItem.id === id || catalogItem.catalogId === id);
  if (card) card.collected = !card.collected;
  showToast(item?.favorite || card?.collected ? "已加入收藏" : "已取消收藏");
  renderPage();
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  if (action === "navigate") navigate(target.dataset.page);
  if (action === "auction-nav") { navigate("auction"); }
  if (action === "set-mode") { state.auctionMode = target.dataset.mode; if (state.page !== "auction") navigate("auction"); else renderPage(); }
  if (action === "detail") openDrawer("detail", target.dataset.id);
  if (action === "catalog-detail") openDrawer("detail", target.dataset.id);
  if (action === "bid") { if (!state.loggedIn) return showToast("请先登录后参与竞价"); openDrawer("bid", target.dataset.id); }
  if (action === "buy") { if (!state.loggedIn) return showToast("请先登录后购买"); openDrawer("buy", target.dataset.id); }
  if (action === "b2b-detail") openDrawer("b2b", target.dataset.id);
  if (action === "open-offer") {
    if (!state.loggedIn) return showToast("请先登录后查看议价详情");
    openDrawer("offer", target.dataset.id);
  }
  if (action === "restart-offer") {
    const record = offerRecords.find((item) => item.id === target.dataset.id);
    if (!record) return;
    record.status = "negotiating";
    record.statusLabel = "议价中";
    record.detailState = "negotiating";
    record.remaining = Math.max(record.remaining, 3);
    record.otherOffer = null;
    record.rejection = "";
    record.sellerNew = false;
    renderPage();
    return showToast("新的议价已开启");
  }
  if (action === "favorite-item" || action === "catalog-favorite") { if (!state.loggedIn) return showToast("请先登录后收藏"); toggleFavorite(target.dataset.id); }
  if (action === "favorite-filter") { state.favoritesOnly = !state.favoritesOnly; renderPage(); }
  if (action === "catalog-only") { state.catalogOnly = !state.catalogOnly; renderPage(); }
  if (action === "reset-filters") { state.search = ""; state.favoritesOnly = false; state.auctionMode = "auction"; globalSearch.value = ""; renderPage(); }
  if (action === "clear-search") clearSearch();
  if (action === "retry") { setLoading(state.page); }
  if (action === "close-drawer") { state.drawer = null; renderPage(); }
  if (action === "add-cart") addToCart(target.dataset.id);
  if (action === "buy-b2b") openDrawer("buy", target.dataset.id);
  if (action === "b2b-category") { state.b2bCategory = target.dataset.category; renderPage(); }
  if (action === "offer-filter") { state.offerStatus = target.dataset.status; renderPage(); }
  if (action === "refresh-offers") showToast("议价记录已刷新");
  if (action === "offer-action") {
    const record = offerRecords.find((item) => item.id === target.dataset.id);
    if (record && target.dataset.operation === "cancel") {
      record.status = "canceled";
      record.statusLabel = "已取消";
      record.detailState = "canceled";
      state.drawer = null;
      renderPage();
      return showToast("议价已取消");
    }
    if (record && target.dataset.operation === "accept") {
      record.status = "accepted";
      record.statusLabel = "已接受";
      record.detailState = "accepted";
      state.drawer = null;
      renderPage();
      return showToast("已接受对方报价");
    }
    showToast(target.dataset.message || "操作已完成");
  }
  if (action === "cart") openCart();
  if (action === "favorite") { state.page = "auction"; state.favoritesOnly = true; state.search = ""; setLoading("auction"); }
  if (action === "account") navigate("offers");
  if (action === "login-demo") { state.loggedIn = true; state.auctionMenuOpen = false; renderPage(); showToast("登录成功"); }
  if (action === "register-demo") { state.loggedIn = true; state.auctionMenuOpen = false; renderPage(); showToast("注册成功，已登录"); }
  if (action === "logout") { state.loggedIn = false; state.auctionMenuOpen = false; renderPage(); showToast("已退出登录"); }
  if (action === "toast") showToast(target.dataset.message);
  if (action === "scroll-list") document.querySelector("#auction-list, #b2b-list")?.scrollIntoView({ behavior: "smooth" });
});

document.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-form]");
  if (!form) return;
  event.preventDefault();
  if (form.dataset.form === "bid") {
    const amount = Number(new FormData(form).get("amount"));
    const item = findAuction(form.dataset.id);
    if (!item || amount <= item.current) return showToast(`出价需高于当前价 ${formatPrice(item.current)}`);
    item.current = amount;
    item.bids += 1;
    state.drawer = null;
    renderPage();
    showToast("出价成功，你暂时领先");
  }
  if (form.dataset.form === "buy") {
    state.drawer = null;
    renderPage();
    showToast("订单已创建，等待支付");
  }
  if (form.dataset.form === "offer") {
    const record = offerRecords.find((item) => item.id === form.dataset.id);
    const amount = Number(new FormData(form).get("amount"));
    if (!record || !Number.isFinite(amount) || amount <= 0) return showToast("请输入有效的议价金额");
    record.myOffer = amount;
    record.status = "negotiating";
    record.statusLabel = "议价中";
    record.detailState = "negotiating";
    record.sellerNew = false;
    record.otherOffer = null;
    record.remaining = Math.max(0, record.remaining - 1);
    state.drawer = null;
    renderPage();
    showToast("议价已发送，等待对方回复");
  }
});

globalSearch.addEventListener("input", () => {
  state.search = globalSearch.value;
  renderPage();
});

document.addEventListener("change", (event) => {
  if (event.target.matches('[data-filter="sort"]')) showToast(`已按「${event.target.options[event.target.selectedIndex].text}」排序`);
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); globalSearch.focus(); }
  if (event.key === "Escape") { state.drawer = null; renderPage(); }
});

const auctionNavWrap = document.querySelector(".nav-dropdown-wrap");
auctionNavWrap.addEventListener("mouseenter", () => {
  if (!state.loggedIn) return;
  state.auctionMenuOpen = true;
  renderHeaderState();
});
auctionNavWrap.addEventListener("mouseleave", () => {
  state.auctionMenuOpen = false;
  renderHeaderState();
});

function openCart() {
  if (!state.loggedIn) return showToast("请先登录后使用购物车");
  if (!state.cart.length) return showToast("购物车还是空的");
  const items = state.cart.map(({ id, quantity }) => { const item = findB2B(id); return `<div class="cart-line"><img src="${item.image}" alt="${esc(item.title)}" /><div><strong>${esc(item.title)}</strong><span>${quantity} 件 · ${formatPrice(item.price * quantity)}</span></div></div>`; }).join("");
  state.drawer = { type: "cart", id: "cart" };
  app.innerHTML = `<div class="drawer-layer"><button class="drawer-backdrop" data-action="close-drawer" aria-label="关闭"></button><aside class="side-drawer"><div class="drawer-top"><span>购物车</span><button class="icon-button" data-action="close-drawer">×</button></div><div class="cart-drawer-body">${items}<div class="checkout-lines total-cart"><div class="total"><span>商品合计</span><strong>${formatPrice(state.cart.reduce((sum, cartItem) => { const item = findB2B(cartItem.id); return sum + item.price * cartItem.quantity; }, 0))}</strong></div></div><button class="primary-button full" data-action="toast" data-message="结算流程已准备好">去结算</button></div></aside></div>`;
  document.body.classList.add("no-scroll");
}

renderPage();
setTimeout(() => { state.loading = false; renderPage(); }, 420);
