CREATE PROCEDURE [dbo].[StudentUpdate]
	@Id int,
	@Name NVARCHAR(30),
	@LastName NVARCHAR(30),
	@FatherName NVARCHAR(30),
	@Phone VARCHAR(15),
	@ClassId int,
	@BillRequired int
AS
BEGIN
	UPDATE Student
	SET name = @Name,
		lastName = @LastName,
		fatherName = @FatherName,
		phone = @Phone,
		classId = @ClassId,
		billRequired = @BillRequired
	WHERE id = @Id
END

