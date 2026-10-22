// 宣告六張情境卡使用的柔和背景顏色。
const questionColors = ['#e1f2dd', '#fff0c7', '#ffe5d9', '#eee7fa', '#dff2f7', '#fce2e8']; // 依本回合題目順序輪替背景顏色。
// 宣告本回合的題目與答案清單，待題庫載入後隨機產生。
let quizItems = []; // 保存抽出的六道題目。
let answerItems = []; // 保存獨立重新排序的六個答案。
let questionBank = []; // 保存成功載入的完整題庫。

// 建立用來記錄「題目編號對應答案編號」的配對表。
const placedAnswers = new Map(); // 儲存使用者目前放入的答案。
// 記錄目前選取的答案，讓觸控裝置也能完成配對。
let selectedAnswerId = null; // 尚未選擇答案時使用空值。
// 記錄是否已經交卷，避免交卷後繼續修改答案。
let hasSubmitted = false; // 測驗剛開始時尚未交卷。

// 在頁面載入時建立題目卡、答案卡並設定按鈕功能。
async function setup() { // 開始設定 p5 畫布與測驗介面。
  createCanvas(windowWidth, windowHeight); // 建立符合目前視窗大小的全螢幕畫布。
  pixelDensity(1); // 使用一般像素密度，讓不同裝置都有穩定的畫布效能。
  questionBank = await window.questionBankReady; // 等待公開雲端題庫或本機備援題庫載入完成。
  selectRandomQuestions(); // 從完整題庫抽出本回合六題並打亂答案順序。
  renderQuiz(); // 將六個生活情境和六個答案放入網頁。
  document.getElementById('submit-button').addEventListener('click', submitQuiz); // 讓交卷按鈕計算並顯示成績。
  document.getElementById('replay-button').addEventListener('click', resetQuiz); // 讓再玩一次按鈕重設整份測驗。
  document.getElementById('close-result').addEventListener('click', closeResult); // 讓關閉按鈕收起成績視窗。
  document.getElementById('result-modal').addEventListener('click', handleModalClick); // 允許點擊成績視窗外側來關閉視窗。
  document.addEventListener('keydown', handleKeydown); // 讓鍵盤使用者可以用 Escape 關閉成績視窗。
} // 結束設定流程。

// 隨機洗牌題庫，再抽出六題並另外打亂答案排列。
function selectRandomQuestions() { // 開始建立本回合的隨機題目和答案。
  const shuffledQuestions = [...questionBank]; // 複製完整題庫，避免更動題庫原有順序。
  for (let index = shuffledQuestions.length - 1; index > 0; index -= 1) { // 從最後一題開始進行 Fisher-Yates 洗牌。
    const swapIndex = Math.floor(Math.random() * (index + 1)); // 在尚未排列的位置中隨機選擇交換對象。
    [shuffledQuestions[index], shuffledQuestions[swapIndex]] = [shuffledQuestions[swapIndex], shuffledQuestions[index]]; // 交換兩道題目的順序。
  } // 結束題庫洗牌。
  quizItems = shuffledQuestions.slice(0, 6).map((item, index) => ({ ...item, color: questionColors[index] })); // 取前六題並加入插畫背景顏色。
  answerItems = [...quizItems]; // 複製本回合題目，準備獨立排列答案。
  for (let index = answerItems.length - 1; index > 0; index -= 1) { // 重新洗牌答案，不沿用題目卡片順序。
    const swapIndex = Math.floor(Math.random() * (index + 1)); // 隨機選取本次答案交換位置。
    [answerItems[index], answerItems[swapIndex]] = [answerItems[swapIndex], answerItems[index]]; // 交換答案的顯示順序。
  } // 結束答案選項洗牌。
  if (answerItems.every((item, index) => item.id === quizItems[index].id)) answerItems.push(answerItems.shift()); // 若答案意外與題目同序，就輪換第一個答案。
} // 結束本回合隨機資料建立。

// 每一影格清除畫布並繪製柔和的背景點綴。
function draw() { // 開始繪製全螢幕背景畫布。
  clear(); // 保持畫布透明，讓 CSS 設定的奶油色背景可以透出來。
  noStroke(); // 移除背景裝飾圓點的外框。
  fill(38, 115, 79, 13); // 設定淡淡的森林綠背景裝飾色。
  circle(width * 0.035, height * 0.31, 110); // 在畫面左側繪製柔和的大圓點。
  circle(width * 0.96, height * 0.72, 145); // 在畫面右側繪製另一個柔和的大圓點。
  fill(237, 115, 93, 16); // 將點綴顏色改為淡淡的珊瑚色。
  circle(width * 0.88, height * 0.12, 68); // 在右上方畫出小型色彩點綴。
} // 結束背景繪製。

// 視窗大小改變時同步調整 p5 畫布，維持滿版背景。
function windowResized() { // 開始處理瀏覽器視窗尺寸改變。
  resizeCanvas(windowWidth, windowHeight); // 將畫布寬高更新為最新視窗寬高。
} // 結束畫布尺寸調整。

// 根據測驗資料建立情境圖卡、拖放區和可拖曳答案按鈕。
function renderQuiz() { // 開始建立所有測驗卡片。
  const sceneGrid = document.getElementById('scene-grid'); // 找到情境圖卡的容器。
  const answerGrid = document.getElementById('answer-grid'); // 找到答案按鈕的容器。
  sceneGrid.innerHTML = quizItems.map((item, index) => `
    <article class="scene-card" data-scene-id="${item.id}">
      <div class="scene-art" style="--scene-color: ${item.color}">
        <span class="scene-emoji" aria-hidden="true">${item.emoji}</span>
      </div>
      <div class="scene-copy">
        <span class="scene-title">${index + 1}. ${item.scene}</span>
        <div class="drop-target" data-target-id="${item.id}" tabindex="0" role="button" aria-label="把正確答案放到：${item.scene}">拖曳答案到這裡</div>
      </div>
    </article>
  `).join(''); // 將六張圖卡組合成一段 HTML。
  answerGrid.innerHTML = answerItems.map((item, index) => `
    <button class="answer-card" type="button" draggable="true" data-answer-id="${item.id}" aria-pressed="false">
      <span class="answer-index">${String(index + 1).padStart(2, '0')}</span>
      <span>${item.answer}</span>
    </button>
  `).join(''); // 將六個答案組合成一段 HTML。
  quizItems.forEach((item) => bindSceneEvents(item)); // 為每一個情境答題區設定拖放和點擊操作。
  quizItems.forEach((item) => bindAnswerEvents(item)); // 為每一個答案按鈕設定拖曳和點擊操作。
} // 結束測驗卡片建立流程。

// 設定單一情境卡片的拖放、點擊和鍵盤配對操作。
function bindSceneEvents(item) { // 開始綁定一題的互動事件。
  const target = document.querySelector(`[data-target-id="${item.id}"]`); // 取得本題專屬的答案放置位置。
  target.addEventListener('dragover', (event) => { // 當答案拖到圖卡上方時準備接受放置。
    event.preventDefault(); // 允許瀏覽器把拖曳答案放入此區域。
    target.classList.add('is-over'); // 顯示目前被拖曳答案選取的視覺提示。
  }); // 結束拖曳經過事件。
  target.addEventListener('dragleave', () => target.classList.remove('is-over')); // 拖曳離開圖卡時移除選取提示。
  target.addEventListener('drop', (event) => { // 當使用者放開答案時處理配對。
    event.preventDefault(); // 阻止瀏覽器直接開啟被拖曳的文字內容。
    target.classList.remove('is-over'); // 移除拖曳時的視覺提示。
    placeAnswer(item.id, event.dataTransfer.getData('text/plain')); // 將拖入的答案放到這個情境題。
  }); // 結束拖放答案事件。
  target.addEventListener('click', () => { // 當使用者點擊答題位置時處理觸控配對。
    if (hasSubmitted) return; // 交卷後不再接受新的配對操作。
    if (selectedAnswerId) placeAnswer(item.id, selectedAnswerId); // 已選答案時將該答案放進目前圖卡。
    else if (placedAnswers.has(item.id)) { // 沒有選取答案但此圖卡已有答案時允許取回。
      placedAnswers.delete(item.id); // 從配對表移除這一題的答案。
      updateQuizUI(); // 更新答案卡、答題位置和配對進度。
    } // 結束取回答案的判斷。
  }); // 結束點擊答題位置事件。
  target.addEventListener('keydown', (event) => { // 支援鍵盤使用者操作答題位置。
    if ((event.key === 'Enter' || event.key === ' ') && selectedAnswerId) { // 按下 Enter 或空白鍵並已選答案時進行配對。
      event.preventDefault(); // 避免空白鍵讓整頁向下捲動。
      placeAnswer(item.id, selectedAnswerId); // 將目前選取的答案放入指定題目。
    } // 結束鍵盤配對條件。
  }); // 結束鍵盤操作事件。
} // 結束單題事件綁定。

// 設定答案按鈕的拖曳及點選功能。
function bindAnswerEvents(item) { // 開始綁定單個答案的互動事件。
  const answerCard = document.querySelector(`[data-answer-id="${item.id}"]`); // 找到與題目識別碼相同的答案按鈕。
  answerCard.addEventListener('dragstart', (event) => { // 使用者開始拖曳答案時儲存答案識別碼。
    if (hasSubmitted) { event.preventDefault(); return; } // 交卷後取消拖曳，避免修改已完成的測驗。
    event.dataTransfer.setData('text/plain', item.id); // 將答案識別碼放進瀏覽器拖曳資料。
    event.dataTransfer.effectAllowed = 'move'; // 告訴瀏覽器這次拖曳是移動答案。
    selectedAnswerId = item.id; // 同時記錄目前拖曳的答案。
  }); // 結束開始拖曳事件。
  answerCard.addEventListener('click', () => { // 點擊答案按鈕時選取答案以支援觸控操作。
    if (hasSubmitted) return; // 交卷之後不允許再選取答案。
    selectedAnswerId = selectedAnswerId === item.id ? null : item.id; // 再點一次相同答案即可取消選取。
    updateQuizUI(); // 更新選取外觀和配對進度。
  }); // 結束點擊答案事件。
} // 結束答案按鈕事件綁定。

// 把答案放進指定題目，並保留其他題目目前已選的答案。
function placeAnswer(sceneId, answerId) { // 開始更新一組配對答案。
  if (hasSubmitted || !quizItems.some((item) => item.id === answerId)) return; // 忽略交卷後操作或無效答案。
  placedAnswers.set(sceneId, answerId); // 將答案放入使用者指定的題目。
  selectedAnswerId = null; // 配對完成後清除答案選取狀態。
  updateQuizUI(); // 同步更新所有配對外觀及交卷按鈕。
} // 結束配對答案更新。

// 根據最新配對狀態更新答案卡、拖放區和測驗進度。
function updateQuizUI() { // 開始重新整理測驗畫面。
  document.querySelectorAll('.answer-card').forEach((card) => { // 逐一更新每個答案按鈕的狀態。
    const answerId = card.dataset.answerId; // 讀取目前答案按鈕的識別碼。
    const isUsed = [...placedAnswers.values()].includes(answerId); // 確認這個答案是否已經放入任一題目。
    card.classList.toggle('is-used', isUsed); // 已使用答案顯示已配對的視覺效果。
    card.classList.toggle('is-selected', selectedAnswerId === answerId); // 為目前選取的答案顯示醒目外框。
    card.setAttribute('aria-pressed', String(selectedAnswerId === answerId)); // 告訴輔助科技答案目前是否被選取。
  }); // 結束答案按鈕狀態更新。
  quizItems.forEach((item) => { // 逐一更新每個題目的答案放置區。
    const target = document.querySelector(`[data-target-id="${item.id}"]`); // 找到目前題目的答題位置。
    const answerId = placedAnswers.get(item.id); // 讀取目前題目已放入的答案識別碼。
    const answer = quizItems.find((choice) => choice.id === answerId); // 找出答案識別碼對應的生活好習慣文字。
    target.textContent = answer ? answer.answer : '拖曳答案到這裡'; // 顯示已選答案，或保留空白提示。
    target.classList.toggle('is-filled', Boolean(answer)); // 為已有答案的題目顯示不同的底色。
    target.setAttribute('aria-label', answer ? `${item.scene}；答案：${answer.answer}` : `把正確答案放到：${item.scene}`); // 更新答題位置的無障礙說明。
  }); // 結束題目答題位置更新。
  const completedCount = placedAnswers.size; // 計算目前已完成的配對題數。
  document.getElementById('progress-count').textContent = `${completedCount} / ${quizItems.length}`; // 更新頁面右上角的配對進度。
  document.getElementById('submit-button').disabled = completedCount !== quizItems.length; // 六題全部配對後才啟用交卷按鈕。
  document.getElementById('footer-note').textContent = completedCount === quizItems.length ? '六題都配好了！準備看看你的成績吧。' : `還有 ${quizItems.length - completedCount} 題等你配對完成！`; // 用友善提示顯示剩餘題數。
} // 結束畫面同步更新。

// 統計正確配對數、顯示成績，並在高於八十分時播放彩帶。
function submitQuiz() { // 開始計算測驗成績。
  if (placedAnswers.size !== quizItems.length || hasSubmitted) return; // 題目未完成或已交卷時不計算成績。
  hasSubmitted = true; // 鎖定測驗答案，避免交卷後修改配對。
  const correctCount = quizItems.filter((item) => placedAnswers.get(item.id) === item.id).length; // 計算答對的題目數量。
  const score = Math.round((correctCount / quizItems.length) * 100); // 將答對題數換算成百分制成績。
  quizItems.forEach((item) => { // 逐題標示正確或需要再練習的答案。
    const card = document.querySelector(`[data-scene-id="${item.id}"]`); // 找到目前題目的整張圖卡。
    card.classList.add(placedAnswers.get(item.id) === item.id ? 'is-correct' : 'is-incorrect'); // 依照配對結果加上正確或錯誤樣式。
  }); // 結束逐題判分。
  const isHighScore = score > 80; // 確認成績是否嚴格高於八十分。
  document.getElementById('result-emoji').textContent = isHighScore ? '🎉' : '🌱'; // 高分顯示慶祝圖示，其他成績顯示鼓勵圖示。
  document.getElementById('result-title').textContent = isHighScore ? '生活小高手！' : '再練習一次！'; // 依照測驗成績顯示不同標題。
  document.getElementById('result-score').textContent = `${score} 分`; // 在成績視窗顯示百分制分數。
  document.getElementById('result-message').textContent = isHighScore ? `答對 ${correctCount} 題，健康好習慣都記住了！` : `答對 ${correctCount} 題，看看圖卡再挑戰一次吧！`; // 顯示正確題數與親切鼓勵文字。
  document.getElementById('result-modal').hidden = false; // 打開置中的測驗成績視窗。
  document.getElementById('close-result').focus(); // 將鍵盤焦點移到成績視窗的關閉按鈕。
  if (isHighScore) launchConfetti(); // 成績高於八十分時在畫面播放彩帶。
} // 結束成績計算與結果顯示。

// 建立散落整個畫面的彩帶，並在動畫結束後移除元素。
function launchConfetti() { // 開始建立慶祝彩帶動畫。
  const colors = ['#ed735d', '#f5c74e', '#56a875', '#61b9c5', '#ee9eb3', '#8c82c8']; // 設定明亮多彩的彩帶顏色。
  for (let index = 0; index < 90; index += 1) { // 建立九十片彩帶形成豐富的慶祝效果。
    const piece = document.createElement('span'); // 建立一個代表彩帶的小型網頁元素。
    piece.className = 'confetti-piece'; // 套用彩帶位置與下落動畫樣式。
    piece.style.setProperty('--x', `${Math.random() * 100}vw`); // 隨機設定彩帶從畫面寬度中的哪個位置落下。
    piece.style.setProperty('--size', `${6 + Math.random() * 7}px`); // 隨機設定彩帶寬度和長度。
    piece.style.setProperty('--color', colors[index % colors.length]); // 循環使用彩帶色盤中的不同顏色。
    piece.style.setProperty('--duration', `${2.2 + Math.random() * 2.2}s`); // 隨機設定每片彩帶落下所需時間。
    piece.style.setProperty('--delay', `${Math.random() * 0.7}s`); // 隨機錯開彩帶開始下落的時間。
    piece.style.setProperty('--drift', `${-90 + Math.random() * 180}px`); // 隨機設定彩帶落下時左右飄動的幅度。
    piece.style.setProperty('--spin', `${360 + Math.random() * 900}deg`); // 隨機設定彩帶旋轉角度。
    document.body.appendChild(piece); // 將彩帶加到網頁，讓 CSS 播放落下動畫。
    window.setTimeout(() => piece.remove(), 5200); // 動畫結束後移除彩帶，避免累積多餘元素。
  } // 結束彩帶元素建立迴圈。
} // 結束慶祝彩帶動畫。

// 隱藏成績視窗並將鍵盤焦點帶回交卷按鈕。
function closeResult() { // 開始關閉成績視窗。
  document.getElementById('result-modal').hidden = true; // 隱藏成績視窗以回到測驗畫面。
  document.getElementById('submit-button').focus(); // 把鍵盤焦點移回測驗操作按鈕。
} // 結束關閉成績視窗。

// 點擊成績視窗的暗色背景時關閉視窗。
function handleModalClick(event) { // 開始處理成績視窗背景點擊。
  if (event.target.id === 'result-modal') closeResult(); // 只有點擊視窗外側背景才關閉成績視窗。
} // 結束成績視窗背景點擊處理。

// 讓使用者按 Escape 關閉成績視窗。
function handleKeydown(event) { // 開始處理鍵盤快捷操作。
  if (event.key === 'Escape' && !document.getElementById('result-modal').hidden) closeResult(); // 成績視窗開啟時以 Escape 關閉。
} // 結束鍵盤快捷操作。

// 清除作答、分數樣式和成績視窗，重新開始全新測驗。
function resetQuiz() { // 開始重設測驗內容。
  placedAnswers.clear(); // 清空所有題目已放置的答案。
  selectedAnswerId = null; // 取消目前選取的答案。
  hasSubmitted = false; // 恢復可作答狀態。
  selectRandomQuestions(); // 重新抽題並再次隨機排列答案。
  renderQuiz(); // 以新一回合的題目和答案重建卡片。
  document.querySelectorAll('.scene-card').forEach((card) => card.classList.remove('is-correct', 'is-incorrect')); // 移除各題的判分顏色標記。
  document.querySelectorAll('.confetti-piece').forEach((piece) => piece.remove()); // 移除還在畫面上的舊彩帶。
  document.getElementById('result-modal').hidden = true; // 關閉成績視窗。
  updateQuizUI(); // 將六題答案與測驗進度重設為初始狀態。
  document.getElementById('answer-grid').scrollIntoView({ behavior: 'smooth', block: 'center' }); // 平順帶回答案選項方便開始新一輪。
} // 結束測驗重設。