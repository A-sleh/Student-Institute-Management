CREATE PROCEDURE [dbo].[BillGetAll]
	@Limit int = 100,
	@page int = 1,
	@Type varchar(15) null,
	@orderingType varchar(10) = 'ASC',
	@orderBy varchar(255) = 'BillId'
AS
	declare @declare nvarchar(128) = 
	'DECLARE @Limit int = ' + CAST(@Limit AS nvarchar(5)) + 
	', @page int = ' + CAST(@page AS NVARCHAR(10));
	declare @non nvarchar(128) = '1 = 1';
	declare @teacher nvarchar(128) = 'b.TeacherId is not null';
	declare @student nvarchar(128) = 'b.StudentId is not null';
	declare @external nvarchar(128) = 'b.TeacherId is null AND b.StudentId is null';
	declare @statement nvarchar(1024) = 
		'SELECT
		b.Id as BillId, b.BillNo, b.Type, b.Amount, b.Date, b.Note,
		s.id as StudentId, s.name, s.lastName,
		t.Id as TeacherId, t.Name, t.LastName
		FROM Bill b
		LEFT OUTER JOIN Student s ON b.StudentId = s.id
		LEFT OUTER JOIN Teacher t ON b.TeacherId = t.Id
		WHERE';
	declare @orderByState nvarchar(128);
	declare @sql nvarchar(1024);
	IF(@Type is null)
		set @sql = CONCAT(@declare, ' ', @statement,' ',@non);
	ELSE IF(@Type = 'teacher')
		set @sql = CONCAT(@declare, ' ', @statement,' ',@teacher);
	ELSE IF(@Type = 'student')
		set @sql = CONCAT(@declare, ' ', @statement,' ',@student);
	ELSE IF(@Type = 'external')
		set @sql = CONCAT(@declare, ' ', @statement,' ',@external);
	ELSE
		THROW 55000, 'invalid parameter', 1;
	DECLARE @pagination varchar(512) = 'OFFSET @Limit*(@page-1) ROWS FETCH NEXT @Limit ROWS ONLY'
	set @orderByState = CONCAT('ORDER BY ', @orderBy, ' ', @orderingType);
	set @sql = CONCAT(@sql, ' ', @orderByState, ' ', @pagination);
	EXECUTE(@sql);
RETURN 0;
