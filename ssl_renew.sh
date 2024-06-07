#!/bin/bash

COMPOSE="/usr/local/bin/docker-compose --ansi never -f docker-compose.prod.yml"
DOCKER="/usr/bin/docker"

cd /var/www/crypto-bot-tg/
ls -la
echo "-------------------------------------------------------------------------------------"
$COMPOSE run certbot renew --dry-run && $COMPOSE kill -s SIGHUP nginx
$DOCKER system prune -af