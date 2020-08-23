## Front

### Inicialização com Docker

##### Requístos:
1. Docker engine;
2. docker-compose;
3. porta 8080/tcp disponível;

##### Passo a passo:
1. criar o arquivo '.env' a partir do '.env.example';
2. executar `docker-compose up`;

Quick? `cat .env.example > .env && sudo docker-compose up`;

A aplicação estará diponível em: http://lolcahost:8080/
___
### Inicialização no manual

##### Requístos:

1. node >= 8.9;
2. porta 8080/tcp disponível;

##### Passo a passo:

1. criar o arquivo '.env' a partir do '.env.example';
2. executar `npm i -g yarn`;
3. executar `yarn`;
4. executar `yarn start`;

Quick? `cat .env.example > .env && npm i -g yarn && yarn && yarn start`;
