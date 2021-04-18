import createState from './mockData.mjs';
import Terms from './components/Terms.mjs';
import Results from './components/Results.mjs';
import applyDiff from './applyDiff.mjs';
import registry from './registry.mjs';

registry.add('terms', Terms);
registry.add('results', Results);

const state = {
    data: createState(),
};

window.requestAnimationFrame(() => {
    const root = document.querySelector('#root');
    const newRoot = registry.renderRoot(root, state);
    applyDiff(document.body, root, newRoot);
});
