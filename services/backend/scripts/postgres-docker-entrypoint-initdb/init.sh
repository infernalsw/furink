#!/bin/bash

# Runs during postgres init
# https://hub.docker.com/_/postgres

set -e
set -u

# Inspired by https://github.com/MartinKaburu/docker-postgresql-multiple-databases/blob/master/create-multiple-postgresql-databases.sh
function create_user_and_database() {
	local database=$(echo $1)
	local owner=$(echo $2)
	local password=$(echo $3)

	echo "	Checking if user $owner exists..."
	psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
		SELECT 1 FROM pg_user WHERE  usename = '$owner';
EOSQL

	if [[ $? -eq 0 ]]; then
		echo "  Creating user and database '$database'"
		psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	    		CREATE USER $owner WITH ENCRYPTED PASSWORD '$password';
	    		CREATE DATABASE $database;
	    		GRANT ALL PRIVILEGES ON DATABASE $database TO $owner;
EOSQL
	fi
}


create_user_and_database $GORSE_DB $GORSE_USER $GORSE_PASSWORD