import type { PromptCategory, PromptTemplate } from '../types/guide';

export const PROMPT_CATEGORIES: PromptCategory[] = [
  'Criar MVP',
  'Revisar Plano',
  'Integrar IA do Google',
  'Corrigir Bug',
  'Melhorar Design',
];

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'mvp-estruturado',
    title: 'Briefing Completo de Novo Aplicativo (MVP)',
    category: 'Criar MVP',
    description: 'Ideal para a primeira mensagem ao abrir um projeto vazio. Dá ao Antigravity contexto de negócio sem exigir termos técnicos.',
    recommendedModel: 'Linha Gemini Pro',
    template: `Quero criar um aplicativo web chamado [PREENCHA AQUI: Nome do Aplicativo] para [PREENCHA AQUI: Público-alvo, ex.: minha equipe de vendas].

Objetivo principal: [PREENCHA AQUI: O que o app resolve em 1 frase].

Como a pessoa vai usar na prática:
1. Ela informa ou escolhe: [PREENCHA AQUI: Campos de entrada, ex.: valor, prazo e categoria].
2. O aplicativo processa/calcula: [PREENCHA AQUI: Regra principal de negócio].
3. Na tela aparece o resultado com: [PREENCHA AQUI: Saída desejada, ex.: resumo, gráfico ou botão de copiar].

Regras importantes:
- Não precisa de tela de login nesta primeira versão.
- Visual limpo, claro, fácil de usar no computador e no celular.
- Antes de escrever os arquivos, me apresente um Plano de Implementação em linguagem simples para eu aprovar.`,
    placeholders: [
      { key: 'Nome do Aplicativo', label: 'Nome do Aplicativo', example: 'OrçaFácil Consultoria' },
      { key: 'Público-alvo, ex.: minha equipe de vendas', label: 'Público-alvo', example: 'consultores comerciais no atendimento' },
      { key: 'O que o app resolve em 1 frase', label: 'Objetivo principal', example: 'calcular propostas comerciais em segundos sem usar planilhas' },
      { key: 'Campos de entrada, ex.: valor, prazo e categoria', label: 'Dados de entrada', example: 'horas estimadas, perfil do projeto e desconto' },
      { key: 'Regra principal de negócio', label: 'Regra principal', example: 'aplicar impostos de 12% e impedir desconto acima de 20%' },
      { key: 'Saída desejada, ex.: resumo, gráfico ou botão de copiar', label: 'Resultado esperado', example: 'valor final, parcela mensal e botão para copiar resumo' },
    ],
  },
  {
    id: 'mvp-ferramenta-planilha',
    title: 'Transformar Planilha Confusa em Ferramenta Web',
    category: 'Criar MVP',
    description: 'Excelente para analistas e gestores substituírem planilhas frágeis por uma tela guiada e à prova de erros.',
    recommendedModel: 'Linha Gemini Pro',
    template: `Hoje controlamos [PREENCHA AQUI: Nome do processo, ex.: reembolsos ou metas semanais] em uma planilha, mas as pessoas acabam apagando fórmulas sem querer.

Quero transformar isso em um aplicativo web simples onde:
- A pessoa preenche apenas os campos permitidos: [PREENCHA AQUI: Lista dos campos].
- O aplicativo faz automaticamente as contas: [PREENCHA AQUI: Fórmulas ou regras].
- Os registros ficam salvos no próprio navegador e podem ser exportados em CSV com 1 clique.

Quero uma tela objetiva, com resumo no topo e tabela organizada abaixo.`,
    placeholders: [
      { key: 'Nome do processo, ex.: reembolsos ou metas semanais', label: 'Processo atual', example: 'controle de reembolsos de viagem' },
      { key: 'Lista dos campos', label: 'Campos preenchidos', example: 'data, colaborador, categoria (transporte/alimentação) e valor' },
      { key: 'Fórmulas ou regras', label: 'Cálculos automáticos', example: 'somar o total por colaborador e destacar despesas acima de R$ 200' },
    ],
  },
  {
    id: 'revisar-plano-cortar-excesso',
    title: 'Ajustar Plano de Implementação Antes de Aprovar',
    category: 'Revisar Plano',
    description: 'Use quando o plano gerado pelo agente estiver complexo demais ou faltando uma regra importante do seu negócio.',
    recommendedModel: 'Linha Gemini Pro',
    template: `Li o plano que você propôs e gostei da direção, mas quero fazer alguns ajustes antes de você começar a construir:

1. Adicione esta regra que faltou: [PREENCHA AQUI: Nova regra ou tela necessária].
2. Simplifique ou remova por enquanto: [PREENCHA AQUI: Algo complexo que pode ficar para depois].
3. Garanta que o usuário consiga testar tudo sem precisar criar conta ou configurar servidor externo.

Atualize o plano em linguagem simples para eu aprovar em seguida.`,
    placeholders: [
      { key: 'Nova regra ou tela necessária', label: 'O que adicionar', example: 'um botão para restaurar os valores padrão de exemplo' },
      { key: 'Algo complexo que pode ficar para depois', label: 'O que simplificar', example: 'a tela de login e envio de e-mail automático' },
    ],
  },
  {
    id: 'revisar-plano-traduzir',
    title: 'Pedir Explicação em Português Claro do Plano',
    category: 'Revisar Plano',
    description: 'Quando o agente usar termos técnicos demais no plano, peça uma tradução focada na experiência de quem vai usar.',
    recommendedModel: 'Linha Gemini Flash',
    template: `Não sou programador(a) e alguns termos do plano ficaram muito técnicos para mim.

Por favor, reescreva o resumo desse plano explicando apenas:
- Quais telas o usuário final vai ver;
- O que acontece ao clicar em cada botão principal;
- Como vou testar [PREENCHA AQUI: Principal funcionalidade que quero validar] na visualização do navegador.

Sem citar nomes de arquivos ou bibliotecas técnicas.`,
    placeholders: [
      { key: 'Principal funcionalidade que quero validar', label: 'Funcionalidade principal', example: 'o cálculo de comissão e a exportação em PDF' },
    ],
  },
  {
    id: 'ia-analise-texto-gemini',
    title: 'Integrar API do Google Gemini para Análise de Textos',
    category: 'Integrar IA do Google',
    description: 'Adiciona inteligência artificial real do Google ao seu aplicativo mantendo sua chave protegida.',
    recommendedModel: 'Linha Gemini Pro',
    template: `Quero integrar a API do Google Gemini dentro deste aplicativo para analisar [PREENCHA AQUI: Tipo de entrada, ex.: contratos, currículos ou mensagens de clientes].

Quando o usuário enviar o texto e clicar em "[PREENCHA AQUI: Nome do botão, ex.: Analisar Agora]", o Gemini deve responder exatamente nesta estrutura:
- Resumo claro em até 3 linhas;
- Pontos de atenção ou riscos encontrados;
- Próxima ação recomendada no tom [PREENCHA AQUI: Tom de voz, ex.: profissional e direto].

Importante sobre segurança:
- Guarde a chave da API do Gemini apenas em variável de ambiente (nunca visível no código público).
- Se a chave ainda não estiver configurada, exiba uma mensagem amigável ensinando onde preenchê-la e ofereça um botão "Testar com Exemplo Simulado".`,
    placeholders: [
      { key: 'Tipo de entrada, ex.: contratos, currículos ou mensagens de clientes', label: 'O que será analisado', example: 'mensagens de atendimento recebidas por e-mail' },
      { key: 'Nome do botão, ex.: Analisar Agora', label: 'Texto do botão', example: 'Analisar Atendimento' },
      { key: 'Tom de voz, ex.: profissional e direto', label: 'Tom de resposta', example: 'cordial, empático e objetivo' },
    ],
  },
  {
    id: 'ia-visao-gemini',
    title: 'Integrar Visão do Gemini para Ler Imagens / Fotos',
    category: 'Integrar IA do Google',
    description: 'Permite que o usuário envie uma foto (recibo, produto, documento) para o Gemini extrair informações.',
    recommendedModel: 'Linha Gemini Pro',
    template: `Adicione ao aplicativo a capacidade de enviar uma foto ou imagem para que o Google Gemini analise.

Caso de uso: o usuário envia uma foto de [PREENCHA AQUI: Tipo de imagem, ex.: nota fiscal, rótulo ou produto].
O que o Gemini deve extrair e mostrar na tela em campos organizados:
- [PREENCHA AQUI: Campo 1, ex.: Nome do estabelecimento ou produto]
- [PREENCHA AQUI: Campo 2, ex.: Data ou valor total]
- [PREENCHA AQUI: Campo 3, ex.: Descrição sugerida ou categoria]

Mantenha a chave da API protegida em variável de ambiente e mostre um aviso de carregamento enquanto a imagem está sendo analisada.`,
    placeholders: [
      { key: 'Tipo de imagem, ex.: nota fiscal, rótulo ou produto', label: 'Tipo de foto', example: 'foto de um produto artesanal para cadastrar na loja' },
      { key: 'Campo 1, ex.: Nome do estabelecimento ou produto', label: 'Informação 1', example: 'Título atrativo para anúncio' },
      { key: 'Campo 2, ex.: Data ou valor total', label: 'Informação 2', example: 'Categoria sugerida e materiais visíveis' },
      { key: 'Campo 3, ex.: Descrição sugerida ou categoria', label: 'Informação 3', example: 'Descrição comercial pronta em 2 parágrafos' },
    ],
  },
  {
    id: 'bug-investigar-erro',
    title: 'Reportar Erro Encontrado na Tela (Sem Ler Código)',
    category: 'Corrigir Bug',
    description: 'Para usar sempre que aparecer uma mensagem vermelha, tela em branco ou cálculo errado.',
    recommendedModel: 'Linha Gemini Pro',
    template: `Encontrei um problema ao testar o aplicativo no navegador.

O que eu estava fazendo:
1. Entrei na tela/aba: [PREENCHA AQUI: Nome da tela ou parte do app].
2. Preenchi ou cliquei em: [PREENCHA AQUI: Ação que você fez].
3. O que aconteceu de errado: [PREENCHA AQUI: Mensagem de erro ou comportamento errado].
4. O que deveria acontecer: [PREENCHA AQUI: Comportamento esperado].

Por favor, investigue a causa e corrija mantendo tudo o que já está funcionando.`,
    placeholders: [
      { key: 'Nome da tela ou parte do app', label: 'Onde aconteceu', example: 'aba de Orçamentos' },
      { key: 'Ação que você fez', label: 'O que você clicou/preencheu', example: 'deixei o campo Desconto vazio e cliquei em Calcular' },
      { key: 'Mensagem de erro ou comportamento errado', label: 'Erro observado', example: 'o total apareceu como "NaN" na tela' },
      { key: 'Comportamento esperado', label: 'Resultado correto', example: 'considerar desconto zero quando o campo estiver vazio' },
    ],
  },
  {
    id: 'bug-com-print',
    title: 'Corrigir Problema Usando Print da Tela',
    category: 'Corrigir Bug',
    description: 'Anexe uma captura de tela no chat do Antigravity e envie este texto junto.',
    recommendedModel: 'Linha Gemini Flash',
    template: `Anexei um print mostrando exatamente o que está acontecendo na minha tela agora.

Como você pode ver na imagem, [PREENCHA AQUI: Descreva o que está errado visualmente, ex.: o botão está cortado no celular ou o texto ficou invisível].

Corrija apenas esse ponto para que fique legível e bem alinhado tanto no computador quanto no celular, sem alterar as regras de funcionamento atuais.`,
    placeholders: [
      { key: 'Descreva o que está errado visualmente, ex.: o botão está cortado no celular ou o texto ficou invisível', label: 'Problema visto no print', example: 'o menu lateral está cobrindo o título na tela do celular' },
    ],
  },
  {
    id: 'design-refinar-visual',
    title: 'Deixar a Interface Mais Limpa e Profissional',
    category: 'Melhorar Design',
    description: 'Use com o modelo rápido quando o app já funciona, mas você quer elevar o padrão visual.',
    recommendedModel: 'Linha Gemini Flash',
    template: `O funcionamento está ótimo — mantenha toda a lógica exatamente como está.

Agora quero deixar o visual mais limpo, editorial e profissional com estes ajustes:
- Paleta e clima visual: [PREENCHA AQUI: Estilo desejado, ex.: fundo claro acolhedor com azul sóbrio e bastante respiro].
- Destaque principal: dê mais ênfase visual para [PREENCHA AQUI: Elemento mais importante da tela, ex.: o cartão do resultado final e o botão de ação].
- Clareza para iniciantes: troque qualquer texto que pareça técnico por palavras do dia a dia de [PREENCHA AQUI: Sua área de negócio].`,
    placeholders: [
      { key: 'Estilo desejado, ex.: fundo claro acolhedor com azul sóbrio e bastante respiro', label: 'Estilo visual', example: 'visual limpo estilo Google com fundo branco, bordas suaves e verde petróleo' },
      { key: 'Elemento mais importante da tela, ex.: o cartão do resultado final e o botão de ação', label: 'Destaque principal', example: 'o valor economizado por mês e o botão Baixar Relatório' },
      { key: 'Sua área de negócio', label: 'Área de negócio', example: 'clínica odontológica' },
    ],
  },
];
