create database if not exists schoolbell;

use schoolbell;
drop table if exists employee;

create table if not exists employee (
	id integer auto_increment,
	name varchar(100)  NOT NULL,
	age integer,
	gender varchar(10),
	department varchar(30),
	manager_id integer  NOT NULL,
	salary integer,
	joined date,
    primary key(id)
);



insert into employee (name, age, gender, department, manager_id, salary, joined) 
values
('Harit Kumar', 25, 'male', 'CEO', 0 , 50000, STR_TO_DATE('13-01-2012', '%d-%m-%Y')),
('Reyna Azure', 32, 'male', 'Sales department', 1 , 54000, STR_TO_DATE('15-03-2013', '%d-%m-%Y')),
('Addie Tietz', 32, 'male', 'marketing department', 1 , 54000, STR_TO_DATE('15-07-2013', '%d-%m-%Y')),
('Elly Sirianni', 34, 'male', 'Sales department', 1 , 30000, STR_TO_DATE('15-03-2016', '%d-%m-%Y')),
('Synthia Mcquay', 12, 'male', 'ICT department', 2 , 4255, STR_TO_DATE('15-03-2017', '%d-%m-%Y')),
('Branden Colter', 31, 'female', 'Sales department', 4 , 4255, STR_TO_DATE('15-03-2017', '%d-%m-%Y')),
('Cheryle Averitt', 45, 'female', 'Sales department', 2 , 4255, STR_TO_DATE('15-03-2017', '%d-%m-%Y')),
('Tammara Skeen', 60, 'male', 'ICT department', 5 , 4255, STR_TO_DATE('15-03-2017', '%d-%m-%Y')),
('Mauricio Pass', 19, 'female', 'Sales department', 4 , 4255, STR_TO_DATE('15-03-2017', '%d-%m-%Y'));

create view emp_manager as
SELECT e1.name, e1.age, e1.gender, e1.department, e1.manager_id, e1.salary, e1.joined, ifnull(e2.name, 'Top Manager') AS manager_name
FROM employee e1
LEFT JOIN employee e2
ON e1.manager_id = e2.id;