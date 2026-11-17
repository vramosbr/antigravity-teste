import type { GeminiSolutionCapability, ModelProfile } from '../types/guide';

export const MODEL_PROFILES: ModelProfile[] = [
  {
    id: 'gemini-pro',
    name: 'Linha Gemini Pro (Raciocínio Profundo)',
    tag: 'Arquiteto e Estrategista',
    tagline: 'Pensa fundo antes de agir. Ideal para estruturar regras complexas, lógica de negócio e diagnósticos difíceis.',
    tone: 'blue',
    bestFor: [
      'Começar um projeto novo do zero e gerar o Plano de Implementação inicial.',
      'Regras de cálculo detalhadas, permissões, fluxos com várias etapas ou integração com API do Gemini.',
      'Investigar um erro persistente que um modelo mais simples não conseguiu resolver na primeira tentativa.',
    ],
    avoidWhen: 'Você só quer mudar uma cor, corrigir um título ou arredondar bordas de um cartão — nesses casos ele leva mais tempo e gasta mais cota sem necessidade.',
    analogy: 'É como chamar o arquiteto sênior para desenhar a planta da casa e resolver problemas estruturais.',
  },
  {
    id: 'gemini-flash',
    name: 'Linha Gemini Flash (Rápido e Ágil)',
    tag: 'Execução Veloz',
    tagline: 'Resposta quase instantânea e econômica. Perfeito para lapidar o visual, textos e ajustes pontuais.',
    tone: 'green',
    bestFor: [
      'Mudar cores, fontes, espaçamentos, tamanhos de botões e textos da interface.',
      'Adicionar um novo campo simples a um formulário que já existe e funciona.',
      'Iterações visuais rápidas enquanto você está olhando o Browser Preview.',
    ],
    avoidWhen: 'Você está começando um sistema complexo do zero ou precisa diagnosticar um problema cheio de detalhes escondidos.',
    analogy: 'É como a equipe ágil de acabamento que pinta paredes, troca luminárias e ajusta os detalhes em minutos.',
  },
  {
    id: 'hybrid',
    name: 'Estratégia "Troca Inteligente" (Pro + Flash)',
    tag: 'Melhor Custo-Benefício',
    tagline: 'Combine os dois perfis no mesmo projeto para ter máxima qualidade estrutural gastando menos tempo e cota.',
    tone: 'amber',
    bestFor: [
      'Fase 1 (Fundação): Selecione Gemini Pro para criar o Plano e construir a primeira versão funcional.',
      'Fase 2 (Acabamento): Troque para Gemini Flash para refinar textos, cores, layout e pequenos extras.',
      'Fase 3 (Manutenção): Só volte ao Gemini Pro se for adicionar uma regra complexa ou investigar um bug difícil.',
    ],
    avoidWhen: 'Não há contraindicação — esta é a rotina recomendada para a maioria dos criadores no Antigravity.',
    analogy: 'Arquitetura sólida na planta, acabamento rápido e iterativo na obra.',
  },
];

export const GEMINI_IN_APP_CAPABILITIES: GeminiSolutionCapability[] = [
  {
    id: 'texto',
    title: 'Geração e Resumo de Texto',
    businessUseCase: 'Resumir atas de reunião, redigir e-mails comerciais personalizados, criar planos de aula ou reescrever textos no tom da sua marca.',
    howToAsk: 'Peça ao Antigravity: "Adicione um botão que envia o texto digitado para a API do Gemini e devolve um resumo em 3 tópicos + próximo passo sugerido."',
  },
  {
    id: 'documentos',
    title: 'Leitura e Análise de Documentos / PDFs',
    businessUseCase: 'Extrair cláusulas de contratos, comparar currículos com uma vaga ou transformar relatórios longos em perguntas e respostas.',
    howToAsk: 'Peça ao Antigravity: "Permita enviar um PDF na tela e use o Gemini para responder apenas com base no conteúdo desse documento."',
  },
  {
    id: 'visao',
    title: 'Visão Computacional (Imagens e Fotos)',
    businessUseCase: 'Ler notas fiscais por foto, descrever produtos para catálogo de loja ou conferir se um comprovante está legível.',
    howToAsk: 'Peça ao Antigravity: "Adicione envio de imagem para que o Gemini identifique o produto na foto e sugira título e descrição de venda."',
  },
  {
    id: 'estruturado',
    title: 'Classificação e Dados Organizados',
    businessUseCase: 'Categorizar mensagens de clientes automaticamente (ex.: Financeiro, Suporte, Elogio) e preencher campos de uma tabela sem trabalho manual.',
    howToAsk: 'Peça ao Antigravity: "Faça o Gemini retornar sempre 3 campos separados: Categoria, Urgência (Alta/Média/Baixa) e Motivo em uma frase."',
  },
];

export type TaskTypeOption = 'new-structure' | 'visual-tweaks' | 'hard-bug' | 'integrate-ai';
export type ProjectPhaseOption = 'starting' | 'building' | 'polishing';
export type PriorityOption = 'depth' | 'speed';

export interface QuizRecommendation {
  recommendedModel: 'Linha Gemini Pro' | 'Linha Gemini Flash' | 'Troca Inteligente (Comece com Pro, depois mude para Flash)';
  badgeTone: 'blue' | 'green' | 'amber';
  justification: string;
  practicalTip: string;
}

export function getModelRecommendation(
  taskType: TaskTypeOption,
  phase: ProjectPhaseOption,
  priority: PriorityOption
): QuizRecommendation {
  if (taskType === 'visual-tweaks' && phase !== 'starting') {
    return {
      recommendedModel: 'Linha Gemini Flash',
      badgeTone: 'green',
      justification:
        'Para ajustes de layout, textos, cores e pequenas melhorias em uma tela que já existe, o Gemini Flash entrega respostas muito mais rápidas sem desperdiçar cota.',
      practicalTip:
        'Dica prática: faça 1 ou 2 ajustes por mensagem enquanto observa o Preview no navegador. Se o visual precisar de grande reestruturação, aí sim volte ao Pro.',
    };
  }

  if (taskType === 'hard-bug' || taskType === 'integrate-ai') {
    if (priority === 'speed' && phase === 'polishing' && taskType === 'integrate-ai') {
      return {
        recommendedModel: 'Troca Inteligente (Comece com Pro, depois mude para Flash)',
        badgeTone: 'amber',
        justification:
          'Integrar a API do Gemini exige cuidado com chaves e formato da resposta (melhor com Pro), mas depois você pode usar o Flash para polir a interface.',
        practicalTip:
          'Dica prática: peça primeiro a integração funcionando com variável de ambiente usando o Gemini Pro; quando estiver respondendo certo, troque para o Flash para ajustar os cartões.',
      };
    }

    return {
      recommendedModel: 'Linha Gemini Pro',
      badgeTone: 'blue',
      justification:
        'Investigar erros complexos ou conectar a API do Gemini exige análise profunda do projeto inteiro para não quebrar outras partes do aplicativo.',
      practicalTip:
        'Dica prática: junto com o pedido no Gemini Pro, cole o texto do erro ou anexe um print da tela para acelerar o diagnóstico na primeira tentativa.',
    };
  }

  if (taskType === 'new-structure' || phase === 'starting') {
    if (priority === 'speed' && phase === 'building') {
      return {
        recommendedModel: 'Troca Inteligente (Comece com Pro, depois mude para Flash)',
        badgeTone: 'amber',
        justification:
          'Como você quer agilidade durante a construção, use o Gemini Pro apenas para definir o plano e criar a estrutura principal, passando logo em seguida para o Gemini Flash.',
        practicalTip:
          'Dica prática: assim que a primeira versão abrir no Preview funcionando, mude o seletor de modelo para o Flash para economizar tempo e cota nos refinamentos.',
      };
    }

    return {
      recommendedModel: 'Linha Gemini Pro',
      badgeTone: 'blue',
      justification:
        'Ao iniciar um projeto ou estruturar novas regras de negócio, o Gemini Pro monta um plano mais coerente e evita erros de arquitetura logo na largada.',
      practicalTip:
        'Dica prática: aproveite o modo de planejamento para revisar o Artefato gerado antes de aprovar. Depois do MVP de pé, mude para o Flash para polir o visual.',
    };
  }

  if (priority === 'speed') {
    return {
      recommendedModel: 'Linha Gemini Flash',
      badgeTone: 'green',
      justification:
        'Como a estrutura já está encaminhada e sua prioridade é velocidade, o Gemini Flash responde quase na hora e preserva sua cota para momentos mais complexos.',
      practicalTip:
        'Dica prática: se após 2 tentativas o ajuste não ficar exatamente como você queria, suba temporariamente para o Gemini Pro.',
    };
  }

  return {
    recommendedModel: 'Troca Inteligente (Comece com Pro, depois mude para Flash)',
    badgeTone: 'amber',
    justification:
      'Você ganha mais controle usando o Gemini Pro para decisões estruturais e o Gemini Flash para o ritmo ágil do dia a dia na interface.',
    practicalTip:
      'Dica prática: antes de enviar cada mensagem no chat, pergunte a si mesmo: "Isso muda a lógica ou só a aparência?" Lógica = Pro; Aparência = Flash.',
  };
}
