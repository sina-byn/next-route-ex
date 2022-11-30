const { openSync, writeFileSync } = require('fs');

const setRouteSetName = idx => {
    switch (idx) {
        case 0:
            return 'All Routes:';
        case 1:
            return '\nStatic Routes:'
        case 2:
            return '\nDynamic Routes:'
    }
}

const routeWriter = (...routes) => {
    const routesLog = openSync('./route_ex/route_ex.txt', 'w+');
    const logString = routes.map((routeSet, idx) => {
        routeSet.unshift(setRouteSetName(idx));
        routeSet = routeSet.map((route, idx) => idx !== 0 ? '\t' + route : route);
        return routeSet.join('\n');
    }).join('\n');
    writeFileSync(routesLog, logString);
};

module.exports = routeWriter;