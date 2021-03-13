# Desafio Toro Desenvolvedor Full-Stack e Backend

*Candidato: Vinicius Cardoso Bandeira*

## Notas

Apesar da minha fluência ser em C#, optei por fazer o desafio em Node com Typescript pois, pelo que percebi na entrevista, hoje é onde existe a maior demanda. Optei por implementar a *User Story* TORO-003. Implementei um pouco das outras histórias no domínio, porém não prossegui com testes ou integrações por questões de tempo.

Optei por seguir o modelo clássico de camadas do DDD, dividindo as responsabilidades em camadas de *Controller*, *Service*, *Domain*, e uma de Infraestrutura suportando as demais.

É possível executar o projeto localmente usando o comando `npm run buildAndRun`, porém também incluí na solução um *Docker Compose* que inicia dois containers (um para API e outro para o Banco de dados) onde é possível testar a solução de forma mais simples. O arquivo de configuração do *Docker* para a API está usando o modelo de *multi-stage build*, com a intenção de reduzir o tamanho do container final.

As configurações para acesso ao banco de dados são feitas através de varíaveis de ambiente, configuradas no arquivo de configuração do *Docker Compose*. Para execução local é necessário configurar as variáveis de ambiente. Incluí um arquivo `.env` (apesar de normalmente ser excluído via `.gitignore`) para ser usado como referência caso desejem executar localmente.

O container do banco usa o arquivo `/resources/docker/database/init.sql` como base para criação do banco de dados, suas tabelas, e um seed inicial com os dados do exemplo descrito no enunciado do desafio. Caso sejam feitas alterações no mesmo, é necessário refazer o *build* do *Docker Compose* (preferencialmente sem usar cache) para que o mesmo seja copiado para dentro do container e executado ao iniciar o mesmo.

Também implementei uma rota simples (`/healthcheck`) para uso pelo time de operações em cenários onde a aplicação é executada em algum orquestrador de containers, como o *Kubernetes*. Ficou pendente a implementação de uma rota `/readiness` para fazer com que o serviço seja integrado ao *Load balancer* nesse tipo de cenário. Nessa rota ausente seria necessário testar a conexão com o banco de dados (em alguns casos um simples *ping* no servidor do banco já resolveria) para informar ao orquestrador que o serviço está pronto para responder.

Peço desculpas por algumas falhas no código. Vários pontos no código podem ser melhorados, como a redução de códigos duplicados e a implementação de testes de integração (fiz apenas os de unidade), porém tive pouco tempo para conseguir atuar nesse desafio por problemas profissionais e pessoais. 

## Rodando o projeto

Como citado anteriormente, recomendo a execução via *Docker Compose* por sua simplicidade. Para iniciar, basta navegar até a raiz do projeto e executar o comando: `docker-compose up`. Na primeira execução todo o processo de construção será executado e isso pode levar alguns minutos. Porém as execuções seguintes são mais rápidas.

Para testar a *User Story* escolhida basta efetuar a chamada de acordo com o modelo:

```http
POST http://localhost:3000/sbp/events HTTP/1.1
Content-Type: application/json

{
    "event": "TRANSFER",
    "target": {
        "bank": "352", 
        "branch": "0001", 
        "account": "300123"
    },
    "origin": {
        "bank": "033", 
        "branch": "03312", 
        "cpf": "45358996060" 
    },
    "amount": 1000
}
```

A tabela abaixo mostra os retornos esperados dessa rota:

Código | Resultado | Causa
---|---|---
200 | Depósito realizado sem problemas | 
400 | Erro na requisição do depósito | Algum erro relacionado ao objeto de depósito enviado.
422 | Entidade não processável | O objeto de depósito não possui erros estruturais ou de valor, porém existe alguma regra do domínio de negócio que gerou um erro (Ex.: CPF informado é diferente do CPF do usuárioda conta).
500 | Erro interno no servidor | Algum problema ocorreu não ligado a negócio. Perda de conexão com banco, falha na infraestrutura do serviço, ou algum erro de codificação.
