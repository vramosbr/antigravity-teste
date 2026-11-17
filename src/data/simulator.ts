import type { SimulatorScenario } from '../types/guide';

export const SIMULATOR_SCENARIOS: SimulatorScenario[] = [
  {
    id: 'calc-comissao',
    title: 'Calculadora de Metas e Comissões',
    persona: 'Analista Comercial',
    modelUsed: 'Gemini Pro (Plano) -> Gemini Flash (Ajuste visual)',
    userPrompt:
      'Quero uma calculadora simples para meus vendedores saberem quanto vão ganhar de comissão. Entradas: total vendido no mês e meta da equipe. Se bater 100% da meta, a comissão sobe de 3% para 5%. Mostre o valor final em destaque.',
    modelUseNote: '',
    steps: [
      {
        step: 1,
        actor: 'Você (Diretor de Produto)',
        title: '1. Seu Pedido em Português Claro',
        summary: 'Você descreve o objetivo, as entradas e a regra de negócio sem usar nenhum termo técnico.',
        detailTitle: 'O que você enviou no chat:',
        detailLines: [
          'Objetivo: calcular comissão da equipe comercial.',
          'Entradas: Total vendido no mês + Meta definida.',
          'Regra: abaixo da meta paga 3%; atingiu ou passou de 100% paga 5%.',
          'Visual: resultado em destaque imediato.',
        ],
      },
      {
        step: 2,
        actor: 'Antigravity (Agente)',
        title: '2. Plano de Ação (Artefato)',
        summary: 'Antes de sair criando telas, o Antigravity organiza o roteiro em linguagem clara para você aprovar.',
        detailTitle: 'Plano gerado pelo agente:',
        detailLines: [
          '• Criar formulário limpo com dois campos numéricos em Reais (R$).',
          '• Exibir barra visual mostrando % da meta atingida.',
          '• Aplicar cálculo automático: 3% padrão ou 5% ao atingir 100%.',
          '• Mostrar cartão de destaque com o valor da comissão e faixa conquistada.',
        ],
      },
      {
        step: 3,
        actor: 'Antigravity (Agente)',
        title: '3. Construção Autônoma nos Bastidores',
        summary: 'Após você clicar em aprovar, o agente cria os arquivos, aplica o design e sobe o ambiente de testes sozinho.',
        detailTitle: 'O que o Antigravity fez automaticamente:',
        detailLines: [
          '✓ Estruturou a página inicial e os campos com formatação de moeda.',
          '✓ Criou a lógica segura que evita divisão por zero se a meta estiver vazia.',
          '✓ Aplicou contraste legível e layout adaptado para celular e computador.',
          '✓ Abriu o aplicativo na Visualização no Navegador (Preview).',
        ],
      },
      {
        step: 4,
        actor: 'Navegador (Resultado)',
        title: '4. Pré-visualização no Navegador',
        summary: 'Você testa direto na tela clicando e digitando valores reais — se quiser mudar algo, basta pedir no chat.',
        detailTitle: 'Simulação do app funcionando:',
        detailLines: [
          'Você digitou Vendas: R$ 52.000 | Meta: R$ 50.000.',
          'O aplicativo detectou 104% da meta e ativou a faixa bônus de 5%.',
          'Resultado exibido: R$ 2.600,00 de comissão.',
        ],
      },
    ],
    previewMock: {
      appTitle: 'Simulador de Comissão Comercial',
      appSubtitle: 'Acompanhe o atingimento da meta e a faixa de bônus em tempo real',
      fields: [
        { label: 'Total vendido no mês', value: 'R$ 52.000,00' },
        { label: 'Meta do mês', value: 'R$ 50.000,00' },
      ],
      resultLabel: 'Comissão estimada (Faixa Bônus 5% — 104% da meta)',
      resultValue: 'R$ 2.600,00',
      actionLabel: 'Copiar resumo da comissão',
    },
  } as SimulatorScenario & { modelUseNote?: string },
  {
    id: 'triagem-ia',
    title: 'Analisador de Mensagens com Gemini',
    persona: 'Empreendedor / Atendimento',
    modelUsed: 'Gemini Pro (Integração segura com API do Gemini)',
    userPrompt:
      'Crie uma tela onde minha equipe cola uma mensagem de cliente e o Google Gemini classifica se é Dúvida, Financeiro ou Reclamação, indica a urgência e sugere uma resposta educada pronta para copiar.',
    steps: [
      {
        step: 1,
        actor: 'Você (Diretor de Produto)',
        title: '1. Seu Pedido em Português Claro',
        summary: 'Você define exatamente o que a IA deve devolver, transformando um processo manual em 1 clique.',
        detailTitle: 'O que você pediu no chat:',
        detailLines: [
          'Entrada: caixa para colar a mensagem recebida do cliente.',
          'Uso da IA: chamar a API do Google Gemini com regras fixas de triagem.',
          'Saída: Categoria + Nível de Urgência + Resposta sugerida copiável.',
        ],
      },
      {
        step: 2,
        actor: 'Antigravity (Agente)',
        title: '2. Plano de Ação (Artefato)',
        summary: 'O agente garante que a chave da API do Gemini fique protegida e define a estrutura da tela.',
        detailTitle: 'Plano gerado pelo agente:',
        detailLines: [
          '• Tela dividida: texto do cliente à esquerda e diagnóstico do Gemini à direita.',
          '• Proteger a chave secreta (API Key) em variável de ambiente.',
          '• Incluir botão "Testar com Exemplo" caso queira validar antes de pôr a chave.',
        ],
      },
      {
        step: 3,
        actor: 'Antigravity (Agente)',
        title: '3. Construção Autônoma nos Bastidores',
        summary: 'O agente configura a comunicação com o Gemini e monta a tela sem exigir que você toque em código.',
        detailTitle: 'O que o Antigravity fez automaticamente:',
        detailLines: [
          '✓ Criou a camada segura para enviar a mensagem ao modelo Gemini.',
          '✓ Configurou instruções internas para a IA sempre responder nos 3 blocos.',
          '✓ Adicionou botão "Copiar Resposta" e indicador de carregamento.',
        ],
      },
      {
        step: 4,
        actor: 'Navegador (Resultado)',
        title: '4. Pré-visualização no Navegador',
        summary: 'Sua equipe testa com uma reclamação real e valida se o tom da resposta sugerida combina com a empresa.',
        detailTitle: 'Simulação do app funcionando:',
        detailLines: [
          'Entrada: "Meu boleto venceu ontem e não consigo emitir a segunda via."',
          'Gemini identificou: Financeiro | Urgência Alta.',
          'Sugestão gerada com cordialidade pronta para envio.',
        ],
      },
    ],
    previewMock: {
      appTitle: 'Triagem Inteligente com Gemini',
      appSubtitle: 'Cole a mensagem do cliente para classificar e gerar resposta cordial',
      fields: [
        { label: 'Categoria detectada', value: 'Financeiro • Urgência Alta' },
        { label: 'Resumo em 1 linha', value: 'Cliente solicita segunda via de boleto vencido' },
      ],
      resultLabel: 'Resposta sugerida pelo Gemini',
      resultValue: '"Olá! Sinto muito pelo transtorno. Já estou gerando a segunda via atualizada do seu boleto..."',
      actionLabel: 'Copiar resposta sugerida',
    },
  },
  {
    id: 'relatorio-semanal',
    title: 'Gerador de Relatório Semanal em PDF',
    persona: 'Educador / Gestor de Projetos',
    modelUsed: 'Gemini Flash (Criação ágil e acabamento editorial)',
    userPrompt:
      'Preciso de um gerador rápido de relatório semanal: preencho entregas da semana, pontos de atenção e próximos passos, e ao lado vejo o documento formatado pronto para salvar em PDF.',
    steps: [
      {
        step: 1,
        actor: 'Você (Diretor de Produto)',
        title: '1. Seu Pedido em Português Claro',
        summary: 'Você resolve uma dor recorrente de sexta-feira em poucas linhas de pedido.',
        detailTitle: 'O que você pediu no chat:',
        detailLines: [
          'Formulário simples com 3 blocos de texto + período e responsável.',
          'Prévia ao vivo em formato de folha limpa A4.',
          'Botão "Salvar em PDF" sem precisar de editor de texto pesado.',
        ],
      },
      {
        step: 2,
        actor: 'Antigravity (Agente)',
        title: '2. Plano de Ação (Artefato)',
        summary: 'Você revisa se os campos do relatório batem com o que sua diretoria ou turma costuma cobrar.',
        detailTitle: 'Plano gerado pelo agente:',
        detailLines: [
          '• Coluna esquerda para edição rápida com salvamento automático local.',
          '• Coluna direita com visual editorial de documento executivo.',
          '• Regra de impressão limpa que esconde os botões ao gerar o PDF.',
        ],
      },
      {
        step: 3,
        actor: 'Antigravity (Agente)',
        title: '3. Construção Autônoma nos Bastidores',
        summary: 'Em poucos segundos com o modelo ágil, a tela de edição e a folha formatada ficam prontas.',
        detailTitle: 'O que o Antigravity fez automaticamente:',
        detailLines: [
          '✓ Criou formulário com pré-visualização instantânea ao digitar.',
          '✓ Configurou estilo especial de impressão para o PDF sair impecável.',
          '✓ Salvou o rascunho automaticamente no navegador.',
        ],
      },
      {
        step: 4,
        actor: 'Navegador (Resultado)',
        title: '4. Pré-visualização no Navegador',
        summary: 'Você preenche uma semana real, clica em Salvar em PDF e confere o documento pronto.',
        detailTitle: 'Simulação do app funcionando:',
        detailLines: [
          'Documento atualizado em tempo real conforme você escreve.',
          'Layout limpo com cabeçalho, datas e lista numerada.',
          'Pronto para compartilhar com 1 clique.',
        ],
      },
    ],
    previewMock: {
      appTitle: 'Boletim Semanal Executivo',
      appSubtitle: 'Semana 46 • Responsável: Equipe de Operações',
      fields: [
        { label: 'Entregas Concluídas', value: '3 marcos entregues no prazo' },
        { label: 'Próxima Semana', value: 'Validação com clientes piloto' },
      ],
      resultLabel: 'Status do Documento',
      resultValue: 'Pronto para exportar em PDF (A4)',
      actionLabel: 'Salvar em PDF',
    },
  },
];
