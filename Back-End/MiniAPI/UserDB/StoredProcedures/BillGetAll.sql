CREATE PROCEDURE [dbo].[BillGetAll]
	@Type varchar(5),
	@Limit int null
AS
	IF(@Type is null)
		IF(@Limit is null)
			SELECT 
			b.Id as BillId, b.BillNo, b.Type, b.Amount, b.Date, b.Note,
			s.id as StudentId, s.name, s.lastName,
			t.Id as TeacherId, t.Name, t.LastName
			FROM Bill b
			LEFT OUTER JOIN Student s ON b.StudentId = s.id
			LEFT OUTER JOIN Teacher t ON b.TeacherId = t.Id;
		ELSE
			SELECT TOP(@Limit)
			b.Id as BillId, b.BillNo, b.Type, b.Amount, b.Date, b.Note,
			s.id as StudentId, s.name, s.lastName,
			t.Id as TeacherId, t.Name, t.LastName
			FROM Bill b
			LEFT OUTER JOIN Student s ON b.StudentId = s.id
			LEFT OUTER JOIN Teacher t ON b.TeacherId = t.Id;

	ELSE IF(@Type = 'teacher')
		IF(@Limit is null)
			SELECT b.Id as BillId, b.BillNo, b.Type, b.Amount, b.Date, b.Note,
			t.Id as TeacherId, t.Name, t.LastName
			FROM Bill b
			LEFT OUTER JOIN Teacher t ON b.TeacherId = t.Id
			WHERE TeacherId is not null
			ORDER BY b.Date DESC;
		ELSE
			SELECT TOP(@Limit)
			b.Id as BillId, b.BillNo, b.Type, b.Amount, b.Date, b.Note,
			t.Id as TeacherId, t.Name, t.LastName
			FROM Bill b
			LEFT OUTER JOIN Teacher t ON b.TeacherId = t.Id
			WHERE TeacherId is not null
			ORDER BY b.Date DESC;

	ELSE IF(@Type = 'student')
		IF(@Limit is null)
			SELECT b.Id as BillId, b.BillNo, b.Type, b.Amount, b.Date, b.Note,
			s.id as StudentId, s.name, s.lastName
			FROM Bill b
			LEFT OUTER JOIN Student s ON b.StudentId = s.id
			WHERE StudentId is not null;
		ELSE
			SELECT TOP(@Limit)
			b.Id as BillId, b.BillNo, b.Type, b.Amount, b.Date, b.Note,
			s.id as StudentId, s.name, s.lastName
			FROM Bill b
			LEFT OUTER JOIN Student s ON b.StudentId = s.id
			WHERE StudentId is not null;

	ELSE IF(@Type = 'external')
		IF(@Limit is null)
			SELECT b.Id as BillId, b.BillNo, b.Type, b.Amount, b.Date, b.Note
			FROM Bill b
			WHERE TeacherId is null AND StudentId is null;
		ELSE
			SELECT TOP(@Limit)
			b.Id as BillId, b.BillNo, b.Type, b.Amount, b.Date, b.Note
			FROM Bill b
			WHERE TeacherId is null AND StudentId is null;
	ELSE
		THROW 55000, 'invalid parameter', 1;
RETURN 0
