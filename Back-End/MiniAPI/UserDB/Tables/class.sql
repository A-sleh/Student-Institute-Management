CREATE TABLE [dbo].[class]
(
	id INT IDENTITY(1,1) PRIMARY KEY,
	title varchar(50),
	capacity int,
	gender varchar(10) check (gender in ('male','female')),
	grade varchar(10) check (grade in ('bachelor','ninth'))
)
