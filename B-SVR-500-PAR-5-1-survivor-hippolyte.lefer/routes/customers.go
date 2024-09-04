package routes

import (
	"fmt"
	"net/http"
	"soulConnection/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func getCustomers(context *gin.Context) {
	customer, err := models.GetCustomersInfo()
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not fetch event"})
		return
	}
	context.JSON(http.StatusOK, customer)
}

func getCustomer(context *gin.Context) {
	customerID, err := strconv.ParseInt(context.Param("id"), 10, 64)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not fetch ID"})
		fmt.Println(err)
		return
	}

	customer, err := models.GetCustomerInfo(customerID)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not fetch event"})
		return
	}
	context.JSON(http.StatusOK, customer)
}

func getCustomerPaymentsHistory(context *gin.Context) {
	paymentID, err := strconv.ParseInt(context.Param("id"), 10, 64)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not fetch ID"})
		fmt.Println(err)
		return
	}

	customer, err := models.GetCustomerPaymentsInfo(paymentID)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not fetch event"})
		return
	}
	context.JSON(http.StatusOK, customer)
}
