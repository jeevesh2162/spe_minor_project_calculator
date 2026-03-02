FROM eclipse-temurin:17-jre
WORKDIR /app

# The Jenkinsfile builds the jar in calculator-backend/target/
# We copy it into the image.
COPY calculator-backend/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
