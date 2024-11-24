ALTER trigger dbo.emp_check_exp
on employee
INSTEAD OF UPDATE
as
BEGIN
	if(
	(select ABS(DATEDIFF(day, GETDATE(), started_in)/365.0) from emp_exp WHERE emp_id in (select id from inserted)) >= 
	(select min_exp_required from department WHERE department.id = (select department_id from inserted))
	)
		begin
			update employee set department_id = (select department_id from inserted) WHERE id = (select id from inserted)
		end;
	ELSE
		THROW 55000, 'no enough experience', 1
END


update employee set department_id = 1 where id = 1


SELECT * FROM employee

UPDATE department set min_exp_required = 2 where id = 1

select ABS(DATEDIFF(day, GETDATE(), started_in)/365.0) from emp_exp WHERE emp_id = 1