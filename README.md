# app-mu-playground

### Boot up the system

Boot up the microservices

    docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d
    
Boot up the frontend

    cd frontend-mu-playground && eds --proxy http://host:8899

Restart the dispatcher if necessary

    docker compose restart dispatcher

You can shut down using `docker-compose stop` and remove everything using `docker-compose rm`.
