/**
 * Created by yzsoft on 16/3/16.
 */
let session,
    handleSession,
    handleMemory,
    handleLocalStorage;
session=window.sessionStorage;

var db = new loki('SiteLoki.json');
var children = db.addCollection('children');
    handleMemory = {
        "set": function (key, data) {
            children.insert({ id: key, value: data });
        },
        "get": function (key) {
            var ary = children.find({ id: key });
            if (ary != undefined) {
                if (ary.length == 0)
                    return null;
                return ary[0].value;
            }
            return null;
        }
    };
    handleSession={
        set:function(k,v){
            session.setItem(k, v);
        },
        get:function(k){
            return session.getItem(k);
        },
        remove:function(k){
            session.removeItem(k);
        }
    };
    //localStorage
    handleLocalStorage={
        set:function(key,data){
            store.set(key, data);
        },
        get:function(key){
            //debugger;
            var result;
            result=store.get(key);
            return result;
        },
        remove:function(key){
            store.remove(key);
        }
    };

module.exports={handleSession,handleMemory,handleLocalStorage};