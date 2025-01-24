CREATE PROCEDURE [dbo].[StudentAdd]
	@StudentId int,
	@Name NVARCHAR(30),
	@LastName NVARCHAR(30),
	@FatherName NVARCHAR(30),
	@Birthdate DATE,
	@Phone VARCHAR(15),
	@ClassId INT,
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
		billRequired
	)
	VALUES(
		@Name,
		@LastName,
		@FatherName,
		@Birthdate,
		@Phone,
		@ClassId,
		@BillRequired
	)
	SELECT SCOPE_IDENTITY();
END
