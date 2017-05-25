SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "nqm-app-authenticate/": "src/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.21"
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "nqm-app-authenticate": {
      "main": "main.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {
    "assert": "npm:jspm-nodelibs-assert@0.2.1",
    "buffer": "npm:jspm-nodelibs-buffer@0.2.3",
    "child_process": "npm:jspm-nodelibs-child_process@0.2.1",
    "constants": "npm:jspm-nodelibs-constants@0.2.1",
    "crypto": "npm:jspm-nodelibs-crypto@0.2.1",
    "domain": "npm:jspm-nodelibs-domain@0.2.1",
    "events": "npm:jspm-nodelibs-events@0.2.2",
    "fs": "npm:jspm-nodelibs-fs@0.2.1",
    "http": "npm:jspm-nodelibs-http@0.2.0",
    "https": "npm:jspm-nodelibs-https@0.2.2",
    "nqm-mantra-core": "npm:nqm-mantra-core@1.8.1",
    "os": "npm:jspm-nodelibs-os@0.2.1",
    "path": "npm:jspm-nodelibs-path@0.2.3",
    "process": "npm:jspm-nodelibs-process@0.2.1",
    "prop-types": "npm:prop-types@15.5.10",
    "react": "npm:react@15.5.4",
    "react-dom": "npm:react-dom@15.5.4",
    "react-router": "npm:react-router@4.1.1",
    "react-router-dom": "npm:react-router-dom@4.1.1",
    "redux": "npm:redux@3.6.0",
    "stream": "npm:jspm-nodelibs-stream@0.2.1",
    "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.1",
    "url": "npm:jspm-nodelibs-url@0.2.1",
    "util": "npm:jspm-nodelibs-util@0.2.2",
    "vm": "npm:jspm-nodelibs-vm@0.2.1",
    "zlib": "npm:jspm-nodelibs-zlib@0.2.3"
  },
  packages: {
    "npm:nqm-mantra-core@1.8.1": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.23.0",
        "nqm-react-simple-di": "npm:nqm-react-simple-di@1.3.2",
        "nqm-react-komposer": "npm:nqm-react-komposer@2.0.1"
      }
    },
    "npm:nqm-react-simple-di@1.3.2": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.23.0",
        "hoist-non-react-statics": "npm:hoist-non-react-statics@1.2.0",
        "prop-types": "npm:prop-types@15.5.10"
      }
    },
    "npm:nqm-react-komposer@2.0.1": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.23.0",
        "hoist-non-react-statics": "npm:hoist-non-react-statics@1.2.0",
        "lodash.pick": "npm:lodash.pick@4.4.0",
        "react-stubber": "npm:react-stubber@1.0.0",
        "shallowequal": "npm:shallowequal@0.2.2"
      }
    },
    "npm:babel-runtime@6.23.0": {
      "map": {
        "regenerator-runtime": "npm:regenerator-runtime@0.10.5",
        "core-js": "npm:core-js@2.4.1"
      }
    },
    "npm:react-stubber@1.0.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.23.0"
      }
    },
    "npm:react@15.5.4": {
      "map": {
        "prop-types": "npm:prop-types@15.5.10",
        "loose-envify": "npm:loose-envify@1.3.1",
        "fbjs": "npm:fbjs@0.8.12",
        "object-assign": "npm:object-assign@4.1.1"
      }
    },
    "npm:prop-types@15.5.10": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.1",
        "fbjs": "npm:fbjs@0.8.12"
      }
    },
    "npm:shallowequal@0.2.2": {
      "map": {
        "lodash.keys": "npm:lodash.keys@3.1.2"
      }
    },
    "npm:fbjs@0.8.12": {
      "map": {
        "core-js": "npm:core-js@1.2.7",
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1",
        "ua-parser-js": "npm:ua-parser-js@0.7.12",
        "setimmediate": "npm:setimmediate@1.0.5",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
        "promise": "npm:promise@7.1.1"
      }
    },
    "npm:loose-envify@1.3.1": {
      "map": {
        "js-tokens": "npm:js-tokens@3.0.1"
      }
    },
    "npm:lodash.keys@3.1.2": {
      "map": {
        "lodash.isarguments": "npm:lodash.isarguments@3.1.0",
        "lodash.isarray": "npm:lodash.isarray@3.0.4",
        "lodash._getnative": "npm:lodash._getnative@3.9.1"
      }
    },
    "npm:jspm-nodelibs-stream@0.2.1": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "npm:promise@7.1.1": {
      "map": {
        "asap": "npm:asap@2.0.5"
      }
    },
    "npm:isomorphic-fetch@2.2.1": {
      "map": {
        "whatwg-fetch": "npm:whatwg-fetch@2.0.3",
        "node-fetch": "npm:node-fetch@1.7.0"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@2.2.9"
      }
    },
    "npm:node-fetch@1.7.0": {
      "map": {
        "encoding": "npm:encoding@0.1.12",
        "is-stream": "npm:is-stream@1.1.0"
      }
    },
    "npm:readable-stream@2.2.9": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "buffer-shims": "npm:buffer-shims@1.0.0",
        "process-nextick-args": "npm:process-nextick-args@1.0.7",
        "isarray": "npm:isarray@1.0.0",
        "util-deprecate": "npm:util-deprecate@1.0.2",
        "core-util-is": "npm:core-util-is@1.0.2",
        "string_decoder": "npm:string_decoder@1.0.1"
      }
    },
    "npm:jspm-nodelibs-buffer@0.2.3": {
      "map": {
        "buffer": "npm:buffer@5.0.6"
      }
    },
    "npm:jspm-nodelibs-domain@0.2.1": {
      "map": {
        "domain-browser": "npm:domain-browser@1.1.7"
      }
    },
    "npm:buffer@5.0.6": {
      "map": {
        "ieee754": "npm:ieee754@1.1.8",
        "base64-js": "npm:base64-js@1.2.0"
      }
    },
    "npm:encoding@0.1.12": {
      "map": {
        "iconv-lite": "npm:iconv-lite@0.4.17"
      }
    },
    "npm:string_decoder@1.0.1": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.0.1"
      }
    },
    "npm:jspm-nodelibs-crypto@0.2.1": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.11.0"
      }
    },
    "npm:jspm-nodelibs-os@0.2.1": {
      "map": {
        "os-browserify": "npm:os-browserify@0.2.1"
      }
    },
    "npm:crypto-browserify@3.11.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "browserify-cipher": "npm:browserify-cipher@1.0.0",
        "create-ecdh": "npm:create-ecdh@4.0.0",
        "browserify-sign": "npm:browserify-sign@4.0.4",
        "randombytes": "npm:randombytes@2.0.3",
        "diffie-hellman": "npm:diffie-hellman@5.0.2",
        "public-encrypt": "npm:public-encrypt@4.0.0",
        "create-hash": "npm:create-hash@1.1.3",
        "create-hmac": "npm:create-hmac@1.1.6",
        "pbkdf2": "npm:pbkdf2@3.0.12"
      }
    },
    "npm:jspm-nodelibs-string_decoder@0.2.1": {
      "map": {
        "string_decoder": "npm:string_decoder@0.10.31"
      }
    },
    "npm:browserify-sign@4.0.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "create-hash": "npm:create-hash@1.1.3",
        "create-hmac": "npm:create-hmac@1.1.6",
        "bn.js": "npm:bn.js@4.11.6",
        "elliptic": "npm:elliptic@6.4.0",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "parse-asn1": "npm:parse-asn1@5.1.0"
      }
    },
    "npm:create-hash@1.1.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "cipher-base": "npm:cipher-base@1.0.3",
        "sha.js": "npm:sha.js@2.4.8",
        "ripemd160": "npm:ripemd160@2.0.1"
      }
    },
    "npm:diffie-hellman@5.0.2": {
      "map": {
        "randombytes": "npm:randombytes@2.0.3",
        "bn.js": "npm:bn.js@4.11.6",
        "miller-rabin": "npm:miller-rabin@4.0.0"
      }
    },
    "npm:public-encrypt@4.0.0": {
      "map": {
        "randombytes": "npm:randombytes@2.0.3",
        "create-hash": "npm:create-hash@1.1.3",
        "bn.js": "npm:bn.js@4.11.6",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "parse-asn1": "npm:parse-asn1@5.1.0"
      }
    },
    "npm:create-hmac@1.1.6": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "create-hash": "npm:create-hash@1.1.3",
        "safe-buffer": "npm:safe-buffer@5.0.1",
        "cipher-base": "npm:cipher-base@1.0.3",
        "sha.js": "npm:sha.js@2.4.8",
        "ripemd160": "npm:ripemd160@2.0.1"
      }
    },
    "npm:browserify-cipher@1.0.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "browserify-des": "npm:browserify-des@1.0.0",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0"
      }
    },
    "npm:create-ecdh@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "elliptic": "npm:elliptic@6.4.0"
      }
    },
    "npm:pbkdf2@3.0.12": {
      "map": {
        "create-hash": "npm:create-hash@1.1.3",
        "create-hmac": "npm:create-hmac@1.1.6",
        "safe-buffer": "npm:safe-buffer@5.0.1",
        "sha.js": "npm:sha.js@2.4.8",
        "ripemd160": "npm:ripemd160@2.0.1"
      }
    },
    "npm:browserify-aes@1.0.6": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.3",
        "inherits": "npm:inherits@2.0.3",
        "create-hash": "npm:create-hash@1.1.3",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "buffer-xor": "npm:buffer-xor@1.0.3"
      }
    },
    "npm:ripemd160@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "hash-base": "npm:hash-base@2.0.2"
      }
    },
    "npm:browserify-des@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "cipher-base": "npm:cipher-base@1.0.3",
        "des.js": "npm:des.js@1.0.0"
      }
    },
    "npm:evp_bytestokey@1.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.3"
      }
    },
    "npm:elliptic@6.4.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "bn.js": "npm:bn.js@4.11.6",
        "hash.js": "npm:hash.js@1.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
        "brorand": "npm:brorand@1.1.0",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1",
        "hmac-drbg": "npm:hmac-drbg@1.0.1"
      }
    },
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "randombytes": "npm:randombytes@2.0.3",
        "bn.js": "npm:bn.js@4.11.6"
      }
    },
    "npm:cipher-base@1.0.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:sha.js@2.4.8": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:parse-asn1@5.1.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "create-hash": "npm:create-hash@1.1.3",
        "pbkdf2": "npm:pbkdf2@3.0.12",
        "asn1.js": "npm:asn1.js@4.9.1"
      }
    },
    "npm:miller-rabin@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "brorand": "npm:brorand@1.1.0"
      }
    },
    "npm:hash-base@2.0.2": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:hash.js@1.0.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:hmac-drbg@1.0.1": {
      "map": {
        "hash.js": "npm:hash.js@1.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1"
      }
    },
    "npm:asn1.js@4.9.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:jspm-nodelibs-http@0.2.0": {
      "map": {
        "http-browserify": "npm:stream-http@2.7.1"
      }
    },
    "npm:jspm-nodelibs-url@0.2.1": {
      "map": {
        "url": "npm:url@0.11.0"
      }
    },
    "npm:jspm-nodelibs-zlib@0.2.3": {
      "map": {
        "browserify-zlib": "npm:browserify-zlib@0.1.4"
      }
    },
    "npm:stream-http@2.7.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@2.2.9",
        "builtin-status-codes": "npm:builtin-status-codes@3.0.0",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1",
        "xtend": "npm:xtend@4.0.1"
      }
    },
    "npm:browserify-zlib@0.1.4": {
      "map": {
        "readable-stream": "npm:readable-stream@2.2.9",
        "pako": "npm:pako@0.2.9"
      }
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    },
    "npm:redux@3.6.0": {
      "map": {
        "symbol-observable": "npm:symbol-observable@1.0.4",
        "lodash-es": "npm:lodash-es@4.17.4",
        "loose-envify": "npm:loose-envify@1.3.1",
        "lodash": "npm:lodash@4.17.4"
      }
    },
    "npm:react-dom@15.5.4": {
      "map": {
        "fbjs": "npm:fbjs@0.8.12",
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1",
        "prop-types": "npm:prop-types@15.5.10"
      }
    },
    "npm:react-router-dom@4.1.1": {
      "map": {
        "prop-types": "npm:prop-types@15.5.10",
        "loose-envify": "npm:loose-envify@1.3.1",
        "history": "npm:history@4.6.1",
        "react-router": "npm:react-router@4.1.1"
      }
    },
    "npm:history@4.6.1": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.1",
        "invariant": "npm:invariant@2.2.2",
        "warning": "npm:warning@3.0.0",
        "value-equal": "npm:value-equal@0.2.1",
        "resolve-pathname": "npm:resolve-pathname@2.1.0"
      }
    },
    "npm:react-router@4.1.1": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.1",
        "history": "npm:history@4.6.1",
        "invariant": "npm:invariant@2.2.2",
        "prop-types": "npm:prop-types@15.5.10",
        "warning": "npm:warning@3.0.0",
        "hoist-non-react-statics": "npm:hoist-non-react-statics@1.2.0",
        "path-to-regexp": "npm:path-to-regexp@1.7.0"
      }
    },
    "npm:warning@3.0.0": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.1"
      }
    },
    "npm:invariant@2.2.2": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.1"
      }
    },
    "npm:path-to-regexp@1.7.0": {
      "map": {
        "isarray": "npm:isarray@0.0.1"
      }
    }
  }
});
