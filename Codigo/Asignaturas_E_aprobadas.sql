/*
 6----------------------------------------------------------------------------------*/
SELECT
    asig.codasignatura,
    asig.nombreasig,
    asig.semestre,
    COUNT (
        CASE
            WHEN calif.estatusn = 'A' THEN 1
        END
    ) AS estudiantes_aprobados
FROM
    asignaturas asig
    INNER JOIN secciones sec ON asig.codasignatura = sec.codasignatura
    INNER JOIN calificaciones calif ON calif.NRC = sec.NRC
WHERE
    asig.StatusA = 'E'
GROUP BY
    asig.codasignatura
ORDER BY
    asig.semestre DESC,
    estudiantes_aprobados DESC;

--------------------------------------------------------------------------------------
SELECT
    a.codasignatura,
    a.nombreasig,
    a.semestre,
    COUNT (*) FILTER(
        WHERE
            c.estatusn = 'A'
    ) AS estudiantes_aprobados
FROM
    asignaturas a
    INNER JOIN secciones AS s USING (codasignatura)
    INNER JOIN calificaciones AS c USING (NRC)
WHERE
    a.StatusA = 'E'
GROUP BY
    a.codasignatura
ORDER BY
    a.semestre DESC,
    estudiantes_aprobados DESC;