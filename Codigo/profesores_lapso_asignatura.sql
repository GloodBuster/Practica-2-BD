/*
 3----------------------------------------------------------------------------------*/
SELECT
	prof.cedulaprof,
	prof.nombrep
FROM
	profesores prof,
	secciones sec
WHERE
	prof.cedulaprof = sec.cedulaprof
	AND sec.lapso = '252021'
	AND sec.codasignatura = (
		SELECT
			codasignatura
		FROM
			asignaturas
		WHERE
			nombreasig = 'Sistemas de Bases de Datos'
	)
ORDER BY
	prof.nombrep ASC;
--------------------------------------------------------------------------------------
SELECT
	cedulaprof,
	nombrep
FROM
	profesores
	INNER JOIN secciones USING (cedulaprof)
	INNER JOIN asignaturas USING (codasignatura)
WHERE
	lapso = '252021'
	AND nombreasig = 'Sistemas de Bases de Datos'
ORDER BY
	nombrep ASC;