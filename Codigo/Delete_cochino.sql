/*
9----------------------------------------------------------------------------------*/

DELETE 
WITH ProfesoresEliminados AS (
	DELETE FROM profesores 
	WHERE statusp = 'R' AND (SELECT DATE_PART('year', CURRENT_DATE::DATE) - 
							 DATE_PART('year', fechaegr::DATE) > 10)
	RETURNING *
)
INSERT INTO historicoprofesor 
(cedulaprof, nombrep, direccionp, telefonop, categoria, dedicacion, fechaing, fechaegr, statusp)
SELECT * FROM ProfesoresEliminados;