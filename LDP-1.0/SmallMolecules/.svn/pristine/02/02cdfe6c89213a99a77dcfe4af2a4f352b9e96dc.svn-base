/**
 * @namespace Chart
 */
var Chart = require('./core/core.js')();

require('./core/core.helpers.js')(Chart);
require('./platforms/platform.js')(Chart);
require('./core/core.canvasHelpers.js')(Chart);
require('./core/core.plugin.js')(Chart);
require('./core/core.element.js')(Chart);
require('./core/core.animation.js')(Chart);
require('./core/core.controller.js')(Chart);
require('./core/core.datasetController.js')(Chart);
require('./core/core.layoutService.js')(Chart);
require('./core/core.scaleService.js')(Chart);
require('./core/core.ticks.js')(Chart);
require('./core/core.scale.js')(Chart);
require('./core/core.title.js')(Chart);
require('./core/core.legend.js')(Chart);
require('./core/core.interaction.js')(Chart);
require('./core/core.tooltip.js')(Chart);

require('./elements/element.arc.js')(Chart);
require('./elements/element.line.js')(Chart);
require('./elements/element.point.js')(Chart);
require('./elements/element.rectangle.js')(Chart);

require('./scales/scale.linearbase.js')(Chart);
require('./scales/scale.category.js')(Chart);
require('./scales/scale.linear.js')(Chart);
require('./scales/scale.logarithmic.js')(Chart);
require('./scales/scale.radialLinear.js')(Chart);
require('./scales/scale.time.js')(Chart);

// Controllers must be loaded after elements
// See Chart.core.datasetController.dataElementType
require('./controllers/controller.bar.js')(Chart);
require('./controllers/controller.bubble.js')(Chart);
require('./controllers/controller.doughnut.js')(Chart);
require('./controllers/controller.line.js')(Chart);
require('./controllers/controller.polarArea.js')(Chart);
require('./controllers/controller.radar.js')(Chart);

require('./charts/Chart.Bar.js')(Chart);
require('./charts/Chart.Bubble.js')(Chart);
require('./charts/Chart.Doughnut.js')(Chart);
require('./charts/Chart.Line.js')(Chart);
require('./charts/Chart.PolarArea.js')(Chart);
require('./charts/Chart.Radar.js')(Chart);
require('./charts/Chart.Scatter.js')(Chart);

window.Chart = module.exports = Chart;
