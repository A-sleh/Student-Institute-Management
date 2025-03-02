CREATE PROCEDURE [dbo].[BillGetAll]
	@billType VARCHAR(15) null,
	@startDate Date null,
	@endDate Date null,
	@orderingType VARCHAR(10) = 'ASC',
	@orderBy VARCHAR(255) = 'BillId',
	@Limit INT = 100,
	@page INT = 1
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
	IF(@billType is null) -- brings all types
		SET @sql = CONCAT(@declare, ' ', @query, ' ', @any);

	ELSE IF(@billType = 'teacher')
		SET @sql = CONCAT(@declare, ' ', @query,' ',@teacher);

	ELSE IF(@billType = 'student')
		SET @sql = CONCAT(@declare, ' ', @query,' ',@student);

	ELSE IF(@billType = 'external')
		SET @sql = CONCAT(@declare, ' ', @query,' ',@external);

	ELSE
		RAISERROR('invalid bill type provided', 16, 1);


	IF(@startDate is not null)
		SET @sql = CONCAT(@sql, ' AND ', 'Date >= ''', @startDate, '''')
	IF(@endDate is not null)
		SET @sql = CONCAT(@sql, ' AND ', 'Date < ''', @endDate, '''')

	DECLARE @orderByState VARCHAR(128);
	DECLARE @pagination VARCHAR(512) = 'OFFSET @Limit*(@page-1) ROWS FETCH NEXT @Limit ROWS ONLY';

	SET @orderByState = CONCAT('ORDER BY ', @orderBy, ' ', @orderingType);
	SET @sql = CONCAT(@sql, ' ', @orderByState, ' ', @pagination);

	EXECUTE(@sql);
RETURN 0;
