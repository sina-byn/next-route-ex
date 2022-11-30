const config = require('../next-route-ex.config');

const defaultConfig = {
    write_log: true,
    categorize: true,
    generate_template: true
};

const configSetter = () => {
    const defaultKeys = Object.keys(defaultConfig);

    Object.entries(config).forEach(([key, value]) => {
        if (!defaultKeys.includes(key)) return;

        defaultConfig[key] = value;
    })

    return defaultConfig;
};

module.exports = configSetter;