function loadScript(url, callback) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.onload = callback;
    script.src = url;
    document.head.appendChild(script);
}

loadScript("https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js", function() {
    console.log('CryptoJS loaded');
});

async function calculateSHA256Hex(data) {
    const hash = CryptoJS.SHA256(data);
    return hash.toString(CryptoJS.enc.Hex);
}

function calculateHmacSha512Base64(message, secret) {
    const hmac = CryptoJS.HmacSHA512(message, secret);
    return hmac.toString(CryptoJS.enc.Base64);
}