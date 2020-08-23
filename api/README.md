## API
###Inicialização com Docker
#####Requístos:
1. Docker engine;
2. docker-compose;
3. porta 3000/tcp disponível;

#####Passo a passo:
1. criar o arquivo '.env' a partir do '.env.example';
2. executar `docker-compose up`;

Quick? `cat .env.example > .env && sudo docker-compose up`

A aplicação estará diponível em: http://lolcahost:3000/

---
###Inicialização manual
#####Requístos:
1. node >= 8.9;
2. servidor postgres local ou remoto;
3. porta 3000/tcp disponível;

#####Passo a passo:
1. criar o arquivo '.env' a partir do '.env.example';
2. executar `npm i -g yarn`;
3. executar `yarn`;
4. executar `yarn sequelize db:migrate`;
5. executar `yarn sequelize db:seed`;
6. executar `yarn build`;
7. executar `yarn start`;
___

## TESTES
###Testes com Docker
#####Requístos:
1. Docker engine;
2. docker-compose;

#####Passo a passo:
1. criar o arquivo '.env' a partir do '.env.example';
2. executar `docker-compose -f test.docker-compose.yml up`;

Quick? `cat .env.example > .env && sudo docker-compose -f test.docker-compose.yml up`

---
###Testes manual
#####Requístos:
1. node >= 8.9;
2. servidor temporário postgres local ou remoto;

#####Passo a passo:
1. criar o arquivo '.env' a partir do '.env.example';
2. executar `npm i -g yarn`;
3. executar `yarn`;
4. executar `yarn sequelize db:migrate`;
5. executar `yarn sequelize db:seed`;
6. executar `yarn jest`;
