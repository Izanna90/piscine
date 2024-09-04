package db

import (
	"bytes"
	"io"
	"net/http"
	"os"
)

var CurrentToken string

func ApiCall(rest string, url string, jsonPayload []byte, login bool) (int, io.ReadCloser) {
	api_token := os.Getenv("API_KEY")
	req, _ := http.NewRequest(rest, url, bytes.NewBuffer(jsonPayload))
	req.Header.Set("X-Group-Authorization", api_token)
	if !login {
		req.Header.Add("Authorization", "Bearer "+CurrentToken)
	}
	client := &http.Client{}
	resp, _ := client.Do(req)
	if resp.StatusCode == http.StatusOK {
		return http.StatusOK, resp.Body
	}
	return resp.StatusCode, nil
}
