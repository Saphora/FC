SELECT s."Name", s."PageKey", r."Name", mi."Name" FROM dbo."MenuSections" as s  LEFT JOIN dbo."MenuSection2Roles" as ms2r
ON s."SectionID" = ms2r."MenuSectionID"
LEFT join dbo."Roles" as r on r."RoleID" = ms2r."RoleID"
LEFT join dbo."MenuItems" as mi on ms2r."MenuSectionID" = mi."SectionID"
WHERE s."Name" = 'GENERAL'

DELETE from dbo."MenuSection2Roles";
delete from dbo."MenuItems";
DELETE from dbo."MenuSections";