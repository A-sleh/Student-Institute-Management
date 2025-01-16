GO
IF NOT EXISTS (SELECT 1 FROM [dbo].[settings])
BEGIN
	INSERT INTO settings VALUES
	('username', 'admin'),
	('password', '1261A1300B1417C1365D1430E'),
	('status', 'logged out'),
	('language', 'english'),
	('fullscreen', 'no');
END

GO
if not exists (select 1 from [dbo].[Grade])
BEGIN
	INSERT INTO Grade(grade) VALUES
	('bachelor'),
	('ninth');
END;


GO
if not exists (select 1 from [dbo].[class])
BEGIN
	INSERT INTO class(title, capacity, gender, gradeId)
	VALUES
	('A', 25, 'male', 1),
	('B', 20, 'female', 1),
	('C', 20, 'female', 2),
	('D', 20, 'male', 2);
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

IF NOT EXISTS (SELECT 1 FROM [dbo].[absence])
BEGIN
	INSERT INTO absence(studentId, date) VALUES
	(1,'2024/1/7'),
	(1,'2024/1/13'),
	(1,'2024/1/14'),
	(2,'2024/1/14'),
	(3,'2024/1/9'),
	(4,'2024/1/19'),
	(4,'2024/1/25');
END;

GO
if not exists (select 1 from [dbo].[Subject])
BEGIN
	INSERT INTO Subject(Subject.Subject, MaximumMark, gradeId)
	VALUES
		('Math', 600, 1),
		('Arabic', 400, 1),
		('Science', 300, 1),
		('Physics', 400, 1),
		('English', 300, 1),
		('France', 300, 1),
		('Chimestry', 200, 1),
		('Religion', 200, 1),
		('History', 200, 1),
		('Math', 600, 2),
		('Arabic', 600, 2);
END;

GO
if not exists (select 1 from [dbo].[Report])
BEGIN
	INSERT INTO Report(ReportTitle, StartDate, FinishDate)
	VALUES
		('chapter 1', '2024/8/10', '2024/9/10'),
		('chapter 1 + 2', '2024/9/15', null);
END;

GO
if not exists (select 1 from [dbo].[teacher])
BEGIN
	INSERT INTO teacher(Name, LastName, Phone)
	VALUES
		('Ahmad', 'A.', '+963900221166'),
		('Karmo', 'K.', '+963900221146'),
		('anas', 'A.', '+963900291166'),
		('Abdulfatah', 'A.', '+963900221461'),
		('Mohamad', 'M.', '+963922001166');
END;

GO
if not exists (select 1 from [dbo].[Test])
BEGIN
	INSERT INTO Test(ReportId, SubjectId, TestType, Date, CorrectionDate, Title)
	VALUES
		(1, 1, 'exam', '2024/8/15', '2024/8/20', 'chapter 1'),
		(1, 2, 'exam', '2024/8/17', '2024/8/22', 'chapter 1'),
		(1, 3, 'exam', '2024/8/18', '2024/8/23', 'chapter 1'),
		(1, 4, 'exam', '2024/8/19', '2024/8/25', 'chapter 1'),
		(1, 5, 'exam', '2024/8/20', '2024/8/25', 'chapter 1'),
		(1, 6, 'exam', '2024/8/22', '2024/8/26', 'chapter 1'),
		(1, 7, 'exam', '2024/8/24', '2024/8/28', 'chapter 1'),
		(1, 8, 'exam', '2024/8/27', '2024/8/30', 'chapter 1'),
		(1, 9, 'exam', '2024/8/28', '2024/8/31', 'chapter 1');
END;

GO
if not exists (select 1 from [dbo].[TestMark])
BEGIN
	INSERT INTO TestMark(TestId, StudentId, Mark)
	VALUES
		(1, 1, 600),
		(2, 1, 400),
		(3, 1, 280),
		(4, 1, 360),
		(5, 1, 280),
		(6, 1, 288),
		(7, 1, 150),
		(8, 1, 190),
		(9, 1, 176),
		(1, 2, 480),
		(2, 2, 360),
		(3, 2, 300),
		(4, 2, 390),
		(5, 2, 215),
		(6, 2, 200),
		(7, 2, 150),
		(8, 2, 200),
		(9, 2, 141);
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

GO
if not exists (SELECT 1 FROM [dbo].[Bill])
BEGIN
INSERT INTO Bill(BillNo, Type, Amount, Date, StudentId, TeacherId, Note) VALUES
('A881230040', 'in', 500000, '2024/09/20', 1, null, 'recived by raboo'),
('A881230041', 'in', 400000, '2024/09/19', 2, null, 'recived by raboo'),
('A881230042', 'in', 500000, '2024/09/20', 4, null, 'recived by raboo'),
('B881230040', 'out', 800000, '2024/09/22', null, 1, 'paid by raboo'),
('', 'out', 200000, '2024/09/21', null, null, 'Bought Essentials Items, By Raboo');
END;