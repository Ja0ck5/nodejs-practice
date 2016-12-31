// 每次启动hellokoa.js前自动让Babel转码，这样我们就不需要手动做这件事情了。
//先加载babel-core/register，再加载hellokoa.js
require('babel-core/register')({
    presets: ['stage-3']
});

require('./hellokoa.js');