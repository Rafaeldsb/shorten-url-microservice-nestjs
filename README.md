# Encurtador de Url

## Descrição<a name="descricao"></a>
Projeto em node para encurtar URL e redirecionar para a URL original.
Feito e arquiteturado para rodar em um ecosistema de microserviços.

> Ainda em desenvolvimento.
> Para versão mais completa feita em express + mongodb,
> confira: https://github.com/Rafaeldsb/encurtador-url-node

## Tecnologias<a name="tecnologias"></a>
#### Runtime
  * Node 14
  * Express
  * Nestjs
  * Postgres
  * Cache in-memory

## Fluxo
![Flow](docs/imgs/flow.png)

## Como rodar

```sh
docker-compose up -d
docker-compose exec app yarn test:cov
```