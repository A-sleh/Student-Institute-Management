CREATE PROCEDURE [dbo].[AddStudent]
	@name VARCHAR(30),
	@last_name VARCHAR(30),
	@father_name VARCHAR(30),
	@birthdate DATE,
	@phone CHAR(15),
	@class_id INT,
	@missed_days INT,
	@bill_required INT
AS
BEGIN
	INSERT INTO student(
		name,
		last_name,
		father_name,
		birthdate,
		phone,
		class_id,
		missed_days,
		bill_required
	) 
	VALUES(
		@name,
		@last_name,
		@father_name,
		@birthdate,
		@phone,
		@class_id,
		@missed_days,
		@bill_required
	)
END
