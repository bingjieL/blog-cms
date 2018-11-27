export function deepCopy(o) {
    if (o instanceof Array) {
        var n = [];
        for (var i = 0; i < o.length; ++i) {
            n[i] = deepCopy(o[i]);
        }
        return n;
    } else if (o instanceof Function) {
        var n = new Function("return " + o.toString())();
        return n
    } else if (o instanceof Object) {
        var n = {}
        for (var i in o) {
            n[i] = deepCopy(o[i]);
        }
        return n;
    } else {
        return o;
    }
}

export function ArrDeleteKey(key, arr, keyName) {
    let _arr = []
    arr.forEach(item => {
        if(keyName){
            if(item[keyName] != key){
                _arr.push(item)
            }
        }else{
            if(item!= key){
                _arr.push(item)
            }
        }
        return _arr
    });
}
