package routes

import (
	"fmt"
	"net/http"
	"soulConnection/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func getEmployees(context *gin.Context) {
	employees, err := models.GetEmployeesInfo()
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not fetch event"})
		fmt.Println(err)
		return
	}
	context.JSON(http.StatusOK, employees)
}

func getEmployee(context *gin.Context) {
	employeeID, err := strconv.ParseInt(context.Param("id"), 10, 64)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not fetch ID"})
		fmt.Println(err)
		return
	}

	employees, err := models.GetEmployeeInfo(employeeID)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not fetch event"})
		fmt.Println(err)
		return
	}
	context.JSON(http.StatusOK, employees)
}

func getEmployeePic(context *gin.Context) {
	employeeID, err := strconv.ParseInt(context.Param("id"), 10, 64)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not fetch ID"})
		fmt.Println(err)
		return
	}

	employees, err := models.GetEmployeePic(employeeID)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not fetch event"})
		fmt.Println(err)
		return
	}
	context.JSON(http.StatusOK, employees)
}

func getMe(context *gin.Context) {
	if ConnectedUser == -1 {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "User must be connected"})
		return
	}
	employees, err := models.GetEmployeeInfo(ConnectedUser)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not fetch event"})
		fmt.Println(err)
		return
	}
	context.JSON(http.StatusOK, employees)
}
