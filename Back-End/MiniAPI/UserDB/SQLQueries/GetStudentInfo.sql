SELECT R.ReportTitle as Report, c.title as Class, Sb.Subject ,s.name + ' ' + s.lastName as FullName, tm.Mark, sb.MaximumMark
FROM TestMark tm join Test t on	 tm.TestId = t.Id
JOIN student s on tm.StudentId = s.id
JOIN class c on s.classId = c.id
join Subject sb on	 t.SubjectId = sb.Id
JOIN Report r on t.ReportId = r.Id
WHERE t.ReportId = 1 AND c.title = 'A'
order by Mark DESC, Class ASC;
