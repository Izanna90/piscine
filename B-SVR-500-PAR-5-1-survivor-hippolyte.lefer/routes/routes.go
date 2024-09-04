package routes

import "github.com/gin-gonic/gin"

func RegisterRoutes(server *gin.Engine) {
	server.POST("/api/employees/signup", signup)
	server.POST("/api/employees/login", login)
	server.GET("api/employees", getEmployees)
	server.GET("api/employees/:id", getEmployee)
	server.GET("api/employees/:id/image", getEmployeePic)
	server.GET("api/employees/me", getMe)

	server.GET("api/customers", getCustomers)
	server.GET("api/customers/:id", getCustomer)
	server.GET("api/customers/:id/payments_history", getCustomerPaymentsHistory)

	// server.GET("api/customers", getCustomers)
	// server.POST("api/customers", createCustomer)
	// server.GET("api/customers/:id", getCustomer)
	// server.GET("api/customers/:id/image", getCustomerImage)
	// server.GET("api/customers/:id/clothes", getCustomerClothes)	
	// server.GET("api/enconters", getEnconters)
	// server.POST("api/enconters", createEnconter)
	// server.GET("api/enconters/:id", getEnconter)
	// server.GET("api/enconters/customer/:id", getEncontersByCustomer)
	// server.GET("api/tips", getTips)
	// server.GET("api/events", getEvents)
	// server.GET("api/events/:id", getEvent)
	// server.GET("api/clothes/:id/image", getClotheImage)
	// server.POST("api/clothes", createClothe)
}
