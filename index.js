const { existsSync, mkdirSync } = require('fs');
const configSetter = require('./utils/configSetter');
const routeExtractor = require('./utils/routeExtractor');
const routeSorter = require('./utils/routeSorter');
const routeWriter = require('./utils/routeWriter');

const config = configSetter();
const { write_log, categorize } = config;

const extractedRoutes = routeExtractor();
const [allRoutes, staticRoutes, dynamicRoutes] =
    routeSorter(extractedRoutes);

if (!existsSync('./route_ex'))
    mkdirSync('./route_ex');

if (write_log) {
    if (categorize)
        routeWriter(allRoutes, staticRoutes, dynamicRoutes);
    else
        routeWriter(allRoutes);
}