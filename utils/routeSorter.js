const routeSorter = routes => {
    const routesLength = routes.length;
    const staticRoutes = [],
        dynamicRoutes = [];

    for (let i = 0; i < routesLength; i++) {
        for (let j = i + 1; j < routesLength; j++) {
            if (routes[i].length > routes[j].length)
                [routes[i], routes[j]] = [routes[j], routes[i]];
        }
    }

    for (let i = 0; i < routesLength; i++) {
        const route = routes[i];
        const dynamicRouteRegExp = /\[[\w\W]*\]/;
        if (dynamicRouteRegExp.test(route))
            dynamicRoutes.push(route);
        else
            staticRoutes.push(route);
    }

    return [routes, staticRoutes, dynamicRoutes];
};

module.exports = routeSorter;