CREATE PROCEDURE [dbo].[UpdateStudent]
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
	UPDATE student
	set 
	name = @Name,
	last_name = @LastName,
	father_name = @FatherName,
	birthdate = @Birthdate,
	phone = @Phone,
	class_id = @ClassId,
	missed_days = @MissedDays,
	bill_required = @BillRequired
	where id = @Id
END

