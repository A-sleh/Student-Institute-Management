CREATE PROCEDURE [dbo].[AddStudent]
	@Name VARCHAR(30),
	@LastName VARCHAR(30),
	@FatherName VARCHAR(30),
	@Birthdate DATE,
	@Phone CHAR(15),
	@ClassId INT,
	@MissedDays INT,
	@BillRequired INT
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
		@Name,
		@LastName,
		@FatherName,
		@Birthdate,
		@Phone,
		@ClassId,
		@MissedDays,
		@BillRequired
	)
END
