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
		(N'رامز', N'قصاب', N'محمد', '1999/1/1', 0, 1, '+963912345678', 9800000),
		(N'ناصر', N'عبدو', N'ياسين', '1998/12/1', 0, 1, '+963912032177', 9800000),
        (N'اسماعيل', N'الحسن', N'حامد', '2000/08/1', 0, 1, '+963912032177', 9800000),
        (N'سامي', N'افندي', N'هشام', '1999/1/1', 0, 1, '+963912345678', 9800000),
		(N'حاتم', N'الطائي', N'ابوحاتم', '1998/12/1', 0, 1, '+963912032177', 9800000),
        (N'محسن', N'ايوبي', N'حسام', '2000/08/1', 0, 1, '+963912032177', 9800000),
        (N'شادي', N'حنكل', N'عامر', '2000/08/1', 0, 1, '+963912032177', 9800000),
        (N'ايهم', N'حنكل', N'عامر', '2000/08/1', 0, 1, '+963912032177', 9800000),
        (N'حميد', N'الفرحان', N'ناصر', '2000/08/1', 0, 1, '+963912032177', 9800000),
        (N'تامر', N'صاري', N'ليث', '2000/08/1', 0, 1, '+963912032177', 9800000),
        (N'خالد', N'صحن', N'عمران', '2001/2/1', 0, 1, '+963987654321', 9800000),
        (N'هاشم', N'مكفول', N'كامل', '2001/2/1', 0, 1, '+963987654321', 9800000),
        (N'ليلى', N'ابودان', N'أحمد', '2001/2/1', 0, 2, '+963987654321', 8500000),
		(N'روان', N'رافع', N'محمد', '2001/9/10', 0, 2, '+963912332177', 8500000),
		(N'ربى', N'ريشة', N'سمير', '2001/9/10', 0, 2, '+963912332177', 8500000),
		(N'مها', N'قصار', N'حازم', '2001/9/10', 0, 2, '+963912332177', 8500000),
		(N'شيماء', N'الخليل', N'حمد', '2001/9/10', 0, 2, '+963912332177', 8500000),
		(N'مجيدة', N'مستت', N'محمد', '2001/9/10', 0, 2, '+963912332177', 8500000),
		(N'شمس', N'مشمش', N'ماجد', '2001/9/10', 0, 2, '+963912332177', 8500000),
		(N'شروق', N'العباس', N'محمود', '2001/9/10', 0, 2, '+963912332177', 8500000),
		(N'سميرة', N'سرور', N'ساطع', '2001/9/10', 0, 2, '+963912332177', 8500000),
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

GO
IF NOT EXISTS (SELECT 1 FROM [dbo].[Test])
BEGIN
	INSERT INTO Test(Title, TestType, SubjectId, ReportId, Date, CorrectionDate) VALUES
	(N'الوحدة الاولى', 'exam', 1, 1, '2025/1/1', '2025/1/3'),
	(N'الوحدة الاولى', 'exam', 2, 1, '2025/1/3', '2025/1/5'),
	(N'الوحدة الاولى', 'exam', 3, 1, '2025/1/5', '2025/1/7'),
	(N'الوحدة الاولى', 'exam', 4, 1, '2025/1/8', '2025/1/10'),
	(N'الوحدة الاولى', 'exam', 5, 1, '2025/1/11', '2025/1/13'),
	(N'الوحدة الاولى', 'exam', 6, 1, '2025/1/15', '2025/1/20'),
	(N'الوحدة الاولى', 'exam', 7, 1, '2025/1/18', '2025/1/24'),
	(N'الوحدة الاولى', 'exam', 8, 1, '2025/1/19', '2025/1/25'),
	(N'الوحدة الاولى', 'exam', 1, 1, '2025/1/1', '2025/1/3'),
	(N'الوحدة الاولى', 'exam', 2, 1, '2025/1/3', '2025/1/5'),
	(N'الوحدة الاولى', 'exam', 3, 1, '2025/1/5', '2025/1/7'),
	(N'الوحدة الاولى', 'exam', 4, 1, '2025/1/8', '2025/1/10'),
	(N'الوحدة الاولى', 'exam', 5, 1, '2025/1/11', '2025/1/13'),
	(N'الوحدة الاولى', 'exam', 6, 1, '2025/1/15', '2025/1/20'),
	(N'الوحدة الاولى', 'exam', 7, 1, '2025/1/18', '2025/1/24'),
	(N'الوحدة الاولى', 'exam', 8, 1, '2025/1/19', '2025/1/25');
END

-- init marks
EXEC TestInitMarks 1, 1;
EXEC TestInitMarks 2, 1;
EXEC TestInitMarks 3, 1;
EXEC TestInitMarks 4, 1;
EXEC TestInitMarks 5, 1;
EXEC TestInitMarks 6, 1;
EXEC TestInitMarks 7, 1;
EXEC TestInitMarks 8, 1;
EXEC TestInitMarks 9, 2;
EXEC TestInitMarks 10, 2;
EXEC TestInitMarks 11, 2;
EXEC TestInitMarks 12, 2;
EXEC TestInitMarks 13, 2;
EXEC TestInitMarks 14, 2;
EXEC TestInitMarks 15, 2;
EXEC TestInitMarks 16, 2;

-- set marks
EXEC TestUpdateMark 1, 401;
EXEC TestUpdateMark 2, 511;
EXEC TestUpdateMark 3, 428;
EXEC TestUpdateMark 4, 591;
EXEC TestUpdateMark 5, 490;
EXEC TestUpdateMark 6, 419;
EXEC TestUpdateMark 7, 511;
EXEC TestUpdateMark 8, 557;
EXEC TestUpdateMark 9, 571;
EXEC TestUpdateMark 10, 483;
EXEC TestUpdateMark 11, 522;
EXEC TestUpdateMark 12, 549;
EXEC TestUpdateMark 13, 337;
EXEC TestUpdateMark 14, 323;
EXEC TestUpdateMark 15, 380;
EXEC TestUpdateMark 16, 248;
EXEC TestUpdateMark 17, 337;
EXEC TestUpdateMark 18, 268;
EXEC TestUpdateMark 19, 398;
EXEC TestUpdateMark 20, 363;
EXEC TestUpdateMark 21, 270;
EXEC TestUpdateMark 22, 354;
EXEC TestUpdateMark 23, 278;
EXEC TestUpdateMark 24, 393;
EXEC TestUpdateMark 25, 230;
EXEC TestUpdateMark 26, 220;
EXEC TestUpdateMark 27, 298;
EXEC TestUpdateMark 28, 262;
EXEC TestUpdateMark 29, 296;
EXEC TestUpdateMark 30, 231;
EXEC TestUpdateMark 31, 182;
EXEC TestUpdateMark 32, 247;
EXEC TestUpdateMark 33, 189;
EXEC TestUpdateMark 34, 223;
EXEC TestUpdateMark 35, 234;
EXEC TestUpdateMark 36, 248;
EXEC TestUpdateMark 37, 308;
EXEC TestUpdateMark 38, 296;
EXEC TestUpdateMark 39, 370;
EXEC TestUpdateMark 40, 313;
EXEC TestUpdateMark 41, 285;
EXEC TestUpdateMark 42, 384;
EXEC TestUpdateMark 43, 328;
EXEC TestUpdateMark 44, 305;
EXEC TestUpdateMark 45, 364;
EXEC TestUpdateMark 46, 396;
EXEC TestUpdateMark 47, 247;
EXEC TestUpdateMark 48, 384;
EXEC TestUpdateMark 49, 240;
EXEC TestUpdateMark 50, 272;
EXEC TestUpdateMark 51, 196;
EXEC TestUpdateMark 52, 236;
EXEC TestUpdateMark 53, 293;
EXEC TestUpdateMark 54, 267;
EXEC TestUpdateMark 55, 252;
EXEC TestUpdateMark 56, 213;
EXEC TestUpdateMark 57, 191;
EXEC TestUpdateMark 58, 241;
EXEC TestUpdateMark 59, 242;
EXEC TestUpdateMark 60, 232;
EXEC TestUpdateMark 61, 275;
EXEC TestUpdateMark 62, 190;
EXEC TestUpdateMark 63, 227;
EXEC TestUpdateMark 64, 207;
EXEC TestUpdateMark 65, 226;
EXEC TestUpdateMark 66, 278;
EXEC TestUpdateMark 67, 266;
EXEC TestUpdateMark 68, 289;
EXEC TestUpdateMark 69, 205;
EXEC TestUpdateMark 70, 201;
EXEC TestUpdateMark 71, 280;
EXEC TestUpdateMark 72, 269;
EXEC TestUpdateMark 73, 134;
EXEC TestUpdateMark 74, 126;
EXEC TestUpdateMark 75, 190;
EXEC TestUpdateMark 76, 161;
EXEC TestUpdateMark 77, 141;
EXEC TestUpdateMark 78, 198;
EXEC TestUpdateMark 79, 132;
EXEC TestUpdateMark 80, 185;
EXEC TestUpdateMark 81, 147;
EXEC TestUpdateMark 82, 188;
EXEC TestUpdateMark 83, 147;
EXEC TestUpdateMark 84, 148;
EXEC TestUpdateMark 85, 165;
EXEC TestUpdateMark 86, 134;
EXEC TestUpdateMark 87, 145;
EXEC TestUpdateMark 88, 125;
EXEC TestUpdateMark 89, 200;
EXEC TestUpdateMark 90, 184;
EXEC TestUpdateMark 91, 135;
EXEC TestUpdateMark 92, 159;
EXEC TestUpdateMark 93, 122;
EXEC TestUpdateMark 94, 184;
EXEC TestUpdateMark 95, 149;
EXEC TestUpdateMark 96, 193;
EXEC TestUpdateMark 97, 572;
EXEC TestUpdateMark 98, 514;
EXEC TestUpdateMark 99, 394;
EXEC TestUpdateMark 100, 513;
EXEC TestUpdateMark 101, 373;
EXEC TestUpdateMark 102, 386;
EXEC TestUpdateMark 103, 420;
EXEC TestUpdateMark 104, 375;
EXEC TestUpdateMark 105, 410;
EXEC TestUpdateMark 106, 349;
EXEC TestUpdateMark 107, 371;
EXEC TestUpdateMark 108, 292;
EXEC TestUpdateMark 109, 357;
EXEC TestUpdateMark 110, 247;
EXEC TestUpdateMark 111, 270;
EXEC TestUpdateMark 112, 327;
EXEC TestUpdateMark 113, 277;
EXEC TestUpdateMark 114, 314;
EXEC TestUpdateMark 115, 279;
EXEC TestUpdateMark 116, 201;
EXEC TestUpdateMark 117, 216;
EXEC TestUpdateMark 118, 265;
EXEC TestUpdateMark 119, 195;
EXEC TestUpdateMark 120, 236;
EXEC TestUpdateMark 121, 208;
EXEC TestUpdateMark 122, 281;
EXEC TestUpdateMark 123, 266;
EXEC TestUpdateMark 124, 361;
EXEC TestUpdateMark 125, 377;
EXEC TestUpdateMark 126, 374;
EXEC TestUpdateMark 127, 389;
EXEC TestUpdateMark 128, 358;
EXEC TestUpdateMark 129, 246;
EXEC TestUpdateMark 130, 378;
EXEC TestUpdateMark 131, 381;
EXEC TestUpdateMark 132, 263;
EXEC TestUpdateMark 133, 181;
EXEC TestUpdateMark 134, 245;
EXEC TestUpdateMark 135, 231;
EXEC TestUpdateMark 136, 222;
EXEC TestUpdateMark 137, 190;
EXEC TestUpdateMark 138, 242;
EXEC TestUpdateMark 139, 279;
EXEC TestUpdateMark 140, 264;
EXEC TestUpdateMark 141, 270;
EXEC TestUpdateMark 142, 246;
EXEC TestUpdateMark 143, 224;
EXEC TestUpdateMark 144, 278;
EXEC TestUpdateMark 145, 242;
EXEC TestUpdateMark 146, 256;
EXEC TestUpdateMark 147, 203;
EXEC TestUpdateMark 148, 258;
EXEC TestUpdateMark 149, 201;
EXEC TestUpdateMark 150, 255;
EXEC TestUpdateMark 151, 143;
EXEC TestUpdateMark 152, 199;
EXEC TestUpdateMark 153, 167;
EXEC TestUpdateMark 154, 190;
EXEC TestUpdateMark 155, 171;
EXEC TestUpdateMark 156, 128;
EXEC TestUpdateMark 157, 129;
EXEC TestUpdateMark 158, 149;
EXEC TestUpdateMark 159, 171;
EXEC TestUpdateMark 160, 155;
EXEC TestUpdateMark 161, 196;
EXEC TestUpdateMark 162, 161;
EXEC TestUpdateMark 163, 123;
EXEC TestUpdateMark 164, 164;
EXEC TestUpdateMark 165, 122;
EXEC TestUpdateMark 166, 123;
EXEC TestUpdateMark 167, 175;
EXEC TestUpdateMark 168, 192;


IF NOT EXISTS (SELECT 1 FROM [dbo].[Bill])
BEGIN
	INSERT INTO Bill(BillNo, Type, Date, Amount, Note, StudentId, TeacherId) VALUES
	('A00929001', 'in', '2024/12/1', 550000, N'تسديد قسط دفعة اولى', 1, null),
	('A00929002', 'in', '2024/12/1', 550000, N'تسديد قسط دفعة اولى', 2, null),
	('A00929003', 'in', '2024/12/1', 550000, N'تسديد قسط دفعة اولى', 3, null),
	('A00929004', 'in', '2024/12/1', 550000, N'تسديد قسط دفعة اولى', 4, null),
	('A00929005', 'in', '2024/12/1', 550000, N'تسديد قسط دفعة اولى', 5, null),
	('A00929006', 'in', '2024/12/1', 550000, N'تسديد قسط دفعة اولى', 6, null),
	('A00929007', 'in', '2024/12/1', 550000, N'تسديد قسط دفعة اولى', 7, null),
	('A00929008', 'in', '2024/12/1', 550000, N'تسديد قسط دفعة اولى', 8, null),
	('A00929009', 'in', '2024/12/1', 550000, N'تسديد قسط دفعة اولى', 9, null),
	('A00929010', 'in', '2025/1/1', 350000, N'تسديد قسط دفعة', 1, null),
	('A00929011', 'in', '2025/1/1', 350000, N'تسديد قسط دفعة', 2, null),
	('A00929012', 'in', '2025/1/2', 350000, N'تسديد قسط دفعة', 3, null),
	('A00929013', 'in', '2025/1/2', 350000, N'تسديد قسط دفعة', 4, null),
	('A00929014', 'in', '2025/1/2', 350000, N'تسديد قسط دفعة', 5, null),
	('A00929015', 'in', '2025/1/2', 350000, N'تسديد قسط دفعة', 6, null),
	('A00929016', 'in', '2025/1/3', 350000, N'تسديد قسط دفعة', 7, null),
	('A00929017', 'in', '2025/1/3', 350000, N'تسديد قسط دفعة', 8, null),
	('A00929018', 'in', '2025/1/4', 350000, N'تسديد قسط دفعة', 9, null),
	('A00929019', 'in', '2025/1/4', 550000, N'تسديد قسط دفعة اولى', 10, null),
	('A00929020', 'in', '2025/1/4', 550000, N'تسديد قسط دفعة اولى', 11, null),
	('A00929021', 'in', '2025/1/4', 550000, N'تسديد قسط دفعة اولى', 12, null),
	('A00929022', 'in', '2025/1/4', 550000, N'تسديد قسط دفعة اولى', 13, null),
	('A00929023', 'in', '2025/1/4', 550000, N'تسديد قسط دفعة اولى', 14, null),
	('A00929024', 'in', '2025/1/4', 550000, N'تسديد قسط دفعة اولى', 15, null),
	('A00929025', 'in', '2025/1/4', 550000, N'تسديد قسط دفعة اولى', 16, null),
	('A00929026', 'in', '2025/1/4', 550000, N'تسديد قسط دفعة اولى', 17, null),
	('A00929027', 'in', '2025/1/4', 550000, N'تسديد قسط دفعة اولى', 18, null),
	('A00929028', 'in', '2025/1/4', 550000, N'تسديد قسط دفعة اولى', 19, null),
	('A00929029', 'in', '2025/1/4', 550000, N'تسديد قسط دفعة اولى', 20, null),
	('A00929030', 'in', '2025/1/4', 550000, N'تسديد قسط دفعة اولى', 21, null),
	('B00929012', 'out', '2025/1/1', 600000, N'تسديد دفعة', null, 1),
	('B00929013', 'out', '2025/1/1', 600000, N'تسديد دفعة', null, 2),
	('B00929014', 'out', '2025/1/1', 600000, N'تسديد دفعة', null, 3),
	('B00929015', 'out', '2025/1/1', 600000, N'تسديد دفعة', null, 4),
	('B00929016', 'out', '2025/1/1', 600000, N'تسديد دفعة', null, 5),
	('B00929017', 'out', '2025/1/1', 600000, N'تسديد دفعة', null, 6),
	('B00929018', 'out', '2025/1/1', 600000, N'تسديد دفعة', null, 7);
END