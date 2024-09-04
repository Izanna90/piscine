package models

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"soulConnection/db"

	"database/sql"
)

type Employee struct {
	ID         int64
	Name       string `binding:"required"`
	Surname    string `binding:"required"`
	Email      string `binding:"required"`
	Password   string `binding:"required"`
	Birth_date string `binding:"required"`
	Gender     string `binding:"required"`
	Work       string `binding:"required"`
	Picture    string
}

var employees = []Employee{}

func (e Employee) Save() error {
	query := `INSERT INTO employees (name, surname, email, password, birth_date, gender, work) VALUES (?, ?, ?, ?, ?, ?, ?)`
	stmt, err := db.DB.Prepare(query)
	if err != nil {
		return err
	}

	defer stmt.Close()

	result, err := stmt.Exec(e.Name, e.Surname, e.Email, e.Password, e.Birth_date, e.Gender, e.Work)

	if err != nil {
		return err
	}

	e.ID, err = result.LastInsertId()
	fmt.Println("e.ID == ", e.ID)
	employees = append(employees, e)
	return err
}

func GetEmployeesInfo() ([]Employee, error) {
	// var tmp Employee
	sratus, body := db.ApiCall("GET", "https://soul-connection.fr/api/employees", nil, false)
	if sratus == http.StatusOK {
		var tmp []Employee
		json.NewDecoder(body).Decode(&tmp)
		fmt.Println("tmp == ", tmp)
		for _, temp := range tmp {
			var e = Employee{
				ID:         temp.ID,
				Name:       temp.Name,
				Surname:    temp.Surname,
				Email:      temp.Email,
				Password:   "",
				Birth_date: "",
				Gender:     "",
				Work:       "",
			}
			insertQuery := `INSERT INTO employees (id, name, surname, email, birth_date, gender, work, password, picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
			_, err := db.DB.Exec(insertQuery, e.ID, e.Name, e.Surname, e.Email, e.Birth_date, e.Gender, e.Work, e.Password, "")
			if err != nil {
				updateQuery := `UPDATE employees SET name = ?, surname = ?, email = ? WHERE id = ?`
				_, err = db.DB.Exec(updateQuery, e.Name, e.Surname, e.Email, e.ID)
				if err != nil {
					return nil, err
				}
			}
		}
	}

	query := `SELECT * FROM employees`
	rows, err := db.DB.Query(query)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		var e Employee
		err = rows.Scan(&e.ID, &e.Name, &e.Surname, &e.Email, &e.Password, &e.Birth_date, &e.Gender, &e.Work, &e.Picture)
		if err != nil {
			return nil, err
		}

		employees = append(employees, e)
	}

	return employees, nil
}

func GetEmployeeInfo(employeeID int64) (*Employee, error) {
	tmp := Employee{}
	sratus, resp := db.ApiCall("GET", "https://soul-connection.fr/api/employees/"+fmt.Sprint(employeeID), nil, false)
	json.NewDecoder(resp).Decode(&tmp)
	if sratus != http.StatusOK {
		return nil, fmt.Errorf("could not get employee info")
	}
	fmt.Println("tmp == ", tmp)

	insertQuery := `INSERT INTO employees (id, name, surname, email, birth_date, gender, work, password, picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
	_, err := db.DB.Exec(insertQuery, tmp.ID, tmp.Name, tmp.Surname, tmp.Email, tmp.Birth_date, tmp.Gender, tmp.Work, tmp.Password, "")
	if err != nil {
		updateQuery := `UPDATE employees SET name = ?, surname = ?, email = ?, birth_date = ?, gender = ?, work = ? WHERE id = ?`
		_, err = db.DB.Exec(updateQuery, tmp.Name, tmp.Surname, tmp.Email, tmp.Birth_date, tmp.Gender, tmp.Work, tmp.ID)
		if err != nil {
			return nil, err
		}
	}

	query := `SELECT * FROM employees WHERE id = ?`
	row := db.DB.QueryRow(query, employeeID)

	var e Employee
	err = row.Scan(&e.ID, &e.Name, &e.Surname, &e.Email, &e.Password, &e.Birth_date, &e.Gender, &e.Work, &e.Picture)
	if err == sql.ErrNoRows {
		return nil, fmt.Errorf("no employee found with ID %d", employeeID)
	} else if err != nil {
		return nil, err
	}

	return &e, nil
}

func GetEmployeePic(employeeID int64) (*Employee, error) {
	status, resp := db.ApiCall("GET", "https://soul-connection.fr/api/employees/"+fmt.Sprint(employeeID)+"/image", nil, false)
	if status != http.StatusOK {
		return nil, fmt.Errorf("could not get employee info")
	}
	fileName := "picture/employee" + fmt.Sprint(employeeID) + ".png"
	file, err := os.Create(fileName)
	if err != nil {
		return nil, fmt.Errorf("failed to create file: %v", err)
	}
	defer file.Close()

	_, err = io.Copy(file, resp)
	if err != nil {
		return nil, fmt.Errorf("failed to write image to file: %v", err)
	}
	tmp := Employee{}
	insertQuery := `INSERT INTO employees (id, name, surname, email, picture) VALUES (?, ?, ?, ?, ?)`
	_, err = db.DB.Exec(insertQuery, employeeID, tmp.Name, tmp.Surname, tmp.Email, fileName)
	if err != nil {
		updateQuery := `UPDATE employees SET picture = ? WHERE id = ?`
		_, err = db.DB.Exec(updateQuery, fileName, employeeID)
		if err != nil {
			return nil, err
		}
	}

	query := `SELECT * FROM employees WHERE id = ?`
	row := db.DB.QueryRow(query, employeeID)

	var e Employee
	err = row.Scan(&e.ID, &e.Name, &e.Surname, &e.Email, &e.Password, &e.Birth_date, &e.Gender, &e.Work, &e.Picture)
	if err == sql.ErrNoRows {
		return nil, fmt.Errorf("no employee found with ID %d", employeeID)
	} else if err != nil {
		return nil, err
	}

	return &e, nil
}

func GetEmployeeID(employeeEmail string) (int64, error) {
	query := `SELECT id FROM employees WHERE email = ?`
	row := db.DB.QueryRow(query, employeeEmail)

	var e Employee
	err := row.Scan(&e.ID)
	if err == sql.ErrNoRows {
		return -1, fmt.Errorf("no employee found with email %s", employeeEmail)
	} else if err != nil {
		return -1, err
	}

	return e.ID, nil
}
