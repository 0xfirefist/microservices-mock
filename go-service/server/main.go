package main

import (
	"context"
	"fmt"
	pb "greeter-service/greeter-service/greeter"
	"log"
	"net"

	"google.golang.org/grpc"
)

var port = ":8081"

type GreeterServer struct {
}

func (*GreeterServer) SayHello(ctx context.Context, req *pb.HelloRequest) (*pb.HelloReply, error) {
	return &pb.HelloReply{
		WelcomeMessage: fmt.Sprintf("Getting Request From %s", req.Name),
	}, nil
}

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterGreeterServer(s, &GreeterServer{})
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
