CREATE PROCEDURE [dbo].[BillAdd]
	@BillNo NVARCHAR(50),
	@Type VARCHAR(5),
	@Date DATE,
	@Amount int,
	@StudentId int null,
	@TeacherId int null,
	@Note NVARCHAR(300)
AS
	IF (@TeacherId is null AND @StudentId is not null)
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
	BEGIN
		RAISERROR('Invalid Input', 16, 1);
		return -1;
	END
	SELECT SCOPE_IDENTITY();
RETURN 0;
