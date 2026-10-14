/* =============================================================
   COTAÇÕES AGROPECUÁRIAS — Ticker do rodapé
   -------------------------------------------------------------
   Busca dados de uma API pública gratuita e monta um ticker
   com rolagem contínua em todas as páginas do site.

   API: https://agrodocai.com.br/api/v1/cotacao
   - Sem autenticação
   - Sem chave
   - Atualiza a cada 30 min no servidor
   - Limite: 100 requisições/dia por IP

   Atualiza automaticamente a cada 10 minutos.
   ============================================================= */

(function () {
  'use strict';

  // Elemento onde o ticker é renderizado (presente em todas as páginas)
  const track = document.getElementById('cotacoesTrack');
  if (!track) return;

  // Commodities a exibir no ticker
  const PRODUTOS = [
    { chave: 'boi_gordo',  label: 'Boi Gordo',  unidade: 'R$/@' },
    { chave: 'soja',       label: 'Soja',       unidade: 'R$/sc' },
    { chave: 'milho',      label: 'Milho',      unidade: 'R$/sc' },
    { chave: 'vaca_gorda', label: 'Vaca Gorda', unidade: 'R$/@' }
  ];

  // Intervalo de atualização: 10 minutos
  const INTERVALO_MS = 10 * 60 * 1000;

  /**
   * Monta o HTML de um item do ticker.
   */
  function itemHTML(produto, valor, hora) {
    const valorFmt = Number(valor).toFixed(2).replace('.', ',');
    return `
      <div class="cotacao-item">
        <span class="cotacao-label">${produto.label}</span>
        <span class="cotacao-valor">R$ ${valorFmt}</span>
        <span class="cotacao-unidade">${produto.unidade}</span>
      </div>`;
  }

  /**
   * Busca as cotações e renderiza o ticker.
   * Em caso de erro, mostra "Indisponiveis" sem quebrar o site.
   */
  async function carregar() {
    try {
      const resp = await fetch('https://agrodocai.com.br/api/v1/cotacao');
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      const dados = await resp.json();

      // Monta cada item a partir dos dados da API
      let html = '';
      PRODUTOS.forEach(p => {
        const valor = dados[p.chave];
        if (valor === undefined || valor === null) return;
        html += itemHTML(p, valor);
      });

      // Item extra com a hora da última atualização
      const hora = new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      });
      html += `
        <div class="cotacao-item">
          <span class="cotacao-label">Atualizado</span>
          <span class="cotacao-valor">${hora}</span>
        </div>`;

      // Duplica o conteúdo para o loop da animação ficar contínuo
      track.innerHTML = html + html;

    } catch (e) {
      // Fallback silencioso
      track.innerHTML = `
        <div class="cotacao-item">
          <span class="cotacao-label">Cotacoes</span>
          <span class="cotacao-valor">Indisponiveis</span>
        </div>`;
      console.warn('Erro ao carregar cotacoes:', e);
    }
  }

  // Carrega imediatamente e agenda atualizações
  carregar();
  setInterval(carregar, INTERVALO_MS);

})();
