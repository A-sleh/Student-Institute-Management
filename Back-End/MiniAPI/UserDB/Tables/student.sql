CREATE TABLE [dbo].[student]
(
	id INT PRIMARY KEY IDENTITY(1,1),
	name VARCHAR(30),
	last_name VARCHAR(30),
	father_name VARCHAR(30),
	missed_days INT DEFAULT 0,
	birthdate DATE,
	phone CHAR(15),
	class_id INT,
	bill_required DECIMAL(18,2),
	CONSTRAINT fk_class FOREIGN KEY(class_id) REFERENCES class(id) ON UPDATE CASCADE ON DELETE SET NULL,
);
