CREATE PROCEDURE [dbo].[BillGetAll]
	@billOwner VARCHAR(15) null,
	@billType VARCHAR(3) null,
	@startDate Date null,
	@endDate Date null,
	@orderingType VARCHAR(10) = 'ASC',
	@orderBy VARCHAR(255) = 'BillId',
	@Limit INT = 100,
	@page INT = 1,
	@total INT OUTPUT
AS
	DECLARE @declare VARCHAR(128) = 
	'DECLARE @Limit int = ' + CAST(@Limit AS nvarchar(5)) + 
	', @page int = ' + CAST(@page AS NVARCHAR(10));
	DECLARE @teacher VARCHAR(128) = 'WHERE b.TeacherId is not null';
	DECLARE @student VARCHAR(128) = 'WHERE b.StudentId is not null';
	DECLARE @external VARCHAR(128) = 'WHERE b.TeacherId is null AND b.StudentId is null';
	DECLARE @any VARCHAR(128) = 'WHERE (1=1)';
	DECLARE @query VARCHAR(1024) = 
		'SELECT
		b.Id as BillId, b.BillNo, b.Type, b.Amount, b.Date, b.Note,
		s.id as StudentId, s.name, s.lastName,
		t.Id as TeacherId, t.Name, t.LastName
		FROM Bill b
		LEFT OUTER JOIN Student s ON b.StudentId = s.id
		LEFT OUTER JOIN Teacher t ON b.TeacherId = t.Id';

	DECLARE @sql nvarchar(1024);
	IF(@billOwner is null) -- brings all types
	BEGIN
		SET @total = 
		(SELECT COUNT(1)
		FROM Bill b
		LEFT OUTER JOIN Student s ON b.StudentId = s.id
		LEFT OUTER JOIN Teacher t ON b.TeacherId = t.Id)
		SET @sql = CONCAT(@declare, ' ', @query, ' ', @any);
	END
	ELSE IF(@billOwner = 'teacher')
	BEGIN
		SET @total = 
		(SELECT COUNT(1)
		FROM Bill b
		LEFT OUTER JOIN Student s ON b.StudentId = s.id
		LEFT OUTER JOIN Teacher t ON b.TeacherId = t.Id
		WHERE b.TeacherId is not null);
		SET @sql = CONCAT(@declare, ' ', @query,' ',@teacher);
	END
	ELSE IF(@billOwner = 'student')
	BEGIN
		SET @total = 
		(SELECT COUNT(1)
		FROM Bill b
		LEFT OUTER JOIN Student s ON b.StudentId = s.id
		LEFT OUTER JOIN Teacher t ON b.TeacherId = t.Id
		WHERE b.StudentId is not null)
		SET @sql = CONCAT(@declare, ' ', @query,' ',@student);
	END
	ELSE IF(@billOwner = 'external')
	BEGIN
		SET @total = 
		(SELECT COUNT(1)
		FROM Bill b
		LEFT OUTER JOIN Student s ON b.StudentId = s.id
		LEFT OUTER JOIN Teacher t ON b.TeacherId = t.Id
		WHERE b.TeacherId is null AND b.StudentId is null AND (@billType is null OR b.Type = @billType))
		SET @sql = CONCAT(@declare, ' ', @query,' ',@external);
	END
	ELSE
		RAISERROR('invalid bill owner provided', 16, 1);

	IF(@billType = 'in' OR @billType = 'out')
		SET @sql = CONCAT(@sql, ' AND Type = ',QUOTENAME(@billType,''''))
	IF(@startDate is not null)
		SET @sql = CONCAT(@sql, ' AND ', 'Date >= ', QUOTENAME(@startDate,''''))
	IF(@endDate is not null)
		SET @sql = CONCAT(@sql, ' AND ', 'Date < ', QUOTENAME(@endDate,''''))

	DECLARE @orderByState VARCHAR(128);
	DECLARE @pagination VARCHAR(512) = 'OFFSET @Limit*(@page-1) ROWS FETCH NEXT @Limit ROWS ONLY';

	SET @orderByState = CONCAT('ORDER BY ', @orderBy, ' ', @orderingType);
	SET @sql = CONCAT(@sql, ' ', @orderByState, ' ', @pagination);
	
	

	EXECUTE(@sql);
RETURN 0;
