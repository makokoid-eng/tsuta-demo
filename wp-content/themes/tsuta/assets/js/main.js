/*
PURPOSE:
  目的: スクロールで要素をふわっと出現させる（.reveal に .is-in を付ける）。
  対応セクション: モックの <script> 部分（そのまま移植）
  編集時の注意: prefers-reduced-motion（OSの「動きを減らす」設定）が有効なら
        アニメーションせず全要素を即表示する。この分岐は消さない。
*/
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-in'));
    return;
  }
  // このクラスが付いて初めて CSS が .reveal を隠す。JSが読み込めない環境では隠さない。
  document.documentElement.classList.add('js-reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
