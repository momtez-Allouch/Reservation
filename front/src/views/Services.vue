const rectangleConfig = { width: 260, height: 170, sceneFunc: function (context,
shape) { const width = shape.width(); const height = shape.height(); // Table
(rectangle with rounded corners) context.beginPath(); const tableWidth = width *
0.7; const tableHeight = height * 0.4; const tableX = (width - tableWidth) / 2;
const tableY = (height - tableHeight) / 2; const radius = 5;
context.moveTo(tableX + radius, tableY); context.lineTo(tableX + tableWidth -
radius, tableY); context.arcTo( tableX + tableWidth, tableY, tableX +
tableWidth, tableY + radius, radius ); context.lineTo(tableX + tableWidth,
tableY + tableHeight - radius); context.arcTo( tableX + tableWidth, tableY +
tableHeight, tableX + tableWidth - radius, tableY + tableHeight, radius );
context.lineTo(tableX + radius, tableY + tableHeight); context.arcTo( tableX,
tableY + tableHeight, tableX, tableY + tableHeight - radius, radius );
context.lineTo(tableX, tableY + radius); context.arcTo(tableX, tableY, tableX +
radius, tableY, radius); context.fillStyle = "#DDDDDD"; context.fill();
context.stroke(); // Chairs const chairWidth = 35; const chairHeight = 30; const
chairRadius = 10; const chairPadding = 5; function drawChair(x, y) {
context.beginPath(); context.moveTo(x, y + chairRadius); context.lineTo(x, y +
chairHeight); context.lineTo(x + chairWidth, y + chairHeight); context.lineTo(x
+ chairWidth, y + chairRadius); context.arcTo( x + chairWidth, y, x + chairWidth
- chairRadius, y, chairRadius ); context.lineTo(x + chairRadius, y);
context.arcTo(x, y, x, y + chairRadius, chairRadius); context.fillStyle =
"#DDDDDD"; context.fill(); context.stroke(); } // Top chairs (2) const topChairY
= tableY - chairHeight - chairPadding; const chairSpacing = (tableWidth -
chairWidth * 2) / 3; // Top left chair drawChair(tableX + chairSpacing,
topChairY); // Top right chair drawChair(tableX + tableWidth - chairSpacing -
chairWidth, topChairY); // Bottom chairs (2) const bottomChairY = tableY +
tableHeight + chairPadding; // Bottom left chair context.save();
context.translate( tableX + chairSpacing + chairWidth, bottomChairY +
chairHeight ); context.rotate(Math.PI); drawChair(0, 0); context.restore(); //
Bottom right chair - rotated 180 degrees context.save(); context.translate(
tableX + tableWidth - chairSpacing, bottomChairY + chairHeight );
context.rotate(Math.PI); drawChair(0, 0); context.restore(); // Left chair -
rotated 90 degrees context.save(); context.translate( tableX - chairPadding -
chairHeight, tableY + (tableHeight + chairWidth) / 2 ); context.rotate(-Math.PI
/ 2); drawChair(0, 0); context.restore(); // Right chair - rotated -90 degrees
context.save(); context.translate( tableX + tableWidth + chairPadding +
chairHeight, tableY + (tableHeight - chairWidth) / 2 ); context.rotate(Math.PI /
2); drawChair(0, 0); context.restore(); }, fill: "transparent", stroke: "black",
strokeWidth: 2, }; const squareConfig = { width: 260, height: 170, sceneFunc:
function (context, shape) { const width = shape.width(); const height =
shape.height(); // Table (rectangle with rounded corners) context.beginPath();
const tableSize = Math.min(width, height) * 0.4; const tableX = (width -
tableSize) / 2; const tableY = (height - tableSize) / 2; const radius = 5;
context.moveTo(tableX + radius, tableY); context.lineTo(tableX + tableSize -
radius, tableY); context.arcTo( tableX + tableSize, tableY, tableX + tableSize,
tableY + radius, radius ); context.lineTo(tableX + tableSize, tableY + tableSize
- radius); context.arcTo( tableX + tableSize, tableY + tableSize, tableX +
tableSize - radius, tableY + tableSize, radius ); context.lineTo(tableX +
radius, tableY + tableSize); context.arcTo( tableX, tableY + tableSize, tableX,
tableY + tableSize - radius, radius ); context.lineTo(tableX, tableY + radius);
context.arcTo(tableX, tableY, tableX + radius, tableY, radius);
context.fillStyle = "#DDDDDD"; context.fill(); context.stroke(); // Chair
dimensions const chairWidth = 35; const chairHeight = 30; const chairRadius =
10; const chairPadding = 5; // Standard chair drawing function function
drawChair(x, y) { context.beginPath(); context.moveTo(x, y + chairRadius);
context.lineTo(x, y + chairHeight); context.lineTo(x + chairWidth, y +
chairHeight); context.lineTo(x + chairWidth, y + chairRadius); context.arcTo( x
+ chairWidth, y, x + chairWidth - chairRadius, y, chairRadius );
context.lineTo(x + chairRadius, y); context.arcTo(x, y, x, y + chairRadius,
chairRadius); context.fillStyle = "#DDDDDD"; context.fill(); context.stroke(); }
// Top chair - centered context.save(); context.translate( (width - chairWidth)
/ 2, tableY - chairHeight - chairPadding ); drawChair(0, 0); context.restore();
// Bottom chair - centered and rotated 180 degrees context.save();
context.translate( (width + chairWidth) / 2, tableY + tableSize + chairPadding +
chairHeight ); context.rotate(Math.PI); drawChair(0, 0); context.restore(); //
Left chair - rotated 90 degrees context.save(); context.translate(tableX -
chairPadding, (height + chairWidth) / 2); context.rotate(-Math.PI / 2);
drawChair(0, 0); context.restore(); // Right chair - rotated -90 degrees
context.save(); context.translate( tableX + tableSize + chairPadding +
chairHeight, (height - chairWidth) / 2 ); context.rotate(Math.PI / 2);
drawChair(0, 0); context.restore(); }, fill: "transparent", stroke: "black",
strokeWidth: 2, }; const circleConfig = { width: 260, height: 170, sceneFunc:
function (context, shape) { const width = shape.width(); const height =
shape.height(); // Round table context.beginPath(); const tableRadius =
Math.min(width, height) * 0.2; const centerX = width / 2; const centerY = height
/ 2; context.arc(centerX, centerY, tableRadius, 0, Math.PI * 2);
context.fillStyle = "#DDDDDD"; context.fill(); context.stroke(); // Chair
dimensions const chairWidth = 35; const chairHeight = 30; const chairRadius =
10; const chairPadding = 10; // Standard chair drawing function function
drawChair(x, y) { context.beginPath(); context.moveTo(x, y + chairRadius);
context.lineTo(x, y + chairHeight); context.lineTo(x + chairWidth, y +
chairHeight); context.lineTo(x + chairWidth, y + chairRadius); context.arcTo( x
+ chairWidth, y, x + chairWidth - chairRadius, y, chairRadius );
context.lineTo(x + chairRadius, y); context.arcTo(x, y, x, y + chairRadius,
chairRadius); context.fillStyle = "#DDDDDD"; context.fill(); context.stroke(); }
// Position chairs at equal angles around the circle (120 degrees apart) const
chairDistance = tableRadius + chairPadding; // Chair 1 (top) context.save(); //
Calculate position on the circle (0 degrees) const chair1X = centerX -
chairWidth / 2; const chair1Y = centerY - chairDistance - chairHeight;
drawChair(chair1X, chair1Y); context.restore(); // Chair 2 (bottom right, +120
degrees) context.save(); // Position at 120 degrees around the circle
context.translate( centerX + Math.cos((Math.PI * 2) / 3) * chairDistance,
centerY + Math.sin((Math.PI * 2) / 3) * chairDistance ); context.rotate((Math.PI
* 2) / 3 + Math.PI); // Rotate 120 degrees + 180 to face outward
drawChair(-chairWidth / 2, -chairHeight); context.restore(); // Chair 3 (bottom
left, -120 degrees) context.save(); // Position at 240 degrees around the circle
context.translate( centerX + Math.cos((Math.PI * 4) / 3) * chairDistance,
centerY + Math.sin((Math.PI * 4) / 3) * chairDistance ); context.rotate((Math.PI
* 4) / 3 + Math.PI); // Rotate 240 degrees + 180 to face outward
drawChair(-chairWidth / 2, -chairHeight); context.restore(); }, fill:
"transparent", stroke: "black", strokeWidth: 2, };
