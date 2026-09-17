import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight, BarChart3, Bell, Box, Check, ChevronDown, ChevronRight, CircleAlert, Clock3,
  FileText, Filter, Grid2X2, Heart, History, Layers, LayoutList, Menu, PackageCheck,
  Languages, Moon, Plus, ReceiptText, Search, Settings,
  ShieldCheck, ShoppingBag, SlidersHorizontal, Store, Sun, Users, WalletCards, X,
} from 'lucide-react'

const asset = (path) => `${import.meta.env.BASE_URL}assets/${path}`
const PAGE_ROUTES = new Set(['home', 'market', 'offers', 'orders', 'bids', 'favorites', 'b2b', 'catalog', 'ebay', 'grading'])
const pageFromLocation = () => {
  const basePath = import.meta.env.BASE_URL
  const relativePath = window.location.pathname.startsWith(basePath)
    ? window.location.pathname.slice(basePath.length)
    : window.location.pathname.replace(/^\//, '')
  const page = relativePath.split('/').filter(Boolean)[0] || 'home'
  return PAGE_ROUTES.has(page) ? page : 'home'
}

const EN_TRANSLATIONS = {
  '拍卖':'Auctions','图鉴':'Catalog','注册':'Sign up','登录':'Sign in','退出登录':'Sign out','请搜索':'Search',
  '钱包':'Wallet','授信额度':'Credit limit','订单':'Orders','议价':'Offers','我参与的竞价':'My bids','收藏列表':'Watchlist',
  '登录后管理交易':'Sign in to manage transactions','查看订单、议价记录、参与中的竞价与收藏商品。':'View orders, offers, active bids and saved items.',
  '立即登录':'Sign in','eBay管理':'eBay Management','评级服务':'Grading Service','打开导航':'Open navigation','账户菜单':'Account menu',
  '搜索球员、系列、评级':'Search player, series or grade','返回首页':'Back to home','切换布局':'Switch layout',
  '全球精选体育卡 · 正品保障 · 收藏新体验':'Curated global cards · Authenticity guaranteed · A better collecting experience',
  '立即探索':'Explore now','下午好':'Good afternoon','注册　|　入驻':'Sign up | Join us','登录镖卡后发现更多精彩':'Sign in to discover more',
  '欢迎回来，收藏家':'Welcome back, collector','进入我的交易':'Go to my activity','浏览记录':'History','商品收藏':'Saved items','店铺关注':'Following',
  '宝可梦高评分卡牌拍卖专场':'High-grade Pokemon auction','高评分热门卡牌':'Popular high-grade cards','珍稀评级卡限时竞拍':'Rare graded cards auction',
  '全球市场':'Global Marketplace','镖卡商店':'GECA Store','查看更多':'View more',
  'GECA是全面的体育卡价格指南。搜索数百万张交易卡和销售信息，追踪公开拍卖价格。':'GECA is a comprehensive card price guide. Search millions of trading cards, sales records and public auction results.',
  '筛选':'Filters','筛选条件':'Filters','重置所有':'Reset all','是否新秀':'Rookie only','只看评级':'Graded only','只看限量':'Limited only','只看签名':'Signed only',
  '价格区间':'Price range','年份':'Year','请选择年份':'Select year','品牌':'Brand','类目':'Category','出售类型':'Sale format','出售模式':'Sale mode','体育类型':'Sport','评级公司':'Grading company',
  '全部':'All','一口价':'Buy now','竞价':'Auction','可议价':'Offers accepted','球星卡':'Sports cards','娱乐卡':'Entertainment cards','国创卡片':'Chinese original cards','周边商品':'Accessories',
  '篮球':'Basketball','橄榄球':'Football','棒球':'Baseball','冰球':'Hockey','足球':'Soccer','竞价最高':'Most bids','价格最低':'Lowest price','价格最高':'Highest price','最新上架':'Newest',
  '没有找到相关藏品':'No matching collectibles','调整筛选条件或尝试其他搜索词。':'Adjust the filters or try another search.','清除筛选':'Clear filters',
  '去议价':'Make offer','参与竞价':'Place bid','立即购买':'Buy now','收藏商品':'Save item','已收藏':'Saved','次竞价':' bids',
  '商品详情':'Item details','商品编号':'Item ID','镖卡认证商店':'GECA verified store','当前价':'Current price','起拍价':'Starting price','运费':'Shipping',
  '立即出价':'Place bid','输入价格':'Enter price','议价记录':'Offer history','账户授信额度':'Account credit','单标授信额度':'Item credit',
  '商品属性':'Item details','物品编号':'Item number','厂商':'Manufacturer','系列':'Series','年代':'Year','是否新秀':'Rookie','是':'Yes','否':'No','同类产品':'Similar items',
  '登录镖卡':'Sign in to GECA','创建镖卡账户':'Create a GECA account','邮箱':'Email','密码':'Password','隐藏':'Hide','显示':'Show',
  '我已阅读并同意用户服务协议与隐私政策':'I agree to the Terms of Service and Privacy Policy','注册并登录':'Sign up and sign in','忘记密码？':'Forgot password?','已有账户':'Already have an account','注册新账户':'Create account','返回登录':'Back to sign in',
  '确认购买':'Confirm purchase','加入购物车':'Add to cart','您的议价':'Your offer','您的出价':'Your bid','我的出价':'My bid','当前价格':'Current price',
  '平台担保交易。提交后将按照交易及支付规则处理。':'Protected by GECA. Your request will be processed under the transaction and payment rules.',
  '取消':'Cancel','确认加入':'Add to cart','确认提交':'Confirm','确认购买':'Confirm purchase','请输入内容':'Type a message','发送':'Send','关闭议价抽屉':'Close offer drawer','议价抽屉':'Offer drawer',
  '议价金额':'Offer amount','待处理':'Pending','已过期':'Expired','已接受':'Accepted','议价中':'Negotiating','已成交':'Completed','已取消':'Cancelled',
  '我的钱包':'My wallet','拍卖中':'Live','已结束':'Ended','全部收藏':'All saved','待付款':'Awaiting payment','待发货':'Awaiting shipment','待收货':'In transit','已完成':'Completed',
  '有效期':'Valid until','您的议价已被拒绝':'Your offer was declined','取消议价':'Cancel offer','接受报价':'Accept offer','查看订单':'View order','一口价：':'Buy now:','剩余3次议价':'3 offers remaining','我的议价：':'My offer:','对方报价：':'Seller offer:',
  '立即付款':'Pay now','申诉':'Appeal','确认收货':'Confirm receipt','查看物流':'Track shipment','修改评价':'Edit review','评价':'Review','金额：':'Amount:','运费：':'Shipping:','总金额：':'Total:',
  '您的出价已是当前最高':'You are the highest bidder','您的出价已被超越':'You have been outbid','查看详情':'View details',
  '热销商品':'Best sellers','卡牌':'Cards','卡膜':'Sleeves','卡夹':'Card holders','评级卡周边':'Graded card accessories','收纳产品':'Storage','展示用具':'Display gear','周边产品':'Accessories',
  '全部包装':'All packaging','全部售卖形式':'All sale formats','现货':'In stock','预售':'Pre-order','单包':'Single pack','盒装':'Box','整箱':'Case','单品':'Single item','其他':'Other',
  '卡牌专用卡具 & 全套周边':'Card protection & accessories','整箱原盒卡牌专区':'Sealed card cases','加入购物车':'Add to cart','个SKU':' SKUs','选择规格':'Choose option','标准装':'Standard','整箱采购':'Case order',
  '现货商品，预计付款后 48 小时内发出。批量采购可在购物车中统一结算。':'In-stock items ship within 48 hours after payment. Bulk orders can be checked out together in the cart.',
  '宝可梦':'Pokemon','航海王':'One Piece','张卡片':' cards','图鉴筛选':'Catalog filters','语言':'Language','日文':'Japanese','英文':'English','中文':'Chinese','繁中':'Traditional Chinese','世代':'Generation',
  '扩充包':'Expansion','补充包':'Booster','构筑':'Deck','推广卡':'Promo','强化包 绯红薄雾':'Crimson Haze Expansion','补充包 异度审判':'Cyber Judge Booster','补充包 狂野之力':'Wild Force Booster',
  '市场价':'market price','未评级市场价':'Raw market price','近30日成交':'Sales in 30 days','价格趋势':'Price trend','数据更新时间':'Last updated','今日':'Today','笔':' sales','关闭详情':'Close details',
  '首页':'Home','AI发布':'AI Listing','模板管理':'Templates','发布商品':'List items','我的仓库':'My inventory','委托中心':'Consignment','在售商品':'Active listings','功德箱':'Donation box',
  '订单管理':'Order management','订单状态':'Order status','议价Offer':'Offers','财务管理':'Finance','Biu豆管理':'Biu credits','回款详情':'Payouts','其他设置':'Settings','地址管理':'Addresses','eBay通知':'eBay notifications','服务费收取方式':'Fee settings','员工管理':'Staff','客户管理':'Customers',
  '平台统计':'Platform overview','eBay在售竞拍商品':'Active eBay auctions','eBay在售固价商品':'Active fixed-price listings','待付款订单数':'Orders awaiting payment','待处理Offer数':'Pending offers',
  '欢迎登录':'Welcome','一站式卡牌国际交易平台，连接全球收藏家，让每一张卡牌价值最大化':'A one-stop international card marketplace connecting collectors worldwide.',
  '查看全部':'View all','eBay商品刊登':'eBay listing published','eBay商品截标':'eBay listing ended','eBay商品即将截标':'eBay listing ending soon',
  '统一管理 eBay 商品、订单与账户信息':'Manage eBay listings, orders and account details in one place','新建':'New','搜索标题、商品编号':'Search title or item ID','全部状态':'All statuses','处理中':'Processing','查询':'Search',
  '商品':'Item','编号':'ID','状态':'Status','价格':'Price','更新时间':'Updated','操作':'Actions','已同步':'Synced',
  'PSA送评订单':'PSA grading orders','评级卡片列表':'Graded cards','我的账单':'Billing','合作方专属送评':'Partner grading service','自动整理订单':'Automatic order sorting','实时状态更新':'Live status updates','批量提交':'Bulk submission','全流程可追踪':'End-to-end tracking','快速创建':'Quick create',
  '全部机构':'All providers','PSA美国':'PSA US','CGC美国':'CGC US','送评订单号：请输入':'Enter grading order ID','重置':'Reset','待邮寄':'To ship','待入库':'Awaiting intake','平台待确认':'Awaiting confirmation','平台已确认':'Confirmed','异常订单':'Issue','草稿箱':'Drafts','合并发货':'Combine shipments',
  '序号':'No.','订单状态':'Order status','细节图':'Images','送评订单号':'Grading order ID','评级机构':'Provider','包含客户数':'Customers','包含送评类型':'Service types','卡片数量':'Cards','预计评级费用':'Estimated fee','去发货':'Ship now','物流详情':'Tracking details','张':' cards','条':' records',
  '未来收藏家的世界':'The world of future collectors','协议政策':'Policies','用户服务协议':'Terms of Service','用户注销协议':'Account Cancellation','卖家入驻协议':'Seller Agreement','隐私政策':'Privacy Policy','交易市场':'Marketplace','竞价专区':'Auctions','即将结束的宝贝':'Ending soon','最新上架的宝贝':'New arrivals','交易规则':'Trading Rules','信息资讯':'Information','关于镖卡':'About GECA','新手入门':'Getting Started','联系我们':'Contact Us','关注或联系我们':'Follow or contact us','扫码下载APP':'Download the app','关注镖卡公众号':'Follow GECA','版权所有':'All rights reserved',
  'ICP证：深ICP备12022202号　增值电信业务经营许可证：深B2-20202262':'ICP License: Shen ICP 12022202 · Value-added Telecom License: Shen B2-20202262',
  '浅色模式':'Light mode','深色模式':'Dark mode','切换为英文':'Switch to English','切换为中文':'Switch to Chinese','收起侧边栏':'Collapse sidebar','展开侧边栏':'Expand sidebar',
  '状态筛选':'Status filter','商品分类':'Product categories','图鉴分类':'Catalog categories','收藏热爱，从这一张开始':'Collect the passion. Start with one card.',
  '共':'Total','件藏品':'collectibles','件商品':'items','已选':'Selected','个订单，进入合并发货':'orders selected. Continue to combine shipments','登录成功':'Signed in successfully','已退出登录':'Signed out',
  '订单已创建，请在订单中心完成支付':'Order created. Complete payment in Orders.','商品已加入购物车':'Item added to cart','议价已提交':'Offer submitted','出价成功':'Bid placed successfully',
  '已取消收藏':'Removed from saved items','已加入收藏':'Added to saved items','钱包功能将在资金中心开放':'Wallet will be available in the Finance Center','筛选条件已应用':'Filters applied',
  'Hi，小S':'Hi, S','宝可梦旗舰店':'Pokemon Flagship Store','倒计时':'Time left','个SKU':' SKUs','快速创建送评订单':'Quick-create grading order',
  '您的商品 2022-23 Panini Spectra Zach Randolph Auto #LS-ZRD 6/49 已上架到 eBay。':'Your item 2022-23 Panini Spectra Zach Randolph Auto #LS-ZRD 6/49 was listed on eBay.',
  '商品 2021-22 Panini Origins Isaiah Livers 05/49 已截标，截标价为 $1.00。':'2021-22 Panini Origins Isaiah Livers 05/49 ended at $1.00.',
  '商品 2021-22 Panini Origins Isaiah Livers 05/49 即将截标，当前价格为 $1.00。':'2021-22 Panini Origins Isaiah Livers 05/49 is ending soon. Current price: $1.00.',
  '商品 2021-22 Panini Prizm JA MORANT 已截标，截标价为 $5.50。':'2021-22 Panini Prizm JA MORANT ended at $5.50.',
  'Panini Prizm LeBron James 即将截标，当前价格为 $1.25。':'Panini Prizm LeBron James is ending soon. Current price: $1.25.',
  '您的商品 2022-23 Panini Spectra Zach Randolph Auto 已上架到 eBay。':'Your item 2022-23 Panini Spectra Zach Randolph Auto was listed on eBay.',
  'G3-磁吸保护【PSA35pt（薄）】适用PSA35pt评级卡 兼容CGC/CCIC':'G3 Magnetic Case for PSA 35pt graded cards, compatible with CGC/CCIC',
  'GECA镖卡【保护壳内胆】适配35PT-130PT卡砖 搭配镖卡G13使用':'GECA protective insert for 35PT-130PT slabs, compatible with G13',
  'GECA半刚性卡夹 评级卡夹 适用球星卡 TCG 高清保护':'GECA semi-rigid card holder for sports and TCG cards',
  'GECA看卡品便携放大镜【方便携带】专业收藏鉴赏工具':'GECA portable magnifier for professional card inspection',
  'GECA水晶盾 适配评级卡PSA CGC 高透防护保护壳':'GECA Crystal Shield, high-clarity PSA/CGC slab protector',
  '镖卡G3评级卡专用保护壳 收藏展示两不误':'GECA G3 graded card protector for storage and display',
  'GECA评级卡保护壳内胆 适配35-130PT卡砖':'GECA graded card case insert for 35-130PT slabs',
  '半刚性评级卡夹 送评收纳50枚装':'Semi-rigid grading card holders, pack of 50',
  'GECA 35PT高清卡夹 3×4英寸标准规格':'GECA 35PT clear card holder, standard 3 x 4 inch',
}

const ORIGINAL_TEXT = new WeakMap()
const ORIGINAL_ATTRS = new WeakMap()

function translateText(value) {
  if (!value || !/[\u3400-\u9fff]/.test(value)) return value
  const leading = value.match(/^\s*/)?.[0] || ''
  const trailing = value.match(/\s*$/)?.[0] || ''
  const source = value.trim()
  if (EN_TRANSLATIONS[source]) return `${leading}${EN_TRANSLATIONS[source]}${trailing}`
  let translated = source
    .replace(/^共\s*(\d+)\s*件藏品$/, '$1 collectibles')
    .replace(/^查看\s*(\d+)\s*件商品$/, 'View $1 items')
    .replace(/^已选\s*(\d+)\s*条$/, '$1 selected')
    .replace(/^共\s*(\d+)\s*条$/, '$1 total')
    .replace(/^(\d+)次竞价$/, '$1 bids')
    .replace(/^商品编号\s+/, 'Item ID ')
    .replace(/^BK123434211，欢迎登录$/, 'Welcome, BK123434211')
    .replace(/^3张$/, '3 cards')
  if (translated !== source) return `${leading}${translated}${trailing}`
  for (const [zh,en] of Object.entries(EN_TRANSLATIONS).sort((a,b) => b[0].length-a[0].length)) translated = translated.replaceAll(zh,en)
  return `${leading}${translated}${trailing}`
}

function LocaleRuntime({ language }) {
  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
    const applyText = (node) => {
      if (!node?.parentElement || ['SCRIPT','STYLE'].includes(node.parentElement.tagName)) return
      if (!ORIGINAL_TEXT.has(node)) ORIGINAL_TEXT.set(node,node.nodeValue)
      let original = ORIGINAL_TEXT.get(node)
      if (node.nodeValue !== original && node.nodeValue !== translateText(original)) {
        original = node.nodeValue
        ORIGINAL_TEXT.set(node,original)
      }
      const next = language === 'en' ? translateText(original) : original
      if (node.nodeValue !== next) node.nodeValue = next
    }
    const applyElement = (element) => {
      if (!(element instanceof Element)) return
      if (element.tagName === 'OPTION' && !element.hasAttribute('value')) element.setAttribute('value',element.textContent.trim())
      const tracked = ORIGINAL_ATTRS.get(element) || {}
      ;['placeholder','title','aria-label','alt'].forEach((name) => {
        if (element.hasAttribute(name) && tracked[name] == null) tracked[name] = element.getAttribute(name)
        const current = element.getAttribute(name)
        if (tracked[name] != null && current !== tracked[name] && current !== translateText(tracked[name])) tracked[name] = current
        if (tracked[name] != null) element.setAttribute(name,language === 'en' ? translateText(tracked[name]) : tracked[name])
      })
      ORIGINAL_ATTRS.set(element,tracked)
    }
    const localize = (root) => {
      if (root.nodeType === Node.TEXT_NODE) return applyText(root)
      if (!(root instanceof Element)) return
      applyElement(root)
      const walker = document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT)
      while (walker.nextNode()) walker.currentNode.nodeType === Node.TEXT_NODE ? applyText(walker.currentNode) : applyElement(walker.currentNode)
    }
    localize(document.getElementById('root'))
    const observer = new MutationObserver((mutations) => mutations.forEach((mutation) => {
      mutation.addedNodes.forEach(localize)
      if (mutation.type === 'characterData') applyText(mutation.target)
    }))
    observer.observe(document.getElementById('root'),{subtree:true,childList:true,characterData:true})
    return () => observer.disconnect()
  },[language])
  return null
}

const PRODUCTS = [
  ['GE-001', '2007 Topps Chrome Refractor Kevin Durant ROOKIE /1499 #131 PSA 10 GEM MINT', 'Mega Cracks Barca Campeon', 'PSA 9', 1239, 999, '99D 10H 20M', 'fanatics-01.jpg', '竞价'],
  ['GE-002', '2009 Pokemon Platinum Holo Palkia G LV.X #125 PSA 10 GEM MINT', 'Pokemon Platinum', 'PSA 10', 7410, 78, '04D 17H 06M', 'fanatics-02.jpg', '竞价'],
  ['GE-003', '2002 Pokemon Neo Destiny 1st Edition Holo Dark Gengar #6', 'Neo Destiny 1st Edition', 'PSA 10', 9400, 126, '02D 08H 42M', 'fanatics-03.jpg', '一口价'],
  ['GE-004', '2007 Pokemon Secret Wonders Reverse Holo Salamence #18', 'Secret Wonders', 'PSA 10', 1010, 63, '06D 12H 09M', 'fanatics-04.jpg', '可议价'],
  ['GE-005', '2011 Pokemon Call Of Legends Reverse Holo Deoxys #2', 'Call Of Legends', 'PSA 10', 760, 43, '08D 02H 16M', 'fanatics-05.jpg', '竞价'],
  ['GE-006', '2008 Pokemon Majestic Dawn Holo Moltres #10', 'Majestic Dawn', 'PSA 10', 10850, 91, '01D 21H 33M', 'fanatics-06.jpg', '一口价'],
  ['GE-007', '2011 Pokemon Call Of Legends Prerelease Holo Snorlax #33', 'Call Of Legends', 'PSA 10', 7410, 70, '07D 12H 18M', 'fanatics-07.jpg', '竞价'],
  ['GE-008', '2007 Pokemon EX Power Keepers Reverse Holo Blaziken #5', 'EX Power Keepers', 'PSA 10', 1810, 58, '03D 16H 50M', 'fanatics-08.jpg', '可议价'],
  ['GE-009', '2024 Topps Update Elly De La Cruz Rookie Debut #US350', 'Topps Update', 'PSA 9', 2390, 35, '05D 10H 12M', 'figma-card.png', '竞价'],
  ['GE-010', '1999 Pokemon Base Set Shadowless Holo Ninetales #12', 'Base Set Shadowless', 'PSA 9', 4520, 48, '04D 17H 20M', 'fanatics-01.jpg', '一口价'],
  ['GE-011', '2023 Stadium Club Chrome UEFA Erling Haaland 1/1', 'Stadium Club Chrome', 'PSA 10', 16800, 84, '00D 19H 38M', 'fanatics-06.jpg', '可议价'],
  ['GE-012', 'Pokemon Neo Destiny Dark Gengar Holo Rare English', 'Neo Destiny', 'PSA 10', 28600, 112, '09D 04H 25M', 'fanatics-03.jpg', '竞价'],
].map(([id,title,series,grade,price,watchers,time,image,saleType], index) => ({
  id,title,series,grade,price,watchers,time,image:asset(image),saleType,
  rookie: index % 3 === 0, limited: index % 4 === 0, signed: index === 6,
  category: index < 2 ? '球星卡' : 'TCG', brand: index % 2 ? 'Topps' : 'Panini',
}))

const FILTER_SECTIONS = [
  ['品牌', ['Panini', 'Topps', 'Upper Deck']],
  ['类目', ['球星卡', '娱乐卡', 'TCG', '国创卡片', '周边商品']],
  ['出售类型', ['全部', '一口价', '竞价', '可议价']],
  ['体育类型', ['篮球', '橄榄球', '棒球', '冰球', '足球']],
  ['评级公司', ['PSA', 'CGC', 'BGS', 'CCIC']],
]

const B2B_PRODUCTS = [
  ['B2B-001', 'G3-磁吸保护【PSA35pt（薄）】适用PSA35pt评级卡 兼容CGC/CCIC', '卡牌', '盒装', 63, 'b2b-01.png'],
  ['B2B-002', 'GECA镖卡【保护壳内胆】适配35PT-130PT卡砖 搭配镖卡G13使用', '卡膜', '其他', 5.8, 'b2b-02.png'],
  ['B2B-003', 'GECA半刚性卡夹 评级卡夹 适用球星卡 TCG 高清保护', '卡夹', '单包', 17, 'b2b-03.png'],
  ['B2B-004', 'G3-磁吸保护【PSA35pt（薄）】适用PSA35pt评级卡 兼容CGC/CCIC', '卡夹', '盒装', 9.5, 'b2b-04.png'],
  ['B2B-005', 'GECA看卡品便携放大镜【方便携带】专业收藏鉴赏工具', '展示用具', '单品', 39, 'b2b-05.png'],
  ['B2B-006', 'GECA水晶盾 适配评级卡PSA CGC 高透防护保护壳', '收纳产品', '整箱', 29, 'b2b-06.png'],
  ['B2B-007', '镖卡G3评级卡专用保护壳 收藏展示两不误', '卡牌', '盒装', 49, 'b2b-01.png'],
  ['B2B-008', 'GECA评级卡保护壳内胆 适配35-130PT卡砖', '卡膜', '整箱', 18, 'b2b-02.png'],
  ['B2B-009', '半刚性评级卡夹 送评收纳50枚装', '卡夹', '盒装', 42, 'b2b-03.png'],
  ['B2B-010', 'GECA 35PT高清卡夹 3×4英寸标准规格', '周边产品', '整箱', 88, 'b2b-04.png'],
].map(([id,title,category,pack,price,image]) => ({ id,title,category,pack,price,image:asset(image),series:category,grade:pack,saleType:'一口价' }))

const CATALOG_PRODUCTS = [
  ['CAT-001', '199/165', 'SAR', 'Charizard ex', 845, 329.8, 'catalog-01.png', '日文', 'MEGA世代'],
  ['CAT-002', '200/165', 'SAR', 'Blastoise ex', 284, 89.5, 'catalog-02.png', '日文', 'MEGA世代'],
  ['CAT-003', '198/165', 'SAR', 'Venusaur ex', 265, 79.2, 'catalog-03.png', '日文', 'MEGA世代'],
  ['CAT-004', '168/165', 'AR', 'Charmander', 194, 54.2, 'catalog-04.png', '英文', '扩充包'],
  ['CAT-005', '202/165', 'SAR', 'Zapdos ex', 188, 62.4, 'catalog-05.png', '英文', '扩充包'],
  ['CAT-006', '201/165', 'SAR', 'Alakazam ex', 178, 58.4, 'catalog-06.png', '日文', '补充包'],
  ['CAT-007', '170/165', 'AR', 'Squirtle', 152, 42.5, 'catalog-07.png', '英文', '补充包'],
  ['CAT-008', '173/165', 'AR', 'Pikachu', 145, 36.9, 'catalog-08.png', '中文', '补充包'],
  ['CAT-009', '166/165', 'AR', 'Bulbasaur', 138, 35.8, 'catalog-09.png', '中文', '构筑'],
  ['CAT-010', '203/165', 'SAR', "Erika's Invitation", 126, 32.4, 'catalog-10.png', '日文', '构筑'],
  ['CAT-011', '205/165', 'SAR', 'Mew ex', 218, 72.8, 'catalog-11.png', '繁中', '推广卡'],
  ['CAT-012', '204/165', 'SAR', "Giovanni's Charisma", 112, 29.9, 'catalog-12.png', '繁中', '推广卡'],
].map(([id,number,rarity,title,psa,raw,image,language,generation]) => ({ id,number,rarity,title,psa,raw,image:asset(image),language,generation }))

const money = (value) => `¥ ${Number(value).toLocaleString('zh-CN', { minimumFractionDigits: 2 })}`
const cn = (...items) => items.filter(Boolean).join(' ')
const trackCardPointer = (event) => {
  const bounds = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--card-pointer-x',`${event.clientX-bounds.left}px`)
  event.currentTarget.style.setProperty('--card-pointer-y',`${event.clientY-bounds.top}px`)
}

function SegmentedTabs({ items, value, onChange, label, equal=false, className='' }) {
  return <div className={cn('segmented-tabs flex max-w-full overflow-x-auto rounded border border-line bg-white p-1',className)} role="tablist" aria-label={label}>{items.map((item)=><button key={item} type="button" role="tab" aria-selected={value===item} onClick={()=>onChange(item)} className={cn('min-h-8 shrink-0 whitespace-nowrap rounded-[12px] px-4 py-1 text-sm font-medium leading-5 transition',equal?'min-w-0 flex-1':'min-w-[72px]',value===item?'bg-ink text-white':'text-muted hover:text-ink')}>{item}</button>)}</div>
}

function App() {
  const [page, setPage] = useState(pageFromLocation)
  const [language,setLanguage] = useState(() => localStorage.getItem('geca-language') || 'zh')
  const [theme,setTheme] = useState(() => localStorage.getItem('geca-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark':'light'))
  const [loggedIn, setLoggedIn] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [loginMode, setLoginMode] = useState('login')
  const [pending, setPending] = useState(null)
  const [action, setAction] = useState(null)
  const [detail, setDetail] = useState(null)
  const [favorites, setFavorites] = useState(new Set())
  const [query, setQuery] = useState('')
  const [toast, setToast] = useState('')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page, detail])

  useEffect(() => {
    const handlePopState = () => setPage(pageFromLocation())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    localStorage.setItem('geca-language',language)
    document.title = language === 'zh' ? 'GECA | 收藏卡交易门户':'GECA | Collectibles Marketplace'
    document.querySelector('meta[name="description"]')?.setAttribute('content',language === 'zh' ? 'GECA 镖卡收藏卡交易门户':'GECA collectibles marketplace for auctions, card data and grading services')
  },[language])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    localStorage.setItem('geca-theme',theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme === 'dark' ? '#181a1d':'#ffffff')
  },[theme])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(''), 2400)
    return () => clearTimeout(timer)
  }, [toast])

  const navigate = (next) => {
    setDetail(null)
    setPage(next)
    const basePath = import.meta.env.BASE_URL
    const nextPath = next === 'home' ? basePath : `${basePath}${next}/`
    if (window.location.pathname !== nextPath) window.history.pushState({}, '', nextPath)
  }

  const protectedAction = (nextAction) => {
    if (!loggedIn) {
      setPending(nextAction)
      setLoginMode('login')
      setLoginOpen(true)
      return
    }
    runAction(nextAction)
  }

  const runAction = (nextAction) => {
    if (nextAction.type === 'favorite') {
      setFavorites((current) => {
        const copy = new Set(current)
        copy.has(nextAction.product.id) ? copy.delete(nextAction.product.id) : copy.add(nextAction.product.id)
        return copy
      })
      setToast(favorites.has(nextAction.product.id) ? '已取消收藏' : '已加入收藏')
      return
    }
    if (nextAction.type === 'account') {
      navigate(nextAction.section || 'bids')
      return
    }
    setAction(nextAction)
  }

  const finishLogin = () => {
    setLoggedIn(true)
    setLoginOpen(false)
    setToast('登录成功')
    if (pending) {
      const nextAction = pending
      setPending(null)
      setTimeout(() => runAction(nextAction), 180)
    }
  }

  return (
    <div className="min-h-screen bg-white text-ink">
      <LocaleRuntime language={language} />
      <Header
        page={page}
        query={query}
        setQuery={setQuery}
        loggedIn={loggedIn}
        navigate={navigate}
        onSearch={() => !['b2b','catalog'].includes(page) && navigate('market')}
        openLogin={(mode='login') => { setLoginMode(mode); setLoginOpen(true) }}
        onAccount={(section) => protectedAction({ type: 'account', section })}
        onLogout={() => { setLoggedIn(false); navigate('home'); setToast('已退出登录') }}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
      />

      <main>
        {page === 'home' && <Home language={language} navigate={navigate} loggedIn={loggedIn} openLogin={() => setLoginOpen(true)} favorites={favorites} onAction={protectedAction} openDetail={setDetail} />}
        {page === 'market' && <Marketplace query={query} favorites={favorites} onAction={protectedAction} openDetail={setDetail} />}
        {['offers','orders','bids','favorites'].includes(page) && <AccountPage section={page} navigate={navigate} onAction={protectedAction} />}
        {page === 'b2b' && <B2BPage query={query} onAction={protectedAction} />}
        {page === 'catalog' && <CatalogPage query={query} />}
        {page === 'ebay' && <EbayManagementPage navigate={navigate} />}
        {page === 'grading' && <GradingServicePage navigate={navigate} />}
      </main>

      {page === 'home' && <Footer />}
      {detail && <ProductDetail product={detail} setProduct={setDetail} favorites={favorites} close={() => setDetail(null)} openMarket={() => navigate('market')} onAction={protectedAction} />}
      {loginOpen && <LoginDialog mode={loginMode} setMode={setLoginMode} close={() => { setLoginOpen(false); setPending(null) }} submit={finishLogin} />}
      {action && <ActionDialog action={action} close={() => setAction(null)} success={(message) => { setAction(null); setToast(message) }} />}
      <div className={cn('fixed bottom-6 left-1/2 z-[80] max-w-[calc(100vw-32px)] -translate-x-1/2 break-words rounded bg-ink px-5 py-3 text-center text-sm leading-5 text-white shadow-panel transition-all', toast ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0')} role="status">{toast}</div>
    </div>
  )
}

function Header({ page, query, setQuery, loggedIn, navigate, onSearch, openLogin, onAccount, onLogout, language, setLanguage, theme, setTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [auctionOpen, setAuctionOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center gap-3 px-5 sm:gap-6 lg:gap-10">
        <button onClick={() => navigate('home')} className="shrink-0" aria-label="返回首页">
          <img src={asset('geca-logo-primary.png')} alt="GECA" className="site-logo h-8 w-24 object-contain sm:w-[124px]" />
        </button>
        <form onSubmit={(e) => { e.preventDefault(); onSearch() }} className="relative hidden w-[200px] lg:block">
          <Search className="pointer-events-none absolute left-4 top-1/2 z-10 size-4 -translate-y-1/2 text-muted" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="请搜索" className="header-search-input h-10 w-full rounded-full pl-10 pr-4 text-sm outline-none ring-ink transition focus:ring-1" />
        </form>
        <nav className="hidden h-full items-center gap-6 lg:flex">
          <div className="relative h-full" onMouseEnter={() => setAuctionOpen(true)} onMouseLeave={() => setAuctionOpen(false)}>
            <button onClick={() => navigate('market')} className={cn('flex h-full items-center gap-1 border-b-[3px] px-4 text-base font-medium', page === 'market' || ['offers','orders','bids','favorites'].includes(page) || auctionOpen ? 'border-ink text-ink' : 'border-transparent text-muted')}>
              拍卖 <ChevronDown className="size-4" />
            </button>
            {auctionOpen && (
              <div className="absolute left-1/2 top-[72px] w-[280px] -translate-x-1/2 rounded-b bg-canvas p-4 shadow-panel">
                {loggedIn ? <>
                  <div className="relative overflow-hidden rounded bg-[#171717] p-5 text-white" style={{ backgroundImage:`linear-gradient(180deg,rgba(12,12,12,.72),#171717 82%),url('${asset('fanatics-06.jpg')}')`, backgroundPosition:'center 42%', backgroundSize:'cover' }}>
                    <span className="block text-sm">钱包</span><strong className="mt-2 block text-2xl">¥ 60,000.00</strong><span className="mt-5 block text-sm">授信额度</span><strong className="mt-2 block text-2xl">¥ 3,000.00</strong>
                  </div>
                  <div className="mt-3 overflow-hidden rounded bg-white py-2">
                    {[['订单','orders'],['议价','offers'],['我参与的竞价','bids'],['收藏列表','favorites']].map(([label,section]) => <button key={section} onClick={() => { onAccount(section); setAuctionOpen(false) }} className="block w-full px-5 py-3 text-left text-base hover:bg-canvas">{label}</button>)}
                  </div>
                </> : <>
                  <div className="rounded bg-[#171717] p-5 text-white"><strong className="text-lg">登录后管理交易</strong><p className="mt-2 text-xs leading-5 text-white/55">查看订单、议价记录、参与中的竞价与收藏商品。</p><button onClick={() => { openLogin('login'); setAuctionOpen(false) }} className="mt-5 h-9 w-full rounded-full bg-white text-sm text-ink">立即登录</button></div>
                  <div className="mt-3 overflow-hidden rounded bg-white py-2">
                    {[['订单','orders'],['议价','offers'],['我参与的竞价','bids'],['收藏列表','favorites']].map(([label,section]) => <button key={section} onClick={() => { onAccount(section); setAuctionOpen(false) }} className="block w-full px-5 py-3 text-left text-base hover:bg-canvas">{label}</button>)}
                  </div>
                </>}
              </div>
            )}
          </div>
          <button onClick={() => navigate('b2b')} className={cn('h-full border-b-[3px] px-4 text-base font-medium', page === 'b2b' ? 'border-ink text-ink' : 'border-transparent text-muted')}>B2B</button>
          <button onClick={() => navigate('catalog')} className={cn('h-full border-b-[3px] px-4 text-base font-medium', page === 'catalog' ? 'border-ink text-ink' : 'border-transparent text-muted')}>图鉴</button>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={() => setLanguage(language === 'zh' ? 'en':'zh')} className="flex h-10 min-w-10 items-center justify-center gap-1 rounded-full border border-line bg-white px-2 text-xs font-medium sm:px-3" title={language === 'zh' ? '切换为英文':'切换为中文'} aria-label={language === 'zh' ? '切换为英文':'切换为中文'}><Languages className="size-4"/><span className="hidden sm:inline">{language === 'zh' ? 'EN':'中'}</span></button>
          <button onClick={() => setTheme(theme === 'light' ? 'dark':'light')} className="grid size-10 place-items-center rounded-full border border-line bg-white" title={theme === 'light' ? '深色模式':'浅色模式'} aria-label={theme === 'light' ? '深色模式':'浅色模式'}>{theme === 'light' ? <Moon className="size-4"/>:<Sun className="size-4"/>}</button>
          {!loggedIn ? <>
            <button onClick={() => openLogin('register')} className="header-register-button hidden h-10 rounded-full px-5 text-sm font-medium sm:block">注册</button>
            <button onClick={() => openLogin('login')} className="h-10 rounded-full bg-ink px-4 text-sm font-medium text-white sm:px-5">登录</button>
          </> : (
            <div className="relative" onMouseEnter={() => setProfileOpen(true)} onMouseLeave={() => setProfileOpen(false)}>
              <button onFocus={() => setProfileOpen(true)} onClick={() => setProfileOpen((open) => !open)} className="grid size-10 place-items-center rounded-full bg-ink text-base font-medium text-white" aria-expanded={profileOpen} aria-label="账户菜单">S</button>
              {profileOpen && <div className="absolute right-0 top-10 w-[280px] pt-2"><div className="rounded bg-[#f4f4f4] p-5 shadow-panel">
                <div className="rounded bg-ink px-5 py-6 text-xl text-white">Hi，小S</div>
                <div className="mt-5 overflow-hidden rounded bg-white py-2">
                  {[['eBay管理','ebay'],['评级服务','grading']].map(([label,target]) => <button key={label} onClick={() => { navigate(target); setProfileOpen(false) }} className={cn('flex h-14 w-full items-center px-5 text-left text-base transition hover:bg-canvas',page===target&&'bg-canvas font-medium')}>{label}</button>)}
                </div>
                <button onClick={() => { onLogout(); setProfileOpen(false) }} className="mt-5 flex h-14 w-full items-center rounded bg-white px-5 text-left text-base transition hover:bg-canvas">退出登录</button>
              </div></div>}
            </div>
          )}
          <button onClick={() => setMenuOpen(!menuOpen)} className="grid size-10 place-items-center lg:hidden" aria-label="打开导航"><Menu className="size-5" /></button>
        </div>
      </div>
      {menuOpen && <div className="border-t border-black/10 bg-white p-4 lg:hidden">
        <form onSubmit={(e) => { e.preventDefault(); onSearch(); setMenuOpen(false) }} className="relative mb-3"><Search className="pointer-events-none absolute left-3 top-3 z-10 size-4 text-muted" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索球员、系列、评级" className="header-search-input h-10 w-full rounded pl-9 pr-3 text-sm outline-none" /></form>
        <div className="grid grid-cols-3 gap-2">{[['拍卖','market'],['B2B','b2b'],['图鉴','catalog']].map(([label,key]) => <button key={key} onClick={() => { navigate(key); setMenuOpen(false) }} className={cn('rounded px-3 py-2 text-sm', page === key ? 'bg-ink text-white' : 'bg-canvas')}>{label}</button>)}</div>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">{[['订单','orders'],['议价','offers'],['我参与的竞价','bids'],['收藏列表','favorites']].map(([label,section]) => <button key={section} onClick={() => { onAccount(section); setMenuOpen(false) }} className={cn('min-h-10 rounded px-3 py-2 text-sm leading-5',page === section ? 'bg-ink text-white':'bg-canvas')}>{label}</button>)}</div>
      </div>}
    </header>
  )
}

function Home({ language, navigate, loggedIn, openLogin, favorites, onAction, openDetail }) {
  return <div className="bg-[#fafafa] pt-8">
    <div className="mx-auto max-w-[1440px] px-5">
      <section className="grid gap-4 lg:grid-cols-[1fr_250px]">
        <div className="theme-light-content relative h-[260px] overflow-hidden rounded bg-[#ececec] sm:h-auto sm:min-h-[384px]">
          <img src={asset('hero-banner.png')} alt="收藏热爱，从这一张开始" className="absolute inset-0 size-full object-contain object-top sm:object-cover sm:object-left" />
          {language === 'en' && <h1 className="absolute left-[7.5%] top-[10%] z-[5] flex max-w-[72%] bg-white/90 px-2 py-1 text-[15px] font-black leading-tight backdrop-blur-md sm:top-[24%] sm:h-[72px] sm:w-[640px] sm:max-w-none sm:items-center sm:text-[32px]">Collect the passion. Start with one card.</h1>}
          <div className="absolute inset-0 flex max-w-[660px] flex-col justify-end px-8 pb-6 sm:justify-center sm:px-[88px] sm:pb-0 sm:pt-[112px]">
            <p className="text-sm sm:text-xl">全球精选体育卡 · 正品保障 · 收藏新体验</p>
            <button onClick={() => navigate('market')} className="mt-7 flex h-10 w-fit items-center gap-2 rounded-full bg-ink px-5 text-sm text-white">立即探索 <ArrowRight className="size-4" /></button>
          </div>
        </div>
        <aside className="theme-inverse-static flex min-h-[270px] flex-col items-center justify-center rounded bg-ink px-5 py-8 text-center text-white">
          <div className="grid size-14 place-items-center rounded-full bg-white text-2xl font-black text-ink">G</div>
          <strong className="mt-4 text-base">Hi~ 下午好</strong>
          {!loggedIn ? <><span className="mt-1 text-xs text-white/45">注册　|　入驻</span><p className="mt-10 text-sm text-white/50">登录镖卡后发现更多精彩</p><button onClick={openLogin} className="mt-3 h-10 w-full rounded-full bg-white text-sm font-medium text-ink">立即登录</button></> : <><span className="mt-1 text-xs text-white/45">欢迎回来，收藏家</span><button onClick={() => navigate('bids')} className="mt-10 h-10 w-full rounded-full bg-white text-sm font-medium text-ink">进入我的交易</button></>}
          <div className="mt-9 flex w-full justify-between text-[11px] text-white/70"><span className="flex flex-col items-center gap-2"><History className="size-5" />浏览记录</span><span className="flex flex-col items-center gap-2"><Heart className="size-5" />商品收藏</span><span className="flex flex-col items-center gap-2"><Store className="size-5" />店铺关注</span></div>
        </aside>
      </section>

      <section className="mt-4 grid gap-4 md:grid-cols-3">
        {[
          ['宝可梦高评分卡牌拍卖专场','feature-cards-1.png'],
          ['高评分热门卡牌','feature-cards-2.png'],
          ['珍稀评级卡限时竞拍','feature-cards-3.png'],
        ].map(([title,img]) => <button key={title} onClick={() => navigate('market')} className="theme-light-content relative h-[170px] overflow-hidden rounded bg-[#f0f0f0] text-left"><img src={asset('feature-bg.png')} alt="" className="absolute inset-0 size-full object-cover" /><img src={asset(img)} alt="" className="absolute bottom-[-52px] left-1/2 h-28 max-w-[76%] -translate-x-1/2 object-contain" /><strong className="relative z-10 block pt-4 text-center text-lg">{title}</strong><span className="relative z-10 mt-1 block text-center text-xs text-muted">登录镖卡后发现更多精彩</span></button>)}
      </section>
    </div>
    <HomeShelf title="全球市场" products={PRODUCTS.slice(0,4)} navigate={navigate} favorites={favorites} onAction={onAction} openDetail={openDetail} />
    <HomeShelf title="镖卡商店" products={PRODUCTS.slice(4,8)} navigate={navigate} favorites={favorites} onAction={onAction} openDetail={openDetail} />
  </div>
}

function HomeShelf({ title, products, navigate, ...cardProps }) {
  return <section className="mx-auto mt-8 max-w-[1440px] bg-white px-5 py-8 lg:px-6">
    <div className="mb-5 flex items-start justify-between gap-5"><div><h2 className="text-2xl font-medium">{title}</h2><p className="mt-3 max-w-5xl text-xs leading-5 text-muted">GECA是全面的体育卡价格指南。搜索数百万张交易卡和销售信息，追踪公开拍卖价格。</p></div><button onClick={() => navigate('market')} className="shrink-0 border-b border-ink text-sm">查看更多</button></div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} {...cardProps} />)}</div>
  </section>
}

function Marketplace({ query, favorites, onAction, openDetail }) {
  const [filters, setFilters] = useState({ rookie:false, graded:true, limited:false, signed:false, selected:[] })
  const [saleMode,setSaleMode] = useState('竞价')
  const [sort, setSort] = useState('竞价最高')
  const [view, setView] = useState('grid')
  const [filterOpen, setFilterOpen] = useState(false)
  const [maxPrice, setMaxPrice] = useState(30000)

  const toggleSelected = (label) => setFilters((f) => ({ ...f, selected: f.selected.includes(label) ? f.selected.filter((x) => x !== label) : [...f.selected, label] }))
  const clearFilters = () => { setFilters({ rookie:false, graded:true, limited:false, signed:false, selected:[] }); setMaxPrice(30000) }
  const switchSaleMode = (nextMode) => {
    setSaleMode(nextMode)
    setSort(nextMode === '竞价' ? '竞价最高':'价格最低')
    setFilters((current) => ({ ...current, selected:current.selected.filter((item) => !['一口价','竞价','可议价'].includes(item)) }))
  }
  const products = useMemo(() => {
    const q = query.toLowerCase().trim()
    let result = PRODUCTS.filter((p) => (!q || `${p.title} ${p.series} ${p.grade}`.toLowerCase().includes(q)) && p.price <= maxPrice && (!filters.rookie || p.rookie) && (!filters.limited || p.limited) && (!filters.signed || p.signed) && (saleMode === '竞价' ? p.saleType === '竞价' : p.saleType !== '竞价'))
    if (filters.selected.some((x) => ['一口价','竞价','可议价'].includes(x))) result = result.filter((p) => filters.selected.includes(p.saleType))
    return [...result].sort((a,b) => sort === '价格最低' ? a.price-b.price : sort === '价格最高' ? b.price-a.price : sort === '最新上架' ? b.id.localeCompare(a.id) : b.watchers-a.watchers)
  }, [query, filters, maxPrice, sort, saleMode])

  return <div className="min-h-screen bg-canvas">
    <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 px-5 pb-16 pt-5 lg:grid-cols-[220px_1fr]">
      <aside className="hidden lg:block"><Filters filters={filters} setFilters={setFilters} selected={filters.selected} toggleSelected={toggleSelected} clearFilters={clearFilters} maxPrice={maxPrice} setMaxPrice={setMaxPrice} /></aside>
      <section>
        <div className="flex min-h-14 flex-wrap items-center justify-between gap-3 py-2">
          <div className="flex flex-wrap items-center gap-3"><SegmentedTabs items={['竞价','一口价']} value={saleMode} onChange={switchSaleMode} label="出售模式"/><button onClick={() => setFilterOpen(true)} className="flex h-10 items-center gap-2 rounded border border-line bg-white px-4 text-sm lg:hidden"><Filter className="size-4" />筛选</button><span className="text-sm text-muted">共 {products.length} 件藏品</span></div>
          <div className="flex items-center gap-2"><select value={sort} onChange={(e) => setSort(e.target.value)} className="h-10 rounded border border-line bg-white px-4 text-sm outline-none">{saleMode==='竞价'&&<option>竞价最高</option>}<option>价格最低</option>{saleMode==='一口价'&&<option>价格最高</option>}<option>最新上架</option></select><button onClick={() => setView(view === 'grid' ? 'list' : 'grid')} className="grid size-10 place-items-center rounded border border-line bg-white" aria-label="切换布局">{view === 'grid' ? <LayoutList className="size-5" /> : <Grid2X2 className="size-5" />}</button></div>
        </div>
        {filters.selected.length > 0 && <div className="mb-4 flex flex-wrap gap-2">{filters.selected.map((label) => <button key={label} onClick={() => toggleSelected(label)} className="flex items-center gap-1 rounded-full bg-ink px-3 py-1.5 text-xs text-white">{label}<X className="size-3" /></button>)}</div>}
        {products.length ? <div className={cn(view === 'grid' ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4' : 'grid grid-cols-1 gap-3')}>{products.map((product) => <ProductCard key={product.id} product={product} favorites={favorites} onAction={onAction} openDetail={openDetail} list={view === 'list'} />)}</div> : <EmptyState clear={clearFilters} />}
      </section>
    </div>
    {filterOpen && <div className="fixed inset-0 z-50 bg-black/35 lg:hidden"><div className="absolute inset-y-0 left-0 w-[min(340px,90vw)] overflow-y-auto bg-canvas p-5 shadow-panel"><div className="mb-4 flex items-center justify-between"><strong>筛选条件</strong><button onClick={() => setFilterOpen(false)} className="grid size-9 place-items-center"><X className="size-5" /></button></div><Filters filters={filters} setFilters={setFilters} selected={filters.selected} toggleSelected={toggleSelected} clearFilters={clearFilters} maxPrice={maxPrice} setMaxPrice={setMaxPrice} /><button onClick={() => setFilterOpen(false)} className="sticky bottom-2 mt-5 h-11 w-full rounded-full bg-ink text-sm text-white">查看 {products.length} 件商品</button></div></div>}
  </div>
}

function Filters({ filters, setFilters, selected, toggleSelected, clearFilters, maxPrice, setMaxPrice }) {
  return <div className="text-sm">
    <div className="flex h-14 items-center border-b border-black/10"><SlidersHorizontal className="mr-2 size-4" /><strong>筛选</strong>{selected.length > 0 && <span className="ml-2 grid size-5 place-items-center rounded-full bg-red-500 text-[11px] text-white">{selected.length}</span>}<button onClick={clearFilters} className="ml-auto text-muted">重置所有</button></div>
    <div className="border-b border-black/10 py-4">{[['rookie','是否新秀'],['graded','只看评级'],['limited','只看限量'],['signed','只看签名']].map(([key,label]) => <label key={key} className="flex h-9 cursor-pointer items-center justify-between"><span>{label}</span><input type="checkbox" checked={filters[key]} onChange={() => setFilters((f) => ({ ...f, [key]:!f[key] }))} className="peer sr-only" /><span className="relative h-5 w-9 rounded-full bg-black/20 transition peer-checked:bg-ink after:absolute after:left-0.5 after:top-0.5 after:size-4 after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-4" /></label>)}</div>
    <div className="border-b border-black/10 py-5"><strong>价格区间</strong><div className="mt-4 flex items-center justify-between text-xs text-muted"><span>¥ 0</span><span>¥ {maxPrice.toLocaleString()}</span></div><input type="range" min="1000" max="30000" step="500" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="mt-3 w-full accent-ink" /></div>
    <div className="border-b border-black/10 py-5"><strong>年份</strong><select className="mt-3 h-10 w-full rounded border border-black/10 bg-transparent px-3 text-muted"><option>请选择年份</option><option>2020 - 2026</option><option>2010 - 2019</option><option>2000 - 2009</option></select></div>
    {FILTER_SECTIONS.map(([title, items]) => <details key={title} open className="border-b border-black/10 py-4"><summary className="cursor-pointer list-none font-medium">{title}<ChevronDown className="float-right size-4" /></summary><div className="mt-3 space-y-2.5">{items.map((label) => <label key={label} className="flex cursor-pointer items-center gap-2"><input type="checkbox" checked={selected.includes(label)} onChange={() => toggleSelected(label)} className="size-4 accent-ink" /><span>{label}</span></label>)}</div></details>)}
  </div>
}

function ProductCard({ product, favorites, onAction, openDetail, list=false }) {
  const liked = favorites.has(product.id)
  return <article onPointerMove={trackCardPointer} className={cn('interactive-card group overflow-hidden rounded border border-line bg-white', list && 'grid grid-cols-[130px_1fr] sm:grid-cols-[190px_1fr]')}>
    <div className={cn('product-media relative grid h-[324px] place-items-center overflow-hidden bg-[#eeede8]', list && 'h-full min-h-[210px]')}>
      <img src={product.image} alt="" aria-hidden="true" className="absolute -inset-8 h-[calc(100%+64px)] w-[calc(100%+64px)] scale-110 object-cover opacity-70 blur-[32px]" />
      <div className="image-backdrop-mask absolute inset-0 bg-white/[0.82] backdrop-blur-[6px]" />
      <button onClick={() => openDetail(product)} className="relative z-10 grid size-full place-items-center p-6"><img src={product.image} alt={product.title} className="max-h-[92%] max-w-[72%] object-contain drop-shadow-xl transition duration-300 group-hover:scale-[1.03]" /></button>
      <button onClick={() => onAction({ type:'favorite', product })} className="absolute right-3 top-3 z-20 flex items-center gap-1 text-xs" aria-label="收藏商品"><Heart className={cn('size-5', liked && 'fill-ink')} />{product.watchers}</button>
      <div className={cn('product-card-actions pointer-events-none absolute inset-x-4 bottom-4 z-20 flex translate-y-2 gap-2 opacity-0 transition-[transform,opacity] duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:transition-none',list&&'inset-x-3 bottom-3 flex-col sm:flex-row')}>{product.saleType === '可议价' && <button onClick={() => onAction({ type:'offer', product })} className="secondary-card-action h-10 flex-1 rounded-full border border-black/20 bg-canvas text-sm font-medium">去议价</button>}<button onClick={() => onAction({ type: product.saleType === '竞价' ? 'bid':'buy', product })} className="h-10 flex-1 rounded-full bg-ink px-3 text-sm font-medium text-white">{product.saleType === '竞价' ? '参与竞价':'立即购买'}</button></div>
    </div>
    <div className={cn('flex min-h-[196px] flex-col px-4 pb-4',list?'pt-4':'pt-0')}>
      <button onClick={() => openDetail(product)} className="text-left"><h2 className="product-card-title line-clamp-3 min-h-[72px] text-base font-bold leading-6">{product.title}</h2></button>
      <div className="mt-2 flex flex-wrap gap-2"><span className="product-card-tag rounded border border-line px-2 py-1 text-[10px] font-medium text-muted">{product.series}</span><span className="rounded border border-grade px-2 py-1 text-[10px] font-semibold text-grade">{product.grade}</span></div>
      <div className="mt-auto pt-4"><strong className="product-card-price text-[22px] font-extrabold">{money(product.price)}</strong><div className="product-card-meta mt-1 flex items-center justify-between text-xs text-muted"><span className="flex items-center gap-1"><Clock3 className="size-4" />{product.time}</span><span>{product.watchers}次竞价</span></div></div>
    </div>
  </article>
}

function EmptyState({ clear }) {
  return <div className="grid min-h-[520px] place-items-center rounded bg-white p-8 text-center"><div><Search className="mx-auto size-10 text-muted" /><h2 className="mt-4 text-xl font-medium">没有找到相关藏品</h2><p className="mt-2 text-sm text-muted">调整筛选条件或尝试其他搜索词。</p><button onClick={clear} className="mt-6 rounded-full bg-ink px-6 py-3 text-sm text-white">清除筛选</button></div></div>
}

function ProductDetail({ product, setProduct, favorites, close, openMarket, onAction }) {
  const [offerAmount, setOfferAmount] = useState('')
  const canOffer = Number(offerAmount) > 0

  return <div className="fixed inset-x-0 bottom-0 top-[72px] z-30 overflow-y-auto bg-canvas">
    <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-5">
      <div className="mb-4 flex items-center gap-2 text-sm text-muted"><button onClick={openMarket} className="hover:text-ink">拍卖</button><ChevronRight className="size-4" /><span className="text-ink">商品详情</span><span className="ml-auto hidden text-muted sm:block">商品编号 {product.id}</span></div>
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="grid min-h-[560px] place-items-center rounded bg-[#f1f1f1] p-10"><img src={product.image} alt={product.title} className="max-h-[560px] max-w-[78%] object-contain drop-shadow-2xl" /></div>
        <div className="rounded bg-white p-6 sm:p-10">
          <div className="flex items-center gap-2 text-sm"><Store className="size-4" />镖卡认证商店 <ShieldCheck className="size-4 text-green-600" /></div>
          <h1 className="mt-5 text-2xl font-extrabold leading-9">{product.title}</h1><span className="mt-4 inline-block rounded border border-grade px-2 py-1 text-xs font-bold text-grade">{product.grade}</span>
          <div className="mt-8 text-sm text-muted">{product.saleType === '竞价' ? '当前价':'起拍价'}</div><div className="mt-2 flex flex-wrap items-end gap-x-4 gap-y-2"><strong className="text-4xl font-black leading-[1.4]">{money(product.price)}</strong><span className="pb-1 text-sm text-muted">运费：18.00</span></div>
          <button onClick={() => onAction({ type: product.saleType === '竞价' ? 'bid':'buy', product })} className="mt-8 h-12 w-full rounded-full bg-ink font-medium text-white sm:w-[270px]">{product.saleType === '竞价' ? '立即出价':'立即购买'}</button>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-5">
            <input value={offerAmount} onChange={(e) => setOfferAmount(e.target.value)} type="number" min="1" inputMode="decimal" placeholder="输入价格" className="h-12 min-w-0 rounded-full bg-canvas px-5 text-base outline-none ring-ink transition placeholder:text-muted focus:ring-1" />
            <button disabled={!canOffer} onClick={() => onAction({ type:'offer', product, amount:Number(offerAmount) })} className="h-12 rounded-full border border-ink text-base font-medium transition enabled:hover:bg-ink enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-40">去议价</button>
          </div>
          <button onClick={() => onAction({ type:'favorite', product })} className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded bg-canvas text-sm"><Heart className={cn('size-5', favorites.has(product.id) && 'fill-ink')} />{favorites.has(product.id) ? '已收藏':'收藏商品'}</button>
          <div className="mt-8 flex flex-wrap gap-8 border-y border-black/10 py-5 text-sm"><span>议价记录　<u>{product.watchers}</u></span><span>账户授信额度　<b>¥ 5000.00</b></span><span>单标授信额度　<b>¥ 5000.00</b></span></div>
          <h2 className="mt-7 font-medium">商品属性</h2><dl className="mt-3 grid grid-cols-[100px_1fr] gap-y-3 text-sm"><dt className="text-muted">物品编号</dt><dd>{product.id}0485064856</dd><dt className="text-muted">厂商</dt><dd>{product.brand}</dd><dt className="text-muted">系列</dt><dd>{product.series}</dd><dt className="text-muted">年代</dt><dd>2023</dd><dt className="text-muted">是否新秀</dt><dd>{product.rookie ? '是':'否'}</dd></dl>
        </div>
      </div>
      <section className="mt-8 rounded bg-white p-5"><div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-medium">同类产品</h2><button onClick={close} className="border-b border-ink text-sm">查看更多</button></div><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{PRODUCTS.slice(0,4).map((p) => <ProductCard key={p.id} product={p} favorites={favorites} onAction={onAction} openDetail={(next) => setProduct(next)} />)}</div></section>
    </div>
  </div>
}

function LoginDialog({ mode, setMode, close, submit }) {
  const [showPassword, setShowPassword] = useState(false)
  return <div className="fixed inset-0 z-[70] grid place-items-center bg-black/75 p-4 backdrop-blur-sm" onMouseDown={(e) => e.target === e.currentTarget && close()}>
    <div className="relative w-full max-w-[420px] rounded bg-[#151515] p-8 text-white shadow-panel sm:p-12"><button onClick={close} className="absolute right-4 top-4 grid size-9 place-items-center rounded-full hover:bg-white/10"><X className="size-5" /></button><img src={asset('geca-logo-primary.png')} alt="GECA" className="mx-auto h-8 w-[124px] object-contain brightness-0 invert" /><h2 className="mt-8 text-center text-xl font-medium">{mode === 'login' ? '登录镖卡':'创建镖卡账户'}</h2>
      <form onSubmit={(e) => { e.preventDefault(); submit() }} className="mt-8 space-y-4"><input required type="email" defaultValue="collector@geca.com" placeholder="邮箱" className="h-12 w-full rounded border border-white/30 bg-black/20 px-4 text-sm outline-none focus:border-white" /><div className="relative"><input required type={showPassword ? 'text':'password'} defaultValue="12345678" placeholder="密码" className="h-12 w-full rounded border border-white/30 bg-black/20 px-4 pr-16 text-sm outline-none focus:border-white" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-xs text-white/50">{showPassword ? '隐藏':'显示'}</button></div>{mode === 'register' && <label className="flex items-start gap-2 text-xs text-white/60"><input required type="checkbox" className="mt-0.5 accent-white" />我已阅读并同意用户服务协议与隐私政策</label>}<button className="h-12 w-full rounded bg-white font-medium text-ink">{mode === 'login' ? '登录':'注册并登录'}</button></form>
      <div className="mt-6 flex items-center justify-between text-xs text-white/55"><button>{mode === 'login' ? '忘记密码？':'已有账户'}</button><button onClick={() => setMode(mode === 'login' ? 'register':'login')} className="text-white underline">{mode === 'login' ? '注册新账户':'返回登录'}</button></div>
    </div>
  </div>
}

function ActionDialog({ action, close, success }) {
  if (action.type === 'offer') return <OfferDrawer action={action} close={close} />
  return <TransactionDialog action={action} close={close} success={success} />
}

function TransactionDialog({ action, close, success }) {
  const { product, type } = action
  const [amount, setAmount] = useState(product.price + 100)
  const title = type === 'buy' ? '确认购买' : type === 'cart' ? '加入购物车' : '参与竞价'
  const showAmount = type === 'bid'
  return <div className="fixed inset-0 z-[75] grid place-items-center bg-black/45 p-4" onMouseDown={(e) => e.target === e.currentTarget && close()}><div className="w-full max-w-lg rounded bg-white p-6 shadow-panel sm:p-8"><div className="flex items-center justify-between"><h2 className="text-xl font-medium">{title}</h2><button onClick={close}><X className="size-5" /></button></div><div className="mt-6 flex gap-4 rounded bg-canvas p-4"><img src={product.image} alt="" className="h-24 w-20 object-contain" /><div><strong className="line-clamp-2 text-sm leading-6">{product.title}</strong><span className="mt-2 block text-sm text-muted">当前价格 {money(product.price)}</span></div></div>{showAmount && <label className="mt-6 block text-sm">{type === 'offer' ? '您的议价':'您的出价'}<div className="mt-2 flex h-12 items-center rounded border border-line px-4"><span className="mr-2">¥</span><input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className="w-full bg-transparent text-lg font-bold outline-none" /></div></label>}<div className="mt-6 rounded bg-[#f7f7f7] p-4 text-xs leading-6 text-muted"><ShieldCheck className="mr-2 inline size-4 text-green-600" />平台担保交易。提交后将按照交易及支付规则处理。</div><div className="mt-6 flex gap-3"><button onClick={close} className="h-11 flex-1 rounded-full border border-line">取消</button><button onClick={() => success(type === 'buy' ? '订单已创建，请在订单中心完成支付' : type === 'cart' ? '商品已加入购物车' : type === 'offer' ? '议价已提交':'出价成功')} className="h-11 flex-1 rounded-full bg-ink text-white">{type === 'cart' ? '确认加入' : `确认${type === 'buy' ? '购买':'提交'}`}</button></div></div></div>
}

function OfferDrawer({ action, close }) {
  const { product } = action
  const submittedAmount = Number(action.amount) || Math.max(1, Math.round(product.price * .9))
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const offerHistory = [
    { side:'right', amount:submittedAmount, status:'待处理', tone:'current' },
    { side:'right', amount:400, status:'已过期', tone:'expired' },
    { side:'right', amount:400, status:'已接受', tone:'accepted' },
    { side:'right', amount:400, tone:'sent' },
    { side:'left', amount:400, tone:'received' },
    { side:'left', amount:400, status:'已过期', tone:'received' },
  ]
  const sendMessage = () => {
    const content = message.trim()
    if (!content) return
    setMessages((current) => [...current, content])
    setMessage('')
  }

  return <div className="fixed inset-0 z-[75] flex justify-end bg-black/55" onMouseDown={(e) => e.target === e.currentTarget && close()}>
    <aside className="flex h-full w-full max-w-[748px] flex-col bg-white shadow-panel" aria-label="议价抽屉">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#e7ecf1] px-5"><h2 className="text-base font-medium">议价</h2><button onClick={close} className="grid size-9 place-items-center" aria-label="关闭议价抽屉"><X className="size-5" /></button></header>
      <div className="min-h-0 flex-1 overflow-y-auto p-5">
        <div className="flex gap-5 rounded bg-canvas p-5"><div className="grid size-[158px] shrink-0 place-items-center"><img src={product.image} alt={product.title} className="max-h-[148px] max-w-[96px] object-contain" /></div><div className="flex min-w-0 flex-1 flex-col justify-between"><strong className="text-xl font-extrabold leading-7">{product.title}</strong><strong className="text-4xl font-extrabold leading-[54px]">¥ {Number(product.price).toLocaleString('zh-CN')}</strong></div></div>
        <div className="mt-10 space-y-10">
          {offerHistory.map((item,index) => <OfferHistoryItem key={`${item.side}-${index}`} {...item} />)}
          {messages.map((content,index) => <div key={index} className="ml-auto max-w-[70%] rounded bg-[#5c2fd2] px-4 py-3 text-sm leading-6 text-white">{content}</div>)}
        </div>
      </div>
      <div className="shrink-0 border-t border-[#e7ecf1] bg-white p-5"><div className="flex h-14 items-center overflow-hidden rounded border border-[#d0d8df]"><input value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} placeholder="请输入内容" className="min-w-0 flex-1 px-3 text-sm outline-none placeholder:text-[#b4bbc0]" /><button disabled={!message.trim()} onClick={sendMessage} className="mr-3 h-8 rounded bg-[#5c2fd2] px-3 text-sm text-white disabled:bg-[#98a9e5]">发送</button></div></div>
    </aside>
  </div>
}

function OfferHistoryItem({ side, amount, status, tone }) {
  const sent = side === 'right'
  const cardTone = tone === 'expired' ? 'bg-[#9b72ff]' : sent ? 'bg-[#5c2fd2]' : 'bg-[#f8f8fb] text-ink'
  const statusTone = status === '已接受' ? 'bg-[#0d7b21] text-white' : status === '待处理' ? 'bg-amber-100 text-amber-700' : 'bg-[#f8f8fb] text-[#ccc]'
  return <div className={cn('flex',sent?'justify-end':'justify-start')}><div className="relative w-[124px]"><div className={cn('rounded p-5',cardTone,!sent&&'text-ink',sent&&'text-white')}><span className="block whitespace-nowrap text-sm font-medium">议价金额</span><strong className="mt-1 block whitespace-nowrap text-xl">¥ {Number(amount).toLocaleString('zh-CN')}</strong></div>{status&&<span className={cn('absolute top-[72px] rounded px-2 py-0.5 text-xs whitespace-nowrap',statusTone,sent?'-left-[60px]':'left-[132px]')}>{status}</span>}<time className={cn('mt-2 block whitespace-nowrap text-xs text-muted',sent?'text-right':'text-left')}>2026-09-21 12:00:00</time></div></div>
}

function AccountPage({ section, navigate, onAction }) {
  const labels = { offers:'议价', orders:'订单', bids:'竞价', favorites:'收藏列表' }
  const tabOptions = section === 'offers' ? ['全部','待处理','议价中','已成交','已过期','已取消'] : section === 'orders' ? ['全部','待付款','待发货','待收货','已完成','已取消'] : section === 'bids' ? ['拍卖中','已结束'] : ['全部收藏']
  const [statusTab, setStatusTab] = useState(tabOptions[0])
  const [notice, setNotice] = useState('')
  useEffect(() => setStatusTab(tabOptions[0]), [section])
  useEffect(() => { if (!notice) return; const timer=setTimeout(()=>setNotice(''),2200); return()=>clearTimeout(timer) }, [notice])
  const accountNav = [['我的钱包','wallet'],['订单','orders'],['议价','offers'],['竞价','bids'],['收藏列表','favorites']]

  return <div className="min-h-[calc(100vh-72px)] bg-canvas py-5"><div className="mx-auto max-w-[1440px] px-5"><div className="mb-4 flex items-center gap-2 text-sm text-muted"><button onClick={() => navigate('market')}>拍卖</button><ChevronRight className="size-4" /><span className="text-ink">{labels[section]}</span></div><div className="grid gap-6 lg:grid-cols-[220px_1fr]"><aside className="rounded bg-white p-1 lg:self-start">{accountNav.map(([label,key]) => <button key={key} onClick={() => key === 'wallet' ? setNotice('钱包功能将在资金中心开放') : navigate(key)} className={cn('flex h-14 w-full items-center px-5 text-left text-sm transition', section === key ? 'bg-canvas font-medium':'hover:bg-canvas/60')}>{label}</button>)}</aside><section className="min-w-0 rounded bg-white p-5">{tabOptions.length>1&&<SegmentedTabs items={tabOptions} value={statusTab} onChange={setStatusTab} label="状态筛选" className="mb-5 w-fit"/>}{section === 'offers' && <OffersPanel tab={statusTab} onAction={onAction} notify={setNotice} />}{section === 'orders' && <OrdersPanel tab={statusTab} onAction={onAction} notify={setNotice} />}{section === 'bids' && <BidsPanel tab={statusTab} onAction={onAction} />}{section === 'favorites' && <FavoritesPanel onAction={onAction} />}</section></div></div>{notice && <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded bg-ink px-5 py-3 text-sm text-white shadow-panel">{notice}</div>}</div>
}

const ACCOUNT_PRODUCT = {
  ...PRODUCTS[10],
  image:asset('haaland-card.png'),
  title:'2023 Stadium Club Chrome UEFA CC Fully Charged Superfractor Erling Haaland 1/1 #FCEH PSA 10 GEM',
  price:88,
}

function AccountProduct({ product=ACCOUNT_PRODUCT }) {
  return <div className="flex min-w-0 items-start gap-4"><div className="grid h-[112px] w-[112px] shrink-0 place-items-center bg-canvas"><img src={product.image} alt="" className="h-[100px] w-[72px] object-contain" /></div><strong className="line-clamp-3 max-w-[330px] text-base leading-6">{product.title}</strong></div>
}

function StatusChip({ children, tone='gray' }) {
  const tones={yellow:'bg-amber-100 text-amber-700',blue:'bg-sky-100 text-sky-700',green:'bg-green-100 text-green-700',red:'bg-red-100 text-red-600',gray:'bg-gray-100 text-gray-500'}
  return <span className={cn('rounded px-2 py-1 text-xs',tones[tone])}>{children}</span>
}

function OffersPanel({ tab, onAction, notify }) {
  const rows=[
    {status:'待处理',tone:'yellow',alert:'您的议价已被拒绝',mine:68,other:'-',actions:['取消议价','议价']},
    {status:'待处理',tone:'yellow',mine:68,other:'88.00',actions:['接受报价','取消议价','议价']},
    {status:'议价中',tone:'blue',mine:68,other:'-',actions:['取消议价','议价']},
    {status:'已成交',tone:'green',mine:68,other:'68.00',actions:['查看订单']},
    {status:'已过期',tone:'red',mine:68,other:'68.00',actions:[]},
    {status:'已取消',tone:'gray',mine:68,other:'68.00',actions:[]},
  ]
  const visible=tab==='全部'?rows:rows.filter(r=>r.status===tab)
  return <div>{visible.map((row,index) => <article key={`${row.status}-${index}`} className="border-b border-black/15 py-5"><div className="mb-3 flex flex-wrap items-center gap-3"><StatusChip tone={row.tone}>{row.status}</StatusChip><span className="text-xs text-muted">有效期：2026-08-08 10:00:00</span></div>{row.alert && <div className="mb-3 rounded bg-red-50 px-4 py-2 text-sm text-red-500">ⓘ {row.alert}</div>}<div className="grid gap-5 xl:grid-cols-[1.35fr_.8fr_.8fr_auto] xl:items-start"><AccountProduct /><div className="text-sm leading-7"><p><span className="mr-1 text-muted">一口价：</span><b>¥88.00</b></p><p className="text-muted">剩余3次议价</p></div><div className="text-sm leading-7"><p><span className="mr-1 text-muted">我的议价：</span><b>¥{row.mine}.00</b></p><p><span className="mr-1 text-muted">对方报价：</span><b>{row.other==='-'?'-':`¥${row.other}`}</b></p></div><div className="flex min-w-[90px] flex-row gap-3 xl:flex-col xl:items-end">{row.actions.map(action => <button key={action} onClick={() => action==='议价' ? onAction({type:'offer',product:ACCOUNT_PRODUCT}) : action==='查看订单' ? notify('正在打开关联订单') : notify(`${action}操作已提交`)} className="text-sm font-medium hover:underline">{action}</button>)}</div></div></article>)}</div>
}

function OrdersPanel({ tab, onAction, notify }) {
  const rows=[
    {status:'待付款',tone:'yellow',action:['立即付款'],countdown:'倒计时 47:00'},
    {status:'待发货',tone:'blue',action:['申诉']},
    {status:'待收货',tone:'green',action:['确认收货','查看物流','申诉']},
    {status:'已完成',tone:'gray',action:['查看物流','修改评价','申诉']},
    {status:'已完成',tone:'gray',action:['查看物流','评价','申诉']},
    {status:'已取消',tone:'gray',action:[]},
  ]
  const visible=tab==='全部'?rows:rows.filter(r=>r.status===tab)
  return <div>{visible.map((row,index)=><article key={`${row.status}-${index}`} className="border-b border-black/15 py-5"><div className="mb-3 flex flex-wrap items-center gap-3"><StatusChip tone={row.tone}>{row.status}</StatusChip><b className="text-sm">🏅 宝可梦旗舰店</b>{row.countdown&&<span className="text-xs text-red-500">◷ {row.countdown}</span>}</div><div className="grid gap-5 xl:grid-cols-[1.35fr_.75fr_.65fr_auto] xl:items-start"><AccountProduct /><div className="text-sm leading-7"><p><span className="mr-1 text-muted">金额：</span><b>¥88.00</b></p><p><span className="mr-1 text-muted">运费：</span><b>¥10.00</b></p></div><p className="text-sm"><span className="mr-1 text-muted">总金额：</span><b>¥98.00</b></p><div className="flex min-w-[90px] flex-row gap-3 xl:flex-col xl:items-end">{row.action.map(action=><button key={action} onClick={() => action==='立即付款'?onAction({type:'buy',product:ACCOUNT_PRODUCT}):notify(`${action}功能已打开`)} className="text-sm font-medium hover:underline">{action}</button>)}</div></div></article>)}</div>
}

function BidsPanel({ tab, onAction }) {
  const rows=Array.from({length:tab==='拍卖中'?6:4},(_,index)=>({winning:index%3!==0,urgent:index===2||index===5,progress:index%3===0?82:100}))
  return <div>{rows.map((row,index)=><article key={index} className="grid gap-5 border-b border-black/15 py-5 xl:grid-cols-[1.25fr_.75fr_1fr_auto] xl:items-start"><AccountProduct /><div className="text-sm"><p className={cn('flex items-center gap-2 font-medium',row.urgent&&'text-red-500')}><Clock3 className="size-4" />{row.urgent?'00D 00H 00M 20S':'99D 10H 20M 20S'}</p><p className="mt-3 text-muted">22次竞价</p></div><div><div className={cn('bid-progress-card relative flex min-h-[72px] overflow-hidden rounded',row.winning?'bid-progress-card--winning bg-emerald-100':'bid-progress-card--outbid bg-red-100')}><div className="min-w-0 flex-1 p-3 text-xs"><span className="block text-muted">我的出价</span><b className="mt-1 block text-sm">¥88.00</b></div><div className={cn('flex w-[148px] shrink-0 flex-col items-center justify-center p-3 text-center text-xs text-white',row.winning?'bg-emerald-700':'bg-red-600')}><span className="block">当前价格</span><b className="mt-1 block whitespace-nowrap text-sm">{row.winning?'¥78.00':'¥9,999,978.00'}</b></div><div className="absolute bottom-0 left-0 right-[148px] h-[3px] bg-black/5"><span className={cn('block h-full transition-[width] duration-500',row.winning?'bg-emerald-600':'bg-red-500')} style={{width:`${row.progress}%`}} /></div></div><p className={cn('bid-result mt-3 flex items-center gap-2 text-sm',row.winning?'text-emerald-700':'text-red-500')}><CircleAlert className="size-4 shrink-0" />{row.winning?'您的出价已是当前最高':'您的出价已被超越'}</p></div><button onClick={() => onAction({type:'bid',product:ACCOUNT_PRODUCT})} className="text-sm font-medium hover:underline">{tab==='拍卖中'?'竞价':'查看详情'}</button></article>)}</div>
}

function FavoritesPanel({ onAction }) {
  return <div className="grid grid-cols-1 gap-4 pt-5 sm:grid-cols-2 xl:grid-cols-3">{PRODUCTS.slice(0,6).map(product=><ProductCard key={product.id} product={product} favorites={new Set(PRODUCTS.slice(0,6).map(p=>p.id))} onAction={onAction} openDetail={() => {}} />)}</div>
}

function B2BPage({ query, onAction }) {
  const categories = ['热销商品','卡牌','卡膜','卡夹','评级卡周边','收纳产品','展示用具','周边产品']
  const [category, setCategory] = useState('热销商品')
  const [pack, setPack] = useState('全部包装')
  const [sale, setSale] = useState('全部售卖形式')
  const [selected, setSelected] = useState(null)
  const products = useMemo(() => B2B_PRODUCTS.filter((p) => {
    const matchesQuery = !query.trim() || `${p.title} ${p.category} ${p.pack}`.toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (category === '热销商品' || p.category === category) && (pack === '全部包装' || p.pack === pack)
  }), [query, category, pack])

  return <div className="min-h-[calc(100vh-72px)] bg-canvas py-6">
    <div className="mx-auto max-w-[1440px] px-5">
      <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="relative h-[164px] overflow-hidden rounded bg-[#0e2a55] text-white"><div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_55%_60%,#0073cf,transparent_55%)]" /><div className="absolute inset-y-0 right-0 flex w-[54%] items-end justify-center gap-2 overflow-hidden"><img src={asset('b2b-03.png')} alt="" className="h-32 w-28 rotate-[-9deg] rounded object-cover shadow-xl" /><img src={asset('b2b-05.png')} alt="" className="h-40 w-32 rounded object-cover shadow-xl" /><img src={asset('b2b-04.png')} alt="" className="h-32 w-28 rotate-[9deg] rounded object-cover shadow-xl" /></div><div className="relative z-10 flex h-full flex-col justify-center pl-6 sm:pl-10"><h1 className="text-xl font-bold sm:text-2xl">卡牌专用卡具 & 全套周边</h1><p className="mt-3 font-serif text-lg italic sm:text-2xl">Card tools & peripherals</p></div></div>
        <button onClick={() => { setCategory('卡牌'); setPack('整箱') }} className="relative hidden h-[164px] overflow-hidden rounded bg-[#4f5459] text-white lg:block"><div className="absolute inset-0 bg-black/20" /><div className="relative z-10 flex h-full flex-col items-center justify-center"><strong className="text-2xl">整箱原盒卡牌专区</strong><span className="mt-2 text-sm font-bold text-cyan-200">Sealed Boxes</span><span className="text-sm font-bold text-cyan-200">Pokemon Sports Trading Cards</span></div></button>
      </section>
      <section className="mt-0 rounded-b bg-white p-5">
        <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center"><SegmentedTabs items={categories} value={category} onChange={setCategory} label="商品分类"/><div className="flex gap-3"><select value={sale} onChange={(e) => setSale(e.target.value)} className="h-9 min-w-0 rounded border border-[#d0d8df] bg-white px-3 text-sm text-muted"><option>全部售卖形式</option><option>现货</option><option>预售</option></select><select value={pack} onChange={(e) => setPack(e.target.value)} className="h-9 min-w-0 rounded border border-[#d0d8df] bg-white px-3 text-sm text-muted"><option>全部包装</option><option>单包</option><option>盒装</option><option>整箱</option><option>单品</option><option>其他</option></select></div></div>
        {products.length ? <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">{products.map((product) => <B2BCard key={product.id} product={product} open={() => setSelected(product)} add={() => onAction({ type:'cart', product })} />)}</div> : <EmptyState clear={() => { setCategory('热销商品'); setPack('全部包装') }} />}
      </section>
    </div>
    {selected && <B2BDetail product={selected} close={() => setSelected(null)} add={() => onAction({ type:'cart', product:selected })} />}
  </div>
}

function B2BCard({ product, open, add }) {
  return <article onPointerMove={trackCardPointer} className="interactive-card overflow-hidden rounded border border-[#ebe9f1] bg-white"><button onClick={open} className="relative block aspect-square w-full overflow-hidden bg-canvas"><img src={product.image} alt="" aria-hidden="true" className="absolute -inset-4 size-[calc(100%+32px)] scale-110 object-cover opacity-25 blur-xl" /><div className="image-backdrop-mask absolute inset-0 bg-white/65 backdrop-blur-[3.5px]" /><img src={product.image} alt={product.title} className="relative z-10 size-full object-cover" /></button><div className="p-4"><button onClick={open} className="text-left"><h2 className="line-clamp-3 min-h-[66px] text-sm font-semibold leading-[22px] text-[#243141]">{product.title}</h2></button><div className="mt-2 flex items-center justify-between gap-2"><span className="min-w-0 truncate rounded border border-violet-200 bg-violet-50 px-1 text-xs text-violet-700">{product.pack}</span><span className="shrink-0 text-xs text-muted">2个SKU</span></div><strong className="mt-3 block text-base">¥{product.price}</strong><button onClick={add} className="mt-3 min-h-9 w-full rounded-full bg-[#1d2124] px-3 py-2 text-sm leading-5 text-white">加入购物车</button></div></article>
}

function B2BDetail({ product, close, add }) {
  const [sku, setSku] = useState('标准装')
  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4" onMouseDown={(e) => e.target === e.currentTarget && close()}><div className="grid max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded bg-white shadow-panel md:grid-cols-2"><div className="relative grid min-h-[360px] place-items-center overflow-hidden bg-canvas p-8"><img src={product.image} alt="" aria-hidden="true" className="absolute inset-0 size-full scale-110 object-cover opacity-25 blur-2xl" /><div className="image-backdrop-mask absolute inset-0 bg-white/60" /><img src={product.image} alt={product.title} className="relative z-10 max-h-[420px] w-full rounded object-contain" /></div><div className="relative p-7"><button onClick={close} className="absolute right-5 top-5"><X className="size-5" /></button><span className="text-xs text-muted">{product.category} · {product.id}</span><h2 className="mt-4 pr-8 text-xl font-semibold leading-8">{product.title}</h2><strong className="mt-6 block text-3xl">¥{product.price}</strong><div className="mt-7"><span className="text-sm">选择规格</span><div className="mt-3 flex gap-2">{['标准装','整箱采购'].map((item) => <button key={item} onClick={() => setSku(item)} className={cn('rounded border px-4 py-2 text-sm', sku === item ? 'border-ink bg-ink text-white':'border-line')}>{item}</button>)}</div></div><div className="mt-7 rounded bg-canvas p-4 text-sm leading-7 text-muted">现货商品，预计付款后 48 小时内发出。批量采购可在购物车中统一结算。</div><button onClick={add} className="mt-7 h-11 w-full rounded-full bg-ink text-sm text-white">加入购物车</button></div></div></div>
}

function CatalogPage({ query }) {
  const [tab, setTab] = useState('宝可梦')
  const [languages, setLanguages] = useState([])
  const [generations, setGenerations] = useState([])
  const [selected, setSelected] = useState(null)
  const [filterOpen, setFilterOpen] = useState(false)
  const toggle = (list, setList, value) => setList(list.includes(value) ? list.filter((item) => item !== value) : [...list,value])
  const cards = useMemo(() => CATALOG_PRODUCTS.filter((card) => {
    const matchesQuery = !query.trim() || `${card.title} ${card.number} ${card.rarity}`.toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (!languages.length || languages.includes(card.language)) && (!generations.length || generations.includes(card.generation))
  }), [query,languages,generations,tab])
  const filters = <CatalogFilters languages={languages} generations={generations} toggleLanguage={(v) => toggle(languages,setLanguages,v)} toggleGeneration={(v) => toggle(generations,setGenerations,v)} />

  return <div className="min-h-[calc(100vh-72px)] bg-canvas py-6"><div className="mx-auto max-w-[1440px] px-5"><div className="mb-4 flex items-center justify-between lg:hidden"><button onClick={() => setFilterOpen(true)} className="flex h-10 items-center gap-2 rounded border border-line bg-white px-4 text-sm"><Filter className="size-4" />筛选</button><span className="text-sm text-muted">{cards.length} 张卡片</span></div><div className="grid gap-6 lg:grid-cols-[220px_1fr]"><aside className="hidden lg:block">{filters}</aside><section><SegmentedTabs items={['宝可梦','航海王','球星卡']} value={tab} onChange={setTab} label="图鉴分类" className="mb-4 w-fit"/>{cards.length ? <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map((card) => <CatalogCard key={card.id} card={card} open={() => setSelected(card)} />)}</div> : <EmptyState clear={() => { setLanguages([]); setGenerations([]) }} />}</section></div></div>{filterOpen && <div className="fixed inset-0 z-50 bg-black/35 lg:hidden"><div className="absolute inset-y-0 left-0 w-[min(340px,90vw)] overflow-y-auto bg-white p-5"><div className="flex items-center justify-between"><strong>图鉴筛选</strong><button onClick={() => setFilterOpen(false)}><X className="size-5" /></button></div><div className="mt-5">{filters}</div><button onClick={() => setFilterOpen(false)} className="sticky bottom-2 mt-8 h-11 w-full rounded-full bg-ink text-sm text-white">查看 {cards.length} 张卡片</button></div></div>}{selected && <CatalogDetail card={selected} close={() => setSelected(null)} />}</div>
}

function CatalogFilters({ languages, generations, toggleLanguage, toggleGeneration }) {
  return <div className="space-y-4"><details open><summary className="flex h-11 items-center justify-between bg-canvas px-4 text-sm font-medium">语言<ChevronDown className="size-4" /></summary><div className="space-y-3 px-4 py-3">{['日文','英文','中文','繁中'].map((item) => <label key={item} className="flex cursor-pointer items-center gap-2 text-sm"><input type="checkbox" checked={languages.includes(item)} onChange={() => toggleLanguage(item)} className="size-5 accent-ink" />{item}</label>)}</div></details><details open><summary className="flex h-11 items-center justify-between bg-canvas px-4 text-sm font-medium">世代<ChevronDown className="size-4" /></summary><div className="space-y-3 px-4 py-3">{['MEGA世代','扩充包','补充包','构筑','推广卡'].map((item) => <label key={item} className="flex cursor-pointer items-center gap-2 text-sm"><input type="checkbox" checked={generations.includes(item)} onChange={() => toggleGeneration(item)} className="size-5 accent-ink" />{item}</label>)}</div></details><details open><summary className="flex h-11 items-center justify-between bg-canvas px-4 text-sm font-medium">系列<ChevronDown className="size-4" /></summary><div className="space-y-3 px-4 py-3 text-sm">{['强化包 绯红薄雾','补充包 异度审判','补充包 狂野之力'].map((item) => <label key={item} className="flex cursor-pointer items-center gap-2"><input type="checkbox" className="size-5 accent-ink" />{item}</label>)}</div></details></div>
}

function CatalogCard({ card, open }) {
  return <button onPointerMove={trackCardPointer} onClick={open} className="interactive-card group overflow-hidden rounded border border-line bg-white text-left"><div className="product-media relative grid h-[313px] place-items-center overflow-hidden bg-[#eeede8]"><img src={card.image} alt="" aria-hidden="true" className="absolute -inset-8 h-[calc(100%+64px)] w-[calc(100%+64px)] scale-110 object-cover opacity-70 blur-[32px]" /><div className="image-backdrop-mask absolute inset-0 bg-white/[0.82] backdrop-blur-[6px]" /><img src={card.image} alt={card.title} className="relative z-10 h-[266px] w-[86%] object-contain drop-shadow-xl transition duration-300 group-hover:scale-[1.03]" /></div><div className="p-4"><span className="text-[10px] text-muted">{card.number} · {card.rarity}</span><h2 className="mt-2 truncate text-base font-medium">{card.title}</h2><div className="mt-5 grid grid-cols-2 gap-2"><div><span className="block text-[10px] text-muted">PSA 10</span><strong className="mt-1 block text-lg">${card.psa.toFixed(2)}</strong></div><div className="border-l border-black/10 pl-4"><span className="block text-[10px] text-muted">Raw</span><strong className="mt-1 block text-lg font-medium text-muted">${card.raw.toFixed(2)}</strong></div></div></div></button>
}

function CatalogDetail({ card, close }) {
  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4" onMouseDown={(e) => e.target === e.currentTarget && close()}><div className="grid max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded bg-white shadow-panel md:grid-cols-[.9fr_1.1fr]"><div className="relative grid min-h-[440px] place-items-center overflow-hidden bg-[#edf1ff] p-8"><img src={card.image} alt={card.title} className="max-h-[430px] w-full object-contain drop-shadow-2xl" /></div><div className="relative p-8"><button onClick={close} className="absolute right-5 top-5"><X className="size-5" /></button><span className="text-xs text-muted">{card.number} · {card.rarity} · {card.language}</span><h2 className="mt-4 text-3xl font-medium">{card.title}</h2><p className="mt-2 text-sm text-muted">Pokémon Card 151 · {card.generation}</p><div className="mt-8 grid grid-cols-2 gap-4"><div className="rounded bg-canvas p-4"><span className="text-xs text-muted">PSA 10 市场价</span><strong className="mt-2 block text-2xl">${card.psa.toFixed(2)}</strong></div><div className="rounded bg-canvas p-4"><span className="text-xs text-muted">未评级市场价</span><strong className="mt-2 block text-2xl text-muted">${card.raw.toFixed(2)}</strong></div></div><div className="mt-8 border-y border-black/10 py-5 text-sm leading-8"><p className="flex justify-between"><span className="text-muted">近30日成交</span><b>28 笔</b></p><p className="flex justify-between"><span className="text-muted">价格趋势</span><b className="text-green-700">+8.4%</b></p><p className="flex justify-between"><span className="text-muted">数据更新时间</span><b>今日 09:30</b></p></div><button onClick={close} className="mt-7 h-11 w-full rounded-full bg-ink text-sm text-white">关闭详情</button></div></div></div>
}

const EBAY_GROUPS = [
  ['eBay管理',['首页','AI发布','模板管理','发布商品','我的仓库','委托中心','在售商品','功德箱']],
  ['订单管理',['订单状态','议价Offer']],
  ['财务管理',['Biu豆管理','回款详情']],
  ['其他设置',['地址管理','eBay通知','服务费收取方式']],
  ['员工管理',['员工管理']],
  ['客户管理',['客户管理']],
]

const GRADING_GROUPS = [
  ['评级服务',['PSA送评订单','评级卡片列表','我的账单','客户管理']],
]

function EbayManagementPage({ navigate }) {
  const [active,setActive] = useState('首页')
  const [notice,setNotice] = useState('')
  useEffect(() => { if (!notice) return; const timer=setTimeout(()=>setNotice(''),2200); return()=>clearTimeout(timer) },[notice])
  return <div className="min-h-[calc(100vh-72px)] bg-canvas py-6"><div className="mx-auto grid max-w-[1440px] gap-6 px-5 lg:grid-cols-[auto_minmax(0,1fr)]">
    <ManagementSidebar groups={EBAY_GROUPS} active={active} setActive={setActive} service="ebay" navigate={navigate} />
    <section className={cn('min-w-0',active!=='首页'&&'rounded bg-white p-5 sm:p-6')}>{active==='首页'?<EbayDashboard setActive={setActive} notify={setNotice}/>:<EbayWorkspace title={active} notify={setNotice}/>}</section>
  </div>{notice&&<PageNotice>{notice}</PageNotice>}</div>
}

function ManagementSidebar({ groups, active, setActive, service, navigate }) {
  const [primaryExpanded,setPrimaryExpanded] = useState(false)
  const [previewService,setPreviewService] = useState(null)
  const primary=[['ebay','eBay管理',asset('nav-ebay.svg')],['grading','评级服务',asset('nav-grading.svg')]]
  const previewGroups=previewService==='ebay'?EBAY_GROUPS:previewService==='grading'?GRADING_GROUPS:groups
  const previewActive=!previewService||previewService===service?active:null
  return <aside
    className="relative z-30 w-full self-start lg:sticky lg:top-24 lg:h-[calc(100vh-120px)] lg:w-60"
    onMouseLeave={()=>{setPrimaryExpanded(false);setPreviewService(null)}}
    onFocusCapture={()=>setPrimaryExpanded(true)}
    onBlurCapture={(event)=>{if(!event.currentTarget.contains(event.relatedTarget)){setPrimaryExpanded(false);setPreviewService(null)}}}
  >
    <div className={cn('flex min-w-0 overflow-hidden rounded bg-white p-1 transition-[width,box-shadow] duration-200 ease-out lg:h-full',primaryExpanded?'lg:w-max lg:max-w-[calc(100vw-40px)] lg:shadow-panel':'lg:w-60')}>
      <div
        className={cn('flex shrink-0 border-canvas transition-[width] duration-200 ease-out lg:flex-col lg:border-r lg:pr-1',primaryExpanded?'lg:w-max':'lg:w-14')}
        onMouseEnter={()=>setPrimaryExpanded(true)}
      >{primary.map(([key,label,icon])=><button key={key} title={primaryExpanded?'':label} aria-label={label} aria-current={service===key?'page':undefined} onMouseEnter={()=>setPreviewService(key)} onFocus={()=>setPreviewService(key)} onClick={()=>navigate(key)} className={cn('group h-14 w-14 shrink-0 items-center rounded text-sm transition-colors hover:bg-canvas/60',primaryExpanded?'flex px-[18px] lg:w-max':'grid place-items-center p-0 lg:w-full',service===key&&'bg-canvas')}><img src={icon} alt="" className="management-icon size-5 min-h-5 min-w-5 shrink-0 object-contain"/><span className={cn('ml-3 whitespace-nowrap text-left font-medium transition-opacity duration-150',primaryExpanded?'hidden opacity-100 lg:block':'hidden opacity-0')}>{label}</span><ChevronRight className={cn('ml-5 size-4 shrink-0 text-muted transition-opacity duration-150',primaryExpanded?'hidden opacity-100 lg:block':'hidden opacity-0')}/></button>)}</div>
      <div className="management-menu-scroll min-w-0 flex-1 overflow-x-auto lg:h-full lg:overscroll-contain lg:overflow-y-auto lg:pl-1">{previewGroups.map(([group,items])=><div key={group} className="shrink-0 lg:shrink"><div className="px-5 pb-2 pt-4 text-xs text-muted">{group}</div>{items.map(item=><button key={item} onClick={()=>previewService&&previewService!==service?navigate(previewService):setActive(item)} className={cn('flex h-14 w-full min-w-[130px] items-center px-5 text-left text-sm transition lg:min-w-0',previewActive===item?'bg-canvas font-medium':'hover:bg-canvas/60')}>{item}</button>)}</div>)}</div>
    </div>
  </aside>
}

function EbayDashboard({ setActive, notify }) {
  const stats=[['2,227','eBay在售竞拍商品',BarChart3],['287','eBay在售固价商品',Box],['72','待付款订单数',ReceiptText],['230','待处理Offer数',WalletCards]]
  const notes=[
    ['eBay商品刊登','您的商品 2022-23 Panini Spectra Zach Randolph Auto #LS-ZRD 6/49 已上架到 eBay。','2025-01-01 09:00',asset('fanatics-03.jpg')],
    ['eBay商品截标','商品 2021-22 Panini Origins Isaiah Livers 05/49 已截标，截标价为 $1.00。','2025-01-01 09:00',asset('fanatics-06.jpg')],
    ['eBay商品即将截标','商品 2021-22 Panini Origins Isaiah Livers 05/49 即将截标，当前价格为 $1.00。','2024-08-02 08:40',asset('fanatics-02.jpg')],
    ['eBay商品截标','商品 2021-22 Panini Prizm JA MORANT 已截标，截标价为 $5.50。','2024-07-26 08:05',asset('fanatics-06.jpg')],
    ['eBay商品即将截标','Panini Prizm LeBron James 即将截标，当前价格为 $1.25。','2024-07-26 07:45',asset('fanatics-03.jpg')],
    ['eBay商品刊登','您的商品 2022-23 Panini Spectra Zach Randolph Auto 已上架到 eBay。','2024-07-26 08:05',asset('fanatics-02.jpg')],
  ]
  return <><div className="relative h-[150px] overflow-hidden rounded bg-[#252525] px-6 text-white sm:px-10"><div className="relative z-10 flex h-full max-w-[520px] flex-col justify-center"><strong className="text-base">BK123434211，欢迎登录</strong><p className="mt-3 text-xs leading-5 text-white/55">一站式卡牌国际交易平台，连接全球收藏家，让每一张卡牌价值最大化</p></div><div className="absolute inset-y-0 right-0 hidden w-[42%] items-center justify-center gap-3 overflow-hidden md:flex">{PRODUCTS.slice(1,4).map((p,i)=><img key={p.id} src={p.image} alt="" className={cn('h-32 w-20 object-contain drop-shadow-2xl',i===0&&'-rotate-12',i===2&&'rotate-12')}/>)}</div></div>
    <div className="mt-6 rounded bg-white p-5 sm:p-6"><SectionTitle>平台统计</SectionTitle><div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{stats.map(([value,label,Icon])=><button key={label} onClick={()=>notify(`正在查看${label}`)} className="relative h-[110px] overflow-hidden rounded bg-canvas px-5 text-left"><strong className="block text-3xl leading-[1.25]">{value}</strong><span className="mt-2 block text-sm leading-5">{label}</span><Icon className="absolute bottom-[-6px] right-2 size-20 text-black/[.05]"/></button>)}</div>
    <div className="mt-7 flex items-center justify-between"><SectionTitle>eBay通知</SectionTitle><button onClick={()=>setActive('eBay通知')} className="flex items-center gap-1 text-xs text-muted">查看全部<ChevronRight className="size-3"/></button></div><div className="mt-3 grid gap-3 md:grid-cols-2">{notes.map(([title,desc,time,image])=><button key={`${title}-${time}`} onClick={()=>notify('通知详情已打开')} className="flex min-h-[126px] items-center gap-4 rounded bg-[#f5f7fa] p-4 text-left"><div className="grid h-[90px] w-[84px] shrink-0 place-items-center rounded bg-[#ebedf0]"><img src={image} alt="" className="h-[82px] w-[50px] object-contain"/></div><div className="min-w-0"><strong className="text-sm">{title}</strong><p className="mt-1 line-clamp-2 text-xs leading-5">{desc}</p><time className="mt-2 block text-xs text-muted">{time}</time></div></button>)}</div></div></>
}

function EbayWorkspace({ title, notify }) {
  const rows=PRODUCTS.slice(0,6)
  return <><div className="flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-xl font-medium">{title}</h1><p className="mt-2 text-xs text-muted">统一管理 eBay 商品、订单与账户信息</p></div><button onClick={()=>notify(`${title}创建流程已打开`)} className="flex h-10 items-center gap-2 rounded bg-ink px-4 text-sm text-white"><Plus className="size-4"/>新建</button></div><div className="mt-6 flex flex-col gap-3 sm:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-3 size-4 text-muted"/><input placeholder="搜索标题、商品编号" className="h-10 w-full rounded border border-line pl-9 pr-3 text-sm outline-none focus:border-ink"/></div><select className="h-10 rounded border border-line bg-white px-3 text-sm"><option>全部状态</option><option>处理中</option><option>已完成</option></select><button onClick={()=>notify('筛选条件已应用')} className="h-10 rounded bg-ink px-5 text-sm text-white">查询</button></div><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[780px] text-left text-sm"><thead className="bg-canvas text-muted"><tr>{['商品','编号','状态','价格','更新时间','操作'].map(h=><th key={h} className="px-4 py-3 font-normal">{h}</th>)}</tr></thead><tbody>{rows.map((p,i)=><tr key={p.id} className="border-b border-black/10"><td className="flex items-center gap-3 px-4 py-3"><img src={p.image} alt="" className="h-16 w-12 object-contain"/><span className="line-clamp-2 max-w-[280px]">{p.title}</span></td><td className="px-4 py-3">{p.id}</td><td className="px-4 py-3"><StatusChip tone={i%3===0?'yellow':'green'}>{i%3===0?'处理中':'已同步'}</StatusChip></td><td className="px-4 py-3">${(p.price/7.2).toFixed(2)}</td><td className="px-4 py-3 text-muted">2026-09-16 10:20</td><td className="px-4 py-3"><button onClick={()=>notify(`${p.id}详情已打开`)} className="font-medium hover:underline">查看详情</button></td></tr>)}</tbody></table></div></>
}

const GRADING_ROWS = Array.from({length:10},(_,i)=>({id:`PJ02298283${89+i}`,status:['待邮寄','待入库','平台待确认','平台已确认','异常订单','已取消'][Math.min(i,5)],count:i<5?25:12,fee:i<5?138:88,image:PRODUCTS[i%PRODUCTS.length].image}))

function GradingServicePage({ navigate }) {
  const [active,setActive]=useState('PSA送评订单')
  const [tab,setTab]=useState('全部')
  const [agency,setAgency]=useState('全部机构')
  const [query,setQuery]=useState('')
  const [selected,setSelected]=useState(new Set([0,1]))
  const [notice,setNotice]=useState('')
  useEffect(()=>{if(!notice)return;const timer=setTimeout(()=>setNotice(''),2200);return()=>clearTimeout(timer)},[notice])
  const filtered=GRADING_ROWS.filter((r)=> (tab==='全部'||r.status===tab) && (agency==='全部机构'||agency==='PSA美国') && (!query||r.id.toLowerCase().includes(query.toLowerCase())))
  const toggle=(i)=>setSelected(current=>{const next=new Set(current);next.has(i)?next.delete(i):next.add(i);return next})
  return <div className="min-h-[calc(100vh-72px)] bg-canvas py-6"><div className="mx-auto grid max-w-[1440px] gap-6 px-5 lg:grid-cols-[auto_minmax(0,1fr)]"><ManagementSidebar groups={GRADING_GROUPS} active={active} setActive={setActive} service="grading" navigate={navigate}/><main className="min-w-0"><div className="relative h-[164px] overflow-hidden rounded bg-[#080b12] text-white"><div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-10"><h1 className="text-2xl font-bold">合作方专属送评</h1><div className="mt-3 flex flex-wrap gap-x-3 text-xs text-white/60"><span>自动整理订单</span><span>实时状态更新</span><span>批量提交</span><span>全流程可追踪</span></div><button onClick={()=>setNotice('快速创建送评订单')} className="mt-4 h-9 w-fit rounded-full border border-white/50 px-5 text-sm">快速创建</button></div><div className="absolute inset-y-0 right-0 hidden w-1/2 items-center justify-center gap-2 overflow-hidden opacity-65 md:flex">{PRODUCTS.slice(0,5).map((p,i)=><img key={p.id} src={p.image} alt="" className={cn('h-32 w-20 object-contain',i%2&&'-translate-y-5')}/>)}</div></div><section className="mt-4 rounded bg-white p-5"><div className="grid gap-3 xl:grid-cols-[1fr_1fr_1fr_auto]"><select value={agency} onChange={e=>setAgency(e.target.value)} className="h-10 rounded border border-line bg-white px-3 text-sm"><option>全部机构</option><option>PSA美国</option><option>CGC美国</option></select><input type="date" className="h-10 rounded border border-line px-3 text-sm text-muted"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="送评订单号：请输入" className="h-10 rounded border border-line px-3 text-sm outline-none"/><div className="flex gap-2"><button onClick={()=>{setAgency('全部机构');setQuery('')}} className="h-10 rounded border border-line px-4 text-sm">重置</button><button className="h-10 rounded bg-ink px-4 text-sm text-white">查询</button></div></div><div className="mt-7 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between"><SegmentedTabs items={['全部','待邮寄','待入库','平台待确认','平台已确认','异常订单','已取消']} value={tab} onChange={setTab} label="订单状态"/><div className="flex gap-3"><button onClick={()=>setNotice('草稿箱已打开')} className="h-9 rounded border border-line px-4 text-sm">草稿箱 (20)</button><button disabled={!selected.size} onClick={()=>setNotice(`已选择 ${selected.size} 个订单，进入合并发货`)} className="h-9 rounded bg-ink px-4 text-sm text-white disabled:opacity-40">合并发货</button></div></div><GradingTable rows={filtered} selected={selected} toggle={toggle} notify={setNotice}/><div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-sm text-muted"><span>已选 {selected.size} 条</span><div className="flex items-center gap-2"><span>共 6532 条</span>{[1,2,3,4,5].map(n=><button key={n} className={cn('grid size-8 place-items-center rounded',n===1&&'bg-ink text-white')}>{n}</button>)}<span>… 10</span></div></div></section></main></div>{notice&&<PageNotice>{notice}</PageNotice>}</div>
}

function GradingTable({ rows, selected, toggle, notify }) {
  return <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[1080px] text-left text-sm"><thead className="bg-[#f5f7fa] text-muted"><tr>{['','序号','订单状态','细节图','送评订单号','评级机构','包含客户数','包含送评类型','卡片数量','预计评级费用','操作'].map((h,i)=><th key={`${h}-${i}`} className="px-3 py-3 font-normal">{h}</th>)}</tr></thead><tbody>{rows.map((row,index)=><tr key={row.id} className="border-b border-black/10"><td className="px-3 py-3"><input type="checkbox" checked={selected.has(index)} onChange={()=>toggle(index)} className="size-4 accent-ink"/></td><td className="px-3 py-3">{index+1}</td><td className="px-3 py-3">{row.status}</td><td className="px-3 py-3"><div className="relative grid h-16 w-14 place-items-center rounded bg-gray-300"><img src={row.image} alt="" className="h-14 w-9 object-contain"/><span className="absolute bottom-0 right-1 text-xs text-white">3张</span></div></td><td className="px-3 py-3">{row.id}</td><td className="px-3 py-3">PSA美国</td><td className="px-3 py-3">10</td><td className="px-3 py-3">10</td><td className="px-3 py-3">{row.count}</td><td className="px-3 py-3">¥{row.fee}.00</td><td className="px-3 py-3"><div className="flex gap-3 whitespace-nowrap"><button onClick={()=>notify(`${row.id}详情已打开`)} className="hover:underline">查看详情</button><button onClick={()=>notify(index===0?'去发货流程已打开':'物流详情已打开')} className="hover:underline">{index===0?'去发货':'物流详情'}</button></div></td></tr>)}</tbody></table></div>
}

function SectionTitle({ children, className='' }) { return <h2 className={cn('flex items-center gap-2 text-base font-medium',className)}><span className="h-4 w-[3px] bg-[#5c2fd2]"/>{children}</h2> }
function PageNotice({ children }) { return <div className="fixed bottom-6 left-1/2 z-[80] max-w-[calc(100vw-32px)] -translate-x-1/2 break-words rounded bg-ink px-5 py-3 text-center text-sm leading-5 text-white shadow-panel">{children}</div> }

function Footer() {
  return <footer className="border-t border-black/10 bg-white"><div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 md:grid-cols-[180px_1fr_220px]"><div><img src={asset('geca-logo-primary.png')} alt="GECA" className="site-logo h-9 w-[140px] object-contain" /><p className="mt-3 text-xs">未来收藏家的世界</p></div><div className="grid grid-cols-2 gap-8 sm:grid-cols-3"><FooterLinks title="协议政策" links={['用户服务协议','用户注销协议','卖家入驻协议','隐私政策']} /><FooterLinks title="交易市场" links={['竞价专区','即将结束的宝贝','最新上架的宝贝','交易规则']} /><FooterLinks title="信息资讯" links={['关于镖卡','新手入门','联系我们']} /></div><div><strong className="text-sm">关注或联系我们</strong><div className="mt-4 flex gap-5"><div className="size-[90px] bg-black/10" /><div className="size-[90px] bg-black/10" /></div><div className="mt-2 flex justify-between text-[11px] text-muted"><span>扫码下载APP</span><span>关注镖卡公众号</span></div></div></div><div className="border-t border-black/10 py-8 text-center text-xs text-muted"><p>2024-2026 GECA.com 版权所有</p><p className="mt-3">ICP证：深ICP备12022202号　增值电信业务经营许可证：深B2-20202262</p></div></footer>
}

function FooterLinks({ title, links }) { return <div><strong className="text-sm">{title}</strong><div className="mt-3 space-y-2 text-xs text-muted">{links.map((link) => <a key={link} href="#" className="block hover:text-ink">{link}</a>)}</div></div> }

export default App
