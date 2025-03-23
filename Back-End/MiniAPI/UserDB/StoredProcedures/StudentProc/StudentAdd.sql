CREATE PROCEDURE [dbo].[StudentAdd]
	@StudentId int,
	@Name NVARCHAR(30),
	@LastName NVARCHAR(30),
	@FatherName NVARCHAR(30),
	@Phone VARCHAR(15),
	@ClassId INT,
	@BillRequired INT
AS
BEGIN
	INSERT INTO Student(
		name,
		lastName,
		fatherName,
		phone,
		classId,
		billRequired
	)
	VALUES(
		@Name,
		@LastName,
		@FatherName,
		@Phone,
		@ClassId,
		@BillRequired
	)
	SELECT SCOPE_IDENTITY();
END
