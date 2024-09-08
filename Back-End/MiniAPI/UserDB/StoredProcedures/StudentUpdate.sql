CREATE PROCEDURE [dbo].[StudentUpdate]
	@Id int,
	@Name varchar(30),
	@LastName varchar(30),
	@FatherName varchar(30),
	@Birthdate date,
	@Phone char(15),
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

