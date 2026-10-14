/* =============================================================
   i18n — Internacionalização do site
   -------------------------------------------------------------
   Permite trocar os textos entre:
     - pt (Português)
     - en (English)
     - ja (日本語)
     - zh (中文)
     - ar (العربية)

   Como funciona:
     - Cada elemento traduzível tem data-i18n="chave"
     - O dicionário I18N guarda o texto em cada idioma
     - Ao trocar, o texto é sobrescrito pelo do idioma escolhido
     - Preferência é salva em localStorage
     - Árabe ativa RTL (direita para esquerda) automaticamente

   Para adicionar um texto novo:
     <h2 data-i18n="minha.chave">Texto em português</h2>
     E incluir 'minha.chave' em todos os idiomas do dicionário.
   ============================================================= */

/* -------------------------------------------------------------
   DICIONÁRIO
   Cada chave existe em todos os idiomas. Se faltar em algum,
   o texto em português permanece (fallback natural).
------------------------------------------------------------- */
const I18N = {
  pt: {
    'nav.home': 'Home', 'nav.sobre': 'Sobre', 'nav.solucoes': 'Solucoes',
    'nav.contato': 'Contato', 'nav.candidatar': 'CANDIDATAR',
    'hero.titulo': 'Transformando dados em decisoes que salvam vidas e otimizam o futuro',
    'hero.sub': 'Analytics aplicado as ciencias da vida: saude, agronegocio, meio ambiente e biotecnologia.',
    'hero.cta1': 'Nossas Solucoes', 'hero.cta2': 'Fale Conosco',
    'serv.titulo': 'Nossas Linhas de Atuacao',
    'serv.sub': 'Do diagnostico estrategico a modelos preditivos em producao',
    'serv.estrategia': 'Consultoria & Estrategia',
    'serv.bi': 'Business Intelligence',
    'serv.ia': 'Ciencia de Dados & IA',
    'serv.bioinfo': 'Bioinformatica & Omicas',
    'serv.geo': 'Geoespacial & Ambiental',
    'serv.saude': 'Saude Digital',
    'footer.contato': 'Contato', 'footer.institucional': 'Institucional',
    'footer.redes': 'Redes', 'footer.direitos': 'Todos os direitos reservados.',
    'footer.whatsapp': 'WhatsApp'
  },
  en: {
    'nav.home': 'Home', 'nav.sobre': 'About', 'nav.solucoes': 'Solutions',
    'nav.contato': 'Contact', 'nav.candidatar': 'APPLY',
    'hero.titulo': 'Turning data into decisions that save lives and optimize the future',
    'hero.sub': 'Analytics applied to life sciences: healthcare, agribusiness, environment and biotech.',
    'hero.cta1': 'Our Solutions', 'hero.cta2': 'Talk to Us',
    'serv.titulo': 'Our Service Lines',
    'serv.sub': 'From strategic diagnosis to predictive models in production',
    'serv.estrategia': 'Consulting & Strategy',
    'serv.bi': 'Business Intelligence',
    'serv.ia': 'Data Science & AI',
    'serv.bioinfo': 'Bioinformatics & Omics',
    'serv.geo': 'Geospatial & Environmental',
    'serv.saude': 'Digital Health',
    'footer.contato': 'Contact', 'footer.institucional': 'Company',
    'footer.redes': 'Social', 'footer.direitos': 'All rights reserved.',
    'footer.whatsapp': 'WhatsApp'
  },
  ja: {
    'nav.home': 'ホーム', 'nav.sobre': '会社概要', 'nav.solucoes': 'ソリューション',
    'nav.contato': 'お問い合わせ', 'nav.candidatar': '応募する',
    'hero.titulo': '命を救い未来を最適化する意思決定へ、データを変換する',
    'hero.sub': 'ライフサイエンス分野への分析応用：医療、農業、環境、バイオテクノロジー。',
    'hero.cta1': 'ソリューション', 'hero.cta2': 'お問い合わせ',
    'serv.titulo': 'サービスライン',
    'serv.sub': '戦略診断から本番環境の予測モデルまで',
    'serv.estrategia': 'コンサルティング＆戦略',
    'serv.bi': 'ビジネスインテリジェンス',
    'serv.ia': 'データサイエンス＆AI',
    'serv.bioinfo': 'バイオインフォマティクス',
    'serv.geo': '地理空間＆環境',
    'serv.saude': 'デジタルヘルス',
    'footer.contato': 'お問い合わせ', 'footer.institucional': '会社情報',
    'footer.redes': 'SNS', 'footer.direitos': 'All rights reserved.',
    'footer.whatsapp': 'WhatsApp'
  },
  zh: {
    'nav.home': '首页', 'nav.sobre': '关于我们', 'nav.solucoes': '解决方案',
    'nav.contato': '联系我们', 'nav.candidatar': '立即申请',
    'hero.titulo': '将数据转化为拯救生命、优化未来的决策',
    'hero.sub': '应用于生命科学的分析：医疗、农业、环境和生物技术。',
    'hero.cta1': '我们的解决方案', 'hero.cta2': '联系我们',
    'serv.titulo': '我们的服务领域',
    'serv.sub': '从战略诊断到生产环境中的预测模型',
    'serv.estrategia': '咨询与战略',
    'serv.bi': '商业智能',
    'serv.ia': '数据科学与人工智能',
    'serv.bioinfo': '生物信息学与组学',
    'serv.geo': '地理空间与环境',
    'serv.saude': '数字健康',
    'footer.contato': '联系方式', 'footer.institucional': '公司信息',
    'footer.redes': '社交媒体', 'footer.direitos': '版权所有。',
    'footer.whatsapp': 'WhatsApp'
  },
  ar: {
    'nav.home': 'الرئيسية', 'nav.sobre': 'من نحن', 'nav.solucoes': 'الحلول',
    'nav.contato': 'اتصل بنا', 'nav.candidatar': 'تقدم الآن',
    'hero.titulo': 'تحويل البيانات إلى قرارات تنقذ الأرواح وتحسن المستقبل',
    'hero.sub': 'تحليلات مطبقة على علوم الحياة: الصحة والزراعة والبيئة والتكنولوجيا الحيوية.',
    'hero.cta1': 'حلولنا', 'hero.cta2': 'تواصل معنا',
    'serv.titulo': 'خطوط خدماتنا',
    'serv.sub': 'من التشخيص الاستراتيجي إلى النماذج التنبؤية في الإنتاج',
    'serv.estrategia': 'الاستشارات والاستراتيجية',
    'serv.bi': 'ذكاء الأعمال',
    'serv.ia': 'علوم البيانات والذكاء الاصطناعي',
    'serv.bioinfo': 'المعلوماتية الحيوية',
    'serv.geo': 'الجغرافيا المكانية والبيئة',
    'serv.saude': 'الصحة الرقمية',
    'footer.contato': 'اتصل', 'footer.institucional': 'الشركة',
    'footer.redes': 'التواصل', 'footer.direitos': 'جميع الحقوق محفوظة.',
    'footer.whatsapp': 'واتساب'
  }
};

/* Idiomas disponíveis no seletor (ordem importa) */
const IDIOMAS = [
  { code: 'pt', label: 'PT', flag: '🇧🇷', nome: 'Portugues' },
  { code: 'en', label: 'EN', flag: '🇺🇸', nome: 'English' },
  { code: 'ja', label: 'JA', flag: '🇯🇵', nome: '日本語' },
  { code: 'zh', label: 'ZH', flag: '🇨🇳', nome: '中文' },
  { code: 'ar', label: 'AR', flag: '🇸🇦', nome: 'العربية' }
];

(function () {
  'use strict';

  // Idioma salvo (padrão: português)
  const idiomaAtual = localStorage.getItem('biocruz-idioma') || 'pt';

  // Insere o seletor no cabeçalho
  const nav = document.querySelector('.navbar');
  if (!nav) return;

  const infoAtual = IDIOMAS.find(i => i.code === idiomaAtual);

  const sel = document.createElement('div');
  sel.className = 'lang-selector';
  sel.innerHTML = `
    <button class="lang-btn" aria-label="Selecionar idioma"
            aria-haspopup="true" aria-expanded="false">
      <span class="lang-flag">${infoAtual.flag}</span>
      <span class="lang-label">${infoAtual.label}</span>
      <span class="lang-arrow" aria-hidden="true">▾</span>
    </button>
    <ul class="lang-menu" role="menu">
      ${IDIOMAS.map(i => `
        <li>
          <button role="menuitem" data-lang="${i.code}"
                  class="${i.code === idiomaAtual ? 'active' : ''}">
            <span class="lang-flag">${i.flag}</span>
            <span>${i.nome}</span>
          </button>
        </li>`).join('')}
    </ul>`;
  nav.appendChild(sel);

  const btn = sel.querySelector('.lang-btn');
  const menu = sel.querySelector('.lang-menu');

  // Abre/fecha o menu
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const aberto = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', aberto);
  });

  // Fecha ao clicar fora
  document.addEventListener('click', () => {
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  });

  /**
   * Aplica a tradução para o idioma escolhido.
   * - Substitui o texto dos elementos com data-i18n
   * - Ajusta <html lang> e <html dir>
   * - Atualiza o botão do seletor
   * - Salva em localStorage
   */
  function aplicarIdioma(code) {
    const dic = I18N[code];
    if (!dic) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const chave = el.dataset.i18n;
      if (dic[chave]) el.textContent = dic[chave];
    });

    // Ajustes de acessibilidade e direção
    document.documentElement.lang = code === 'pt' ? 'pt-BR' : code;
    document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr';

    // Atualiza o botão com bandeira + sigla
    const info = IDIOMAS.find(i => i.code === code);
    sel.querySelector('.lang-flag').textContent = info.flag;
    sel.querySelector('.lang-label').textContent = info.label;

    // Marca o item ativo
    menu.querySelectorAll('button').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === code);
    });

    localStorage.setItem('biocruz-idioma', code);
  }

  // Handlers dos itens do menu
  menu.querySelectorAll('button').forEach(b => {
    b.addEventListener('click', () => {
      aplicarIdioma(b.dataset.lang);
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  // Aplica idioma salvo ao carregar a página
  if (idiomaAtual !== 'pt') aplicarIdioma(idiomaAtual);

  // Expõe globalmente para uso em botões externos, se necessário
  window.trocarIdioma = aplicarIdioma;

})();
