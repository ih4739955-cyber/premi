const DAILY_LIMIT = 15;

const coins = Number(
  localStorage.getItem("premi_coins") || 40
);

const balance = Number(
  localStorage.getItem("premi_balance") || 36.80
);

const completedAds = Number(
  localStorage.getItem("premi_completed_ads") || 8
);

/* Home Balance */
const balanceAmount = document.querySelector(".balance-top h1");
const coinAmount = document.querySelector(".balance-top p");

if (balanceAmount) {
  balanceAmount.textContent =
    `৳ ${balance.toFixed(2)}`;
}

if (coinAmount) {
  coinAmount.textContent =
    `${coins} Coins`;
}

/* Daily Progress */
const progressTitle =
  document.querySelector(".progress-card .progress-header h3");

const progressPercent =
  document.querySelector(".progress-card .progress-header > strong");

const progressFill =
  document.querySelector(".progress-fill");

const progressText =
  document.querySelector(".progress-card p");

if (progressTitle) {
  progressTitle.textContent =
    `${completedAds} / ${DAILY_LIMIT} Ads সম্পন্ন`;
}

if (progressPercent) {
  const percent = Math.round(
    (completedAds / DAILY_LIMIT) * 100
  );

  progressPercent.textContent =
    `${percent}%`;

  progressFill.style.width =
    `${Math.min(percent, 100)}%`;
}

if (progressText) {
  progressText.textContent =
    completedAds >= DAILY_LIMIT
      ? "আজকের Daily Limit পূর্ণ হয়েছে 🎉"
      : `আরও ${DAILY_LIMIT - completedAds}টি Ads দেখলে আজকের Daily Limit পূর্ণ হবে 🎯`;
}

console.log("Premi Home synced 🚀");
