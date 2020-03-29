FROM mysql

ENV MYSQL_DATABASE schoolbell
ENV MYSQL_USER root
ENV DATABASE_HOST localhost

EXPOSE 3306

COPY ./sql-script /docker-entrypoint-initdb.d/
