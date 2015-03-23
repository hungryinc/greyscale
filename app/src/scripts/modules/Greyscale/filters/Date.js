'use strict'

module.exports = function() {
    return function(input, uppercase) {
        var out = '';
        input = input || '';
        input = input.split('-');
        var months = {
            1: 'January',
            2: 'February',
            3: 'March',
            4: 'April',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'August',
            9: 'September',
            10: 'October',
            11: 'November',
            12: 'December'
        }
        out += months[parseInt(input[1])];
        out += ' ' + parseInt(input[0]);
        
        return out;
      };
}