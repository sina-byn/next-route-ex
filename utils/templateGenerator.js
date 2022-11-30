const { existsSync, mkdirSync, openSync, writeFileSync } = require('fs');

const templateGenerator = (...routes) => {
    let markup = '';
    const markupGenerator = markup => `<!DOCTYPE html>
<html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Project Routes</title>
      <style>
        h3 {
            background-color: #777777;
            color: #f5f5f5;
            padding: 0.5rem 1rem;
        }

        p {
            max-width: calc(100vw - 3rem);
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-left: 3rem;
            margin-bottom: 15px;
            padding-bottom: 5px;
            border-bottom-style: solid;
            border-bottom-color: #222222;
            border-bottom-width: 1px;
            overflow-x: auto;
        }

        button {
            cursor: pointer;
        }
      </style>
    </head>
    <body>${markup}\n\t\t</body>
    <script>
        document.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', e => {
                const route = e.target.parentNode.innerText.split('copy')[0].trim();
                navigator.clipboard.writeText(route).then(_ => alert('route copied to clipboard'));
            })
        });
    </script>
</html>
    `;

    routes.forEach(routeSet => 
        routeSet.forEach((route, idx) => {
            if (routeSet.length === 1) return;
            return idx === 0
                ? markup += `\n\t\t\t<h3>\n\t\t\t\t${route.replace('\n', '')}\n\t\t\t</h3>`
            : markup += `\n\t\t\t<p style="font-family: consolas">\n\t\t\t\t${route}\n\t\t\t\t<button type='button'>copy</button>\n\t\t\t</p>`;
        })
    );

    if (!existsSync('./route_ex_template'))
        mkdirSync('./route_ex_template');

    const templateFile = openSync('./index.html', 'w+');
    writeFileSync(templateFile, markupGenerator(markup));
};

module.exports = templateGenerator;