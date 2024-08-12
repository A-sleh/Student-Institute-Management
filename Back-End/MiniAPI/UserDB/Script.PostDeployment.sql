GO
if not exists (select 1 from [dbo].[class])
BEGIN
	INSERT INTO class(title, capacity, gender, grade)
	VALUES
	('A', 25, 'male', 'bachelor'),
	('B', 20, 'female', 'bachelor'),
	('C', 20, 'female', 'ninth'),
	('D', 20, 'male', 'ninth');
END;

GO
if not exists (select 1 from [dbo].[student])
BEGIN
	INSERT INTO student(name, lastName, fatherName, birthdate, missedDays, classId, phone, billRequired)
	VALUES
		('Ramez', 'A.', 'Mohamad', '1999/1/1', 0, 1, '+963912345678', 5200000),
		('Lila', 'B.', 'Ahmad', '2001/2/1', 2, 3, '+963987654321', 3650000),
		('Rowan', 'D.', 'Mohamad', '2001/9/10', 3, 3, '+963912332177', 3650000),
		('Naser', 'N.', 'Yaseen', '1998/12/1', 1, 1, '+963912032177', 5350000),
		('Yamen', 'Y.', 'Yaseen', '2005/5/15', 1, 4, '+963910050032', 3650000);
END;

GO
if not exists (select 1 from [dbo].[Subject])
BEGIN
	INSERT INTO Subject(Subject.Subject, MaximumMark)
	VALUES
		('B.Math', 600),
		('N.Math', 600),
		('B.Arabic', 400),
		('N.Arabic', 600);
END;

GO
if not exists (select 1 from [dbo].[Report])
BEGIN
	INSERT INTO Report(ReportTitle, StartDate, FinishDate)
	VALUES
		('First Bachelor Rep.', '2024/8/10', '2024/9/10');
END;

GO
if not exists (select 1 from [dbo].[teacher])
BEGIN
	INSERT INTO teacher(Name, LastName, Phone)
	VALUES
		('Ahmad', 'A.', '+963900221166'),
		('Mohamad', 'M.', '+963922001166');
END;

GO
if not exists (select 1 from [dbo].[Test])
BEGIN
	INSERT INTO Test(ReportId, SubjectId, TestType, Date, CorrectionDate)
	VALUES
		(1, 1, 'revision', '2024/8/15', '2024/8/20'),
		(1, 3, 'revision', '2024/8/18', '2024/8/22');
END;

GO
if not exists (select 1 from [dbo].[TestMark])
BEGIN
	INSERT INTO TestMark(TestId, StudentId, Mark)
	VALUES
		(1, 1, 490),
		(1, 4, 500);
END;

GO
if not exists (select 1 from [dbo].[TeacherSubject])
BEGIN
	INSERT INTO TeacherSubject(TeacherId, SubjectId, Salary)
	VALUES
		(1, 1, 10550000),
		(2, 3, 9800000);
END;

GO
if not exists (select 1 from [dbo].[SubTeachClass])
BEGIN
	INSERT INTO SubTeachClass(TeachSubId, ClassId)
	VALUES
		(1, 1),
		(2, 1);
END;