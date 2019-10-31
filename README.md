# Desafio Toro Desenvolvedor Full-Stack

Bem-vindo ao desafio de programação da Toro Investimentos.

## Problema

Crie um app que implemente as seguintes funcionalidades:
- Permitir que o usuário faça aportes e retiradas na sua conta;
- Permitir a compra e venda de ações, de acordo com a cotação atual, subtraindo e somando do saldo da conta, respectivamente;

As cotações devem ser recebidas a partir do nosso simulador de cotações que pode ser acessado usando docker com o seguinte comando: `docker run -p 8080:8080 toroinvestimentos/quotesmock`. O fluxo de cotações está no endpoint `/quotes`, na porta `8080`.

## Requisitos

- O projeto deve ser publicado em um repositório público no github.com, bitbucket.org ou gitlab.com
- README com instruções de como instalar as dependências do projeto, de como rodar a aplicação e os testes automatizados e de como fazer o deploy
- Deve ser desenvolvido em .net core, Python 3 ou node.js
- Front-End deve ser em Flutter ou Angular

### Bônus

- Sistema executável através do docker-compose
- Usar o CI/CD da plataforma onde hospedar o código (bitbucket pipelines, gitlab-ci, github actions)
- Fazer o deploy com Infra as Code
- Usar serviços gerenciados na nuvem da sua escolha

## Critérios de Avaliação

Os seguintes critérios serão usados para avaliar o seu código:
- Legibilidade;
- Escopo;
- Organização do código;
- Padrões de projeto;
- Existência e quantidade de bugs e gambiarras;
- Qualidade e cobertura dos testes;
- Documentação;
- Contexto e cadência dos commits.
- Princípios SOLID e Clean Code
- Aderência aos 12 fatores: https://12factor.net/

## Dúvidas

Caso surjam dúvidas, entre em contato conosco pelo nosso email: desafiotoro@toroinvestimentos.com.br