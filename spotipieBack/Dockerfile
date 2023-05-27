FROM maven:3.8.4-openjdk-11 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

FROM adoptopenjdk:11-jre-hotspot
WORKDIR /app
COPY --from=builder /app/target/spotipie-app.jar .
EXPOSE 8080
CMD ["java", "-jar", "spotipie-app.jar"]
