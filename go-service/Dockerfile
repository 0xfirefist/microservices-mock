FROM golang:1.14.7-alpine3.11

# Set the Current Working Directory inside the container
WORKDIR /app
# Copy everything from the current directory to the PWD(Present Working Directory) inside the container
COPY . .

# Install the package
RUN go build server/main.go

# This container exposes port 8080 to the outside world
EXPOSE 8081

# Run the executable
CMD ["./main"]
