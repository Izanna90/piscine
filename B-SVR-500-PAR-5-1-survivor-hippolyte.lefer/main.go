package main

import (
	"soulConnection/db"

	"soulConnection/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	db.InitDB()
	godotenv.Load()
	server := gin.Default()
	server.Use(cors.New(cors.Config{
			AllowOrigins:     []string{"*", "http://localhost:5173", "http://localhost:1"},
			AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
			AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
			AllowCredentials: true,
		}))
	routes.RegisterRoutes(server)


	server.Run(":8080") //localhost:8080
}
