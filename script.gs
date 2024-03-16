const doGet = (event = {}) => {
  const { parameter } = event;
  const { name = '', lnurl = '', ethAddress = '', token_id = '' } = parameter;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  const output = `Hello (@${name}), adicionado 1 ticket`;
  if (name && !lnurl && !ethAddress) {
    var sheet = ss.getSheets()[0];
    sheet.appendRow([name]);  
  }
  if(lnurl && name){
    var emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
    if (emailRegex.test(lnurl.replace(/ /g, "")) || lnurl.startsWith('lnurl') || lnurl.startsWith('LNURL') || lnurl.startsWith('lnbc1')){
      var sheet = ss.getSheets()[1];
      var foundLnurl = sheet.createTextFinder(lnurl.replace(/ /g, "")).findAll()
      var foundName = sheet.createTextFinder(name).findAll()
      if (foundLnurl == 0 && foundName == 0) {
        sheet.appendRow([lnurl.replace(/ /g, ""), name])
      }
      else {
        return ContentService.createTextOutput(`@${name} já inscrito`);
      }
    } else {
      return ContentService.createTextOutput(`@${name} lnaddress or lnurl inválido`);
    }
    
  }
  if(ethAddress && token_id && name){
    var emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
    if (emailRegex.test(ethAddress.replace(/ /g, "")) || ethAddress.startsWith('0x')){
      var sheet = ss.getSheets()[3];
      var foundAddress = sheet.createTextFinder(ethAddress.replace(/ /g, "")).findAll()
      var foundName = sheet.createTextFinder(name).findAll()
      if (foundAddress == 0 && foundName == 0) {
        sheet.appendRow([ethAddress.replace(/ /g, ""), name])
        // your transfer nft api address
        url = ""
        result = UrlFetchApp.fetch(url)
        return ContentService.createTextOutput(`@${name}: ${result}`)
      }
      else {
        return ContentService.createTextOutput(`@${name} já inscrito`);
      }
    } else {
      return ContentService.createTextOutput(`@${name} endereço de wallet ETH inválido. (0x.....)`);
    }
    
  }
  return ContentService.createTextOutput(output);
};
