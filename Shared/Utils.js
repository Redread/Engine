/**
 * Utils object 
 * 
 */
Redread.Utils = {
    select: function(obj, values){
        var result = values['default'] || null;
        for(v in values){
            if (v == obj) {
                result = values[v];
            };
        }
        return result;
    }
};
