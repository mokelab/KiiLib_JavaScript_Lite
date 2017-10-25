/// <reference path="./ractive.d.ts"/>
var n1 = "    ";
var n2 = n1 + n1;
var n3 = n2 + n1;
var n4 = n3 + n1;

var clients = [
    { name : 'XHR' , value : n2 + "return new Promise((resolve,reject) => {\n" +
      n3 + "var xhr = new XMLHttpRequest();\n" +
      n3 + "xhr.open(method, baseURL + url, true);\n" + 
      n3 + "xhr.setRequestHeader(\"x-kii-appid\", appId);\n" + 
      n3 + "xhr.setRequestHeader(\"x-kii-appkey\", appKey);\n" + 
      n3 + "xhr.setRequestHeader(\"Content-Type\", type);\n" + 
      n3 + "if (Kii.token != null) {\n" +
      n4 + "xhr.setRequestHeader(\"Authorization\", \"bearer \" + Kii.token);\n" + 
      n3 + "}\n" +
      n3 + "xhr.responseType = 'json';\n" +
      n3 + "xhr.onload = function() {\n" +
      n4 + "    resolve({status : this.status, body : this.response});\n" +
      n3 + "}\n" +
      n3 + "if (body == null) {\n" +
      n4 + "xhr.send();\n" +
      n3 + "} else {\n" +
      n4 + "xhr.send(JSON.stringify(body));\n" + 
      n3 + "}\n" +
      n2 + "});"
    },
];

var apis = [
    { name: "Login as AppAdmin", value: 
      n1 + "Kii.loginAsAdmin = (clientId, clientSecret) => {\n" +
      n2 + "return send('POST', '/oauth2/token', typeJson, {client_id : clientId, client_secret : clientSecret})\n" +
      n3 + ".then((o) => {\n" +
      n4 + "if (o.status == 200) { Kii.token = o.body.access_token; return o}\n" +
      n4 + "return Promise.reject(o);\n" +
      n3 + "});\n" +      
      n1 + "}"
    },
    { name: "Login as AppUser", value: 
      n1 + "Kii.login = (identifier, password) => {\n" +
      n2 + "return send('POST', '/oauth2/token', typeJson, {username : identifier, password : password})\n" +
      n3 + ".then((o) => {\n" +
      n4 + "if (o.status == 200) { Kii.token = o.body.access_token; return o}\n" +
      n4 + "return Promise.reject(o);\n" +
      n3 + "});\n" +      
      n1 + "}"
    },
    { name: "Fetch entity", value: 
      n1 + "Kii.fetch = (id) => {\n" +
      n2 + "return send('GET', '/apps/' + appId + id, typeJson, null)\n" +
      n3 + ".then((o) => {\n" +
      n4 + "if (o.status == 200) { return o.body}\n" +
      n4 + "return Promise.reject(o);\n" +
      n3 + "});\n" +      
      n1 + "}"
    },
];
var r;
function create() {
    var client = r.get('client');
    var list = r.get('list');
    var out = "var lib = function(appId, appKey, baseURL){\n" + 
        n1 + "var Kii = { token : null };\n" +
        n1 + "var typeJson = 'application/json';\n" +
        n1 + "function send(method,url,type,body){\n";
    out += client.value + "\n";
    out += n1 + "}\n";
    list.forEach((item) => {
        out += item.value + "\n";
    });
    out += n1 + "return Kii;\n";
    out += "};\n";
    r.set('out', out);
}

r = new Ractive({
    el : '#container',
    template : '#template',
    data : {
        clients : clients,
        apis : apis,
        list : [],
    },
    addAPI : (index) => {
        var item = r.get('apis')[index];
        r.splice('apis', index, 1);
        r.push('list', item);
    },
    removeAPI : (index) => {
        var item = r.get('list')[index];
        r.splice('list', index, 1);
        r.push('apis', item);
    },
    create : create,
});