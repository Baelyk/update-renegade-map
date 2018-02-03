/* global activeDocument, ExportType, File, ExportOptionsSVG, SVGFontSubsetting, SVGCSSPropertyLocation */

/* Make all layers invisible */
for (var i = 0; i < activeDocument.layers.length; i++) {
  activeDocument.layers[i].visible = false
}

/* Export svg */
activeDocument.layers.getByName('Ocean').visible = true
activeDocument.layers.getByName('Geography').visible = true
activeDocument.layers.getByName('Countries').visible = true
activeDocument.layers.getByName('Lakes').visible = true
// TODO: See if it is possible to fix the fact the exporting this SVG also exports all the rasters in the document
// var exportOptions = new ExportOptionsSVG()
// exportOptions.fontSubsetting = SVGFontSubsetting.None
// exportOptions.cssProperties = SVGCSSPropertyLocation.PRESENTATIONATTRIBUTES
// activeDocument.exportFile(new File('~/Downloads/renegade-update/RIAMap.svg'), ExportType.SVG, exportOptions)

/* Export political png */
activeDocument.exportFile(new File('~/Downloads/renegade-update/political.png'), ExportType.PNG24)

/* Export politicalnames png */
activeDocument.layers.getByName('Political Map').visible = true
activeDocument.exportFile(new File('~/Downloads/renegade-update/politicalnames.png'), ExportType.PNG24)
