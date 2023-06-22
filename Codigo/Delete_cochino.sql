/*
 9----------------------------------------------------------------------------------*/
BEGIN TRANSACTION;

INSERT INTO
	historicoprofesor
SELECT
	cedulaprof,
	nombrep,
	direccionp,
	telefonop,
	categoria,
	dedicacion,
	fechaing,
	fechaegr,
	statusp
FROM
	profesores
WHERE
	statusp = 'R'
	AND (CURRENT_DATE - fechaegr) > 3652;

DELETE FROM
	calificaciones
WHERE
	nrc IN (
		SELECT
			nrc
		FROM
			secciones
		WHERE
			cedulaprof IN (
				SELECT
					cedulaprof
				FROM
					profesores
				WHERE
					statusp = 'R'
					AND (CURRENT_DATE - fechaegr) > 3652
			)
	);

DELETE FROM
	secciones
WHERE
	cedulaprof IN (
		SELECT
			cedulaprof
		FROM
			profesores
		WHERE
			statusp = 'R'
			AND (CURRENT_DATE - fechaegr) > 3652
	);

DELETE FROM
	profesores
WHERE
	statusp = 'R'
	AND (CURRENT_DATE - fechaegr) > 3652;

COMMIT TRANSACTION;
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
	WHERE
		cedulaprof = (
			SELECT
				cedulaprof
			FROM
				profesores_retirados_10_egr
		) RETURNING *
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