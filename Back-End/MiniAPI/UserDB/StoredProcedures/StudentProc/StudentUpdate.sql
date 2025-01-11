CREATE PROCEDURE [dbo].[StudentUpdate]
	@Id int,
	@Name NVARCHAR(30),
	@LastName NVARCHAR(30),
	@FatherName NVARCHAR(30),
	@Birthdate date,
	@Phone VARCHAR(15),
	@ClassId int,
	@MissedDays int,
	@BillRequired int
AS
BEGIN
	UPDATE Student
	SET name = @Name,
		lastName = @LastName,
		fatherName = @FatherName,
		birthdate = @Birthdate,
		phone = @Phone,
		classId = @ClassId,
		missedDays = @MissedDays,
		billRequired = @BillRequired
	WHERE id = @Id
END

