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


function updateUI() {

  const percent = Math.min(
    Math.round(
      (completedAds / DAILY_LIMIT) * 100
    ),
    100
  );

  progressTitle.textContent =
    `${completedAds} / ${DAILY_LIMIT} সম্পন্ন`;

  progressPercent.textContent =
    `${percent}%`;

  progressFill.style.width =
    `${percent}%`;

  rewardAmount.textContent =
    `+${REWARD_PER_AD} Coins`;

  if (completedAds >= DAILY_LIMIT) {

    progressText.textContent =
      "আজকের Daily Limit পূর্ণ হয়েছে 🎉";

    watchButtons.forEach((button) => {
      button.disabled = true;
      button.textContent = "Completed";
    });

  } else {

    progressText.textContent =
      `আরও ${DAILY_LIMIT - completedAds}টি Ads দেখলে আজকের Daily Limit পূর্ণ হবে 🎯`;

    watchButtons.forEach((button) => {

      if (!button.dataset.running) {
        button.disabled = false;
        button.textContent = "Watch";
      }

    });
  }
}


function saveData() {

  localStorage.setItem(
    "premi_reward_date",
    TODAY
  );

  localStorage.setItem(
    "premi_completed_ads",
    completedAds
  );

  localStorage.setItem(
    "premi_coins",
    coins
  );

  localStorage.setItem(
    "premi_balance",
    balance.toFixed(2)
  );
}


watchButtons.forEach((button) => {

  button.addEventListener("click", () => {

    if (
      button.disabled ||
      completedAds >= DAILY_LIMIT
    ) {
      return;
    }

    let seconds = 5;

    button.dataset.running = "true";
    button.disabled = true;
    button.textContent = `${seconds}s`;

    const timer = setInterval(() => {

      seconds--;

      if (seconds > 0) {
        button.textContent = `${seconds}s`;
      }

      if (seconds <= 0) {

        clearInterval(timer);

        delete button.dataset.running;

        completedAds += 1;
        coins += REWARD_PER_AD;
        balance += MONEY_PER_AD;

        saveData();
        updateUI();

        if (completedAds < DAILY_LIMIT) {
          button.disabled = false;
          button.textContent = "Watch";
        }

        alert(
          `Ad Complete! 🎉\n\n` +
          `+${REWARD_PER_AD} Coins\n` +
          `+৳${MONEY_PER_AD.toFixed(2)}\n\n` +
          `মোট Coins: ${coins}\n` +
          `মোট Balance: ৳${balance.toFixed(2)}`
        );
      }

    }, 1000);

  });

});


updateUI();

console.log("Premi Daily Limit System চালু 🚀");
