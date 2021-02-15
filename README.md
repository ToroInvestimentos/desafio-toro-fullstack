# Desafio Toro Desenvolvedor Full-Stack e Backend

Bem-vindo ao desafio de programação da Toro Investimentos.

## Histórias de Usuário

Considere as seguintes User Stories:


`TORO-001` - Eu, como investidor, gostaria de poder depositar um valor na minha conta Toro, através de PiX ou TED bancária, para que eu possa realizar investimentos.


`TORO-002` - Eu, como investidor, gostaria de ter acesso a uma lista de 5 ações mais negociadas nos últimos 7 dias, com seus respectivos preços, para que eu possa escolher uma delas e comprar a quantidade que eu escolher, respeitando o limite de saldo disponível na minha conta Toro, para que assim eu consiga possa montar minha carteira de investimentos.

`TORO-003` - Eu, como investidor, gostaria de visualizar meu saldo, meus investimentos e meu patrimônio total na Toro.

### Restrições

Para a US `TORO-001`, considere as seguintes restrições:

- A Toro já participa do Sistema Brasileiro de Pagamentos (SPB) do Banco Central, e está integrado a ele. Isto significa que a Toro tem um número de banco (352), cada cliente tem um número único de conta na Toro, e que toda transferência entre bancos passa pelo SBP do Banco Central, e quando a transferência é identificada como tendo o destino o banco Toro (352), uma requisição HTTP é enviada pelo Banco Central notificando tal evento. O formato desta notificação segue o padrão REST + JSON a seguir (hipotético para efeito de simplificação do desafio):

```jsonc
POST <apiBaseUrl>/spb/events

{
   "event": "TRANSFER",
   "target": {
      "bank": "352", // Banco Toro
      "branch": "0001", // Única agenda, sempre 0001
      "account": "300123", // Conta do usuário na Toro (unica por usuário)
   },
   "origin": {
      "bank": "033", // Banco de origem 
      "branch": "03312", // Agencia de origem
      "cpf": "45358996060" // CPF do remetente
   },
   "amount": 1000, // R$ 1000,00 reais
}

- Outra restrição é que a origem da transferência deve sempre ser do mesmo CPF do usuário na Toro.

```
Para a US `TORO-002`, considere as seguintes restrições:
 
 - Para efeito de simplificação do desafio, as 5 ações mais negociadas nos últimos 7 dias e seus respectivos preços não precisa ser "real", pode ser definida utilizando algum recurso pre-definido no backend (uma coleção predefinida no banco de dados ou arquivo JSON).


Para a US `TORO-003`, considere as seguintes restrições:

 - Patrimônio do usuário deve conter as seguintes informações
   - Saldo atualmente em conta corrente
   - Lista de ativos (ações) pertencentes ao usuário, com quantidade de cada ativo e valor individual atual de cada um. (Ex: 10 ações PETR4, valor individual R$25,00)
   - Patrimônio sumarizado (Saldo + Valor totalizado dos ativos)

## IMPORTANTE: O que trazer preparado para o Dia do Desafio

O Desafio Técnico da Toro Investimentos é composto de 2 etapas. A **primeira etapa** você deve fazer em casa e já implementar boa parte do problema, com o tempo que você precisar. A **segunda etapa** você fará online junto com o time da Toro (Techleads e/ou Desenvolvedores), e **deverá trazer a primeira etapa já desenvolvida**.

## O que desenvolver na Primeira Etapa e trazer pronto no dia da Segunta Etapa

O Desafio consiste em transformar as Histórias de Usuário descritas acima por um Product Manager (PM ou PO) em realidade. Você está vivendo um dia a dia real nosso, as histórias acima são inspiradas em histórias reais :-). Você, no papel de Time de Desenvolvimento, tem a liberdade para propor, discutir e implementar da melhor forma possível, buscando entregar o maior valor ao usuário no menor tempo, sem comprometer os requisitos, inclusive de qualidade.

Mas para efeito de direcionar o desafio, vamos te ajudar e propor um caminho para você implementar como parte da primeira etapa e trazer para o dia da segunda etapa.

Se analisarmos o conjunto das US `TORO-001`, `TORO-002` e `TORO-003` tragas pelo nosso PM/PO, podemos já antecipar algumas Entidades necessárias na solução final:

- Uma coleção de Usuários, onde cada usuário tem:
  - um código da conta do usuário no Banco Toro (Para efeito de simplificaçao vc pode optar por usar o codigo da conta como codigo do usuário - chave primária, ou ter códigos separados);
  - um saldo de conta corrente (como não existe o requisito de extrato de conta, etc, vamos simplificar o saldo como num único atributo numérico do usuário que pode ser 0 ou maior 0);
  - Nome e CPF (nao está diretamente descrito no requisito, mas usaremos para identificar usuário na hora da transferencia bancária)
  
- Uma coleção de Ativos de Usuários
  - Ativos adquiridos por um único usuário. Você precisa ter saber quais ativos e quantidade do mesmo ativo que o usuário possui. Não está no requisito saber o "valor de compra" do ativo, apenas o "valor atual", então pode ser ignorado esta informação;

- Uma coleção contendo os "5 ativos mais negociados", e o seu valor atual (estes valores serao fiquitícios, mas deve ser possível alterá-los para efeito de demostração da solução final);


Considerando as Entidades e Coleções de Entidades acima, você precisa implementar o backend e o frontend da solução. Vale lembrar que este desafio é o mesmo para vagas "Backend" ou "FullStack", então você pode optar por trazer pronto para a segunda etapa uma das partes ou as duas a depender da vaga em questão:

### Para a `TORO-001`:

#### Backend:

Trazer pronto as seguintes APIs.


> POST <apiBaseUrl>/spb/events
```jsonc
POST <apiBaseUrl>/spb/events

{
   "event": "TRANSFER",
   "target": {
       "bank": "352", // Banco Toro
       "branch": "0001", // Única agenda, sempre 0001
       "account": "300123", // Conta do usuário na Toro (unica por usuário)
   },
   "origin": {
       "bank": "033", // Banco de origem 
       "branch": "03312", // Agencia de origem
       "cpf": "45358996060" // CPF do remetente
   },
   "amount": 1000, // R$ 1000,00 reais
}
```
Esta API deverá está funcionando e poderá ser chamada para simular um evento de transferência / deposito na conta do usuário. Após o envio deste evento, o saldo do usuário cujo a conta está indicado no "target" deverá ser impactado (somado ao saldo atual). 

De acordo com a "restrição" descrita para esta US, é necessário verificar se o cpf da origem é o mesmo do usuário a receber tal transferência.

#### Frontend:

- Para esta US, basta que exista na UI um lugar onde o usuário veja os dados da conta dele para transferência.


### Para a `TORO-002`:

#### Backend:

> API de 5 ativos mais negocidos
```jsonc
GET <apiBaseUrl>/trends

[
    {
        "symbol": "PETR4",
        "currentPrice": 28.44
    },
    {
        "symbol": "MGLU3",
        "currentPrice": 25.91
    },
    {
        "symbol": "VVAR3",
        "currentPrice": 25.91
    },
    {
        "symbol": "SANB11",
        "currentPrice": 40.77
    },
    {
        "symbol": "TORO4",
        "currentPrice": 115.98
    }

]
```

> API ordem de compra
```jsonc
POST <apiBaseUrl>/order

{
    "symbol": "SANB11",
    "amount": 3
}
```

No exemplo acima o usuário deseja comprar 3 ações `SANB11`. Neste caso, a API deve chegar o valor de `SANB11` naquele momento (no exemplo, R$40.77), verificar se o usuário tem pelo menos R$122.31 disponível em conta corrente e, em caso afirmativo, realizar a compra (debitar o saldo e registrar as novas quantidades de ativos `SANB11` ao cliente). Caso não tenha saldo suficiente, ou o ativo informado seja invalido, a API deve retornar uma codido e uma mensagem de erro indicando "saldo insuficiente" ou "ativo invalido". Esta operação deve impactar o saldo e a lista de ativos do usuário.

#### Fronend:

Para o Frontend, você deve oferecer um fluxo onde o usuário veja lista dos ativos mais negociados, o valor de cada um, e possa clicar em um deles para comprar. Ao clicar, usuário deve informar a quantidade desejada para compra e submeter a ordem. Em caso de sucesso, usuário deve visualizar mensagem de sucesso e seu novo saldo e novas posições de ativos. Em caso de erro (saldo insuficiente) deverá ver msg apropriada.

### Para a `TORO-003`:

#### Backend:

> API de saldo e patrimonio do cliente
```jsonc
GET <apiBaseUrl>/userPosition

{
    "checkingAccountAmount": 234.00, // Saldo em conta corrente
    "positions": [
        {
            "symbol": "PETR4",
            "amount": 2,
            "currentPrice": 28.44,
        },
        {
            "symbol": "SANB11",
            "amount": 3,
            "currentPrice": 40.77
        },
    ],
    "consolidated": 413.19 // (234.00 + (28.44 * 2) + (40.77 * 3)
}
```

Esta api deve mostrar a posição do usuário conforme descrito na US e na respectiva restrição. Os valores retornados por esta API deve ser diretamente impactados e refletir a realidades após as operações realizadas nas APIs anteriores (deposito e compra de ativos).

#### Frontend:

Para o frontend vc deve garantir que o usuário possa visualizar as informações de patrimônio conforme descritas na US e na proposta da API de backend.

Crie um app que implemente as seguintes funcionalidades:
- Permitir que o usuário faça aportes e retiradas na sua conta;
- Permitir a compra e venda de ações, de acordo com a cotação atual, subtraindo e somando do saldo da conta, respectivamente;

As cotações devem ser recebidas a partir do nosso simulador de cotações que pode ser acessado usando docker com o seguinte comando: `docker run -p 8080:8080 toroinvest/quotesmock`. O fluxo de cotações está no endpoint `/quotes`, na porta `8080`.

## Requisitos

- O projeto deve ser publicado em um repositório público no github.com, bitbucket.org ou gitlab.com
- README com instruções de como instalar as dependências do projeto, de como rodar a aplicação e os testes automatizados e de como fazer o deploy
- Deve ser desenvolvido em NodeJS, .Net Core ou Dart
- Front-End deve ser em Flutter ou Angular
- Necessidades diferentes dos requisitos podem (devem) ser negociados previamente.

### Bônus

- Sistema executável rodando hospedado numa conta AWS.
- Backend deployado com Framework Serverless ou AWS SAM, ou rodando em docker-compose;
- Usar o CI/CD da plataforma onde hospedar o código (bitbucket pipelines, gitlab-ci, github actions)

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
