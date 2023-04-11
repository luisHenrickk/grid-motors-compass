<h1>Grid Motors Compass</h1>

> Status: Finished ✅

### This is an API planned by Compass UOL and implemented by me. Its purpose is to make requests to manage cars and their reservations by users.

## Fields in User:

- name: string
- cpf: string
- birth: Date
- email: string;
- password: string;
- cep: string;
- qualified: string;
- patio: string;
- complement: string;
- neighborhood: string;
- locality: string;
- uf: string;

## Fields in Car:

- model: string;
- color: string;
- year: string;
- value_per_day: number;
- accessories: { description: string }[];
- number_of_passengers: number;

## Fields in Reserve:

- model: string;
- color: string;
- year: string;
- value_per_day: number;
- accessories: { description: string }[];
- number_of_passengers: number;

## Installations:

1. [Download NodeJS](https://nodejs.org/en/)

2. Clone repository

3. Install node folder in project:

4. Create the config.env file as per the provided example

5. Run in terminal:

```bash
$ npm install
```

## Run the application:

```bash
$ npm start
```

## Use the application:

1. [Download Postman](https://www.postman.com/downloads/)

### Get all cars:

Choose GET route on Postman and use route /api/v1/car and click on Send

### Get car by id:

Choose GET route on Postman and use route /api/v1/car/(enter id here) and click on Send

### Delete car by id:

Choose DELETE route on Postman and use route /api/v1/car/(enter id here) and click on Send

### Create car:

Choose POST route on Postman and use route /api/v1/car/ and click on Send

```bash
// Exemplo de JSON
{
  "model": "Fiesta",
  "color": "Azul",
  "year": "2021",
  "value_per_day": 100.0,
  "accessories": [
    {
      "description": "Ar-condicionado"
    },
    {
      "description": "Direção hidráulica"
    }
  ],
  "number_of_passengers": 5
}
```

### Update car:

Choose PUT route on Postman and use route /api/v1/car/(enter id here) and click on Send

```bash
// Exemplo de JSON
{
  "color": "Branco",
  "value_per_day": 150.0,
}
```

### Add or remove accessory:

Choose PATCH route on Postman and use route /api/v1/car/(car id)/accessories/(accessory id) and click on Send

```bash
// Exemplo de JSON
{
  "description": "Tração traseira",
}
```

### Get all users:

Choose GET route on Postman and use route /api/v1/user and click on Send

### Get user by id:

Choose GET route on Postman and use route /api/v1/user/(enter id here) and click on Send

### Delete user by id:

Choose DELETE route on Postman and use route /api/v1/user/(enter id here) and click on Send

### Create user:

Choose POST route on Postman and use route /api/v1/user/ and click on Send

```bash
// Exemplo de JSON
{
  "name": "João Silva",
  "cpf": "123.456.789-10",
  "birth": "1990-01-01",
  "email": "joao.silva@example.com",
  "password": "senha123",
  "cep": "12345-678",
  "qualified": "sim",
}
```

### Update user:

Choose PATCH route on Postman and use route /api/v1/user/(enter id here) and click on Send

```bash
// Exemplo de JSON
{
  "name": "João Paulo Silva",
}
```

### Get all reserves:

Choose GET route on Postman and use route /api/v1/reserve and click on Send

### Get reserve by id:

Choose GET route on Postman and use route /api/v1/reserve/(enter id here) and click on Send

### Delete reserve by id:

Escolher Rota DELETE no Postman e utilizar a rota /api/v1/reserve/(informar o id aqui) e clicar no Send

### Create reserve:

Choose POST route on Postman and use route /api/v1/reserve/ and click on Send

```bash
// Exemplo de JSON
{
  "start_date": "2023-03-15",
  "end_date": "2023-03-18",
  "id_car": "64336281d524af3c6c1acbfa",
}
```

### Update reserve:

Choose PUT route on Postman and use route /api/v1/reserve/(enter id here) and click on Send

```bash
// Exemplo de JSON
{
  "end_date": "2023-03-20",
}
```

### Fazer login:

Choose POST route on Postman and use route /api/v1/authenticate/ and click on Send

```bash
// Exemplo de JSON
{
"email": "rick.ufms@gmail.com"
"password": "1234567"
}
```

## Swagger:

1. Run the application
2. Open your browser and enter the link: http://localhost:3000/api-docs/
