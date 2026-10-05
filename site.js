(function () {
  const root = document.documentElement;
  const buttons = document.querySelectorAll('[data-set-lang]');
  const emailLinks = document.querySelectorAll('[data-email-link]');
  const email = [112, 97, 110, 103, 106, 105, 110, 103, 46, 119, 117, 64, 111, 117, 116, 108, 111, 111, 107, 46, 99, 111, 109]
    .map((code) => String.fromCharCode(code))
    .join('');

  function setLanguage(language) {
    const isChinese = language === 'zh';
    root.lang = isChinese ? 'zh-CN' : 'en';
    document.title = isChinese ? '吴庞敬 — 研究主页' : 'Pangjing Wu — Researcher';
    document.querySelector('meta[name="description"]').content = isChinese
      ? '吴庞敬，香港理工大学博士研究生，研究方向包括大语言模型、数据挖掘、强化学习与金融科技。'
      : 'Pangjing Wu is a PhD candidate at The Hong Kong Polytechnic University, researching large language models, data mining, reinforcement learning, and FinTech.';

    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.setLang === language));
    });

    try {
      localStorage.setItem('preferred-language', language);
    } catch (_) {
      // The page remains fully usable when browser storage is disabled.
    }
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.setLang));
  });

  emailLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.href = `mailto:${email}`;
    });
  });

  const ccfCounts = { A: 0, B: 0, C: 0 };
  document.querySelectorAll('.publications-section .badge.ccf').forEach((badge) => {
    const rank = badge.textContent.trim().match(/^CCF ([ABC])$/)?.[1];
    if (rank) ccfCounts[rank] += 1;
  });
  document.querySelectorAll('[data-ccf-count]').forEach((count) => {
    count.textContent = ccfCounts[count.dataset.ccfCount];
  });

  let savedLanguage;
  try {
    savedLanguage = localStorage.getItem('preferred-language');
  } catch (_) {
    savedLanguage = null;
  }

  const browserLanguage = navigator.language && navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
  setLanguage(savedLanguage === 'zh' || savedLanguage === 'en' ? savedLanguage : browserLanguage);
}());
