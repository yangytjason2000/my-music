# cp debug.env .env
cp docker-compose-debug.yml docker-compose.yml
# docker-compose build --build-arg LOCAL_USER_ID=`id -u`  web || exit 1
# docker-compose build --build-arg LOCAL_USER_ID=`id -u`  web-init || exit 1
# docker-compose build --build-arg LOCAL_USER_ID=`id -u`  pgbackups || exit 1
docker-compose down -v
docker image prune -a -f
docker-compose up
