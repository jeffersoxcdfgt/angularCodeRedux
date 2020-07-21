import { InMemoryDbService } from 'angular-in-memory-web-api';

export class AppInMemoryApi  implements InMemoryDbService{
      createDb(){
        return {
          'players':[
             {
                "id":1,
                "first_name":"Kobe",
                "last_name":"Bryant",
                "photo":"./kobe2.jpg",
                "career_end_year":"2016",
                "career_start_year":"1996",
                "country_id":1,
                "height":198,
                "weight":"96.20",
                "birthday":"1978-08-23",
                "current_team_id":1,
                "college_id":1,
                "current_number":24,
                "rating":9,
                "nba_profile":977,
                "photo_play":"/path/photo.jpg",
                "position":"2"
             },
             {
                "id":2,
                "first_name":"Vince",
                "last_name":"Carter",
                "photo":"./vince2.jpg",
                "career_end_year":null,
                "career_start_year":"1998",
                "country_id":2,
                "height":198,
                "weight":"99.80",
                "birthday":"1977-01-26",
                "current_team_id":2,
                "college_id":2,
                "current_number":15,
                "rating":8,
                "nba_profile":1713,
                "photo_play":"/path/photo2.jpg",
                "position":"3"
             }
          ],
          'roles':[
            {
              "id":1,
              "rol_name":"Rol1"
            },
            {
              "id":2,
              "rol_name":"Rol2"
            }
          ],
          'zonas':[
            {
              "id":1,
              "departamento":"Valle del Cauca",
              "municipio":"Cali",
              "nombre_zona":"Sur",
              "descripcion":"Zona residencial"
            },
            {
              "id":2,
              "departamento":"Antioquia",
              "municipio":"Medellin",
              "nombre_zona":"Laureles",
              "descripcion":"Zona residencial"
          }
        ],
          'ivas':[
            {
               "ivaId": 1,
               "ivaNombre": "General",
               "ivaDescripcion": "General del 19.8%",
               "ivaRegistradopor": "desarrollo",
               "ivaFechaCreacion": "2020-02-27T00:00:00",
               "ivaValor": 19.0,
               "producto": []
            },
            {
              "ivaId": 6,
              "ivaNombre": "Reducido",
              "ivaDescripcion": "Iva reducido al 6%",
              "ivaRegistradopor": "desarrollo",
              "ivaFechaCreacion": "2020-02-23T00:00:00",
              "ivaValor": 6.0,
              "producto": []
            }
          ],
          'sectores':[
            {
              "sectId": 2009889,
              "sectAbreviatura": "BG",
              "sectNombre": "Bogota23",
              "sectDescripcion": "qwertyuiop",
              "sectRecargo": 5000.0
            },
            {
              "sectId": 2009892,
              "sectAbreviatura": "AV12",
              "sectNombre": "Avenida 12",
              "sectDescripcion": "Avenida santander calle 12",
              "sectRecargo": 500.0
            },
          ],
          'empresas':[
              {
                "emprId": 1,
                "emprNit": "40441757777777777777",
                "emprNombre": "sitelca",
                "emprDireccion": "onoto calle principal 5 bis",
                "emprEmail": "saoes@hotmail.com",
                "emprTelefono": "41471100000",
                "emprTelefax": "4444ererer",
                "emprFechaInicio": "2010-10-10T00:00:00",
                "emprCiudad": "LOS  PATIOS                ",
                "departamento": "NORTE DE SANTANDER  ",
                "idEmprCiudad": 54405,
                "idDepartamento": 54,
                "persona": null
            },
            {
                "emprId": 23,
                "emprNit": "9008728756",
                "emprNombre": "IQ Outsourcnig",
                "emprDireccion": "Calle 26 No. 14-87",
                "emprEmail": "iq@lainmail.com",
                "emprTelefono": "830981",
                "emprTelefax": "0762761",
                "emprFechaInicio": "2020-02-25T00:00:00",
                "emprCiudad": "ALBANIA                    ",
                "departamento": "SANTANDER           ",
                "idEmprCiudad": 68020,
                "idDepartamento": 68,
                "persona": null
            }
          ],
          'personas':[
            {
              "persId": "1",
              "esciId": 1,
              "persNumDocumento": "1143553452",
              "persIscontribuyente": true,
              "persNombre": "juan loza",
              "persApellido": "lozano",
              "persFechanacimiento": "2010-10-14T00:00:00",
              "persSexo": "Hombre",
              "sexId": 1,
              "persDireccion": "kkr23",
              "persTelefono": "3003003",
              "persCelular": "3003003003",
              "persEmail": "juan@gmail.com",
              "esciNombre": "Soltero(a)",
              "tipeId": 1,
              "tipoPersona": "Judirica",
              "tidoId": 1,
              "tipodocumento": "Cc",
              "empresa": null,
              "zona": null,
              "rol": null,
              "rolNombre": null
            },
            {
              "persId": "888888",
              "esciId": 3,
              "persNumDocumento": "888888",
              "persIscontribuyente": true,
              "persNombre": "aaaaaaaaaaaaaa",
              "persApellido": "bbbbbbbbbbbb",
              "persFechanacimiento": "2000-02-27T00:00:00",
              "persSexo": "Hombre",
              "sexId": 1,
              "persDireccion": "888888",
              "persTelefono": "888888",
              "persCelular": "888888",
              "persEmail": "ababababa",
              "esciNombre": "Divorciado(a)",
              "tipeId": 2,
              "tipoPersona": "Natural",
              "tidoId": 1,
              "tipodocumento": "Cc",
              "empresa": null,
              "zona": null,
              "rol": null,
              "rolNombre": null
            },
            {
            "persId": "a4444",
            "esciId": 2,
            "persNumDocumento": "88262555",
            "persIscontribuyente": true,
            "persNombre": "Wasf",
            "persApellido": "wasf",
            "persFechanacimiento": "2009-09-24T00:00:00",
            "persSexo": "Hombre",
            "sexId": 1,
            "persDireccion": "4444",
            "persTelefono": "4444",
            "persCelular": "4444",
            "persEmail": "wasf",
            "esciNombre": "Casado(a)",
            "tipeId": 2,
            "tipoPersona": "Natural",
            "tidoId": 1,
            "tipodocumento": "Cc",
            "empresa": null,
            "zona": null,
            "rol": null,
            "rolNombre": null
          }
        ],
          'contratos':[
            {
              "id":1,
              "contrato_name":"Contrato1"
            },
            {
              "id":2,
              "contrato_name":"Contrato2"
            },
          ],
          'servicios':[
            {
              "serId": 1,
              "serNombre": "Television basico",
              "serDescripcion": "Television Cable",
              "serCodigo": 200900100000,
              "serValor": 30000.0,
              "emprId": null
            },
            {
              "serId": 2,
              "serNombre": "Televisión + Internet",
              "serDescripcion": "Internet Cable",
              "serCodigo": 20158884512,
              "serValor": 34000.0,
              "emprId": null
            },
            {
              "serId": 6,
              "serNombre": "Televisión + Internet + Telefonía",
              "serDescripcion": "Televisión",
              "serCodigo": 11,
              "serValor": 36000.0,
              "emprId": null
            },
            {
              "serId": 7,
              "serNombre": "juegos en linea",
              "serDescripcion": "juegos en linea 2",
              "serCodigo": 12012,
              "serValor": 32000.0,
              "emprId": 1
            }                  
          ]
       }
     }
}
