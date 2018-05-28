const rootDocument = 'http://zhutou.zhianinvest.com'

export default class NetManager {
  static fetchRequest(relativePath, method, parameters, callBack) {
    const timeStamp = Date.parse(new Date()) / 1000;
    const timeStampString = timeStamp.toString();
    const lastFour = timeStampString.substring(timeStampString.length - 4);
    const forge = require('node-forge');
    const lastFourBase64 = forge.util.encode64(lastFour);
    const noEqualSignLastFour = lastFourBase64.replace(/=/g, '');
    const lastFourForNoEqualSignLastFour = noEqualSignLastFour.substring(noEqualSignLastFour.length - 4);
    const willBeEncodedString = lastFour + 'zhianCode' + lastFourForNoEqualSignLastFour;
    var md5 = forge.md.md5.create();
    md5.update(willBeEncodedString);
    const authcode = md5.digest().toHex();
    var formData = new FormData();
    console.log(parameters);
    for (var key in parameters) {
      if (parameters.hasOwnProperty(key)) {
        formData.append(key, parameters[key]);
      }
    }
    let headers = {
      versionNum: '1.0.2',
      usertype:'1',
      platformType:'iOS',
      authCode:authcode,
      timestamp:timeStamp,
    }
    let url = rootDocument + relativePath;
    fetch(url, {
      method:method,
      headers: headers,
      body: formData,
    })
    .then((response) => {
      if (response.ok == true) {
        return response.json()
      }
    })
    .then((responseJson) => {
      let code = responseJson['code'];
      if (code == 40001) {
        callBack(responseJson['data'], null);
      } else {
         callBack(null, responseJson['msg']);
      }
    })
    .catch((error) => {
      console.warn(error)
    })
    .done()
  }
}
