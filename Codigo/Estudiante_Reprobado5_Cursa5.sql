/*
 7----------------------------------------------------------------------------------*/
SELECT
	est.idestudiante,
	est.nombreest,
	COUNT(DISTINCT sec.codasignatura) AS asignaturas_cursadas,
	COUNT(
		CASE
			WHEN calif.estatusn = 'R' THEN 1
		END
	) AS asignaturas_reprobadas
FROM
	estudiantes est
	INNER JOIN calificaciones calif ON est.idestudiante = calif.idestudiante
	INNER JOIN secciones sec ON calif.nrc = sec.nrc
WHERE
	(
		SELECT
			COUNT(*)
		FROM
			calificaciones calif2
		WHERE
			calif2.idestudiante = est.idestudiante
			AND calif2.estatusn = 'R'
	) > 5
	AND (
		SELECT
			COUNT(*)
		FROM
			calificaciones calif2
			INNER JOIN secciones sec2 ON calif2.nrc = sec2.nrc
		WHERE
			est.idestudiante = calif2.idestudiante
			AND (
				ABS(2023 - CAST(RIGHT(sec2.lapso, 4) AS INT)) > 5
			)
	) > 0
GROUP BY
	est.idestudiante
ORDER BY
	asignaturas_reprobadas DESC;

--------------------------------------------------------------------------------------
WITH estudiantes_activos_5_años AS (
	SELECT
		DISTINCT idestudiante,
		nombreest
	FROM
		estudiantes
		INNER JOIN calificaciones USING (idestudiante)
		INNER JOIN secciones USING (nrc)
	WHERE
		statusest = 'Activo'
		AND (
			EXTRACT(
				YEAR
				FROM
					CURRENT_DATE
			) - CAST(RIGHT(lapso, 4) AS INT)
		) > 5
),
asignaturas_cursadas AS (
	SELECT
		DISTINCT idestudiante,
		nombreest,
		codasignatura
	FROM
		estudiantes_activos_5_años
		INNER JOIN calificaciones USING (idestudiante)
		INNER JOIN secciones USING (nrc)
		INNER JOIN asignaturas USING (codasignatura)
	GROUP BY
		idestudiante,
		nombreest,
		codasignatura
	ORDER BY
		idestudiante
),
asignaturas_reprobadas AS (
	SELECT
		DISTINCT idestudiante,
		nombreest,
		codasignatura
	FROM
		asignaturas_cursadas
		INNER JOIN secciones USING (codasignatura)
		INNER JOIN calificaciones USING (idestudiante, nrc)
	WHERE
		estatusn = 'R'
	GROUP BY
		idestudiante,
		nombreest,
		codasignatura
	ORDER BY
		idestudiante
)
SELECT
	idestudiante,
	nombreest,
	COUNT(DISTINCT ac.codasignatura) AS cant_cursadas,
	COUNT(DISTINCT ar.codasignatura) AS cant_reprobadas
FROM
	asignaturas_cursadas ac
	INNER JOIN asignaturas_reprobadas ar USING (idestudiante, nombreest)
GROUP BY
	idestudiante,
	nombreest
ORDER BY
	cant_reprobadas DESC;