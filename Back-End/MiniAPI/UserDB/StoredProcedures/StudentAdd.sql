CREATE PROCEDURE [dbo].[StudentAdd]
	@StudentId int,
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
	INSERT INTO Student(
		name,
		lastName,
		fatherName,
		birthdate,
		phone,
		classId,
		missedDays,
		billRequired
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
