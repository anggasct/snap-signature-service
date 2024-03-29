function getCurlRelativePath(curlCommand) {
    const urlMatches = curlCommand.match(/--location '([^']+)'/);

    if (!urlMatches || urlMatches.length < 2) {
        return null;
    }

    const url = urlMatches[1];

    const parsedUrl = new URL(url);

    const relativePath = parsedUrl.pathname;

    return relativePath;
}


function getCurlHeaders(curlCommand) {
    var data = {};

    var headers = curlCommand.match(/--header '([^']+)'/g);
    if (headers) {
        headers.forEach(function (header) {
            var matches = header.match(/--header '([^:]+): (.+)'/);
            if (matches && matches.length === 3) {
                var key = matches[1];
                var value = matches[2];
                data[key] = value;
            }
        });
    }

    const newObj = {}

    Object.keys(data).forEach(key => {
        const lowerKey = key.toLowerCase();
        newObj[lowerKey] = data[key];
    })

   
    return {
        authorization: newObj['authorization'],
        timestamp: newObj['x-timestamp']
    }
}

function getCurlPayload(curlCommand) {
    var payloadIndex = curlCommand.indexOf("--data");
    if (payloadIndex === -1) {
        payloadIndex = curlCommand.indexOf("--data-binary");
    }

    if (payloadIndex === -1) {
        return null;
    }

    var startIndex = curlCommand.indexOf("'", payloadIndex);
    if (startIndex === -1) {
        startIndex = curlCommand.indexOf('"', payloadIndex);
    }
    if (startIndex === -1) {
        return null; 
    }
    startIndex++; 
    var endIndex = curlCommand.indexOf("'", startIndex);
    if (endIndex === -1) {
        endIndex = curlCommand.indexOf('"', startIndex);
    }
    if (endIndex === -1) {
        return null;
    }
    var payload = curlCommand.substring(startIndex, endIndex);
    return payload;
}

function minifyJSON(jsonData) {
    return JSON.stringify(JSON.parse(jsonData))
}