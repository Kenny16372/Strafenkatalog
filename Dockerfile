# build React app
FROM node:current-alpine AS build_react

WORKDIR /app

COPY /frontend/package.json /frontend/package-lock.json ./
RUN npm install

COPY ./frontend .
RUN npm run build

# build Spring Boot app
FROM maven:3-amazoncorretto-17 AS build_spring

WORKDIR /backend

COPY /backend/pom.xml /backend/mvnw ./
#RUN ls -la
#RUN chmod +x ./mvnw
RUN mvn clean package -Dmaven.main.skip -Dmaven.test.skip && rm -r target

# copy spring files
COPY ./backend/ .
# copy react app
COPY --from=build_react /app/build /frontend/build

RUN chmod +x ./mvnw

RUN mvn package

FROM amazoncorretto:17-alpine

WORKDIR /strafenkatalog

COPY --from=build_spring /backend/target/fcbbackend-0.0.1-SNAPSHOT.jar strafenkatalog.jar

EXPOSE 80

ENTRYPOINT ["java", "-jar", "/strafenkatalog/strafenkatalog.jar"]