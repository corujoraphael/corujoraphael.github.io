# Plano de Implementação: Site Redesign

## Visão Geral

Redesign completo do site Memorare Cestas mantendo a arquitetura Eleventy. As tarefas seguem uma ordem incremental: primeiro a infraestrutura (dados, config, partials), depois os templates, CSS, JavaScript e por fim analytics e SEO.

## Tarefas

- [x] 1. Atualizar configuração do site e dados globais
  - [x] 1.1 Expandir `_data/site.json` com dados completos do negócio (telefone, WhatsApp, Instagram, email, endereço completo com rua, bairro, cidade, estado, CEP)
    - Adicionar campos: name, phone, whatsapp, instagram, email, address (street, neighborhood, city, state, zip)
    - _Requisitos: 9.2_
  - [x] 1.2 Atualizar `.eleventy.js` para copiar novos diretórios e adicionar filtros úteis
    - Adicionar passthrough copy para `_includes/partials` se necessário
    - Adicionar filtro para extrair categorias únicas da coleção de cestas
    - Adicionar filtro para extrair número do preço (ex: "R$ 185,00" → "185.00") para schema Product
    - _Requisitos: 3.2, 9.8_
  - [x] 1.3 Corrigir `lang="en"` para `lang="pt-BR"` no layout base
    - _Requisitos: 10.4_

- [x] 2. Criar partials reutilizáveis
  - [x] 2.1 Criar `_includes/partials/header.html` — header sticky com logo, navegação (Início, Produtos, Sobre), ícone WhatsApp, botão hambúrguer mobile
    - Extrair header do layout.html atual para partial
    - Adicionar link "Sobre" na navegação
    - Adicionar classe para sticky positioning
    - Adicionar botão menu-toggle para mobile
    - _Requisitos: 2.1, 2.2, 2.3_
  - [x] 2.2 Criar `_includes/partials/footer.html` — footer com links, contato, redes sociais
    - Extrair footer do layout.html atual para partial
    - Usar dados de `_data/site.json` para informações de contato
    - _Requisitos: 7.1_
  - [x] 2.3 Criar `_includes/partials/testimonials.html` — seção de depoimentos reutilizável
    - Extrair seção de depoimentos para partial reutilizável
    - _Requisitos: 1.4_
  - [x] 2.4 Criar `_includes/partials/product-card.html` — card de produto com imagem, nome, categoria, preço, CTA com tracking
    - Card com data-type para filtro de categorias
    - Imagens com loading="lazy" e alt descritivo com keyword local
    - onclick no CTA para tracking analytics
    - _Requisitos: 3.1, 6.1, 10.2, 10.5_
  - [x] 2.5 Criar `_includes/partials/analytics.html` — scripts Google Ads/gtag com funções de tracking
    - Manter tag AW-980642221
    - Remover evento de conversão genérico
    - Adicionar funções: trackWhatsAppClick(source, label), trackViewItem(productName), trackFilterCategory(category)
    - Verificar existência de gtag antes de chamar
    - _Requisitos: 6.1, 6.2, 6.3, 6.4, 6.5_
  - [x] 2.6 Criar `_includes/partials/schema.html` — schema JSON-LD LocalBusiness com dados completos de site.json
    - Schema LocalBusiness com name, description, image, url, telephone, email, address, areaServed, sameAs
    - _Requisitos: 9.2_

- [x] 3. Redesenhar layout base (layout.html)
  - [x] 3.1 Reescrever `_includes/layout.html` incluindo partials, Open Graph, meta tags dinâmicas e lang="pt-BR"
    - Incluir partials: header, footer, analytics, schema
    - Adicionar meta tags Open Graph dinâmicas (og:title, og:description, og:image, og:url, og:locale, og:site_name)
    - Manter botão flutuante WhatsApp com animação de pulso
    - Adicionar canonical URL
    - _Requisitos: 2.1, 7.1, 7.3, 9.3, 10.4_

- [x] 4. Checkpoint — Verificar build do Eleventy
  - Executar `npx @11ty/eleventy` e garantir que o build passa sem erros
  - Verificar que as páginas são geradas corretamente com os novos partials

- [x] 5. Redesenhar homepage (home.html + index.html)
  - [x] 5.1 Reescrever `_includes/home.html` com seções: Hero, Diferenciais, Produtos em Destaque, Sobre, Depoimentos, CTA Final, Contato
    - Hero Section com H1 contendo keyword local, subtítulo emocional, CTA WhatsApp com tracking
    - Seção de diferenciais com ícones (feitas à mão, entrega local, ingredientes frescos, embalagem)
    - Grid de 4 produtos usando partial product-card
    - Seção Sobre com storytelling
    - Incluir partial testimonials
    - CTA final com botão WhatsApp
    - Seção de contato com ícones
    - _Requisitos: 1.1, 1.2, 1.3, 1.4, 1.5_
  - [x] 5.2 Atualizar `index.html` com frontmatter otimizado para SEO (pageTitle, description com keywords locais)
    - _Requisitos: 9.1_

- [x] 6. Redesenhar página de produtos (produtos.html)
  - [x] 6.1 Reescrever `produtos.html` com H1 otimizado, filtro por categorias e grid de product cards
    - H1 com keyword local (ex: "Cestas Artesanais em Conselheiro Lafaiete")
    - Botões/pills de filtro por categoria gerados dinamicamente via Liquid
    - Grid usando partial product-card para cada produto
    - Script inline para disparar evento view_item_list
    - _Requisitos: 3.1, 3.2, 3.3, 6.3, 9.1_

- [x] 7. Redesenhar página de detalhe do produto (posts.html) — estilo landing page
  - [x] 7.1 Reescrever `_includes/posts.html` como mini landing page com breadcrumb, hero do produto, lista de itens com checkmarks, badges de confiança, CTA duplo, depoimentos e produtos relacionados
    - Breadcrumb visual + schema BreadcrumbList JSON-LD
    - Hero: imagem grande + nome H1 com keyword local + categoria badge + preço destaque + CTA WhatsApp com tracking
    - Lista de itens com ✓ checkmarks
    - Badges: "Entrega em Conselheiro Lafaiete", "Pedidos com 24h de antecedência", "Aceitamos Pix, Cartão e Transferência"
    - CTA secundário após lista de itens
    - Incluir partial testimonials
    - Grid de produtos relacionados (mesma categoria, excluindo o atual)
    - Schema JSON-LD Product com name, description, image, offers (price, currency, availability)
    - Script inline para disparar evento view_item com nome do produto
    - _Requisitos: 4.1, 4.2, 6.2, 9.1, 9.5, 9.8_
  - [x] 7.2 Adicionar coleção/filtro no `.eleventy.js` para produtos relacionados (mesma categoria, excluindo atual)
    - _Requisitos: 4.1_

- [x] 8. Checkpoint — Verificar build e estrutura HTML
  - Executar `npx @11ty/eleventy` e garantir que todas as páginas são geradas
  - Verificar que as páginas de keyword herdam o novo layout automaticamente
  - Verificar que os permalinks de keyword não mudaram

- [x] 9. Redesenhar CSS completo (style.css)
  - [x] 9.1 Reescrever `styles/style.css` com design moderno: CSS variables atualizadas, sticky header, hero section, grid de produtos responsivo, cards com hover effects, seção sobre, badges de confiança, menu mobile, tipografia hierárquica
    - CSS variables com paleta de cores da marca
    - Sticky header com z-index adequado
    - Hero section com gradiente e tipografia grande
    - Grid responsivo: 4 colunas desktop, 2 tablet, 1 mobile
    - Cards com border-radius, box-shadow, hover scale/elevation
    - Seção de diferenciais com ícones
    - Badges de confiança estilizados
    - Menu mobile overlay com transição
    - Breadcrumb styling
    - Checkmarks na lista de itens do produto
    - CTA buttons com hover transitions
    - Footer responsivo
    - Botão flutuante WhatsApp com animação pulse
    - _Requisitos: 1.6, 2.2, 2.3, 3.4, 4.3, 5.1, 5.2, 5.3, 5.4, 5.5, 7.2_

- [x] 10. Implementar JavaScript (index.js)
  - [x] 10.1 Implementar `js/index.js` com: toggle menu mobile, filtro de categorias por data-attribute, tracking de analytics para WhatsApp/view_item/filter
    - Menu mobile: toggle classe 'active' no nav-menu
    - Filtro: mostrar/esconder cards baseado em data-type, atualizar estado ativo dos botões de filtro
    - Analytics: trackWhatsAppClick, trackViewItem, trackFilterCategory com verificação de gtag
    - _Requisitos: 2.3, 3.2, 6.1, 6.4_

- [x] 11. Checkpoint final — Build completo e verificação
  - Executar `npx @11ty/eleventy` e verificar build sem erros
  - Verificar que todas as páginas de keyword herdam o novo visual
  - Verificar que os permalinks existentes não mudaram
  - Verificar que o schema JSON-LD está presente nas páginas

- [ ]* 12. Testes de propriedade e unitários
  - [ ]* 12.1 Configurar Vitest e fast-check no projeto
    - Adicionar vitest e fast-check como devDependencies
    - Criar vitest.config.js
    - _Requisitos: Estratégia de testes_
  - [ ]* 12.2 Escrever testes unitários para verificações de exemplo (homepage, header, footer, schema, analytics)
    - Testar que homepage contém Hero Section (Req 1.1)
    - Testar que homepage contém pelo menos 4 product cards (Req 1.2)
    - Testar que header contém logo, links e WhatsApp (Req 2.1)
    - Testar que evento de conversão genérico foi removido (Req 6.5)
    - Testar que schema LocalBusiness contém campos obrigatórios (Req 9.2)
    - _Requisitos: 1.1, 1.2, 2.1, 6.5, 9.2_
  - [ ]* 12.3 Escrever teste de propriedade: cards de produto contêm todas as informações
    - **Propriedade 1: Cards de produto contêm todas as informações obrigatórias**
    - **Valida: Requisitos 3.1, 3.3**
  - [ ]* 12.4 Escrever teste de propriedade: filtro de categorias
    - **Propriedade 2: Filtro de categorias exibe apenas produtos da categoria selecionada**
    - **Valida: Requisitos 3.2**
  - [ ]* 12.5 Escrever teste de propriedade: página de detalhe contém elementos obrigatórios
    - **Propriedade 3: Página de detalhe do produto contém todos os elementos obrigatórios**
    - **Valida: Requisitos 4.1, 4.2**
  - [ ]* 12.6 Escrever teste de propriedade: botão WhatsApp presente em todas as páginas
    - **Propriedade 7: Botão flutuante de WhatsApp presente em todas as páginas**
    - **Valida: Requisitos 7.3**
  - [ ]* 12.7 Escrever teste de propriedade: páginas de keyword com título e meta tags corretos
    - **Propriedade 8: Páginas de keyword renderizam com título e meta tags específicos**
    - **Valida: Requisitos 8.1, 8.4**
  - [ ]* 12.8 Escrever teste de propriedade: Open Graph em todas as páginas
    - **Propriedade 12: Meta tags Open Graph presentes em todas as páginas**
    - **Valida: Requisitos 9.3**
  - [ ]* 12.9 Escrever teste de propriedade: schema Product nas páginas de produto
    - **Propriedade 16: Schema JSON-LD Product nas páginas de produto**
    - **Valida: Requisitos 9.8**
  - [ ]* 12.10 Escrever teste de propriedade: imagens com alt descritivo
    - **Propriedade 17: Imagens possuem atributos alt descritivos**
    - **Valida: Requisitos 10.2**
  - [ ]* 12.11 Escrever teste de propriedade: lang="pt-BR" em todas as páginas
    - **Propriedade 18: Atributo lang="pt-BR" em todas as páginas**
    - **Valida: Requisitos 10.4**

## Notas

- Tarefas marcadas com `*` são opcionais e podem ser puladas para um MVP mais rápido
- Cada tarefa referencia requisitos específicos para rastreabilidade
- Checkpoints garantem validação incremental
- Testes de propriedade validam propriedades universais de corretude
- Testes unitários validam exemplos específicos e edge cases
