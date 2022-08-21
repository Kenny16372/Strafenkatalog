# build React app
FROM node:current-alpine AS build_react

WORKDIR /app

COPY /frontend/package.json /frontend/package-lock.json ./
RUN npm install

COPY ./frontend .
RUN npm run build

# build Spring Boot app
FROM amazoncorretto:18-alpine AS build_spring

WORKDIR /backend

# copy spring files
COPY ./backend/ .
# copy react app
COPY --from=build_react /app/build /frontend/build

RUN chmod +x ./mvnw

RUN ./mvnw package

FROM amazoncorretto:18-alpine

WORKDIR /strafenkatalog

COPY --from=build_spring /backend/target/fcbbackend-0.0.1-SNAPSHOT.jar strafenkatalog.jar

EXPOSE 80

ENTRYPOINT ["java", "-jar", "/strafenkatalog/strafenkatalog.jar"]