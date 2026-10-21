// Script para la hoja de Google del botiquín.
// Guarda qué medicamentos están agotados para que la página lo muestre a todos.
// Instrucciones de instalación: ver INSTRUCCIONES.md

const HOJA = "Agotados";

function hoja() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let h = ss.getSheetByName(HOJA);
  if (!h) {
    h = ss.insertSheet(HOJA);
    h.appendRow(["Medicamento", "Agotado", "Actualizado"]);
  }
  return h;
}

function respuesta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// La página pide la lista de agotados
function doGet() {
  const filas = hoja().getDataRange().getValues().slice(1);
  const agotados = filas.filter(f => f[1] === true).map(f => String(f[0]));
  return respuesta({ agotados });
}

// La página marca o desmarca un medicamento: { nombre, agotado }
function doPost(e) {
  const { nombre, agotado } = JSON.parse(e.postData.contents);
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const h = hoja();
    const datos = h.getDataRange().getValues();
    const i = datos.findIndex((f, k) => k > 0 && f[0] === nombre);
    if (i > 0) h.getRange(i + 1, 2, 1, 2).setValues([[!!agotado, new Date()]]);
    else h.appendRow([nombre, !!agotado, new Date()]);
  } finally {
    lock.releaseLock();
  }
  return doGet();
}
