module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                livereload: true,
            },
            less: {
                files: ['hungry/**/*.less'],
                tasks: ['less']
            },
        },
        less: {
            build: {
                options: {
                    compress: true
                },
                files: {
                    'hungry.css': ['hungry/hungry.less']
                }
            }
        }
    })

    grunt.event.on('watch', function(action, filepath, target) {
        var tasks = ['uglify', 'htmlmin'];

        for (var i = 0; i < tasks.length; i++) {
            var file = filepath.replace(grunt.config(tasks[i] + '.build.cwd'), '');
            grunt.config(tasks[i] + '.build.src', file);
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');

    // Default task(s).
    grunt.registerTask('default', ['less']);
};