SystemJS.config({
  production: false,
  paths: {
    "npm:": "jspm_packages/npm/",
    "nqm-app/": "src/",
    "github:": "jspm_packages/github/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.25",
      "babel-plugin-transform-class-properties": "npm:babel-plugin-transform-class-properties@6.24.1",
      "babel-plugin-transform-react-jsx": "npm:babel-plugin-transform-react-jsx@6.24.1",
      "systemjs-hot-reloader": "npm:systemjs-hot-reloader@1.1.0"
    },
    "packages": {
      "npm:systemjs-hot-reloader@1.1.0": {
        "map": {
          "systemjs-hmr": "npm:systemjs-hmr@2.0.9"
        }
      },
      "npm:babel-plugin-transform-class-properties@6.24.1": {
        "map": {
          "babel-template": "npm:babel-template@6.24.1",
          "babel-plugin-syntax-class-properties": "npm:babel-plugin-syntax-class-properties@6.13.0",
          "babel-helper-function-name": "npm:babel-helper-function-name@6.24.1",
          "babel-runtime": "npm:babel-runtime@6.23.0"
        }
      },
      "npm:babel-template@6.24.1": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.23.0",
          "lodash": "npm:lodash@4.17.4",
          "babel-traverse": "npm:babel-traverse@6.24.1",
          "babel-types": "npm:babel-types@6.24.1",
          "babylon": "npm:babylon@6.17.1"
        }
      },
      "npm:babel-helper-function-name@6.24.1": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.23.0",
          "babel-template": "npm:babel-template@6.24.1",
          "babel-traverse": "npm:babel-traverse@6.24.1",
          "babel-types": "npm:babel-types@6.24.1",
          "babel-helper-get-function-arity": "npm:babel-helper-get-function-arity@6.24.1"
        }
      },
      "npm:babel-traverse@6.24.1": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.23.0",
          "lodash": "npm:lodash@4.17.4",
          "babel-types": "npm:babel-types@6.24.1",
          "babylon": "npm:babylon@6.17.1",
          "globals": "npm:globals@9.17.0",
          "invariant": "npm:invariant@2.2.2",
          "debug": "npm:debug@2.6.8",
          "babel-messages": "npm:babel-messages@6.23.0",
          "babel-code-frame": "npm:babel-code-frame@6.22.0"
        }
      },
      "npm:babel-types@6.24.1": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.23.0",
          "lodash": "npm:lodash@4.17.4",
          "to-fast-properties": "npm:to-fast-properties@1.0.3",
          "esutils": "npm:esutils@2.0.2"
        }
      },
      "npm:babel-helper-get-function-arity@6.24.1": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.23.0",
          "babel-types": "npm:babel-types@6.24.1"
        }
      },
      "npm:babel-messages@6.23.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.23.0"
        }
      },
      "npm:babel-code-frame@6.22.0": {
        "map": {
          "esutils": "npm:esutils@2.0.2",
          "js-tokens": "npm:js-tokens@3.0.1",
          "chalk": "npm:chalk@1.1.3"
        }
      },
      "npm:chalk@1.1.3": {
        "map": {
          "ansi-styles": "npm:ansi-styles@2.2.1",
          "supports-color": "npm:supports-color@2.0.0",
          "strip-ansi": "npm:strip-ansi@3.0.1",
          "has-ansi": "npm:has-ansi@2.0.0",
          "escape-string-regexp": "npm:escape-string-regexp@1.0.5"
        }
      },
      "npm:strip-ansi@3.0.1": {
        "map": {
          "ansi-regex": "npm:ansi-regex@2.1.1"
        }
      },
      "npm:has-ansi@2.0.0": {
        "map": {
          "ansi-regex": "npm:ansi-regex@2.1.1"
        }
      },
      "npm:babel-plugin-transform-react-jsx@6.24.1": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.23.0",
          "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.18.0",
          "babel-helper-builder-react-jsx": "npm:babel-helper-builder-react-jsx@6.24.1"
        }
      },
      "npm:babel-helper-builder-react-jsx@6.24.1": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.23.0",
          "babel-types": "npm:babel-types@6.24.1",
          "esutils": "npm:esutils@2.0.2"
        }
      }
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "nqm-app": {
      "main": "main.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel",
          "babelOptions": {
            "plugins": [
              "babel-plugin-transform-react-jsx",
              "babel-plugin-transform-class-properties"
            ]
          }
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "assert": "npm:jspm-nodelibs-assert@0.2.1",
    "buffer": "npm:jspm-nodelibs-buffer@0.2.3",
    "child_process": "npm:jspm-nodelibs-child_process@0.2.1",
    "chrono-node": "npm:chrono-node@1.3.5",
    "classnames": "npm:classnames@2.2.5",
    "constants": "npm:jspm-nodelibs-constants@0.2.1",
    "crypto": "npm:jspm-nodelibs-crypto@0.2.1",
    "css": "github:systemjs/plugin-css@0.1.35",
    "debug": "npm:debug@2.6.8",
    "domain": "npm:jspm-nodelibs-domain@0.2.1",
    "events": "npm:jspm-nodelibs-events@0.2.2",
    "fs": "npm:jspm-nodelibs-fs@0.2.1",
    "http": "npm:jspm-nodelibs-http@0.2.0",
    "https": "npm:jspm-nodelibs-https@0.2.2",
    "jss": "npm:jss@9.3.2",
    "jss-theme-reactor": "npm:jss-theme-reactor@0.11.1",
    "lodash": "npm:lodash@4.17.4",
    "material-ui": "npm:material-ui@next",
    "material-ui-icons": "npm:material-ui-icons@1.0.0-alpha.19",
    "moment": "npm:moment@2.18.1",
    "nqm-mantra-core": "npm:nqm-mantra-core@1.8.1",
    "nqm-tdx-client": "npm:nqm-tdx-client@0.2.4",
    "os": "npm:jspm-nodelibs-os@0.2.1",
    "path": "npm:jspm-nodelibs-path@0.2.3",
    "process": "npm:jspm-nodelibs-process@0.2.1",
    "prop-types": "npm:prop-types@15.6.0",
    "react": "npm:react@16.0.0",
    "react-datepicker": "npm:react-datepicker@0.52.0",
    "react-dom": "npm:react-dom@16.0.0",
    "react-router": "npm:react-router@4.1.1",
    "react-router-dom": "npm:react-router-dom@4.1.1",
    "react-select": "npm:react-select@1.0.0-rc.5",
    "readable-stream": "npm:readable-stream@2.3.3",
    "redbox-react": "npm:redbox-react@1.3.6",
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
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "hoist-non-react-statics": "npm:hoist-non-react-statics@1.2.0",
        "prop-types": "npm:prop-types@15.6.0"
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
        "babel-runtime": "npm:babel-runtime@6.26.0"
      }
    },
    "npm:shallowequal@0.2.2": {
      "map": {
        "lodash.keys": "npm:lodash.keys@3.1.2"
      }
    },
    "npm:loose-envify@1.3.1": {
      "map": {
        "js-tokens": "npm:js-tokens@3.0.2"
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
    "npm:isomorphic-fetch@2.2.1": {
      "map": {
        "whatwg-fetch": "npm:whatwg-fetch@2.0.3",
        "node-fetch": "npm:node-fetch@1.7.3"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@2.3.3"
      }
    },
    "npm:jspm-nodelibs-buffer@0.2.3": {
      "map": {
        "buffer": "npm:buffer@5.0.8"
      }
    },
    "npm:jspm-nodelibs-domain@0.2.1": {
      "map": {
        "domain-browser": "npm:domain-browser@1.1.7"
      }
    },
    "npm:encoding@0.1.12": {
      "map": {
        "iconv-lite": "npm:iconv-lite@0.4.19"
      }
    },
    "npm:jspm-nodelibs-crypto@0.2.1": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.12.0"
      }
    },
    "npm:jspm-nodelibs-os@0.2.1": {
      "map": {
        "os-browserify": "npm:os-browserify@0.2.1"
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
        "bn.js": "npm:bn.js@4.11.8",
        "elliptic": "npm:elliptic@6.4.0",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "parse-asn1": "npm:parse-asn1@5.1.0"
      }
    },
    "npm:create-hash@1.1.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "cipher-base": "npm:cipher-base@1.0.4",
        "sha.js": "npm:sha.js@2.4.9",
        "ripemd160": "npm:ripemd160@2.0.1"
      }
    },
    "npm:diffie-hellman@5.0.2": {
      "map": {
        "randombytes": "npm:randombytes@2.0.5",
        "bn.js": "npm:bn.js@4.11.8",
        "miller-rabin": "npm:miller-rabin@4.0.1"
      }
    },
    "npm:public-encrypt@4.0.0": {
      "map": {
        "randombytes": "npm:randombytes@2.0.5",
        "create-hash": "npm:create-hash@1.1.3",
        "bn.js": "npm:bn.js@4.11.8",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "parse-asn1": "npm:parse-asn1@5.1.0"
      }
    },
    "npm:create-hmac@1.1.6": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "create-hash": "npm:create-hash@1.1.3",
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "cipher-base": "npm:cipher-base@1.0.4",
        "sha.js": "npm:sha.js@2.4.9",
        "ripemd160": "npm:ripemd160@2.0.1"
      }
    },
    "npm:browserify-cipher@1.0.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.1.1",
        "browserify-des": "npm:browserify-des@1.0.0",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3"
      }
    },
    "npm:create-ecdh@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "elliptic": "npm:elliptic@6.4.0"
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
        "cipher-base": "npm:cipher-base@1.0.4",
        "des.js": "npm:des.js@1.0.0"
      }
    },
    "npm:elliptic@6.4.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "bn.js": "npm:bn.js@4.11.8",
        "hash.js": "npm:hash.js@1.1.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
        "brorand": "npm:brorand@1.1.0",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1",
        "hmac-drbg": "npm:hmac-drbg@1.0.1"
      }
    },
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "randombytes": "npm:randombytes@2.0.5",
        "bn.js": "npm:bn.js@4.11.8"
      }
    },
    "npm:parse-asn1@5.1.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.1.1",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "create-hash": "npm:create-hash@1.1.3",
        "pbkdf2": "npm:pbkdf2@3.0.14",
        "asn1.js": "npm:asn1.js@4.9.2"
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
    "npm:hmac-drbg@1.0.1": {
      "map": {
        "hash.js": "npm:hash.js@1.1.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1"
      }
    },
    "npm:jspm-nodelibs-http@0.2.0": {
      "map": {
        "http-browserify": "npm:stream-http@2.7.2"
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
    "npm:browserify-zlib@0.1.4": {
      "map": {
        "readable-stream": "npm:readable-stream@2.3.3",
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
    "npm:react-router-dom@4.1.1": {
      "map": {
        "prop-types": "npm:prop-types@15.6.0",
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
        "prop-types": "npm:prop-types@15.6.0",
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
    },
    "npm:debug@2.6.8": {
      "map": {
        "ms": "npm:ms@2.0.0"
      }
    },
    "npm:redbox-react@1.3.6": {
      "map": {
        "error-stack-parser": "npm:error-stack-parser@1.3.6",
        "object-assign": "npm:object-assign@4.1.1",
        "prop-types": "npm:prop-types@15.6.0"
      }
    },
    "npm:error-stack-parser@1.3.6": {
      "map": {
        "stackframe": "npm:stackframe@0.3.1"
      }
    },
    "npm:css-vendor@0.3.8": {
      "map": {
        "is-in-browser": "npm:is-in-browser@1.1.3"
      }
    },
    "npm:rafl@1.2.2": {
      "map": {
        "global": "npm:global@4.3.2"
      }
    },
    "npm:global@4.3.2": {
      "map": {
        "process": "npm:process@0.5.2",
        "min-document": "npm:min-document@2.19.0",
        "node-min-document": "npm:min-document@2.19.0"
      }
    },
    "npm:min-document@2.19.0": {
      "map": {
        "dom-walk": "npm:dom-walk@0.1.1"
      }
    },
    "npm:stream-http@2.7.2": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "builtin-status-codes": "npm:builtin-status-codes@3.0.0",
        "xtend": "npm:xtend@4.0.1",
        "readable-stream": "npm:readable-stream@2.3.3",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1"
      }
    },
    "npm:randombytes@2.0.5": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:cipher-base@1.0.4": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:readable-stream@2.3.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "string_decoder": "npm:string_decoder@1.0.3",
        "isarray": "npm:isarray@1.0.0",
        "util-deprecate": "npm:util-deprecate@1.0.2",
        "core-util-is": "npm:core-util-is@1.0.2",
        "process-nextick-args": "npm:process-nextick-args@1.0.7"
      }
    },
    "npm:hash.js@1.1.3": {
      "map": {
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:string_decoder@1.0.3": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:is-plain-object@2.0.4": {
      "map": {
        "isobject": "npm:isobject@3.0.1"
      }
    },
    "npm:react-datepicker@0.52.0": {
      "map": {
        "classnames": "npm:classnames@2.2.5",
        "prop-types": "npm:prop-types@15.6.0",
        "react-onclickoutside": "npm:react-onclickoutside@6.4.0",
        "moment": "npm:moment@2.18.1",
        "react-popper": "npm:react-popper@0.7.2"
      }
    },
    "npm:react-popper@0.7.2": {
      "map": {
        "prop-types": "npm:prop-types@15.6.0",
        "is-equal-shallow": "npm:is-equal-shallow@0.1.3",
        "popper.js": "npm:popper.js@1.12.5"
      }
    },
    "npm:fbjs@0.8.14": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1",
        "core-js": "npm:core-js@1.2.7",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
        "setimmediate": "npm:setimmediate@1.0.5",
        "promise": "npm:promise@7.3.1",
        "ua-parser-js": "npm:ua-parser-js@0.7.14"
      }
    },
    "npm:is-equal-shallow@0.1.3": {
      "map": {
        "is-primitive": "npm:is-primitive@2.0.0"
      }
    },
    "npm:promise@7.3.1": {
      "map": {
        "asap": "npm:asap@2.0.6"
      }
    },
    "npm:react-select@1.0.0-rc.5": {
      "map": {
        "create-react-class": "npm:create-react-class@15.6.0",
        "classnames": "npm:classnames@2.2.5",
        "prop-types": "npm:prop-types@15.6.0",
        "react-input-autosize": "npm:react-input-autosize@1.1.4"
      }
    },
    "npm:react-input-autosize@1.1.4": {
      "map": {
        "create-react-class": "npm:create-react-class@15.6.0",
        "prop-types": "npm:prop-types@15.6.0"
      }
    },
    "npm:create-react-class@15.6.0": {
      "map": {
        "fbjs": "npm:fbjs@0.8.15",
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1"
      }
    },
    "npm:material-ui-icons@1.0.0-alpha.19": {
      "map": {
        "recompose": "npm:recompose@0.23.5"
      }
    },
    "npm:recompose@0.23.5": {
      "map": {
        "symbol-observable": "npm:symbol-observable@1.0.4",
        "fbjs": "npm:fbjs@0.8.14",
        "hoist-non-react-statics": "npm:hoist-non-react-statics@1.2.0",
        "change-emitter": "npm:change-emitter@0.1.6"
      }
    },
    "npm:chrono-node@1.3.5": {
      "map": {
        "moment": "npm:moment@2.18.1"
      }
    },
    "npm:md5.js@1.3.4": {
      "map": {
        "hash-base": "npm:hash-base@3.0.4",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:hash-base@3.0.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:babel-runtime@6.26.0": {
      "map": {
        "regenerator-runtime": "npm:regenerator-runtime@0.11.0",
        "core-js": "npm:core-js@2.5.1"
      }
    },
    "npm:fbjs@0.8.15": {
      "map": {
        "core-js": "npm:core-js@1.2.7",
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1",
        "promise": "npm:promise@7.3.1",
        "setimmediate": "npm:setimmediate@1.0.5",
        "ua-parser-js": "npm:ua-parser-js@0.7.14",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1"
      }
    },
    "npm:node-fetch@1.7.3": {
      "map": {
        "is-stream": "npm:is-stream@1.1.0",
        "encoding": "npm:encoding@0.1.12"
      }
    },
    "npm:pbkdf2@3.0.14": {
      "map": {
        "create-hmac": "npm:create-hmac@1.1.6",
        "create-hash": "npm:create-hash@1.1.3",
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "sha.js": "npm:sha.js@2.4.9",
        "ripemd160": "npm:ripemd160@2.0.1"
      }
    },
    "npm:evp_bytestokey@1.0.3": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "md5.js": "npm:md5.js@1.3.4"
      }
    },
    "npm:jss-theme-reactor@0.11.1": {
      "map": {
        "murmurhash-js": "npm:murmurhash-js@1.0.0",
        "jss-vendor-prefixer": "npm:jss-vendor-prefixer@5.1.0",
        "jss": "npm:jss@7.1.7",
        "jss-preset-default": "npm:jss-preset-default@2.0.0"
      }
    },
    "npm:jss-vendor-prefixer@5.1.0": {
      "map": {
        "css-vendor": "npm:css-vendor@0.3.8"
      }
    },
    "npm:jss-preset-default@2.0.0": {
      "map": {
        "jss-camel-case": "npm:jss-camel-case@4.0.0",
        "jss-compose": "npm:jss-compose@3.0.1",
        "jss-default-unit": "npm:jss-default-unit@6.1.2",
        "jss-expand": "npm:jss-expand@3.0.1",
        "jss-extend": "npm:jss-extend@4.0.1",
        "jss-global": "npm:jss-global@1.0.1",
        "jss-nested": "npm:jss-nested@4.0.1",
        "jss-props-sort": "npm:jss-props-sort@4.0.0",
        "jss-vendor-prefixer": "npm:jss-vendor-prefixer@5.1.0"
      }
    },
    "npm:jss@7.1.7": {
      "map": {
        "is-in-browser": "npm:is-in-browser@1.0.2",
        "warning": "npm:warning@3.0.0"
      }
    },
    "npm:jss-compose@3.0.1": {
      "map": {
        "warning": "npm:warning@3.0.0"
      }
    },
    "npm:jss-extend@4.0.1": {
      "map": {
        "warning": "npm:warning@3.0.0"
      }
    },
    "npm:jss-nested@4.0.1": {
      "map": {
        "warning": "npm:warning@3.0.0"
      }
    },
    "npm:nqm-tdx-client@0.2.4": {
      "map": {
        "nqm-react-komposer": "npm:nqm-react-komposer@2.0.2",
        "debug": "npm:debug@2.6.8",
        "nqm-react-simple-di": "npm:nqm-react-simple-di@1.3.2",
        "ddp.js": "npm:ddp.js@2.2.0",
        "lodash": "npm:lodash@4.17.4",
        "event-emitter-es6": "npm:event-emitter-es6@1.1.5",
        "nqm-core-utils": "npm:nqm-core-utils@0.2.52",
        "nqm-api-tdx": "npm:nqm-api-tdx@0.2.49",
        "nqm-minimongo": "npm:nqm-minimongo@0.1.4"
      }
    },
    "npm:nqm-core-utils@0.2.52": {
      "map": {
        "debug": "npm:debug@2.6.8",
        "lodash": "npm:lodash@4.17.4",
        "mongo-parse": "npm:mongo-parse@2.0.3",
        "shortid": "npm:shortid@2.2.8"
      }
    },
    "npm:ddp.js@2.2.0": {
      "map": {
        "wolfy87-eventemitter": "npm:wolfy87-eventemitter@4.3.0"
      }
    },
    "npm:nqm-react-komposer@2.0.2": {
      "map": {
        "hoist-non-react-statics": "npm:hoist-non-react-statics@1.2.0",
        "lodash.pick": "npm:lodash.pick@4.4.0",
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "react-stubber": "npm:react-stubber@1.0.0",
        "shallowequal": "npm:shallowequal@0.2.2"
      }
    },
    "npm:nqm-minimongo@0.1.4": {
      "map": {
        "lodash": "npm:lodash@3.10.1",
        "async": "npm:async@1.5.2",
        "bowser": "npm:bowser@0.7.3"
      }
    },
    "npm:nqm-api-tdx@0.2.49": {
      "map": {
        "debug": "npm:debug@2.6.8",
        "lodash": "npm:lodash@4.17.4",
        "base-64": "npm:base-64@0.1.0",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1"
      }
    },
    "npm:react@16.0.0": {
      "map": {
        "fbjs": "npm:fbjs@0.8.16",
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1",
        "prop-types": "npm:prop-types@15.6.0"
      }
    },
    "npm:fbjs@0.8.16": {
      "map": {
        "core-js": "npm:core-js@1.2.7",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1",
        "promise": "npm:promise@7.3.1",
        "setimmediate": "npm:setimmediate@1.0.5",
        "ua-parser-js": "npm:ua-parser-js@0.7.17"
      }
    },
    "npm:prop-types@15.6.0": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1",
        "fbjs": "npm:fbjs@0.8.16"
      }
    },
    "npm:buffer@5.0.8": {
      "map": {
        "ieee754": "npm:ieee754@1.1.8",
        "base64-js": "npm:base64-js@1.2.1"
      }
    },
    "npm:miller-rabin@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "brorand": "npm:brorand@1.1.0"
      }
    },
    "npm:sha.js@2.4.9": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:react-dom@16.0.0": {
      "map": {
        "fbjs": "npm:fbjs@0.8.16",
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1",
        "prop-types": "npm:prop-types@15.6.0"
      }
    },
    "npm:react-transition-group@2.2.1": {
      "map": {
        "classnames": "npm:classnames@2.2.5",
        "dom-helpers": "npm:dom-helpers@3.2.1",
        "warning": "npm:warning@3.0.0",
        "prop-types": "npm:prop-types@15.6.0",
        "loose-envify": "npm:loose-envify@1.3.1",
        "chain-function": "npm:chain-function@1.0.0"
      }
    },
    "npm:react-event-listener@0.5.1": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "prop-types": "npm:prop-types@15.6.0",
        "warning": "npm:warning@3.0.0",
        "fbjs": "npm:fbjs@0.8.16"
      }
    },
    "npm:react-scrollbar-size@2.0.2": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "prop-types": "npm:prop-types@15.6.0",
        "react-event-listener": "npm:react-event-listener@0.5.1"
      }
    },
    "npm:scroll@2.0.1": {
      "map": {
        "rafl": "npm:rafl@1.2.2"
      }
    },
    "npm:recompose@0.26.0": {
      "map": {
        "hoist-non-react-statics": "npm:hoist-non-react-statics@2.3.1",
        "fbjs": "npm:fbjs@0.8.16",
        "symbol-observable": "npm:symbol-observable@1.0.4",
        "change-emitter": "npm:change-emitter@0.1.6"
      }
    },
    "npm:material-ui@next": {
      "map": {
        "react-jss": "npm:react-jss@8.1.0",
        "deepmerge": "npm:deepmerge@2.0.1",
        "react-flow-types": "npm:react-flow-types@0.2.0-beta.3",
        "normalize-scroll-left": "npm:normalize-scroll-left@0.1.2",
        "jss-preset-default": "npm:jss-preset-default@4.0.1",
        "react-popper": "npm:react-popper@0.7.4",
        "dom-helpers": "npm:dom-helpers@3.2.1",
        "jss": "npm:jss@9.3.2",
        "hoist-non-react-statics": "npm:hoist-non-react-statics@2.3.1",
        "brcast": "npm:brcast@3.0.1",
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "react-scrollbar-size": "npm:react-scrollbar-size@2.0.2",
        "react-event-listener": "npm:react-event-listener@0.5.1",
        "keycode": "npm:keycode@2.1.9",
        "warning": "npm:warning@3.0.0",
        "scroll": "npm:scroll@2.0.1",
        "react-transition-group": "npm:react-transition-group@2.2.1",
        "classnames": "npm:classnames@2.2.5",
        "prop-types": "npm:prop-types@15.6.0",
        "lodash": "npm:lodash@4.17.4",
        "recompose": "npm:recompose@0.26.0"
      }
    },
    "npm:react-jss@8.1.0": {
      "map": {
        "hoist-non-react-statics": "npm:hoist-non-react-statics@2.3.1",
        "prop-types": "npm:prop-types@15.6.0",
        "jss": "npm:jss@9.3.2",
        "jss-preset-default": "npm:jss-preset-default@4.0.1",
        "theming": "npm:theming@1.2.1"
      }
    },
    "npm:jss@9.3.2": {
      "map": {
        "warning": "npm:warning@3.0.0",
        "is-in-browser": "npm:is-in-browser@1.1.3",
        "symbol-observable": "npm:symbol-observable@1.0.4"
      }
    },
    "npm:react-popper@0.7.4": {
      "map": {
        "prop-types": "npm:prop-types@15.6.0",
        "popper.js": "npm:popper.js@1.12.8"
      }
    },
    "npm:jss-preset-default@4.0.1": {
      "map": {
        "jss-compose": "npm:jss-compose@5.0.0",
        "jss-default-unit": "npm:jss-default-unit@8.0.0",
        "jss-camel-case": "npm:jss-camel-case@6.0.0",
        "jss-expand": "npm:jss-expand@5.0.0",
        "jss-extend": "npm:jss-extend@6.0.1",
        "jss-props-sort": "npm:jss-props-sort@6.0.0",
        "jss-vendor-prefixer": "npm:jss-vendor-prefixer@7.0.0",
        "jss-nested": "npm:jss-nested@6.0.1",
        "jss-global": "npm:jss-global@3.0.0",
        "jss-template": "npm:jss-template@1.0.0"
      }
    },
    "npm:theming@1.2.1": {
      "map": {
        "prop-types": "npm:prop-types@15.6.0",
        "brcast": "npm:brcast@3.0.1",
        "is-function": "npm:is-function@1.0.1",
        "is-plain-object": "npm:is-plain-object@2.0.4"
      }
    },
    "npm:jss-compose@5.0.0": {
      "map": {
        "warning": "npm:warning@3.0.0"
      }
    },
    "npm:jss-extend@6.0.1": {
      "map": {
        "warning": "npm:warning@3.0.0",
        "is-observable": "npm:is-observable@0.2.0"
      }
    },
    "npm:jss-nested@6.0.1": {
      "map": {
        "warning": "npm:warning@3.0.0"
      }
    },
    "npm:jss-template@1.0.0": {
      "map": {
        "warning": "npm:warning@3.0.0"
      }
    },
    "npm:jss-default-unit@8.0.0": {
      "map": {
        "is-observable": "npm:is-observable@0.2.0"
      }
    },
    "npm:jss-expand@5.0.0": {
      "map": {
        "is-observable": "npm:is-observable@0.2.0"
      }
    },
    "npm:jss-vendor-prefixer@7.0.0": {
      "map": {
        "css-vendor": "npm:css-vendor@0.3.8"
      }
    },
    "npm:is-observable@0.2.0": {
      "map": {
        "symbol-observable": "npm:symbol-observable@0.2.4"
      }
    },
    "npm:crypto-browserify@3.12.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "browserify-cipher": "npm:browserify-cipher@1.0.0",
        "randomfill": "npm:randomfill@1.0.3",
        "create-ecdh": "npm:create-ecdh@4.0.0",
        "create-hash": "npm:create-hash@1.1.3",
        "browserify-sign": "npm:browserify-sign@4.0.4",
        "randombytes": "npm:randombytes@2.0.5",
        "pbkdf2": "npm:pbkdf2@3.0.14",
        "create-hmac": "npm:create-hmac@1.1.6",
        "public-encrypt": "npm:public-encrypt@4.0.0",
        "diffie-hellman": "npm:diffie-hellman@5.0.2"
      }
    },
    "npm:randomfill@1.0.3": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "randombytes": "npm:randombytes@2.0.5"
      }
    },
    "npm:browserify-aes@1.1.1": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.4",
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "inherits": "npm:inherits@2.0.3",
        "create-hash": "npm:create-hash@1.1.3",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "buffer-xor": "npm:buffer-xor@1.0.3"
      }
    },
    "npm:asn1.js@4.9.2": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    }
  }
});
