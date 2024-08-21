#!/bin/sh

set -e
set -u

if [ ! -d "/var/lib/postgresql/furink/certs" ]; then
    echo "certs do not exist, creating"

    set -x

    # gen certs for postgres ssl
    certstrap init --common-name furink --passphrase furink
    certstrap request-cert --common-name postgres --domain localhost --passphrase ""
    certstrap sign postgres --CA furink --passphrase furink

    mkdir -p /var/lib/postgresql/furink/certs
    chown furink:furink /var/lib/postgresql/furink/certs
    # doesn't copy unless we have execute for w/e reason
    cp out/postgres.* /var/lib/postgresql/furink/certs/
    cp out/furink.* /var/lib/postgresql/furink/certs/
    chmod 700 -R /var/lib/postgresql/furink/certs

    set +x
fi

exit 0
