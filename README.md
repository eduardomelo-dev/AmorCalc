# AmorCalc

Calculadora científica em português, feita com React e TypeScript. Os cálculos
rodam localmente no navegador; o aplicativo não precisa de uma API.

## Começar

É necessário ter Node.js e npm instalados.

```bash
npm install
npm run dev
```

O Vite mostra no terminal o endereço local para abrir no navegador. Para
verificar o projeto ou gerar a versão de produção:

```bash
npm test
npm run build
npm run preview
```

## Aplicativo para desktop

O AmorCalc usa Electron para abrir em uma janela própria, sem depender de um
navegador ou de um servidor Python. Para desenvolver, execute:

```bash
npm run electron:dev
```

Para gerar o instalador do sistema atual, use:

```bash
npm run desktop:linux
npm run desktop:windows
npm run desktop:mac
```

Cada comando deve ser executado no respectivo sistema operacional. No Linux,
é gerado um `.AppImage`; no Windows, um instalador `.exe`; no macOS, um `.dmg`.
O instalador do Windows cria atalhos no menu e na área de trabalho.
Windows e macOS podem exibir avisos porque os instaladores ainda não são
assinados digitalmente.

O workflow de GitHub Actions também empacota as três plataformas em seus
ambientes próprios. Depois de uma execução bem-sucedida, baixe os arquivos na
seção **Actions → Build desktop installers → Artifacts** do repositório.

Este aplicativo Electron destina-se a Linux, Windows e macOS. Electron não
executa no Android; para celular será necessário disponibilizar uma versão
web instalável (PWA) ou criar um aplicativo Android separado.

Para criar um atalho de desenvolvimento no menu do Linux, compile a aplicação
e execute `npm run install:desktop`. Para iniciar esse atalho, o projeto precisa
continuar na mesma pasta e ter suas dependências instaladas; para distribuir a
calculadora, prefira os instaladores nativos acima.

## Como o projeto está organizado

### `frontend/` — interface

- `src/app/`: monta a aplicação, controla a navegação, o tema, as preferências
  e o histórico.
- `src/components/`: botões, cartões, cabeçalho, navegação e outros elementos
  reaproveitados.
- `src/features/`: telas da calculadora, gráficos, funções, equações,
  estatística, conversões, fórmulas, histórico e configurações.
- `src/hooks/`: estado e ações que conectam a tela da calculadora às operações.
- `src/characters/`: mensagens e personagens exibidos nas telas.
- `src/types/`: tipos usados pela interface, como o formato de cada item do
  histórico.
- `src/styles/`: estilos globais e tema visual.
- `src/main.tsx`: ponto de entrada do React e estilos das bibliotecas visuais.

### `backend/` — lógica matemática local

Este diretório é a camada de cálculos, não um servidor HTTP. O frontend importa
suas funções e executa tudo no próprio navegador.

- `src/math/evaluate.ts` e `parser.ts`: interpretação, normalização e
  apresentação de expressões da calculadora.
- `src/math/equations.ts`: resolução de equações e sistemas, fatoração,
  simplificação, derivadas e integrais.
- `src/math/functions.ts`: análise de funções lineares, quadráticas e
  modulares.
- `src/math/graphEngine.ts`: amostragem de funções e busca numérica por raízes
  e extremos.
- `src/math/statistics.ts`: leitura de conjuntos de dados e cálculo de medidas
  estatísticas.
- `src/math/conversions.ts`: categorias, unidades e conversões.
- `src/types/`: tipos de entrada e saída usados pelos cálculos.

### `tests/` — testes automatizados

Os testes verificam os cálculos, conversões, gráficos, estatísticas e
funcionalidades relacionadas ao histórico.

## Preferências e dados

Tema, configurações, memória e histórico ficam no armazenamento local do
navegador (`localStorage`). Limpar os dados do navegador remove essas
informações.

## Tecnologias principais

- React e TypeScript para a interface.
- Vite para desenvolvimento e geração da versão de produção.
- Math.js e Nerdamer para cálculos numéricos e simbólicos.
- uPlot e KaTeX para gráficos e notação matemática.
- Vitest para testes automatizados.
