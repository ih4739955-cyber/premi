// ========================================
// PREMI - Home JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", () => {

  // ========================================
  // Telegram Mini App
  // ========================================

  const tg = window.Telegram?.WebApp;

  if (tg) {
    tg.ready();
    tg.expand();
  }


  // ========================================
  // Settings
  // ========================================

  const DAILY_LIMIT = 15;


  // ========================================
  // Get Saved Data
  // ========================================

  let coins = Number(
    localStorage.getItem("premi_coins") || 40
  );

  let balance = Number(
    localStorage.getItem("premi_balance") || 36.80
  );

  let completedAds = Number(
    localStorage.getItem("premi_completed_ads") || 8
  );


  // ========================================
  // Home Elements
  // ========================================

  const balanceElement =
    document.getElementById("balance");

  const coinsElement =
    document.getElementById("coins");

  const completedElement =
    document.getElementById("completedAds");

  const progressPercentElement =
    document.getElementById("progressPercent");

  const progressFillElement =
    document.getElementById("progressFill");

  const progressTextElement =
    document.getElementById("progressText");

  const progressTitleElement =
    document.querySelector(
      ".progress-card .progress-header h3"
    );


  // ========================================
  // Update Home
  // ========================================

  function updateHome() {

    // Balance
    if (balanceElement) {
      balanceElement.textContent =
        balance.toFixed(2);
    }


    // Coins
    if (coinsElement) {
      coinsElement.textContent =
        coins;
    }


    // Completed Ads
    if (completedElement) {
      completedElement.textContent =
        completedAds;
    }


    // Progress
    const percent = Math.min(
      Math.round(
        (completedAds / DAILY_LIMIT) * 100
      ),
      100
    );


    if (progressTitleElement) {
      progressTitleElement.textContent =
        `${completedAds} / ${DAILY_LIMIT} সম্পন্ন`;
    }


    if (progressPercentElement) {
      progressPercentElement.textContent =
        `${percent}%`;
    }


    if (progressFillElement) {
      progressFillElement.style.width =
        `${percent}%`;
    }


    if (progressTextElement) {

      if (completedAds >= DAILY_LIMIT) {

        progressTextElement.textContent =
          "আজকের Daily Limit পূর্ণ হয়েছে 🎉";

      } else {

        progressTextElement.textContent =
          `আরও ${DAILY_LIMIT - completedAds}টি Ads দেখলে আজকের Daily Limit পূর্ণ হবে 🎯`;

      }
    }
  }


  // ========================================
  // Tasks Button
  // ========================================

  const tasksButton =
    document.querySelector(
      '.quick-actions a[href="tasks.html"]'
    );

  if (tasksButton) {

    tasksButton.addEventListener(
      "click",
      () => {
        window.location.href =
          "tasks.html";
      }
    );

  }


  // ========================================
  // Quick Actions
  // ========================================

  const quickActions =
    document.querySelectorAll(
      ".quick-actions .action-card"
    );


  quickActions.forEach((card) => {

    const title =
      card.querySelector("strong")?.textContent
        ?.trim();


    if (title === "Withdraw") {

      card.addEventListener(
        "click",
        () => {
          alert(
            "Withdraw System শীঘ্রই চালু হবে 💳"
          );
        }
      );

    }


    if (title === "Refer") {

      card.addEventListener(
        "click",
        () => {
          alert(
            "Refer System শীঘ্রই চালু হবে 👥"
          );
        }
      );

    }

  });


  // ========================================
  // Bottom Navigation
  // ========================================

  const bottomLinks =
    document.querySelectorAll(
      ".bottom-nav a"
    );


  bottomLinks.forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const text =
          link.querySelector("span")
            ?.textContent
            ?.trim();


        // Home
        if (text === "Home") {
          return;
        }


        // Tasks
        if (text === "Tasks") {
          return;
        }


        // Wallet
        if (text === "Wallet") {

          event.preventDefault();

          alert(
            "Wallet System শীঘ্রই চালু হবে 💰"
          );

          return;
        }


        // Profile
        if (text === "Profile") {

          event.preventDefault();

          alert(
            "Profile System শীঘ্রই চালু হবে 👤"
          );

        }

      }
    );

  });


  // ========================================
  // First Load
  // ========================================

  updateHome();


  console.log(
    "Premi Home synced successfully 🚀"
  );

});
