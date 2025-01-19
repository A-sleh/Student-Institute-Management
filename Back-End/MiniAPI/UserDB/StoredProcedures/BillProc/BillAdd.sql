CREATE PROCEDURE [dbo].[BillAdd]
	@BillNo NVARCHAR(50),
	@Type VARCHAR(5),
	@Date NVARCHAR(30),
	@Amount int,
	@StudentId int null,
	@TeacherId int null,
	@Note NVARCHAR(300)
AS
	if (@TeacherId is null AND @StudentId is not null)
	BEGIN
		INSERT INTO Bill(BillNo, Type, Amount, Date, StudentId, TeacherId, Note) VALUES
		(@BillNo, @Type, @Amount, @Date, @StudentId, null, @Note);
	END
	ELSE IF (@TeacherId is not null AND @StudentId is null)
	BEGIN
		INSERT INTO Bill(BillNo, Type, Amount, Date, StudentId, TeacherId, Note) VALUES
		(@BillNo, @Type, @Amount, @Date, null, @TeacherId, @Note);
	END
	ELSE IF(@TeacherId is null AND @StudentId is null)
	BEGIN
		INSERT INTO Bill(BillNo, Type, Amount, Date, StudentId, TeacherId, Note) VALUES
		(@BillNo, @Type, @Amount, @Date, null, null, @Note);
	END
	ELSE
	THROW 55000, 'Not Valid', 0;
RETURN 0
