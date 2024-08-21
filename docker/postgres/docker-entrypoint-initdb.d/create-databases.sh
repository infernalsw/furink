#!/bin/bash

# Runs during postgres init
# https://hub.docker.com/_/postgres

set -eu

# Inspired by https://github.com/MartinKaburu/docker-postgresql-multiple-databases/blob/master/create-multiple-postgresql-databases.sh
function create_user_and_database() {
	local database=$(echo $1)
	local owner=$(echo $2)
	local password=$(echo $3)

	echo "	Checking if user $owner exists..."
	psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
		SELECT 1 FROM pg_user WHERE usename = '$owner';
	EOSQL

	if [[ $? -eq 0 ]]; then
		echo "  Creating user and database '$database'"
		psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
			      CREATE USER $owner WITH ENCRYPTED PASSWORD '$password';
			      CREATE DATABASE $database;
			      GRANT ALL PRIVILEGES ON DATABASE $database TO $owner;
						\c $database
						GRANT ALL ON SCHEMA public TO $owner;
		EOSQL
	fi
}

function create_schema_for_database_and_user() {
	local schema=$(echo $1)
	local database=$(echo $2)
	local owner=$(echo $3)

	echo "  Creating schema '$schema'"
		psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
					\c $database
					CREATE SCHEMA IF NOT EXISTS $schema AUTHORIZATION $owner;
					GRANT ALL ON SCHEMA $schema TO $owner;
		EOSQL
}

create_user_and_database $FURINK_DB $FURINK_USER $FURINK_PASSWORD
create_user_and_database $GORSE_DB $GORSE_USER $GORSE_PASSWORD
create_user_and_database $AUTH_DB $AUTH_USER $AUTH_PASSWORD
create_schema_for_database_and_user $AUTH_SCHEMA $AUTH_DB $AUTH_USER