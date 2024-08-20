#!/bin/bash

# All my attempts to combine the commands into a single command failed; evidently I am cringe at bash scripting.

set -euxo pipefail

# furink
docker exec -it furink-postgres-1 psql -U postgres -c "CREATE DATABASE furink;"
docker exec -it furink-postgres-1 psql -U postgres -c "CREATE USER furink WITH ENCRYPTED PASSWORD 'password';"
docker exec -it furink-postgres-1 psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE furink TO furink;"
docker exec -it furink-postgres-1 psql -U postgres -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO furink;"
docker exec -it furink-postgres-1 psql -U postgres -c "ALTER USER furink CREATEDB;"

# gorse database
docker exec -it furink-postgres-1 psql -U postgres -c "CREATE DATABASE gorse;"
docker exec -it furink-postgres-1 psql -U postgres -c "CREATE USER gorse WITH ENCRYPTED PASSWORD 'password';"
docker exec -it furink-postgres-1 psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE gorse TO gorse;"
