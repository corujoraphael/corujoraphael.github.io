# Documento de Requisitos

## Introdução

Redesign do site estático Memorare Cestas (memorarecestas.com.br), um negócio de cestas artesanais em Conselheiro Lafaiete, MG. O objetivo é tornar o site mais bonito, funcional e com melhor rastreamento de analytics, mantendo a arquitetura Eleventy com carregamento instantâneo. O site de referência para inspiração visual é afetoepoesias.com.br.

## Glossário

- **Site**: O site estático Memorare Cestas construído com Eleventy (11ty)
- **Produto**: Uma cesta artesanal cadastrada como arquivo Markdown no diretório `cestas/`
- **Categoria**: Tipo de cesta (ex: "Café da manhã/tarde", "Natal", "Dia dos Namorados")
- **Visitante**: Pessoa que acessa o site pelo navegador
- **CTA**: Call-to-action, elemento visual que convida o visitante a realizar uma ação (ex: botão "Reservar")
- **Analytics**: Sistema de rastreamento Google Ads/gtag para medir comportamento do visitante
- **Evento_de_Conversão**: Ação rastreada pelo Analytics que indica interesse comercial (clique em WhatsApp, visualização de produto, etc.)
- **Hero_Section**: Seção principal no topo da homepage com destaque visual
- **Carrossel**: Componente de interface que exibe itens em sequência horizontal com navegação
- **Grid_de_Produtos**: Layout em grade para exibição de cards de produtos
- **Seção_Sobre**: Área do site com storytelling sobre o negócio
- **Página_de_Keyword**: Página SEO gerada dinamicamente a partir de arquivos Markdown no diretório `keywords/`, usando o layout `home.html` com título, descrição e permalink customizados para ranquear em buscas específicas (ex: "Cesta de Natal em Conselheiro Lafaiete")

## Requisitos

### Requisito 1: Redesign da Homepage

**User Story:** Como visitante, quero ver uma homepage moderna e visualmente atraente, para que eu tenha uma boa primeira impressão do negócio e me sinta motivado a explorar os produtos.

#### Critérios de Aceitação

1. QUANDO um visitante acessa a homepage, O Site DEVERÁ exibir uma Hero_Section com imagem de destaque, título, descrição do negócio e CTA para WhatsApp
2. QUANDO a homepage é carregada, O Site DEVERÁ exibir uma seção de produtos em destaque com no mínimo 4 produtos apresentados como cards visuais em Grid_de_Produtos
3. QUANDO a homepage é carregada, O Site DEVERÁ exibir uma Seção_Sobre com storytelling sobre o negócio Memorare Cestas
4. QUANDO a homepage é carregada, O Site DEVERÁ exibir uma seção de depoimentos de clientes
5. QUANDO a homepage é carregada, O Site DEVERÁ exibir uma seção de contato com localização, Instagram e WhatsApp
6. QUANDO um visitante visualiza a homepage em dispositivo móvel, O Site DEVERÁ adaptar todas as seções para layout responsivo de coluna única

### Requisito 2: Navegação e Cabeçalho Aprimorados

**User Story:** Como visitante, quero uma navegação clara e um cabeçalho visualmente polido, para que eu possa encontrar facilmente o que procuro no site.

#### Critérios de Aceitação

1. O Site DEVERÁ exibir um cabeçalho com logo, links de navegação (Início, Produtos, Sobre) e ícone de WhatsApp
2. QUANDO o visitante rola a página para baixo, O Site DEVERÁ manter o cabeçalho visível no topo (sticky header)
3. QUANDO o visitante acessa o site em dispositivo móvel, O Site DEVERÁ exibir um menu hambúrguer que abre/fecha a navegação
4. QUANDO o visitante clica em um link de navegação, O Site DEVERÁ navegar para a página ou seção correspondente

### Requisito 3: Página de Produtos Redesenhada

**User Story:** Como visitante, quero navegar pelos produtos de forma organizada e visualmente agradável, para que eu possa encontrar a cesta ideal para minha ocasião.

#### Critérios de Aceitação

1. QUANDO um visitante acessa a página de produtos, O Site DEVERÁ exibir todos os produtos em Grid_de_Produtos com cards contendo imagem, nome, Categoria, preço e CTA
2. QUANDO um visitante visualiza a página de produtos, O Site DEVERÁ permitir filtrar produtos por Categoria
3. QUANDO um visitante clica em um card de produto, O Site DEVERÁ navegar para a página de detalhes do Produto
4. QUANDO a página de produtos é visualizada em dispositivo móvel, O Grid_de_Produtos DEVERÁ adaptar para 1 coluna em telas pequenas e 2 colunas em telas médias

### Requisito 4: Página de Detalhes do Produto Aprimorada

**User Story:** Como visitante, quero ver os detalhes de uma cesta de forma clara e atraente, para que eu possa decidir se quero fazer o pedido.

#### Critérios de Aceitação

1. QUANDO um visitante acessa a página de detalhes de um Produto, O Site DEVERÁ exibir imagem em destaque, nome, Categoria, preço, descrição com lista de itens e CTA para WhatsApp
2. QUANDO um visitante clica no CTA de reserva, O Site DEVERÁ abrir o WhatsApp com mensagem pré-preenchida contendo o nome do Produto
3. QUANDO a página de detalhes é visualizada em dispositivo móvel, O Site DEVERÁ empilhar imagem acima dos detalhes em layout de coluna única

### Requisito 5: Sistema Visual e CSS Modernizado

**User Story:** Como visitante, quero que o site tenha uma aparência moderna e coesa, para que eu perceba profissionalismo e confiança no negócio.

#### Critérios de Aceitação

1. O Site DEVERÁ utilizar uma paleta de cores consistente baseada nas cores da marca (tons terrosos, dourado, marrom)
2. O Site DEVERÁ utilizar tipografia hierárquica com fontes Poppins (corpo) e Calistoga (títulos decorativos)
3. O Site DEVERÁ aplicar transições suaves em hover de botões, cards e links
4. O Site DEVERÁ utilizar espaçamento consistente entre seções com padding adequado
5. O Site DEVERÁ exibir cards de produto com sombra sutil, bordas arredondadas e efeito hover de elevação

### Requisito 6: Rastreamento de Analytics Aprimorado

**User Story:** Como dono do negócio, quero rastrear ações específicas dos visitantes no site, para que eu possa entender o comportamento dos clientes e otimizar minhas campanhas de marketing.

#### Critérios de Aceitação

1. QUANDO um visitante clica no botão de WhatsApp (flutuante ou em CTA de produto), O Analytics DEVERÁ registrar um Evento_de_Conversão com categoria "whatsapp_click" e label identificando a origem (homepage, produto, flutuante)
2. QUANDO um visitante acessa a página de detalhes de um Produto, O Analytics DEVERÁ registrar um evento "view_item" com o nome do Produto
3. QUANDO um visitante acessa a página de produtos, O Analytics DEVERÁ registrar um evento "view_item_list"
4. QUANDO um visitante filtra produtos por Categoria, O Analytics DEVERÁ registrar um evento com a Categoria selecionada
5. O Site DEVERÁ remover o evento de conversão genérico que dispara em todas as páginas e substituí-lo por eventos específicos por ação

### Requisito 7: Rodapé e Seção de Contato Aprimorados

**User Story:** Como visitante, quero encontrar facilmente as informações de contato e redes sociais do negócio, para que eu possa entrar em contato ou seguir nas redes.

#### Critérios de Aceitação

1. O Site DEVERÁ exibir um rodapé com links de navegação, informações de contato (WhatsApp, email, endereço) e links para redes sociais (Instagram, Facebook, WhatsApp)
2. QUANDO o visitante visualiza o rodapé em dispositivo móvel, O Site DEVERÁ centralizar o conteúdo em layout de coluna única
3. O Site DEVERÁ manter o botão flutuante de WhatsApp com animação de pulso visível em todas as páginas

### Requisito 8: Páginas de Keyword SEO

**User Story:** Como dono do negócio, quero manter e melhorar as páginas dinâmicas de keyword SEO, para que o site continue ranqueando bem em buscas específicas como "Cesta de Natal em Conselheiro Lafaiete".

#### Critérios de Aceitação

1. QUANDO uma Página_de_Keyword é acessada, O Site DEVERÁ renderizar o novo layout redesenhado (Hero_Section, produtos em destaque, depoimentos, contato) com o título e descrição específicos da keyword
2. QUANDO o layout home.html é atualizado com o redesign, AS Páginas_de_Keyword DEVERÃO herdar automaticamente o novo visual sem necessidade de alteração nos arquivos Markdown de keywords
3. O Site DEVERÁ manter todos os permalinks existentes das Páginas_de_Keyword inalterados para preservar o ranqueamento SEO
4. QUANDO uma Página_de_Keyword é carregada, O Site DEVERÁ exibir meta tags title e description específicas da keyword para otimização de busca
5. QUANDO uma Página_de_Keyword é carregada, O Site DEVERÁ exibir os produtos filtrados pela Categoria mais relevante à keyword, quando aplicável

### Requisito 9: SEO Local e Otimização para Buscas

**User Story:** Como dono do negócio, quero que o site seja altamente otimizado para SEO local em Conselheiro Lafaiete, para que clientes da região encontrem meu negócio ao buscar por cestas artesanais.

#### Critérios de Aceitação

1. O Site DEVERÁ incluir o nome da cidade "Conselheiro Lafaiete" e variações relevantes (ex: "Conselheiro Lafaiete MG") em títulos H1, H2 e meta descriptions de todas as páginas
2. O Site DEVERÁ manter e expandir o schema JSON-LD LocalBusiness com dados completos: nome, endereço, telefone, horário de funcionamento, área de atendimento e imagens
3. O Site DEVERÁ incluir meta tags Open Graph em todas as páginas com título, descrição, imagem e URL para compartilhamento em redes sociais
4. O Site DEVERÁ gerar URLs amigáveis com palavras-chave relevantes (padrão já existente nos permalinks de keywords)
5. O Site DEVERÁ incluir breadcrumbs estruturados com schema markup nas páginas de produto e de keyword
6. O Site DEVERÁ manter o sitemap.xml atualizado incluindo todas as páginas de produto e de keyword
7. O Site DEVERÁ utilizar heading tags (H1, H2, H3) de forma hierárquica e semântica, com palavras-chave de cestas e localidade
8. QUANDO uma página de produto é carregada, O Site DEVERÁ incluir schema JSON-LD Product com nome, preço, descrição e imagem do produto

### Requisito 10: Performance

**User Story:** Como dono do negócio, quero que o site carregue rapidamente, para que visitantes não desistam de navegar e o Google valorize o site nos resultados de busca.

#### Critérios de Aceitação

1. O Site DEVERÁ manter o tempo de carregamento abaixo de 3 segundos em conexão 3G
2. O Site DEVERÁ utilizar imagens otimizadas em formato WebP com atributos alt descritivos em português contendo palavras-chave relevantes
3. O Site DEVERÁ gerar HTML minificado através do processo de build existente
4. O Site DEVERÁ manter o atributo lang="pt-BR" no elemento HTML
5. O Site DEVERÁ utilizar carregamento lazy (loading="lazy") para imagens abaixo da dobra
