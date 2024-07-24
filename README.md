# EngageSphere

Sample project with a [Node.js](https://nodejs.org/) backend and a [React](https://react.dev/) frontend.

## Business rules

Read the following [doc](./docs/Requirements.md) to understand all the EngageSphere application's functionalities.

## Pre-requirements

To run this project, you will need:

- [git](https://git-scm.com/downloads) (I've used version `2.42.1` while writing this doc)
- [Node.js](https://nodejs.org/en/) (I've used version `v20.13.1` while writing this doc)
- npm (I've used version `10.5.2` while writing this doc)

**Note:** When installing Node.js, npm is automatically installed too.

## Installing and starting the servers

Read the following [doc](./docs/TestEnvironment.md) to install and start the backend and frontend servers.

## Installation of `devDependencies`

After cloning this project, to install the dev dependencies, open a terminal, go to the root of this repo, and run `npm install` (or `npm i`, for short.)

## Tests
Principais Mudanças

Configuração inicial do Cypress e integração com os plugins Cypress-API e Cypress-axe.
Criação de testes de API para validar endpoints críticos.
Criação de testes de acessibilidade para identificar e corrigir problemas de acessibilidade.
Documentação atualizada com instruções sobre como rodar os testes.
Como Testar

Clone o repositório e instale as dependências:
 bash
  git clone <repositório>
  cd <repositório>
  npm install
Execute os testes automatizados:
   bash
   npm run cypress:open
   
   ou para rodar em modo headless:
   bash
   npm run cypress:run
Considerações

Certifique-se de revisar os testes adicionados para entender a cobertura e a lógica utilizada.
Verifique a documentação para quaisquer requisitos adicionais ou configurações específicas.
Referências

- Cypress)

Cypress-API
Cypress-axe

Read the following [doc](./docs/TestCases.md) to get a list of test cases.

___

Made with ❤️ by [Walmyr](https://walmyr.dev).
