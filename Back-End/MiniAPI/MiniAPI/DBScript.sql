﻿/*
Deployment script for NewTest

This code was generated by a tool.
Changes to this file may cause incorrect behavior and will be lost if
the code is regenerated.
*/

GO
SET ANSI_NULLS, ANSI_PADDING, ANSI_WARNINGS, ARITHABORT, CONCAT_NULL_YIELDS_NULL, QUOTED_IDENTIFIER ON;

SET NUMERIC_ROUNDABORT OFF;


GO
:setvar DatabaseName "NewTest"
:setvar DefaultFilePrefix "NewTest"
:setvar DefaultDataPath "C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\"
:setvar DefaultLogPath "C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\"

GO
:on error exit
GO
/*
Detect SQLCMD mode and disable script execution if SQLCMD mode is not supported.
To re-enable the script after enabling SQLCMD mode, execute the following:
*/
SET NOEXEC OFF;
:setvar __IsSqlCmdEnabled "True"
GO
IF N'$(__IsSqlCmdEnabled)' NOT LIKE N'True'
    BEGIN
        PRINT N'SQLCMD mode must be enabled to successfully execute this script.';
        SET NOEXEC ON;
    END


GO
USE [master];


GO

IF (DB_ID(N'$(DatabaseName)') IS NOT NULL) 
BEGIN
    ALTER DATABASE [$(DatabaseName)]
    SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE [$(DatabaseName)];
END

GO
PRINT N'Creating database $(DatabaseName)...'
GO
CREATE DATABASE [$(DatabaseName)]
    ON 
    PRIMARY(NAME = [$(DatabaseName)], FILENAME = N'$(DefaultDataPath)$(DefaultFilePrefix)_Primary.mdf')
    LOG ON (NAME = [$(DatabaseName)_log], FILENAME = N'$(DefaultLogPath)$(DefaultFilePrefix)_Primary.ldf') COLLATE SQL_Latin1_General_CP1_CI_AS
GO
IF EXISTS (SELECT 1
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET AUTO_CLOSE OFF 
            WITH ROLLBACK IMMEDIATE;
    END


GO
USE [$(DatabaseName)];


GO
IF EXISTS (SELECT 1
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET ANSI_NULLS ON,
                ANSI_PADDING ON,
                ANSI_WARNINGS ON,
                ARITHABORT ON,
                CONCAT_NULL_YIELDS_NULL ON,
                NUMERIC_ROUNDABORT OFF,
                QUOTED_IDENTIFIER ON,
                ANSI_NULL_DEFAULT ON,
                CURSOR_DEFAULT LOCAL,
                RECOVERY FULL,
                CURSOR_CLOSE_ON_COMMIT OFF,
                AUTO_CREATE_STATISTICS ON,
                AUTO_SHRINK OFF,
                AUTO_UPDATE_STATISTICS ON,
                RECURSIVE_TRIGGERS OFF 
            WITH ROLLBACK IMMEDIATE;
    END


GO
IF EXISTS (SELECT 1
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET ALLOW_SNAPSHOT_ISOLATION OFF;
    END


GO
IF EXISTS (SELECT 1
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET READ_COMMITTED_SNAPSHOT OFF 
            WITH ROLLBACK IMMEDIATE;
    END


GO
IF EXISTS (SELECT 1
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET AUTO_UPDATE_STATISTICS_ASYNC OFF,
                PAGE_VERIFY NONE,
                DATE_CORRELATION_OPTIMIZATION OFF,
                DISABLE_BROKER,
                PARAMETERIZATION SIMPLE,
                SUPPLEMENTAL_LOGGING OFF 
            WITH ROLLBACK IMMEDIATE;
    END


GO
IF IS_SRVROLEMEMBER(N'sysadmin') = 1
    BEGIN
        IF EXISTS (SELECT 1
                   FROM   [master].[dbo].[sysdatabases]
                   WHERE  [name] = N'$(DatabaseName)')
            BEGIN
                EXECUTE sp_executesql N'ALTER DATABASE [$(DatabaseName)]
    SET TRUSTWORTHY OFF,
        DB_CHAINING OFF 
    WITH ROLLBACK IMMEDIATE';
            END
    END
ELSE
    BEGIN
        PRINT N'The database settings cannot be modified. You must be a SysAdmin to apply these settings.';
    END


GO
IF IS_SRVROLEMEMBER(N'sysadmin') = 1
    BEGIN
        IF EXISTS (SELECT 1
                   FROM   [master].[dbo].[sysdatabases]
                   WHERE  [name] = N'$(DatabaseName)')
            BEGIN
                EXECUTE sp_executesql N'ALTER DATABASE [$(DatabaseName)]
    SET HONOR_BROKER_PRIORITY OFF 
    WITH ROLLBACK IMMEDIATE';
            END
    END
ELSE
    BEGIN
        PRINT N'The database settings cannot be modified. You must be a SysAdmin to apply these settings.';
    END


GO
ALTER DATABASE [$(DatabaseName)]
    SET TARGET_RECOVERY_TIME = 0 SECONDS 
    WITH ROLLBACK IMMEDIATE;


GO
IF EXISTS (SELECT 1
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET FILESTREAM(NON_TRANSACTED_ACCESS = OFF),
                CONTAINMENT = NONE 
            WITH ROLLBACK IMMEDIATE;
    END


GO
IF EXISTS (SELECT 1
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET AUTO_CREATE_STATISTICS ON(INCREMENTAL = OFF),
                MEMORY_OPTIMIZED_ELEVATE_TO_SNAPSHOT = OFF,
                DELAYED_DURABILITY = DISABLED 
            WITH ROLLBACK IMMEDIATE;
    END


GO
IF EXISTS (SELECT 1
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET QUERY_STORE (QUERY_CAPTURE_MODE = ALL, DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_PLANS_PER_QUERY = 200, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 367), MAX_STORAGE_SIZE_MB = 100) 
            WITH ROLLBACK IMMEDIATE;
    END


GO
IF EXISTS (SELECT 1
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET QUERY_STORE = OFF 
            WITH ROLLBACK IMMEDIATE;
    END


GO
IF EXISTS (SELECT 1
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
        ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
        ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
        ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
        ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
        ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
        ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
        ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
    END


GO
IF EXISTS (SELECT 1
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET TEMPORAL_HISTORY_RETENTION ON 
            WITH ROLLBACK IMMEDIATE;
    END


GO
IF fulltextserviceproperty(N'IsFulltextInstalled') = 1
    EXECUTE sp_fulltext_database 'enable';


GO
PRINT N'Creating Table [dbo].[Bill]...';


GO
CREATE TABLE [dbo].[Bill] (
    [Id]        INT          IDENTITY (1, 1) NOT NULL,
    [BillNo]    VARCHAR (20) NULL,
    [StudentId] INT          NULL,
    [TeacherId] INT          NULL,
    [Type]      VARCHAR (3)  NULL,
    [Date]      DATE         NULL,
    [Amount]    INT          NULL,
    [Note]      CHAR (300)   NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Creating Table [dbo].[class]...';


GO
CREATE TABLE [dbo].[class] (
    [id]       INT          IDENTITY (1, 1) NOT NULL,
    [title]    VARCHAR (50) NULL,
    [capacity] INT          NULL,
    [gender]   VARCHAR (10) NULL,
    [grade]    VARCHAR (10) NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
PRINT N'Creating Table [dbo].[Report]...';


GO
CREATE TABLE [dbo].[Report] (
    [Id]          INT           IDENTITY (1, 1) NOT NULL,
    [ReportTitle] VARCHAR (100) NULL,
    [StartDate]   DATE          NULL,
    [FinishDate]  DATE          NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Creating Table [dbo].[student]...';


GO
CREATE TABLE [dbo].[student] (
    [id]           INT             IDENTITY (1, 1) NOT NULL,
    [name]         VARCHAR (30)    NULL,
    [lastName]     VARCHAR (30)    NULL,
    [fatherName]   VARCHAR (30)    NULL,
    [missedDays]   INT             NULL,
    [birthdate]    DATE            NULL,
    [phone]        CHAR (15)       NULL,
    [classId]      INT             NULL,
    [billRequired] DECIMAL (18, 2) NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
PRINT N'Creating Table [dbo].[Subject]...';


GO
CREATE TABLE [dbo].[Subject] (
    [Id]          INT          IDENTITY (1, 1) NOT NULL,
    [Subject]     VARCHAR (50) NULL,
    [MaximumMark] INT          NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Creating Table [dbo].[SubTeachClass]...';


GO
CREATE TABLE [dbo].[SubTeachClass] (
    [Id]         INT IDENTITY (1, 1) NOT NULL,
    [ClassId]    INT NOT NULL,
    [TeachSubId] INT NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Creating Table [dbo].[teacher]...';


GO
CREATE TABLE [dbo].[teacher] (
    [Id]       INT          IDENTITY (1, 1) NOT NULL,
    [Name]     VARCHAR (30) NULL,
    [LastName] VARCHAR (30) NULL,
    [Phone]    VARCHAR (15) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Creating Table [dbo].[TeacherSubject]...';


GO
CREATE TABLE [dbo].[TeacherSubject] (
    [Id]        INT IDENTITY (1, 1) NOT NULL,
    [SubjectId] INT NOT NULL,
    [TeacherId] INT NOT NULL,
    [Salary]    INT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Creating Table [dbo].[Test]...';


GO
CREATE TABLE [dbo].[Test] (
    [Id]             INT          IDENTITY (1, 1) NOT NULL,
    [ReportId]       INT          NULL,
    [SubjectId]      INT          NULL,
    [TestType]       VARCHAR (30) NULL,
    [Date]           DATE         NULL,
    [CorrectionDate] DATE         NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Creating Table [dbo].[TestMark]...';


GO
CREATE TABLE [dbo].[TestMark] (
    [Id]        INT IDENTITY (1, 1) NOT NULL,
    [StudentId] INT NULL,
    [TestId]    INT NULL,
    [Mark]      INT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[student]...';


GO
ALTER TABLE [dbo].[student]
    ADD DEFAULT 0 FOR [missedDays];


GO
PRINT N'Creating Foreign Key [dbo].[Bill_Student_Fk]...';


GO
ALTER TABLE [dbo].[Bill]
    ADD CONSTRAINT [Bill_Student_Fk] FOREIGN KEY ([StudentId]) REFERENCES [dbo].[student] ([id]);


GO
PRINT N'Creating Foreign Key [dbo].[Bill_Teacher_Fk]...';


GO
ALTER TABLE [dbo].[Bill]
    ADD CONSTRAINT [Bill_Teacher_Fk] FOREIGN KEY ([TeacherId]) REFERENCES [dbo].[teacher] ([Id]);


GO
PRINT N'Creating Foreign Key [dbo].[fk_class]...';


GO
ALTER TABLE [dbo].[student]
    ADD CONSTRAINT [fk_class] FOREIGN KEY ([classId]) REFERENCES [dbo].[class] ([id]) ON DELETE SET NULL ON UPDATE CASCADE;


GO
PRINT N'Creating Foreign Key [dbo].[fk_teaching_class]...';


GO
ALTER TABLE [dbo].[SubTeachClass]
    ADD CONSTRAINT [fk_teaching_class] FOREIGN KEY ([ClassId]) REFERENCES [dbo].[class] ([id]) ON UPDATE CASCADE;


GO
PRINT N'Creating Foreign Key [dbo].[fk_teaching_id]...';


GO
ALTER TABLE [dbo].[SubTeachClass]
    ADD CONSTRAINT [fk_teaching_id] FOREIGN KEY ([TeachSubId]) REFERENCES [dbo].[TeacherSubject] ([Id]);


GO
PRINT N'Creating Foreign Key [dbo].[TeacherSub_Subject_Fk]...';


GO
ALTER TABLE [dbo].[TeacherSubject]
    ADD CONSTRAINT [TeacherSub_Subject_Fk] FOREIGN KEY ([SubjectId]) REFERENCES [dbo].[Subject] ([Id]) ON UPDATE CASCADE;


GO
PRINT N'Creating Foreign Key [dbo].[TeacherSub_Teacher_Fk]...';


GO
ALTER TABLE [dbo].[TeacherSubject]
    ADD CONSTRAINT [TeacherSub_Teacher_Fk] FOREIGN KEY ([TeacherId]) REFERENCES [dbo].[teacher] ([Id]) ON UPDATE CASCADE;


GO
PRINT N'Creating Foreign Key [dbo].[Test_Report_Fk]...';


GO
ALTER TABLE [dbo].[Test]
    ADD CONSTRAINT [Test_Report_Fk] FOREIGN KEY ([ReportId]) REFERENCES [dbo].[Report] ([Id]);


GO
PRINT N'Creating Foreign Key [dbo].[Test_Subject_Fk]...';


GO
ALTER TABLE [dbo].[Test]
    ADD CONSTRAINT [Test_Subject_Fk] FOREIGN KEY ([SubjectId]) REFERENCES [dbo].[Subject] ([Id]);


GO
PRINT N'Creating Foreign Key [dbo].[TestMark_Student_Fk]...';


GO
ALTER TABLE [dbo].[TestMark]
    ADD CONSTRAINT [TestMark_Student_Fk] FOREIGN KEY ([StudentId]) REFERENCES [dbo].[student] ([id]);


GO
PRINT N'Creating Foreign Key [dbo].[TestMark_Test_Fk]...';


GO
ALTER TABLE [dbo].[TestMark]
    ADD CONSTRAINT [TestMark_Test_Fk] FOREIGN KEY ([TestId]) REFERENCES [dbo].[Test] ([Id]);


GO
PRINT N'Creating Check Constraint [dbo].[Type_Enum]...';


GO
ALTER TABLE [dbo].[Bill]
    ADD CONSTRAINT [Type_Enum] CHECK (type in ('in', 'out'));


GO
PRINT N'Creating Check Constraint [dbo].[Bill_Quick_Validation]...';


GO
ALTER TABLE [dbo].[Bill]
    ADD CONSTRAINT [Bill_Quick_Validation] CHECK ((StudentId is null and TeacherId is not null) or
								(StudentId is not null and TeacherId is null) or 
								(StudentId is null and TeacherId is null and note is not null));


GO
PRINT N'Creating Check Constraint unnamed constraint on [dbo].[class]...';


GO
ALTER TABLE [dbo].[class]
    ADD CHECK (gender IN ('male','female'));


GO
PRINT N'Creating Check Constraint unnamed constraint on [dbo].[class]...';


GO
ALTER TABLE [dbo].[class]
    ADD CHECK (grade IN ('bachelor','ninth'));


GO
PRINT N'Creating Check Constraint [dbo].[TestType_Enum]...';


GO
ALTER TABLE [dbo].[Test]
    ADD CONSTRAINT [TestType_Enum] CHECK (TestType IN ('quiz', 'exam', 'revision', 'final'));


GO
PRINT N'Creating Procedure [dbo].[ClassAdd]...';


GO
CREATE PROCEDURE [dbo].[ClassAdd]
	@Id int,
	@Title VARCHAR(50),
	@Capacity INT,
	@Gender VARCHAR(10),
	@Grade VARCHAR(10)
AS
	INSERT INTO Class(title, capacity, gender, grade)
	VALUES (@Title, @Capacity, @Gender, @Grade);
RETURN 0
GO
PRINT N'Creating Procedure [dbo].[ClassDelete]...';


GO
CREATE PROCEDURE [dbo].[ClassDelete]
	@Id int
AS
	DELETE FROM Class
	WHERE id = @Id;
RETURN 0
GO
PRINT N'Creating Procedure [dbo].[ClassGetAll]...';


GO
CREATE PROCEDURE [dbo].[ClassGetAll]
AS
BEGIN
	SELECT * 
	FROM class c join student s ON c.id = s.classId;
END
GO
PRINT N'Creating Procedure [dbo].[ClassGetDetails]...';


GO

CREATE PROCEDURE [dbo].[ClassGetDetails]
	@Id int
AS
BEGIN
	SELECT *
	FROM class c LEFT OUTER JOIN student s ON c.id = s.classId
	WHERE c.id = @Id;
END
GO
PRINT N'Creating Procedure [dbo].[ClassUpdate]...';


GO
CREATE PROCEDURE [dbo].[ClassUpdate]
	@Id int,
	@Title VARCHAR(50),
	@Capacity INT,
	@Gender VARCHAR(10),
	@Grade VARCHAR(10)
AS
	UPDATE Class
	SET title = @Title, capacity = @Capacity, gender = @Gender, grade = @Grade
	WHERE id = @Id;
RETURN 0
GO
PRINT N'Creating Procedure [dbo].[ReportAdd]...';


GO
CREATE PROCEDURE [dbo].[ReportAdd]
	@Id int,
	@ReportTitle VARCHAR(100),
	@StartDate DATE,
	@FinishDate DATE
AS
	INSERT INTO Report(ReportTitle, StartDate, FinishDate)
	VALUES(@ReportTitle, @StartDate, @FinishDate);
RETURN 0
GO
PRINT N'Creating Procedure [dbo].[ReportDelete]...';


GO
CREATE PROCEDURE [dbo].[ReportDelete]
	@Id int
AS
	DELETE FROM Report
	WHERE Id = @Id;
RETURN 0
GO
PRINT N'Creating Procedure [dbo].[ReportGet]...';


GO
CREATE PROCEDURE [dbo].[ReportGet]
	@Id int
AS
BEGIN
	SELECT * FROM Report
	WHERE Id = @Id;
END
GO
PRINT N'Creating Procedure [dbo].[ReportGetAll]...';


GO
CREATE PROCEDURE [dbo].[ReportGetAll]
AS
BEGIN
	SELECT * FROM Report
END
GO
PRINT N'Creating Procedure [dbo].[ReportUpdate]...';


GO
CREATE PROCEDURE [dbo].[ReportUpdate]
	@Id int,
	@ReportTitle VARCHAR(100),
	@StartDate Date,
	@FinishDate Date
AS
	UPDATE Report 
	SET ReportTitle = @ReportTitle,
		StartDate = @StartDate,
		FinishDate = @FinishDate
	WHERE Id = @Id;
RETURN 0
GO
PRINT N'Creating Procedure [dbo].[StudentAdd]...';


GO
CREATE PROCEDURE [dbo].[StudentAdd]
	@Id int,
	@Name VARCHAR(30),
	@LastName VARCHAR(30),
	@FatherName VARCHAR(30),
	@Birthdate DATE,
	@Phone CHAR(15),
	@ClassId INT,
	@MissedDays INT,
	@BillRequired INT
AS
BEGIN
	INSERT INTO student(
		name,
		lastName,
		fatherName,
		birthdate,
		phone,
		classId,
		missedDays,
		billRequired
	)
	VALUES(
		@Name,
		@LastName,
		@FatherName,
		@Birthdate,
		@Phone,
		@ClassId,
		@MissedDays,
		@BillRequired
	)
END
GO
PRINT N'Creating Procedure [dbo].[StudentDelete]...';


GO
CREATE PROCEDURE [dbo].[StudentDelete]
	@Id int
AS
	delete from student
	where id = @Id
RETURN 0
GO
PRINT N'Creating Procedure [dbo].[StudentGet]...';


GO
CREATE PROCEDURE [dbo].[StudentGet]
	@Id int
AS
BEGIN
	SELECT * FROM student
	WHERE id = @Id
END
GO
PRINT N'Creating Procedure [dbo].[StudentGetAll]...';


GO
CREATE PROCEDURE [dbo].[StudentGetAll]
AS
begin
	SELECT * from student;
end
GO
PRINT N'Creating Procedure [dbo].[StudentUpdate]...';


GO
CREATE PROCEDURE [dbo].[StudentUpdate]
	@Id int,
	@Name varchar(30),
	@LastName varchar(30),
	@FatherName varchar(30),
	@Birthdate date,
	@Phone char(15),
	@ClassId int,
	@MissedDays int,
	@BillRequired int
AS
BEGIN
	UPDATE student
	SET name = @Name,
		lastName = @LastName,
		fatherName = @FatherName,
		birthdate = @Birthdate,
		phone = @Phone,
		classId = @ClassId,
		missedDays = @MissedDays,
		billRequired = @BillRequired
	WHERE id = @Id
END
GO
PRINT N'Creating Procedure [dbo].[SubjectAdd]...';


GO
CREATE PROCEDURE [dbo].[SubjectAdd]
	@Id INT,
	@Subject VARCHAR(100),
	@MaximumMark INT
AS
	INSERT INTO Subject(Subject, MaximumMark)
	VALUES (@Subject, @MaximumMark);
RETURN 0
GO
PRINT N'Creating Procedure [dbo].[SubjectDelete]...';


GO
CREATE PROCEDURE [dbo].[SubjectDelete]
	@Id INT
AS
	DELETE FROM Subject
	WHERE Id = @Id;
RETURN 0
GO
PRINT N'Creating Procedure [dbo].[SubjectGet]...';


GO
CREATE PROCEDURE [dbo].[SubjectGet]
	@Id int
AS
BEGIN
	SELECT * FROM Subject
	WHERE Id = @Id;
END
GO
PRINT N'Creating Procedure [dbo].[SubjectGetAll]...';


GO
CREATE PROCEDURE [dbo].[SubjectGetAll]
AS
BEGIN
	SELECT * FROM Subject;
END
GO
PRINT N'Creating Procedure [dbo].[SubjectUpdate]...';


GO
CREATE PROCEDURE [dbo].[SubjectUpdate]
	@Id INT,
	@Subject VARCHAR(100),
	@MaximumMark INT
AS
BEGIN
	UPDATE Subject
	SET Subject = @Subject,
		MaximumMark = @MaximumMark
	WHERE Id = @Id;
END
GO
PRINT N'Creating Procedure [dbo].[TestGet]...';


GO
CREATE PROCEDURE [dbo].[TestGet]
@ReportId int
AS
BEGIN
	SELECT r.ReportTitle as Report,
		s.Subject as Subject,
		s.MaximumMark as MaxMark,
		t.TestType as Type,
		t.Date as Date
	FROM Test t left outer join Report r on t.ReportId = r.Id 
	left outer join Subject s on t.SubjectId = s.Id
	WHERE r.Id = @ReportId
	order by r.Id ASC;
END
GO
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
GO

GO
DECLARE @VarDecimalSupported AS BIT;

SELECT @VarDecimalSupported = 0;

IF ((ServerProperty(N'EngineEdition') = 3)
    AND (((@@microsoftversion / power(2, 24) = 9)
          AND (@@microsoftversion & 0xffff >= 3024))
         OR ((@@microsoftversion / power(2, 24) = 10)
             AND (@@microsoftversion & 0xffff >= 1600))))
    SELECT @VarDecimalSupported = 1;

IF (@VarDecimalSupported > 0)
    BEGIN
        EXECUTE sp_db_vardecimal_storage_format N'$(DatabaseName)', 'ON';
    END


GO
PRINT N'Update complete.';


GO