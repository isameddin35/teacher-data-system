# ===== Stage 1: Build =====
FROM eclipse-temurin:23-jdk AS build

WORKDIR /app

# Copy Maven wrapper & config (for caching)
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Make mvnw executable
RUN chmod +x mvnw

# Download dependencies (caches this layer)
RUN ./mvnw dependency:go-offline -B

# Copy the rest of the source code
COPY src src

# Build the JAR (skip tests for speed, remove -DskipTests if you want them)
RUN ./mvnw clean package -DskipTests

# ===== Stage 2: Run =====
FROM eclipse-temurin:23-jdk

WORKDIR /app

# Copy JAR from build stage (Spring Boot creates a fat JAR under target/)
COPY --from=build /app/target/*.jar app.jar

# Let Render/Heroku/etc set PORT, fallback to 8080
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
