/**
 * Altrove · Email Capture
 * 
 * SETUP:
 * 1. Go to https://sheets.google.com and create a new spreadsheet.
 * 2. Name it "Altrove Subscribers" (or whatever you like).
 * 3. In the top menu: Extensions > Apps Script.
 * 4. Delete the default code, paste ALL of this file in.
 * 5. Click Deploy > New deployment.
 * 6. Select type: "Web app".
 * 7. Description: "Altrove email capture v1"
 * 8. Execute as: "Me" (your Google account).
 * 9. Who has access: "Anyone".
 * 10. Click Deploy. Authorize when prompted.
 * 11. Copy the Web App URL it gives you.
 * 12. Paste it into index.html replacing GOOGLE_SCRIPT_URL_PLACEHOLDER.
 * 13. Redeploy the site (git push).
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Initialize headers on first run
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Email', 'Language', 'Source']);
    sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
  }
  
  try {
    var data = JSON.parse(e.postData.contents);
    var email = (data.email || '').trim().toLowerCase();
    var lang = data.lang || 'it';
    var source = data.source || 'altrove';
    
    // Basic validation
    if (!email || email.indexOf('@') === -1) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'Invalid email' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Check for duplicates
    var existing = sheet.getRange(2, 2, Math.max(sheet.getLastRow() - 1, 1), 1).getValues();
    for (var i = 0; i < existing.length; i++) {
      if (existing[i][0] === email) {
        return ContentService
          .createTextOutput(JSON.stringify({ success: true, duplicate: true }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Append the row
    sheet.appendRow([new Date(), email, lang, source]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', service: 'Altrove email capture' }))
    .setMimeType(ContentService.MimeType.JSON);
}
