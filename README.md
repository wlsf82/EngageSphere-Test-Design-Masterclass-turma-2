# EngageSphere Automation Tests 

### Test suite

* ✔️ Cypress, usado para a escrita e execução dos testes GUI, API e componentes.
* ✔️ Axe, usado para criar e rodar a automação de testes de acessibilidade.
* ✔️ Test retry, para repetir testes que falharem e evienciar testes "flaky".

### Qualidade de código
* ✔️ ESLint, para evitar erros no padrão do código e garantir uma boa qualidade do mesmo.

### CI/CD
* ✔️ [GitHub Actions](https://github.com/thaydutra/test-design-masterclass/actions), para acionar uma pipeline a cada push, essa pipeline executa os testes automatizados com Cypress e também o ESlint para garantir testes funcionando e um código de qualidade.

## 💻 Pré-requisitos para rodar o projeto na sua maquina

* Ter instalado uma IDE de sua preferencia, nesse projeto utilizamos o VS Code que pode ser encontrado [aqui](https://code.visualstudio.com/).
* Node.js `v20.+`
* git `v2.+`
* npm `v10.+`

**Note:** When installing Node.js, npm is automatically installed too.

## Cenários de teste

Os testes estão documentados [aqui](./docs/TestCases.md), você pode conferir os cenários sempre que precisar.

## ⚙️ Rodando o projeto na sua maquina

Inicialmente, você deve clonar o projeto para sua máquina, caso tenha dúvidas de como fazer você pode seguir o passo a passo para clonagem via IDE VS Code [aqui](https://learn.microsoft.com/pt-br/azure/developer/javascript/how-to/with-visual-studio-code/clone-github-repository?tabs=create-repo-command-palette%2Cinitialize-repo-activity-bar%2Ccreate-branch-command-palette%2Ccommit-changes-command-palette%2Cpush-command-palette).

Link para clonagem do projeto:
```
git clone https://github.com/thaydutra/test-design-masterclass
```

Após clonar o repositório para sua máquina você deverá instalar as dependencias do projeto executando o comando abaixo no seu terminal:
```
npm install
```

Agora devemos instalar e executar o servidor do frontend:
```
npm run install:frontend
```
```
npm run start:frontend
```

E também instalar e executar o servidor do backend:
```
npm run install:backend
```
```
npm run start:backend
```

Para executar os testes automatizados em modo headless, você pode executar o comando abaixo no terminal para executar testes de GUI e API:
```
npm run cy:run
```

Para executar os testes automatizados em modo headless, você pode executar o comando abaixo no terminal para executar testes de componente:
```
npm run component:run
```

Para executar os testes  automatizados em modo headed em um navegador, você pode executar o comando abaixo no terminal, selecionar E2E testing para testes de API e GUI, ou Component para os testes de componente:
```
npm run cy:open
```

Ao finalizar, todos os testes devem ter sido realizados sem falhas.


## 💬 Comentários do autor

* Este projeto conta com a execução via pipeline GitHub Actions, que é executada a cada commit e pode ter suas execuções visualizadas [aqui](https://github.com/thaydutra/test-design-masterclass/actions).