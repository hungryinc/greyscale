module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            less: {
                files: ['greyscale/**/*.less'],
                tasks: ['less']
            },
        },
        less: {
            build: {
                options: {
                    compress: true
                },
                files: {
                    'greyscale.css': ['greyscale/greyscale.less']
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
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['less']);
};