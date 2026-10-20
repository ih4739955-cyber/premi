document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     PREMI REFER - LOCAL DATA
  ========================================= */

  const totalReferrals = parseInt(
    localStorage.getItem("premi_total_referrals") || "0",
    10
  );

  const referralEarnings = parseFloat(
    localStorage.getItem("premi_referral_earnings") || "0"
  );


  /* =========================================
     REFERRAL STATS
  ========================================= */

  const referralsEl =
    document.getElementById("totalReferrals");

  const earningsEl =
    document.getElementById("referEarnings");

  if (referralsEl) {
    referralsEl.textContent = totalReferrals;
  }

  if (earningsEl) {
    earningsEl.textContent =
      `৳${referralEarnings.toFixed(2)}`;
  }


  /* =========================================
     TELEGRAM MINI APP
  ========================================= */

  let tg = null;

  try {

    if (
      window.Telegram &&
      Telegram.WebApp
    ) {

      tg = Telegram.WebApp;

      tg.ready();
      tg.expand();

    }

  } catch (error) {

    console.log(
      "Telegram WebApp unavailable:",
      error
    );

  }


  /* =========================================
     REFERRAL LINK
  ========================================= */

  const referralInput =
    document.getElementById("referralLink");

  let referralLink =
    referralInput
      ? referralInput.value
      : "https://t.me/Premi_Monitage_earning_bot";


  /* =========================================
     COPY REFERRAL LINK
  ========================================= */

  const copyBtn =
    document.getElementById("copyReferralBtn");

  if (copyBtn) {

    copyBtn.addEventListener(
      "click",
      async () => {

        try {

          await navigator.clipboard.writeText(
            referralLink
          );

          copyBtn.textContent = "✅ Copied!";

          setTimeout(() => {
            copyBtn.textContent = "📋 Copy";
          }, 1800);

        } catch (error) {

          /* Fallback */

          if (referralInput) {

            referralInput.select();
            referralInput.setSelectionRange(
              0,
              referralInput.value.length
            );

            document.execCommand("copy");

            copyBtn.textContent = "✅ Copied!";

            setTimeout(() => {
              copyBtn.textContent = "📋 Copy";
            }, 1800);

          }

        }

      }
    );

  }


  /* =========================================
     SHARE REFERRAL LINK
  ========================================= */

  const shareBtn =
    document.getElementById("shareReferralBtn");

  if (shareBtn) {

    shareBtn.addEventListener(
      "click",
      () => {

        const shareText =
          "Premi-তে Join করুন এবং Earn করুন! 🎁";

        const telegramShareUrl =
          "https://t.me/share/url?url=" +
          encodeURIComponent(referralLink) +
          "&text=" +
          encodeURIComponent(shareText);


        /* Telegram Mini App */

        if (
          tg &&
          typeof tg.openTelegramLink === "function"
        ) {

          tg.openTelegramLink(
            telegramShareUrl
          );

          return;
        }


        /* Normal browser */

        if (
          navigator.share
        ) {

          navigator.share({
            title: "Premi - Refer & Earn",
            text: shareText,
            url: referralLink
          }).catch(() => {});

          return;
        }


        /* Final fallback */

        window.open(
          telegramShareUrl,
          "_blank"
        );

      }
    );

  }


  console.log(
    "Premi Refer page loaded successfully 🚀"
  );

});
