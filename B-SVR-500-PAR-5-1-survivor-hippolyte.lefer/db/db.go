package db

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func InitDB() {
	var err error
	DB, err = sql.Open("sqlite3", "api.db")

	if err != nil {
		panic("could not connect to databse")
	}
	// DB.SetMaxOpenConns(10) // Maximum number of connection
	// DB.SetMaxIdleConns(5)  // How many connection we want to keep open if no one is connected (5 in this case)

	createTables()
}

func createTables() {
	createCustomersTable :=
		`
	CREATE TABLE IF NOT EXISTS customers (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		email TEXT NOT NULL UNIQUE,
		name TEXT NOT NULL,
		surname TEXT NOT NULL,
		birth_date TEXT NOT NULL,
		gender TEXT NOT NULL,
		description TEXT NOT NULL,
		astrological_sign TEXT NOT NULL,
		employee_id INTEGER,
		FOREIGN KEY(employee_id) REFERENCES employees(id)
	)
	`
	_, err := DB.Exec(createCustomersTable) // execute the query
	if err != nil {
		panic("could not create table: " + err.Error()) // provide more detailed error information
	}
	createEmployeesTable := `
	CREATE TABLE IF NOT EXISTS employees (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		surname TEXT NOT NULL,
		email TEXT NOT NULL UNIQUE,
		password TEXT NOT NULL,
		birth_date TEXT NOT NULL,
		gender TEXT NOT NULL,
		work TEXT NOT NULL,
		picture TEXT NOT NULL
	)
	`
	_, err = DB.Exec(createEmployeesTable) // execute the query
	if err != nil {
		panic("could not create table: " + err.Error()) // provide more detailed error information
	}
	createMeetingsTable := `
	CREATE TABLE IF NOT EXISTS meetings (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		customer_id INTEGER,
		date TEXT NOT NULL,
		rating INTEGER,
		comment TEXT NOT NULL,
		source TEXT NOT NULL,
		FOREIGN KEY(customer_id) REFERENCES customers(id)
	)
	`
	_, err = DB.Exec(createMeetingsTable) // execute the query
	if err != nil {
		panic("could not create table: " + err.Error()) // provide more detailed error information
	}

	createPayementsHistoryTable := `
	CREATE TABLE IF NOT EXISTS payment_history (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		customer_id INTEGER,
		date TEXT NOT NULL,
		payment_method TEXT NOT NULL,
		amount INTEGER,
		comment TEXT NOT NULL,
		FOREIGN KEY(customer_id) REFERENCES customers(id)
	)
	`
	_, err = DB.Exec(createPayementsHistoryTable) // execute the query
	if err != nil {
		panic("could not create table: " + err.Error()) // provide more detailed error information
	}

	createTipsTable := `
	CREATE TABLE IF NOT EXISTS tips (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		title TEXT NOT NULL,
		tip TEXT NOT NULL
	)
	`
	_, err = DB.Exec(createTipsTable) // execute the query
	if err != nil {
		panic("could not create table: " + err.Error()) // provide more detailed error information
	}

	createEventsTable := `
	CREATE TABLE IF NOT EXISTS tips (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		date TEXT NOT NULL,
		max_participants INTEGER,
		location_x TEXT NOT NULL,
		location_y TEXT NOT NULL,
		type TEXT NOT NULL,
		employee_id INTEGER,
		location_name TEXT NOT NULL,
		FOREIGN KEY(employee_id) REFERENCES employees(id)
	)
	`

	_, err = DB.Exec(createEventsTable) // execute the query
	if err != nil {
		panic("could not create table: " + err.Error()) // provide more detailed error information
	}
}
