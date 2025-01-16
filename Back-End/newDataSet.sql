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
	(N'بكالوريا'),
	(N'تاسع');
END;


GO
if not exists (select 1 from [dbo].[class])
BEGIN
	INSERT INTO class(title, capacity, gender, gradeId)
	VALUES
	(N'اولى ذكور علمي', 25, 'male', 1),
	(N'اولى اناث علمي', 20, 'female', 1),
	(N'تاسع اناث', 20, 'female', 2),
	(N'تاسع ذكور', 20, 'male', 2);
END;

GO
if not exists (select 1 from [dbo].[student])
BEGIN
	INSERT INTO student(name, lastName, fatherName, birthdate, missedDays, classId, phone, billRequired)
	VALUES
		(N'رامز', N'قصاب', N'محمد', '1999/1/1', 0, 1, '+963912345678', 8900000),
		(N'ناصر', N'عبدو', N'ياسين', '1998/12/1', 0, 1, '+963912032177', 8900000),
        (N'اسماعيل', N'الحسن', N'حامد', '2000/08/1', 0, 1, '+963912032177', 8900000),
        (N'سامي', N'افندي', N'هشام', '1999/1/1', 0, 1, '+963912345678', 8900000),
		(N'حاتم', N'الطائي', N'ابوحاتم', '1998/12/1', 0, 1, '+963912032177', 8900000),
        (N'محسن', N'ايوبي', N'حسام', '2000/08/1', 0, 1, '+963912032177', 8900000),
        (N'ليلى', N'ابودان', N'أحمد', '2001/2/1', 0, 2, '+963987654321', 8500000),
		(N'روان', N'رافع', N'محمد', '2001/9/10', 0, 2, '+963912332177', 8500000),
		(N'يامن', N'عبدو', N'ياسين', '2005/5/15', 0, 4, '+963910050032', 6800000);
END;

IF NOT EXISTS (SELECT 1 FROM [dbo].[absence])
BEGIN
	INSERT INTO absence(studentId, date) VALUES
	(1,'2025/1/7'),
	(1,'2025/1/8'),
	(1,'2025/1/14'),
	(2,'2025/1/14'),
	(3,'2025/1/9'),
	(4,'2025/1/19'),
	(4,'2025/1/9');
END;

GO
if not exists (select 1 from [dbo].[Subject])
BEGIN
	INSERT INTO Subject(Subject.Subject, MaximumMark, gradeId)
	VALUES
		(N'رياضيات', 600, 1),
		(N'عربي', 400, 1),
		(N'علوم', 300, 1),
		(N'فيزياء', 400, 1),
		(N'انكليزي', 300, 1),
		(N'فرنسي', 300, 1),
		(N'كيمياء', 200, 1),
		(N'ديانة', 200, 1),
		(N'رياضيات', 600, 2),
		(N'عربي', 600, 2),
        (N'علوم', 200, 2),
		(N'فيزياء', 200, 2),
		(N'انكليزي', 400, 2),
		(N'فرنسي', 300, 2),
		(N'كيمياء', 200, 2),
		(N'ديانة', 200, 2),
		(N'تاريخ', 200, 2),
        (N'جعرافيا', 200, 2);
END;

GO
if not exists (select 1 from [dbo].[Report])
BEGIN
	INSERT INTO Report(ReportTitle, StartDate, FinishDate)
	VALUES
		(N'الوحدة الاولى علمي', '2025/1/1', '2025/2/1'),
		(N'الوحدة الاولى تاسع', '2025/1/1', null);
END;

GO
if not exists (select 1 from [dbo].[teacher])
BEGIN
	INSERT INTO teacher(Name, LastName, Phone)
	VALUES
		(N'كرم', N'الدايخ', '0900221166'),
		(N'كمال', N'عبد', '0902221146'),
		(N'يوسف', N'وراق', '0900291166'),
		(N'علي', N'شعبو', '0904221166'),
		(N'محمد', N'العلوش', '0931221146'),
        (N'مصطفى', N'بانه', '0912291166'),
		(N'حسين', N'ابراهيم', '0960291166');
END;


GO
if not exists (select 1 from [dbo].[TeacherSubject])
BEGIN
	INSERT INTO TeacherSubject(TeacherId, SubjectId, Salary)
	VALUES
		(1, 1, 10500000),
		(2, 2, 9800000),
        (3, 3, 9500000),
		(4, 4, 10000000),
        (5, 5, 7400000),
		(6, 6, 8000000),
        (6, 7, 9100000),
        (7, 8, 6900000);
END;

GO
if not exists (select 1 from [dbo].[SubTeachClass])
BEGIN
	INSERT INTO SubTeachClass(TeachSubId, ClassId)
	VALUES
		(1, 1),
		(2, 1),
        (3, 1),
		(4, 1),
        (5, 1),
		(6, 1),
        (7, 1),
		(8, 1),
        (1, 2),
		(2, 2),
        (3, 2),
		(4, 2),
        (5, 2),
		(6, 2),
        (7, 2),
		(8, 2);
END;
