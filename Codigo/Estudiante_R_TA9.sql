/*
 5----------------------------------------------------------------------------------*/
SELECT
    est.nombreest,
    est.idestudiante,
    asig.nombreasig,
    calif.calificacion
FROM
    calificaciones calif
    INNER JOIN secciones secc ON calif.NRC = secc.NRC
    INNER JOIN asignaturas asig ON secc.codasignatura = asig.codasignatura
    INNER JOIN estudiantes est ON est.idestudiante = calif.idestudiante
WHERE
    calif.estatusN = 'R'
    AND secc.lapso = '252022'
    AND asig.taxonomia = 'TA9'
ORDER BY
    est.idestudiante ASC;
--------------------------------------------------------------------------------------
SELECT
    e.nombreest,
    e.idestudiante,
    a.nombreasig,
    c.calificacion
FROM
    calificaciones AS c
    INNER JOIN secciones AS s USING (NRC)
    INNER JOIN asignaturas AS a USING (codasignatura)
    INNER JOIN estudiantes AS e USING (idestudiante)
WHERE
    c.estatusN = 'R'
    AND s.lapso = ('25' || to_char((EXTRACT(YEAR FROM CURRENT_DATE) - 1), 'FM9999'))
    AND a.taxonomia = 'TA9'
ORDER BY
    e.idestudiante ASC;