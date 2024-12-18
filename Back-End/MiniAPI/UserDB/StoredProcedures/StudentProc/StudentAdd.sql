CREATE PROCEDURE [dbo].[StudentAdd]
	@StudentId int,
	@Name NVARCHAR(30),
	@LastName NVARCHAR(30),
	@FatherName NVARCHAR(30),
	@Birthdate DATE,
	@Phone VARCHAR(15),
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
