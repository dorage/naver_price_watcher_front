const getNewTerms = (state) => {
    const {
        data: { terms },
    } = state;

    const fragment = document.createDocumentFragment();

    terms.forEach((term) => {
        const termElement = document.createElement('div');
        termElement.classList.add('term');
        termElement.textContent = term;
        fragment.append(termElement);
    });

    return fragment;
};

const Terms = (targetElement, state) => {
    const element = targetElement.cloneNode(true);

    element.innerHTML = '';
    element.appendChild(getNewTerms(state));

    return element;
};

export default Terms;
