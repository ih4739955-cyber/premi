document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     PREMI PROFILE - LOCAL DATA
  ========================================= */

  const balance = parseFloat(
    localStorage.getItem("premi_balance") || "0"
  );

  const coins = parseInt(
    localStorage.getItem("premi_coins") || "0",
    10
  );

  const completedAds = parseInt(
    localStorage.getItem("premi_completed_ads") || "0",
    10
  );

  const totalReferrals = parseInt(
    localStorage.getItem("premi_total_referrals") || "0",
    10
  );

  const referralEarnings = parseFloat(
    localStorage.getItem("premi_referral_earnings") || "0"
  );


  /* =========================================
     BALANCE + COINS
  ========================================= */

  const balanceEl = document.getElementById("profileBalance");
  const coinsEl = document.getElementById("profileCoins");

  if (balanceEl) {
    balanceEl.textContent = `৳${balance.toFixed(2)}`;
  }

  if (coinsEl) {
    coinsEl.textContent = `🪙 ${coins} Coins`;
  }


  /* =========================================
     ADS
  ========================================= */

  const adsEl = document.getElementById("profileAds");

  if (adsEl) {
    adsEl.textContent = completedAds;
  }


  /* =========================================
     REFERRALS
  ========================================= */

  const referralsEl =
    document.getElementById("profileReferrals");

  if (referralsEl) {
    referralsEl.textContent = totalReferrals;
  }


  /* =========================================
     TOTAL EARNED
  ========================================= */

  const earningsEl =
    document.getElementById("profileEarnings");

  if (earningsEl) {
    const totalEarned = balance + referralEarnings;

    earningsEl.textContent =
      `৳${totalEarned.toFixed(2)}`;
  }


  /* =========================================
     TELEGRAM USER
  ========================================= */

  try {

    if (
      window.Telegram &&
      Telegram.WebApp
    ) {

      const tg = Telegram.WebApp;

      tg.ready();
      tg.expand();

      const user =
        tg.initDataUnsafe &&
        tg.initDataUnsafe.user;

      if (user) {

        const nameEl =
          document.getElementById("profileName");

        const usernameEl =
          document.getElementById("profileUsername");


        /* NAME */

        let fullName = "";

        if (user.first_name) {
          fullName += user.first_name;
        }

        if (user.last_name) {
          fullName += " " + user.last_name;
        }

        fullName = fullName.trim();

        if (nameEl && fullName) {
          nameEl.textContent = fullName;
        }


        /* USERNAME */

        if (usernameEl) {

          if (user.username) {
            usernameEl.textContent =
              `@${user.username}`;
          } else {
            usernameEl.textContent =
              `Telegram ID: ${user.id}`;
          }

        }

      }

    }

  } catch (error) {

    console.log(
      "Telegram profile data unavailable:",
      error
    );

  }


  /* =========================================
     WITHDRAW BUTTON
  ========================================= */

  const withdrawBtn =
    document.getElementById("withdrawProfileBtn");

  if (withdrawBtn) {

    withdrawBtn.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        alert(
          "Withdraw System পরবর্তী ধাপে চালু করা হবে।"
        );

      }
    );

  }

});
