const DAILY_LIMIT = 15;
const REWARD_PER_AD = 5;
const MONEY_PER_AD = 4.60;

const TODAY = new Date().toISOString().slice(0, 10);

let savedDate = localStorage.getItem("premi_reward_date");

let completedAds = Number(
  localStorage.getItem("premi_completed_ads") || 0
);

let coins = Number(
  localStorage.getItem("premi_coins") || 0
);

let balance = Number(
  localStorage.getItem("premi_balance") || 0
);


/* নতুন দিন হলে Daily Ads reset */
if (savedDate !== TODAY) {

  completedAds = 0;

  localStorage.setItem(
    "premi_reward_date",
    TODAY
  );

  localStorage.setItem(
    "premi_completed_ads",
    "0"
  );
}


/* Elements */
const watchButtons =
  document.querySelectorAll(".task-btn");

const progressTitle =
  document.querySelector(".progress-header h3");

const progressPercent =
  document.querySelector(".progress-header > strong");

const progressFill =
  document.querySelector(".progress-fill");

const progressText =
  document.querySelector(".progress-card p");

const rewardAmount =
  document.querySelector(".reward-info strong");


/* Update UI */
function updateUI() {

  const percent = Math.min(
    Math.round(
      (completedAds / DAILY_LIMIT) * 100
    ),
    100
  );

  if (progressTitle) {
    progressTitle.textContent =
      `${completedAds} / ${DAILY_LIMIT} সম্পন্ন`;
  }

  if (progressPercent) {
    progressPercent.textContent =
      `${percent}%`;
  }

  if (progressFill) {
    progressFill.style.width =
      `${percent}%`;
  }

  if (rewardAmount) {
    rewardAmount.textContent =
      `+${REWARD_PER_AD} Coins`;
  }

  if (completedAds >= DAILY_LIMIT) {

    if (progressText) {
      progressText.textContent =
        "আজকের Daily Limit পূর্ণ হয়েছে 🎉";
    }

    watchButtons.forEach((button) => {
      button.disabled = true;
      button.textContent = "Completed";
    });

  } else {

    if (progressText) {
      progressText.textContent =
        `আরও ${DAILY_LIMIT - completedAds}টি Ads দেখলে আজকের Daily Limit পূর্ণ হবে 🎯`;
    }

    watchButtons.forEach((button) => {

      if (!button.dataset.running) {
        button.disabled = false;
        button.textContent = "Watch";
      }

    });
  }
}


/* Save reward */
function saveData() {

  localStorage.setItem(
    "premi_reward_date",
    TODAY
  );

  localStorage.setItem(
    "premi_completed_ads",
    String(completedAds)
  );

  localStorage.setItem(
    "premi_coins",
    String(coins)
  );

  localStorage.setItem(
    "premi_balance",
    balance.toFixed(2)
  );
}


/* Give reward */
function giveReward() {

  if (completedAds >= DAILY_LIMIT) {
    return;
  }

  completedAds += 1;
  coins += REWARD_PER_AD;
  balance += MONEY_PER_AD;

  saveData();
  updateUI();

  alert(
    `Ad Complete! 🎉\n\n` +
    `+${REWARD_PER_AD} Coins\n` +
    `+৳${MONEY_PER_AD.toFixed(2)}\n\n` +
    `মোট Coins: ${coins}\n` +
    `মোট Balance: ৳${balance.toFixed(2)}`
  );
}


/* Monetag Rewarded Ad */
watchButtons.forEach((button) => {

  button.addEventListener("click", async () => {

    if (
      button.disabled ||
      button.dataset.running ||
      completedAds >= DAILY_LIMIT
    ) {
      return;
    }

    button.dataset.running = "true";
    button.disabled = true;
    button.textContent = "Loading...";

    try {

      if (typeof window.show_12057878 !== "function") {

        throw new Error(
          "Monetag SDK not loaded"
        );
      }

      await window.show_12057878();

      /*
       * Monetag promise সফলভাবে resolve হওয়ার
       * পরেই reward দেওয়া হবে।
       */
      giveReward();

    } catch (error) {

      console.error(
        "Monetag Ad Error:",
        error
      );

      alert(
        "Ad এখন দেখানো যাচ্ছে না। আবার চেষ্টা করুন।"
      );

    } finally {

      delete button.dataset.running;

      if (completedAds < DAILY_LIMIT) {
        button.disabled = false;
        button.textContent = "Watch";
      }

    }

  });

});


updateUI();

console.log(
  "Premi Monetag Reward System চালু 🚀"
);
