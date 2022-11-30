const { existsSync, mkdirSync } = require('fs');
const configSetter = require('./utils/configSetter');
const routeExtractor = require('./utils/routeExtractor');
const routeSorter = require('./utils/routeSorter');
const routeWriter = require('./utils/routeWriter');
const templateGenerator = require('./utils/templateGenerator');

const config = configSetter();
const { write_log, categorize, generate_template } = config;

const extractedRoutes = routeExtractor();
const [allRoutes, staticRoutes, dynamicRoutes] =
    routeSorter(extractedRoutes);

if (!existsSync('./next-route-ex'))
    mkdirSync('./next-route-ex');

if (write_log) {
    if (categorize)
        routeWriter(allRoutes, staticRoutes, dynamicRoutes);
    else
        routeWriter(allRoutes);
    }
    
if (generate_template) {
    if (categorize)
        templateGenerator(allRoutes, staticRoutes, dynamicRoutes);
    else
        templateGenerator(allRoutes);
}