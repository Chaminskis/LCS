##Web Admin and Service

** Install **

    npm install

** Run **

    node debug.js '' there's a config file called debug.


Gulp-Inject
==

**Template HTML**

    <html>
        <head>
            <!-- inject:css -->
                <!-- link tags -->
            <!-- endinject -->
        </head>
        <body>
        
        <!-- inject:js -->
        
            <!-- scripts tags --!>
        
        <!-- endinject -->
        </body>
    </html>
    
Gulp-Task
--
    gulp.task('dev-login-index',function(){
        var target = gulp.src('views/admin/login.html');
    
        var sources = gulp.src([
            'public/js/auth/controllers/*.js',
        ],{
            read:false // no leera los archivos simplemente los usara
        });

        return target
            .pipe(inject(sources,{
                ignorePath: 'public/', // eliminara el path de public/ de los scripts tags
                addRootSlash: true,
            }))
            .pipe(gulp.dest('views/admin'));
    });
    
**Task de produccion digamos**

al final es casi lo mismo solo que esta vez injectara los script minificados.


    gulp.task('prod-admin-index',function(){
        var target = gulp.src('views/admin/index.html');

        var sources = gulp.src([
            'public/dist/js/admin_script.min.js',
        ],{
            read:false
        });

        return target
        .pipe(inject(sources,{
            ignorePath: 'public/',
            addRootSlash: true,
        })).pipe(gulp.dest('views/admin'));
    });



Service
-----

** Hospital Type **

Lista de tipos de centros medicos.

http://lcs.blageek.net/app/manage/hospital_type/

    {
        error: false,
        message: "",
        result: [
            {
                id: 1,
                name: "HOSPITAL",
                details: "Hospital"
            },{
                id: 2,
                name: "CLINICA",
                details: "Clinica"
            },{
                id: 3,
                name: "ATENCION_PRIMARIA",
                details: "Unidad de atencion primaria"
            }
        ]
    }
    
    
** Hospital **

Retorna lista de hospitales

http://lcs.blageek.net/app/manage/hospital/

    {
        error: false,
        message: "",
        result: [
            {
                id: 1,
                name: "Centro medico simon bilivar",
                details: "Debitis quasi ullamco quos nullam! Ullamco fames",
                address: "Calle ovanco casi esquina albert thomas",
                latitude: 12.12,
                longitude: 34.56,
                hospital_type: 2,
                hospitalType: {
                    id: 2,
                    name: "CLINICA",
                    details: "Clinica"
                }
            }
        ]
    }
    
Search Hospital 

http://lcs.blageek.net/app/manage/hospital/search

    //POST
    //Request
    {
      "searchType":"LOCATION",
      "criteria":"laboris",
      "location":{
        "lat":12,
        "lon":34,
        "distance":39
      }
    }
    
    //RESPONSE 
    {
        "error": false,
        "message": "",
        "result": {
            "count": 1,
            "rows": [
                {
                    "id": 2,
                    "name": "CLINICA",
                    "details": "Clinica",
                    "address": "Calle ovanco casi esquina albert thomas",
                    "latitude": 12.12,
                    "longitude": 34.56,
                    "hospital_type": 2,
                    "distance": 38.7316152888085,
                    "hospitalType":{
                        id: 2,
                        name: "CLINICA",
                        details: "Clinica"
                    }
                }
            ]
        }
    }
    

** Medical Insurance **

Lista de seguros

http://lcs.blageek.net/app/manage/medical_insurance


    {
        error: false,
        message: "",
        result: {
        count: 3,
        rows: [
                {
                    id: 1,
                    name: "Humano",
                    details: "Seguro medico Humano"
                },{
                    id: 2,
                    name: "Plic",
                    details: "Palic seguros"
                },{
                    id: 3,
                    name: "ARS Senasa",
                    details: "ARS Senasa"
                }
            ]
        }
    }
    
** Doctors **

Lista de doctores

http://lcs.blageek.net/app/manage/doctor/

    {
        error: false,
        message: "",
        result: [
            {
                id: 1,
                name: "Doctor Fulano",
                last: "Apellido",
                details: "El mejor en oFugiat. Lectus pariatur in nostrud,",
            }
        ]
    }