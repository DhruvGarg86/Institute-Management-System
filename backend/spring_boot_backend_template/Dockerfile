# ✅ Step 1: Use Java 21 base image
FROM openjdk:21-jdk-slim

# ✅ Step 2: Set the working directory inside the container
WORKDIR /app

# ✅ Step 3: Accept a build argument pointing to the JAR file
ARG JAR_FILE=target/*.jar

# ✅ Step 4: Copy the compiled JAR from the host to the container
COPY ${JAR_FILE} app.jar

# ✅ Step 5: Expose port 8080 (used for Spring Boot)
EXPOSE 8080

# ✅ Step 6: Command to run the JAR when the container starts
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
