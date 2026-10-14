# Testes - Biocruz

| # | Caso | Esperado | Status |
|---|---|---|---|
| 1.1 | Abrir home | Carrossel + servicos | OK |
| 1.2 | Navegar entre paginas | Menu funciona | OK |
| 2.1 | Aguardar 5,5s | Carrossel avanca | OK |
| 2.2 | Setas prev/next | Muda slide | OK |
| 2.3 | Swipe horizontal | Muda slide | OK |
| 2.4 | Seta teclado | Muda slide | OK |
| 3.1 | Tela <=768px | Menu hamburguer | OK |
| 3.2 | Clicar link no menu mobile | Fecha menu | OK |
| 4.1 | Rolar ate stats | Contador anima | OK |
| 5.1 | Clicar pergunta | Abre resposta | OK |
| 6.1 | Filtrar Saude | So projetos saude | OK |
| 7.1 | Enviar vazio | Erros em vermelho | OK |
| 7.2 | E-mail invalido | Erro exibido | OK |
| 7.3 | Preencher correto | Mensagem sucesso | OK |
| 8.1 | 375px largura | Layout coluna | OK |

## Correcoes aplicadas
- touch-action pan-y para swipe nao conflitar com scroll
- amarelo-esc #b8860b para contraste AA em fundo branco
- focus-visible global para navegacao por teclado
- menu mobile fecha ao clicar em link
