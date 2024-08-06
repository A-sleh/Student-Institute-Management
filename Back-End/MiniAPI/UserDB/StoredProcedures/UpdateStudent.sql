CREATE PROCEDURE [dbo].[UpdateStudent]
	@id int,
	@name varchar(30),
	@last_name varchar(30),
	@father_name varchar(30),
	@birthdate date,
	@phone char(15),
	@class_id int,
	@missed_days int,
	@bill_required int
AS
BEGIN
	UPDATE student
	set 
	name = @name,
	last_name = @last_name,
	father_name = @father_name,
	birthdate = @birthdate,
	phone = @phone,
	class_id = @class_id,
	missed_days = @missed_days,
	bill_required = @bill_required
	where id = @id
END

