package routes

import (
	"encoding/json"
	"fmt"
	"net/http"
	"soulConnection/db"
	"soulConnection/models"
	"soulConnection/utils"

	"github.com/gin-gonic/gin"
)

var ConnectedUser int64 = -1

func signup(context *gin.Context) {
	var user models.User
	err := context.ShouldBindJSON(&user) // put the receive data from the POST to event

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "could not parse"})
		return
	}

	err = user.Save()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "could not save user"})
		fmt.Println(err)
		return
	}
	context.JSON(http.StatusOK, gin.H{"message": "user create successfully"})
}

func login(context *gin.Context) {
	var user models.User
	context.ShouldBindJSON(&user)

	payload := map[string]string{
		"email":    user.Email,
		"password": user.Password,
	}
	jsonPayload, _ := json.Marshal(payload)
	status, resp := db.ApiCall("POST", "https://soul-connection.fr/api/employees/login", jsonPayload, true)

	if status == http.StatusOK {
		var body map[string]interface{}
		json.NewDecoder(resp).Decode(&body)
		accessToken, _ := body["access_token"].(string)
		db.CurrentToken = accessToken
		context.JSON(http.StatusOK, gin.H{"message": "user connected", "token": accessToken})
		if ConnectedUser == -1 {
			status, resp = db.ApiCall("GET", "https://soul-connection.fr/api/employees/me", nil, false)
			json.NewDecoder(resp).Decode(&body)
			if status != http.StatusOK {
				fmt.Println(status)
				return
			}
			ConnectedUser = int64(body["id"].(float64))
			fmt.Println("ConnectedUser == ", ConnectedUser)
		}
		return
	}
	ConnectedUser, err := models.GetEmployeeID(user.Email)

	if err != nil {
		fmt.Println(err)
		return
	}

	err = user.ValidateCredentials()
	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "could not authenticate user"})
		return
	}
	token, err := utils.GenerateToken(user.Email, user.ID)
	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "could not authenticate user"})
		return
	}
	fmt.Println(ConnectedUser)
	ConnectedUser, err = models.GetEmployeeID(user.Email)

	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "could not authenticate user"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "user connected", "token": token})
}
