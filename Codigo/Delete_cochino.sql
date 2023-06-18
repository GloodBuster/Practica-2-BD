/*
 9----------------------------------------------------------------------------------*/
DELETE WITH ProfesoresEliminados AS (
	DELETE FROM
		profesores
	WHERE
		statusp = 'R'
		AND (
			SELECT
				DATE_PART('year', CURRENT_DATE :: DATE) - DATE_PART('year', fechaegr :: DATE) > 10
		) RETURNING *
)
INSERT INTO
	historicoprofesor (
		cedulaprof,
		nombrep,
		direccionp,
		telefonop,
		categoria,
		dedicacion,
		fechaing,
		fechaegr,
		statusp
	)
SELECT
	*
FROM
	ProfesoresEliminados;

--------------------------------------------------------------------------------------
WITH profesores_retirados_10_egr AS (
	SELECT
		cedulaprof
	FROM
		profesores
	WHERE
		statusp = 'R'
		AND (CURRENT_DATE - fechaegr) > 3652
),
secciones_profesores AS (
	SELECT
		nrc,
		cedulaprof
	FROM
		secciones
		INNER JOIN profesores_retirados_10_egr USING (cedulaprof)
),
profesores_eliminados AS (
	DELETE FROM
		profesores
	FROM
		profesores
		INNER JOIN profesores_retirados_10_egr RETURNING *
) BEGIN;

SAVEPOINT my_savepoint;

DELETE FROM
	calificaciones
FROM
	calificaciones
	INNER JOIN secciones_profesores USING(nrc);

DELETE FROM
	secciones
FROM
	secciones
	INNER JOIN profesores_retirados_10_egr USING (cedulaprof);

INSERT INTO
	historicoprofesor (
		cedulaprof,
		nombrep,
		direccionp,
		telefonop,
		categoria,
		dedicacion,
		fechaing,
		fechaegr,
		statusp
	)
SELECT
	*
FROM
	profesores_eliminados;

ROLLBACK TO my_savepoint;

COMMIT;