CREATE TABLE [dbo].[settings]
(
	attribute VARCHAR(256) primary key,
	value NVARCHAR(1024),
	CONSTRAINT attributes_values_validation CHECK (
	(attribute = 'language' AND (value in ('arabic', 'english')))
	OR (attribute = 'status' AND (value in ('logged in', 'logged out')))
	OR (attribute NOT IN ('status', 'language'))
	)
)
