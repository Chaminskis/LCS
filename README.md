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
