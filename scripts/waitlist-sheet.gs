/**
 * Qlareo — destino da waitlist (Google Apps Script).
 *
 * Cole este arquivo em Extensões › Apps Script de uma planilha nova e publique
 * como Web app (instruções completas em scripts/README.md). A LP faz POST aqui
 * e cada lead vira uma linha.
 *
 * Apps Script sempre responde HTTP 200, mesmo em erro — por isso o resultado
 * real vai no corpo, em `ok`. A rota da LP lê o corpo, não o status.
 */

var SHEET_NAME = 'leads';
var HEADERS = ['receivedAt', 'name', 'email', 'company', 'source'];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return reply({ ok: false, error: 'empty body' });
    }

    var body = JSON.parse(e.postData.contents);
    var expected = PropertiesService.getScriptProperties().getProperty('WAITLIST_TOKEN');

    // A URL do web app é pública: sem o token compartilhado qualquer um
    // conseguiria poluir a planilha.
    if (!expected || body.token !== expected) {
      return reply({ ok: false, error: 'unauthorized' });
    }

    var email = String(body.email || '').trim();
    if (!email) {
      return reply({ ok: false, error: 'missing email' });
    }

    // Dois envios simultâneos podem ler a mesma "última linha" e um sobrescrever
    // o outro. O lock serializa a escrita.
    var lock = LockService.getScriptLock();
    lock.waitLock(15000);
    try {
      var sheet = getSheet();
      sheet.appendRow([
        body.receivedAt || new Date().toISOString(),
        String(body.name || '').trim(),
        email,
        String(body.company || '').trim(),
        String(body.source || 'unknown').trim(),
      ]);
    } finally {
      lock.releaseLock();
    }

    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

function getSheet() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = doc.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = doc.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }

  return sheet;
}

function reply(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
