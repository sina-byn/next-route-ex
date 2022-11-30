const { readdirSync, statSync, readFileSync } = require('fs');
const { parse } = require('path');

const routeExtractor = () => {
    const routes = [];

    const extractorFn = (dir = './pages') => {
        const files = readdirSync(dir);
        const validExtensions = ['.js', '.ts', '.jsx', '.tsx'];
        const commentRegExp = /\/\*\*\*\*[\s\S]*?\*\//;
        
        files.forEach(file => {
            const isDir = statSync([dir, file].join('/')).isDirectory();

            if (!isDir) {
                const { name, ext } = parse(file);

                if (!validExtensions.includes(ext)) return;

                const route = name === 'index'
                    ? dir.split('pages')[1] || '/'
                    : [dir.split('pages')[1], name].join('/');

                if (route.includes('[...')) {
                    const files = readdirSync(`./pages${route.split('/').slice(0, -1).join('/')}`);
                    files.forEach(file => {
                        const { ext } = parse(file);

                        if (!validExtensions.includes(ext)) return;

                        const code = readFileSync(`./pages${route}${ext}`, 'utf-8');
                        const routeComment = commentRegExp.exec(code)['0'];

                        if (!routeComment) return;

                        const routeParams = routeComment
                            .split('\r').join('')
                            .split('\n').join('')
                            .split('*/').join('')
                            .split('@param')
                            .slice(1)
                            .map(param => param.trim());
                        const mainRoute = route.split('[...')[0];
    
                        routes.push([route, ' --> ', mainRoute.concat(routeParams.join('/'))].join(''));
                    });

                    return;
                }

                routes.push(route);
                return;
            }

            extractorFn([dir, file].join('/'));
        });
    };

    extractorFn();

    return routes;
};

module.exports = routeExtractor;