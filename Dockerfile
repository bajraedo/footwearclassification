# Usage
# docker build -t bajraedo/footwearclassification .
# docker run --name footwearclassification -p 8080:8080 -d bajraedo/footwearclassification

FROM openjdk:21-jdk-slim

# Copy Files
WORKDIR /usr/src/app
COPY models models
COPY src src
COPY .mvn .mvn
COPY pom.xml mvnw ./

# Install
RUN chmod +x mvnw
RUN ./mvnw -Dmaven.test.skip=true package

# Docker Run Command
EXPOSE 8080
CMD ["java","-jar","/usr/src/app/target/footwearclassification-0.0.1-SNAPSHOT.jar"]