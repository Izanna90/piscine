package models

import (
	"errors"
	"soulConnection/db"
	"soulConnection/utils"
)

type User struct {
	ID         int64
	Name       string `binding:"required"`
	Surname    string `binding:"required"`
	Email      string `binding:"required"`
	Password   string `binding:"required"`
	Birth_date string `binding:"required"`
	Gender     string `binding:"required"`
	Work       string `binding:"required"`
}

func (u User) Save() error {
	query := "INSERT INTO employees(name, surname, email, password, birth_date, gender, work) VALUES (?, ?, ?, ?, ?, ?, ?)"
	stmt, err := db.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()
	hashPassword, err := utils.HashPassword(u.Password)

	if err != nil {
		return err
	}

	result, err := stmt.Exec(u.Name, u.Surname, u.Email, hashPassword, u.Birth_date, u.Gender, u.Work)
	if err != nil {
		return err
	}
	userId, err := result.LastInsertId()

	u.ID = userId
	return err
}

func (u User) ValidateCredentials() error {
	query := "SELECT id, password FROM employees WHERE email = ?"
	row := db.DB.QueryRow(query, u.Email)

	var retrievedPassword string
	err := row.Scan(&u.ID, &retrievedPassword)
	if err != nil {
		return err
	}

	passwordIsValid := utils.CheckPasswordHash(u.Password, retrievedPassword)
	if !passwordIsValid {
		return errors.New("credentials invalid")
	}
	return nil
}
