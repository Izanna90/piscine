package models

import (
	"database/sql"
	"fmt"
	"soulConnection/db"
)

// createEmployeesTable := `
// CREATE TABLE IF NOT EXISTS employees (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL,
//     surname TEXT NOT NULL,
//     email TEXT NOT NULL,
//     birth_date TEXT NOT NULL UNIQUE,
//     gender TEXT NOT NULL UNIQUE,
//     work TEXT NOT NULL UNIQUE
// )

type Customers struct {
	ID                int64
	Email             string `binding:"required"`
	Name              string `binding:"required"`
	Surname           string `binding:"required"`
	Birth_date        string `binding:"required"`
	Gender            string `binding:"required"`
	Description       string `binding:"required"`
	Astrological_sign string `binding:"required"`
	Employee_id       string `binding:"required"`
}

type Payments struct {
	ID            int64
	CustomerId    int64
	Date          string `binding:"required"`
	PaymentMethod string `binding:"required"`
	Amount        string `binding:"required"`
	Comment       string `binding:"required"`
}

var customers = []Customers{}
var paymentHistory = []Payments{}

func (c Customers) Save() error {
	query := `INSERT INTO customers (email, name, surname, birth_date, gender, description, astrological_sign, employee_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
	stmt, err := db.DB.Prepare(query)
	if err != nil {
		return err
	}

	defer stmt.Close()

	result, err := stmt.Exec(c.Email, c.Name, c.Surname, c.Birth_date, c.Gender, c.Description, c.Astrological_sign, c.Employee_id)

	if err != nil {
		return err
	}

	c.ID, err = result.LastInsertId()
	customers = append(customers, c)
	return err
}

func GetCustomersInfo() ([]Customers, error) {
	// sratus, body := db.ApiCall("GET", "https://soul-connection.fr/api/customers", nil, false)
	// if sratus == http.StatusOK {
	// 	var tmp []Customers
	// 	json.NewDecoder(body).Decode(&tmp)
	// 	fmt.Println("tmp == ", tmp)
	// 	for _, temp := range tmp {
	// 		var e = Customers{
	// 			ID:         temp.ID,
	// 			Name:       temp.Name,
	// 			Surname:    temp.Surname,
	// 			Email:      temp.Email,
	// 			Birth_date: "",
	// 			Gender:     "",
	// 		}
	// 		insertQuery := `INSERT INTO employees (id, name, surname, email, birth_date, gender, work, password, picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
	// 		_, err := db.DB.Exec(insertQuery, e.ID, e.Name, e.Surname, e.Email, e.Birth_date, e.Gender, e.Work, e.Password, "")
	// 		if err != nil {
	// 			updateQuery := `UPDATE employees SET name = ?, surname = ?, email = ? WHERE id = ?`
	// 			_, err = db.DB.Exec(updateQuery, e.Name, e.Surname, e.Email, e.ID)
	// 			if err != nil {
	// 				return nil, err
	// 			}
	// 		}
	// 	}
	// }
	query := `SELECT * FROM customers`
	rows, err := db.DB.Query(query)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		var c Customers
		err = rows.Scan(&c.ID, &c.Email, &c.Name, &c.Surname, &c.Birth_date, &c.Gender, &c.Description, &c.Astrological_sign, &c.Employee_id)
		if err != nil {
			return nil, err
		}

		customers = append(customers, c)
	}

	return customers, nil
}

func GetCustomerInfo(customerID int64) (*Customers, error) {
	query := `SELECT * FROM customers WHERE id = ?`
	row := db.DB.QueryRow(query, customerID)

	var c Customers
	err := row.Scan(&c.ID, &c.Email, &c.Name, &c.Surname, &c.Birth_date, &c.Gender, &c.Description, &c.Astrological_sign, &c.Employee_id)
	if err == sql.ErrNoRows {
		return nil, fmt.Errorf("no employee found with ID %d", customerID)
	} else if err != nil {
		return nil, err
	}

	return &c, nil
}

func GetCustomerPaymentsInfo(customerID int64) (*Payments, error) {
	query := `SELECT * FROM payment_history WHERE customer_id = ?`
	row := db.DB.QueryRow(query, customerID)

	var p Payments
	err := row.Scan(&p.ID, &p.CustomerId, &p.Date, &p.PaymentMethod, &p.Amount, &p.Comment)
	if err == sql.ErrNoRows {
		return nil, fmt.Errorf("no payment found with ID %d", customerID)
	} else if err != nil {
		return nil, err
	}

	return &p, nil
}
