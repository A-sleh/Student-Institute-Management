CREATE PROCEDURE [dbo].[BillGetAll]
	@Limit int null,
	@Type varchar(15) null,
	@orderingType varchar(10) null,
	@orderBy varchar(30) null
AS
	if(@Limit is null)
		set @Limit = 1000
	declare @declare nvarchar(128) = 'DECLARE @Limit int = ' + CAST(@Limit AS nvarchar(10));
	declare @non nvarchar(128) = '1 = 1';
	declare @teacher nvarchar(128) = 'b.TeacherId is not null';
	declare @student nvarchar(128) = 'b.StudentId is not null';
	declare @external nvarchar(128) = 'b.TeacherId is null AND b.StudentId is null';
	declare @statement nvarchar(1024) = 
		'SELECT TOP(@Limit)
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

	if(@orderBy is not null)
	BEGIN
		set @orderByState = 'ORDER BY '
		if(@orderingType is not null)
			set @orderByState += CONCAT(@orderBy, ' ', @orderingType);
		ELSE
			set @orderByState += @orderBy;
		set @sql = CONCAT(@sql, ' ', @orderByState);
	END
	EXECUTE(@sql);
RETURN 0;
