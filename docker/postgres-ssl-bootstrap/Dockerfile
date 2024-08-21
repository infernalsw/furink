FROM alpine as builder

RUN apk add --no-cache --update build-base go git && \
    git clone --depth 1 https://github.com/square/certstrap && \
    cd certstrap && \
    go build

FROM alpine as generator

COPY --from=builder /certstrap/certstrap /usr/bin/

RUN addgroup -S -g 70 furink && \
    adduser -u 70 -S -D -h /home/furink -G furink furink && \
    mkdir -p /var/lib/postgresql/furink && \
    chown -R furink:furink /var/lib/postgresql/furink

VOLUME /var/lib/postgresql/furink

USER furink

COPY --chown=furink:furink scripts/ssl.sh /run.sh

RUN chmod +x /run.sh

WORKDIR /home/furink

ENTRYPOINT ["/run.sh"]
