// 設定使用者提供的 Google 試算表公開 CSV 匯出網址。
window.questionBankUrl = 'https://docs.google.com/spreadsheets/d/1rh-hEBJFGgHK8psP-9B-tw3LzXNj7eEXO3mcoISb06A/export?format=csv&gid=0';

// 提供三十題幼兒生活常識題目作為本機備援資料。
window.localQuestionBank = [
  { id: 'q01', category: '衛生保健', emoji: '🧼', scene: '吃點心前，手上沾了好多灰塵', answer: '先用肥皂把雙手洗乾淨' }, // 飯前洗手。
  { id: 'q02', category: '衛生保健', emoji: '🚽', scene: '上完廁所後，接下來要做什麼', answer: '用肥皂洗手，保持雙手乾淨' }, // 如廁後洗手。
  { id: 'q03', category: '衛生保健', emoji: '🤧', scene: '鼻子癢癢的，忍不住打噴嚏', answer: '用手肘遮住口鼻，再洗手' }, // 打噴嚏遮口鼻。
  { id: 'q04', category: '衛生保健', emoji: '🧻', scene: '鼻涕流出來，手邊有衛生紙', answer: '用衛生紙擦鼻子，再丟垃圾桶' }, // 擦鼻涕後丟棄紙巾。
  { id: 'q05', category: '衛生保健', emoji: '🪥', scene: '準備睡覺了，牙齒還沒清潔', answer: '睡前刷牙，照顧牙齒健康' }, // 睡前刷牙。
  { id: 'q06', category: '衛生保健', emoji: '🤒', scene: '身體不舒服，覺得頭痛又發熱', answer: '告訴家長或老師，請大人幫忙' }, // 身體不適時告知大人。
  { id: 'q07', category: '衛生保健', emoji: '💊', scene: '桌上有藥丸，看起來像糖果', answer: '不自己拿來吃，先詢問大人' }, // 不自行拿藥服用。
  { id: 'q08', category: '衛生保健', emoji: '🍎', scene: '水果剛買回來，準備拿來吃', answer: '先把水果洗乾淨再吃' }, // 清洗水果。
  { id: 'q09', category: '衛生保健', emoji: '🧴', scene: '玩完沙土後，手上都是泥巴', answer: '用肥皂和清水把手洗乾淨' }, // 玩耍後洗手。
  { id: 'q10', category: '衛生保健', emoji: '😴', scene: '晚上到了，明天還要早起上學', answer: '按時上床睡覺，讓身體休息' }, // 按時睡覺。
  { id: 'q11', category: '飲食健康', emoji: '🥣', scene: '早上起床了，還沒有吃早餐', answer: '吃一份營養早餐再開始一天' }, // 吃早餐。
  { id: 'q12', category: '飲食健康', emoji: '🥦', scene: '午餐盤裡有飯、肉和蔬菜', answer: '各種食物都吃一些，不挑食' }, // 均衡飲食。
  { id: 'q13', category: '飲食健康', emoji: '🥤', scene: '玩耍後口渴了，旁邊有白開水', answer: '喝白開水補充水分' }, // 口渴喝白開水。
  { id: 'q14', category: '飲食健康', emoji: '🍬', scene: '糖果很好吃，還想一口氣吃很多', answer: '糖果適量吃，不要吃太多' }, // 甜食適量。
  { id: 'q15', category: '飲食健康', emoji: '🍲', scene: '熱湯剛端上桌，還冒著熱氣', answer: '先請大人幫忙，放涼一點再吃' }, // 小心熱湯燙傷。
  { id: 'q16', category: '交通安全', emoji: '🚦', scene: '行人號誌亮起紅色小人', answer: '停在路邊等候，不走過馬路' }, // 紅燈停等。
  { id: 'q17', category: '交通安全', emoji: '🚸', scene: '要過馬路，旁邊有斑馬線', answer: '牽好大人的手，走斑馬線' }, // 牽手走斑馬線。
  { id: 'q18', category: '交通安全', emoji: '🚗', scene: '坐上汽車準備和家人出門', answer: '坐好安全座椅並繫上安全帶' }, // 乘車繫安全帶。
  { id: 'q19', category: '交通安全', emoji: '🚲', scene: '準備騎腳踏車到公園玩', answer: '戴好安全帽並請大人陪同' }, // 騎車戴安全帽。
  { id: 'q20', category: '交通安全', emoji: '🅿️', scene: '停車場裡有車子正在進出', answer: '牽著大人的手，不在車道奔跑' }, // 停車場牽好大人。
  { id: 'q21', category: '居家安全', emoji: '🔌', scene: '牆上的插座有好多小洞洞', answer: '不把手指或物品伸進插座' }, // 不碰插座。
  { id: 'q22', category: '居家安全', emoji: '✂️', scene: '美勞時間需要使用一把剪刀', answer: '請大人陪同，使用剪刀要小心' }, // 大人陪同使用剪刀。
  { id: 'q23', category: '居家安全', emoji: '🧴', scene: '看到瓶子裡裝著不認識的清潔液', answer: '不碰不喝，馬上告訴大人' }, // 遠離清潔用品。
  { id: 'q24', category: '居家安全', emoji: '🫖', scene: '桌上有剛煮好的熱水壺', answer: '不自己拿熱水壺，請大人幫忙' }, // 遠離熱水壺。
  { id: 'q25', category: '居家安全', emoji: '🧸', scene: '玩完玩具後，地上散落許多積木', answer: '把玩具收好，避免自己或別人跌倒' }, // 玩具收好。
  { id: 'q26', category: '禮貌與人際', emoji: '🧩', scene: '好朋友也想玩你手上的積木', answer: '輪流一起玩，也可以和朋友分享' }, // 輪流與分享。
  { id: 'q27', category: '禮貌與人際', emoji: '💬', scene: '不小心撞到旁邊的同學', answer: '關心同學並說對不起' }, // 禮貌道歉。
  { id: 'q28', category: '禮貌與人際', emoji: '🙋', scene: '老師正在說話，大家安靜聆聽', answer: '等老師說完再舉手發問' }, // 專心聆聽。
  { id: 'q29', category: '禮貌與人際', emoji: '🧑‍🤝‍🧑', scene: '在人多的地方找不到一起來的家人', answer: '留在原地，找工作人員或警察幫忙' }, // 走失時尋求協助。
  { id: 'q30', category: '禮貌與人際', emoji: '🛑', scene: '有人讓你覺得不舒服或不安心', answer: '離開那個人，告訴信任的大人' } // 遇到不舒服的狀況時求助。
];

// 依照 Excel 匯出的 CSV 欄位讀取題庫並檢查題目格式。
function parseQuestionCsv(csvText) {
  const rows = []; // 儲存解析完成的 CSV 列。
  let row = []; // 暫存目前解析中的欄位列。
  let field = ''; // 暫存目前解析中的文字欄位。
  let insideQuotes = false; // 記錄目前是否位於 CSV 引號欄位內。
  const text = csvText.replace(/^\uFEFF/, ''); // 移除 Excel CSV 常見的 UTF-8 BOM。
  for (let index = 0; index < text.length; index += 1) { // 逐字讀取 CSV 以保留欄位中的逗號。
    const character = text[index]; // 取得目前正在處理的字元。
    if (character === '"' && insideQuotes && text[index + 1] === '"') { field += '"'; index += 1; } // 將 CSV 內的雙引號還原為單一引號。
    else if (character === '"') insideQuotes = !insideQuotes; // 遇到一般雙引號時切換欄位引用狀態。
    else if (character === ',' && !insideQuotes) { row.push(field); field = ''; } // 只在引號外把逗號視為欄位分隔符。
    else if ((character === '\n' || character === '\r') && !insideQuotes) { // 在引號外遇到換行時結束目前資料列。
      if (character === '\r' && text[index + 1] === '\n') index += 1; // 將 Windows CRLF 視為單一換行。
      row.push(field); // 把最後一個欄位加入目前資料列。
      if (row.some((value) => value.trim() !== '')) rows.push(row); // 忽略空白列並保留有效資料。
      row = []; // 準備開始解析下一列。
      field = ''; // 清空上一列留下的欄位文字。
    } else field += character; // 將一般字元加入目前欄位內容。
  } // 結束逐字解析 CSV。
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); } // 收入檔案最後一列可能沒有換行的資料。
  const aliases = { id: 'id', ID: 'id', '分類': 'category', category: 'category', '圖示': 'emoji', emoji: 'emoji', '題目': 'scene', scene: 'scene', '正確答案': 'answer', '答案': 'answer', answer: 'answer' }; // 對應英文及常見繁體中文欄位名稱。
  const headers = rows.shift()?.map((header) => aliases[header.trim()] || header.trim().toLowerCase()) || []; // 將第一列標題轉換成程式使用的欄位名稱。
  return rows.map((values, index) => { // 逐列建立可供測驗使用的題目物件。
    const item = Object.fromEntries(headers.map((header, column) => [header, (values[column] || '').trim()])); // 將欄位標題和值組成題目資料。
    return { ...item, id: item.id || `remote-${index + 1}`, emoji: item.emoji || '🌟' }; // 沒填題目編號或圖示時提供安全預設值。
  }); // 結束 CSV 列轉換。
} // 結束 CSV 題庫解析。

// 有設定公開網址時載入雲端 CSV，否則直接使用本機三十題備援題庫。
window.questionBankReady = (async () => { // 建立等待題庫載入完成的 Promise。
  if (!window.questionBankUrl.trim()) return window.localQuestionBank; // 網址留白時立即使用本機題庫。
  try { // 開始安全嘗試讀取公開雲端題庫。
    const response = await fetch(window.questionBankUrl); // 從公開網址下載 CSV 題庫。
    if (!response.ok) throw new Error(`題庫網址回應錯誤：${response.status}`); // 遇到 HTTP 錯誤時改用備援題庫。
    const remoteQuestions = parseQuestionCsv(await response.text()); // 將下載的 CSV 文字轉成題目資料。
    const validQuestions = remoteQuestions.filter((item) => item.id && item.scene && item.answer); // 移除缺少識別碼或題目答案的列。
    if (validQuestions.length < 6) throw new Error('公開題庫至少需要六道有效題目。'); // 題目不足時避免測驗無法正常作答。
    return validQuestions; // 使用通過檢查的公開雲端題庫。
  } catch (error) { // 接住網址、網路或 CSV 格式錯誤。
    console.warn('雲端題庫載入失敗，改用本機題庫。', error); // 在開發者主控台說明目前使用備援資料。
    return window.localQuestionBank; // 保持測驗在雲端題庫無法連線時仍可遊玩。
  } // 結束雲端題庫讀取。
})(); // 開始載入設定的題庫網址。