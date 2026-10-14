/* =============================================================
   BIOCRUZ — JavaScript principal
   -------------------------------------------------------------
   Responsável pelas interações do site:
     1.  Menu mobile (hamburguer)
     2.  Barra de progresso de scroll
     3.  Sombra do header ao rolar
     4.  Cursor customizado (desktop)
     5.  Partículas animadas no hero (canvas)
     6.  Scroll reveal (animações ao rolar)
     7.  Carrossel de slides da home
     8.  Contador animado das estatísticas
     9.  Accordion (perguntas frequentes)
    10.  Filtro de projetos por categoria
    11.  Efeito tilt 3D nos cards
    12.  Efeito ripple nos botões
    13.  Botão "voltar ao topo"
    14.  Validação do formulário de contato
    15.  Validação do formulário de candidatura
    16.  Modo leve (desliga efeitos pesados)
   -------------------------------------------------------------
   Padrão: tudo dentro de DOMContentLoaded, sem variáveis globais.
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* Detecta se é dispositivo de toque (mobile/tablet) para
     desligar efeitos que só fazem sentido com mouse. */
  const isTouch = matchMedia('(hover: none)').matches;

  /* ===========================================================
     1. MENU MOBILE (hamburguer)
     Alterna a classe .open e atualiza aria-expanded.
     Fecha ao clicar em qualquer link (bom em mobile).
  =========================================================== */
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const aberto = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', aberto);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ===========================================================
     2. BARRA DE PROGRESSO DE SCROLL
     Cria uma barra no topo que enche conforme o usuário rola.
  =========================================================== */
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  document.body.prepend(progressBar);

  const updateProgress = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const atual = window.scrollY;
    progressBar.style.width = (atual / total) * 100 + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });

  /* ===========================================================
     3. SOMBRA DO HEADER AO ROLAR
     Adiciona .scrolled quando o usuário sai do topo.
  =========================================================== */
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ===========================================================
     4. CURSOR CUSTOMIZADO
     Ponto verde + anel amarelo com atraso (efeito "lag").
     Reage a hover em elementos interativos e a clique.
     Desligado em telas de toque.
  =========================================================== */
  if (!isTouch) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.append(cursor, ring);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });

    // Anel segue com interpolação linear (lerp)
    const animarAnel = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(animarAnel);
    };
    animarAnel();

    // Estado hover
    const alvos = document.querySelectorAll(
      'a, button, input, textarea, .card, .projeto, .filtro-btn, .accordion-header, .indicador, .carrossel-btn'
    );
    alvos.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        ring.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        ring.classList.remove('hover');
      });
    });

    // Estado pressed
    document.addEventListener('mousedown', () => {
      cursor.classList.add('press');
      ring.classList.add('press');
    });
    document.addEventListener('mouseup', () => {
      cursor.classList.remove('press');
      ring.classList.remove('press');
    });

    // Esconde ao sair da janela
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      ring.style.opacity = '1';
    });
  }

  /* ===========================================================
     5. PARTÍCULAS ANIMADAS NO HERO
     Canvas com pontos que se movem e linhas conectando os
     próximos. Desligado em modo leve e em prefers-reduced-motion.
  =========================================================== */
  const hero = document.querySelector('.hero');
  const semAnimacao = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const modoLeve = document.body.classList.contains('modo-leve');

  if (hero && !semAnimacao && !modoLeve) {
    const canvas = document.createElement('canvas');
    canvas.id = 'particulas';
    hero.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let w, h;
    const particulas = [];

    const resize = () => {
      w = canvas.width = hero.offsetWidth;
      h = canvas.height = hero.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Cria 60 partículas com posição e velocidade aleatórias
    for (let i = 0; i < 60; i++) {
      particulas.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1
      });
    }

    const desenhar = () => {
      ctx.clearRect(0, 0, w, h);

      // Atualiza posição (rebate nas bordas)
      particulas.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      });

      // Linhas entre partículas próximas
      for (let i = 0; i < particulas.length; i++) {
        for (let j = i + 1; j < particulas.length; j++) {
          const dx = particulas[i].x - particulas[j].x;
          const dy = particulas[i].y - particulas[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,214,10,${(1 - dist / 120) * 0.4})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particulas[i].x, particulas[i].y);
            ctx.lineTo(particulas[j].x, particulas[j].y);
            ctx.stroke();
          }
        }
      }

      // Desenha as partículas
      particulas.forEach(p => {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,214,10,0.8)';
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(desenhar);
    };
    desenhar();
  }

  /* ===========================================================
     6. SCROLL REVEAL
     Aplica .visible quando o elemento entra na viewport.
     A classe .reveal (no CSS) faz o fade + subida.
  =========================================================== */
  const revelar = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revelar.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll(
    '.section, .card, .projeto, .accordion-item, .stat, .case, .lider'
  ).forEach(el => {
    el.classList.add('reveal');
    revelar.observe(el);
  });

  /* ===========================================================
     7. CARROSSEL DA HOME
     Avanço automático (5s) + botões + indicadores + swipe +
     teclado (setas) + pausa quando a aba perde foco.
  =========================================================== */
  const track = document.querySelector('.carrossel-track');
  if (track) {
    const slides = track.querySelectorAll('.slide');
    const indicadores = document.querySelectorAll('.indicador');
    const btnPrev = document.querySelector('.carrossel-prev');
    const btnNext = document.querySelector('.carrossel-next');
    const total = slides.length;
    let idx = 0;
    let timer = null;

    const irPara = i => {
      idx = (i + total) % total;
      track.style.transform = `translateX(-${idx * 100}%)`;
      indicadores.forEach((d, k) => d.classList.toggle('ativo', k === idx));
    };
    const proximo = () => irPara(idx + 1);
    const anterior = () => irPara(idx - 1);
    const iniciar = () => { parar(); timer = setInterval(proximo, 5000); };
    const parar = () => { if (timer) { clearInterval(timer); timer = null; } };

    btnNext?.addEventListener('click', () => { proximo(); iniciar(); });
    btnPrev?.addEventListener('click', () => { anterior(); iniciar(); });
    indicadores.forEach((d, k) => d.addEventListener('click', () => { irPara(k); iniciar(); }));

    // Swipe por toque
    let x0 = null, y0 = null;
    track.addEventListener('touchstart', e => {
      x0 = e.touches[0].clientX;
      y0 = e.touches[0].clientY;
      parar();
    }, { passive: true });

    track.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      const dy = e.changedTouches[0].clientY - y0;
      // Só conta como swipe se for mais horizontal que vertical
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        dx < 0 ? proximo() : anterior();
      }
      x0 = null;
      y0 = null;
      iniciar();
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      document.hidden ? parar() : iniciar();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { proximo(); iniciar(); }
      if (e.key === 'ArrowLeft') { anterior(); iniciar(); }
    });

    irPara(0);
    iniciar();
  }

  /* ===========================================================
     8. CONTADOR ANIMADO
     Anima do 0 até data-target com easing exponencial.
     Dispara quando a seção entra na viewport.
  =========================================================== */
  document.querySelectorAll('.stat-number').forEach(el => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const alvo = +el.dataset.target;
        const duracao = 1800;
        const inicio = performance.now();

        const animar = agora => {
          const progresso = Math.min((agora - inicio) / duracao, 1);
          // Easing easeOutExpo
          const eased = progresso === 1 ? 1 : 1 - Math.pow(2, -10 * progresso);
          el.textContent = Math.floor(eased * alvo);
          if (progresso < 1) requestAnimationFrame(animar);
          else el.textContent = alvo;
        };
        requestAnimationFrame(animar);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    io.observe(el);
  });

  /* ===========================================================
     9. ACCORDION (perguntas frequentes)
     Abre um e fecha os demais (comportamento sanfona).
     Atualiza aria-expanded para acessibilidade.
  =========================================================== */
  const itensAccordion = document.querySelectorAll('.accordion-item');
  itensAccordion.forEach(item => {
    const cabecalho = item.querySelector('.accordion-header');
    cabecalho.addEventListener('click', () => {
      const aberto = item.classList.contains('open');

      itensAccordion.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
      });

      if (!aberto) {
        item.classList.add('open');
        cabecalho.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ===========================================================
     10. FILTRO DE PROJETOS
     Mostra só os projetos cuja data-categoria bate com o filtro.
     "todos" mostra tudo.
  =========================================================== */
  const filtros = document.querySelectorAll('.filtro-btn');
  const projetos = document.querySelectorAll('.projeto');

  filtros.forEach(btn => {
    btn.addEventListener('click', () => {
      filtros.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const cat = btn.dataset.filtro;
      projetos.forEach(p => {
        const visivel = cat === 'todos' || p.dataset.categoria === cat;
        p.style.display = visivel ? '' : 'none';
        // Reanima com fade
        if (visivel) {
          p.classList.remove('visible');
          setTimeout(() => p.classList.add('visible'), 30);
        }
      });
    });
  });

  /* ===========================================================
     11. TILT 3D NOS CARDS
     Segue o mouse e inclina levemente o card (perspectiva).
     Desligado em telas de toque.
  =========================================================== */
  if (!isTouch) {
    document.querySelectorAll('.card, .projeto').forEach(el => {
      el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform =
          `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  /* ===========================================================
     12. RIPPLE NOS BOTÕES
     Cria um círculo que expande a partir do ponto do clique.
  =========================================================== */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  /* ===========================================================
     13. BOTÃO "VOLTAR AO TOPO"
     Aparece após rolar 500px. Volta ao topo suavemente.
  =========================================================== */
  const toTop = document.createElement('button');
  toTop.className = 'to-top';
  toTop.setAttribute('aria-label', 'Voltar ao topo');
  toTop.innerHTML = '↑';
  document.body.appendChild(toTop);

  window.addEventListener('scroll', () => {
    toTop.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ===========================================================
     14. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
     Regras: obrigatório, e-mail válido, tamanho mínimo.
     Mostra mensagem de erro abaixo do campo.
  =========================================================== */
  const formContato = document.getElementById('formContato');
  if (formContato) {
    const feedback = document.getElementById('feedback');

    const validarCampo = campo => {
      const erro = formContato.querySelector(`[data-erro="${campo.name}"]`);
      let msg = '';

      if (campo.hasAttribute('required') && !campo.value.trim()) {
        msg = 'Campo obrigatorio.';
      } else if (campo.type === 'email' && campo.value &&
                 !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campo.value)) {
        msg = 'E-mail invalido.';
      } else if (campo.minLength > 0 && campo.value &&
                 campo.value.length < campo.minLength) {
        msg = `Minimo de ${campo.minLength} caracteres.`;
      }

      if (erro) erro.textContent = msg;
      campo.classList.toggle('invalido', !!msg);
      campo.setAttribute('aria-invalid', !!msg);
      return !msg;
    };

    formContato.querySelectorAll('input,textarea,select').forEach(c => {
      c.addEventListener('blur', () => validarCampo(c));
      c.addEventListener('input', () => {
        if (c.classList.contains('invalido')) validarCampo(c);
      });
    });

    formContato.addEventListener('submit', e => {
      e.preventDefault();
      let ok = true;
      formContato.querySelectorAll('input,textarea,select').forEach(c => {
        if (!validarCampo(c)) ok = false;
      });

      if (ok) {
        feedback.textContent = '✓ Mensagem enviada com sucesso! Entraremos em contato em breve.';
        formContato.reset();
        setTimeout(() => feedback.textContent = '', 6000);
      } else {
        feedback.textContent = '';
        formContato.querySelector('.invalido')?.focus();
      }
    });
  }

  /* ===========================================================
     15. VALIDAÇÃO DO FORMULÁRIO DE CANDIDATURA
     Regras extras: CPF com dígitos verificadores, telefone,
     URL, arquivo (tamanho e extensão), aceite LGPD.
     Também aplica máscaras em CPF e telefone.
  =========================================================== */
  const formCandidatura = document.getElementById('formCandidatura');
  if (formCandidatura) {
    const feedback = document.getElementById('feedbackCandidatura');

    // ---------- Helpers ----------
    const setErro = (campo, msg) => {
      const erro = formCandidatura.querySelector(`[data-erro="${campo.name}"]`);
      if (erro) erro.textContent = msg;
      campo.classList.toggle('invalido', !!msg);
      campo.setAttribute('aria-invalid', !!msg);
      return !msg;
    };

    // Valida CPF pelos dígitos verificadores
    const cpfValido = cpf => {
      cpf = cpf.replace(/\D/g, '');
      if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
      let s = 0;
      for (let i = 0; i < 9; i++) s += parseInt(cpf[i]) * (10 - i);
      let d1 = 11 - (s % 11);
      if (d1 >= 10) d1 = 0;
      if (d1 !== parseInt(cpf[9])) return false;
      s = 0;
      for (let i = 0; i < 10; i++) s += parseInt(cpf[i]) * (11 - i);
      let d2 = 11 - (s % 11);
      if (d2 >= 10) d2 = 0;
      return d2 === parseInt(cpf[10]);
    };

    // ---------- Máscaras ----------
    const cpfInput = formCandidatura.querySelector('#cpf');
    cpfInput?.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);
      v = v.replace(/(\d{3})(\d)/, '$1.$2')
           .replace(/(\d{3})(\d)/, '$1.$2')
           .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      e.target.value = v;
    });

    const telInput = formCandidatura.querySelector('#telefone');
    telInput?.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 10) v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      else if (v.length > 6) v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      else if (v.length > 2) v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
      else if (v.length > 0) v = v.replace(/(\d{0,2})/, '($1');
      e.target.value = v;
    });

    // ---------- Validador ----------
    const validarCampo = campo => {
      const valor = (campo.value || '').trim();
      const nome = campo.name;

      // Obrigatório (exceto checkbox/file, tratados abaixo)
      if (campo.hasAttribute('required') && !valor &&
          campo.type !== 'checkbox' && campo.type !== 'file') {
        return setErro(campo, 'Campo obrigatorio.');
      }
      if (campo.type === 'checkbox' && campo.hasAttribute('required') && !campo.checked) {
        return setErro(campo, 'Voce precisa aceitar para continuar.');
      }
      if (campo.type === 'file' && campo.hasAttribute('required') &&
          (!campo.files || !campo.files.length)) {
        return setErro(campo, 'Anexe seu curriculo.');
      }

      // Formatos específicos
      let msg = '';
      if (nome === 'email' && valor && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
        msg = 'E-mail invalido.';
      } else if (nome === 'cpf' && valor && !cpfValido(valor)) {
        msg = 'CPF invalido.';
      } else if (nome === 'telefone' && valor && valor.replace(/\D/g, '').length < 10) {
        msg = 'Telefone incompleto.';
      } else if ((nome === 'linkedin' || nome === 'github') && valor &&
                 !/^https?:\/\/.+\..+/.test(valor)) {
        msg = 'Informe uma URL valida (comece com https://).';
      } else if (nome === 'pretensao' && valor && Number(valor) < 1000) {
        msg = 'Valor minimo: R$ 1000.';
      } else if (campo.minLength > 0 && valor && valor.length < campo.minLength) {
        msg = `Minimo de ${campo.minLength} caracteres.`;
      }

      // Arquivo: tamanho e extensão
      if (campo.type === 'file' && campo.files && campo.files.length) {
        const arq = campo.files[0];
        if (arq.size > 5 * 1024 * 1024) msg = 'Arquivo maior que 5 MB.';
        else if (!/\.(pdf|docx?)$/i.test(arq.name)) msg = 'Formato invalido. Use PDF, DOC ou DOCX.';
      }

      return setErro(campo, msg);
    };

    // ---------- Binding ----------
    formCandidatura.querySelectorAll('input,select,textarea').forEach(c => {
      c.addEventListener('blur', () => validarCampo(c));
      c.addEventListener('input', () => {
        if (c.classList.contains('invalido')) validarCampo(c);
      });
      c.addEventListener('change', () => validarCampo(c));
    });

    // ---------- Submit ----------
    formCandidatura.addEventListener('submit', e => {
      e.preventDefault();
      let ok = true;
      formCandidatura.querySelectorAll('input,select,textarea').forEach(c => {
        if (!validarCampo(c)) ok = false;
      });

      if (ok) {
        feedback.textContent = '✓ Candidatura enviada! Entraremos em contato em ate 7 dias uteis.';
        feedback.style.background = 'rgba(26,127,75,.15)';
        formCandidatura.reset();
        setTimeout(() => {
          feedback.textContent = '';
          feedback.style.background = '';
        }, 8000);
        window.scrollTo({ top: formCandidatura.offsetTop - 100, behavior: 'smooth' });
      } else {
        feedback.textContent = '';
        const primeiroErro = formCandidatura.querySelector('.invalido');
        primeiroErro?.focus();
        primeiroErro?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    // Preenche a vaga ao clicar em "Candidatar-se" nos cards
    document.querySelectorAll('a[data-vaga]').forEach(botao => {
      botao.addEventListener('click', () => {
        const vaga = botao.dataset.vaga;
        const select = formCandidatura.querySelector('#vaga');
        if (select) select.value = vaga;
      });
    });
  }

  /* ===========================================================
     16. MODO LEVE
     Desliga partículas, cursor custom e animações pesadas.
     Preferência salva em localStorage.
  =========================================================== */
  const body = document.body;
  const modoLeveAtivo = localStorage.getItem('biocruz-modo-leve') === '1';
  if (modoLeveAtivo) body.classList.add('modo-leve');

  const btnModo = document.createElement('button');
  btnModo.className = 'toggle-modo';
  btnModo.setAttribute('aria-label', 'Alternar modo leve (sem animacoes)');
  btnModo.title = 'Modo leve';
  btnModo.textContent = modoLeveAtivo ? '⚡' : '🎨';
  document.body.appendChild(btnModo);

  btnModo.addEventListener('click', () => {
    const ativo = body.classList.toggle('modo-leve');
    btnModo.textContent = ativo ? '⚡' : '🎨';
    localStorage.setItem('biocruz-modo-leve', ativo ? '1' : '0');
    if (ativo) {
      // Remove elementos pesados imediatamente
      document.querySelector('#particulas')?.remove();
      document.querySelector('.cursor')?.remove();
      document.querySelector('.cursor-ring')?.remove();
    } else {
      location.reload(); // recarrega para restaurar tudo
    }
  });

});
