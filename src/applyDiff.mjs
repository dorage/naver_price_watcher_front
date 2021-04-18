const isNodeChanged = (node1, node2) => {
    const n1Attr = node1.attributes;
    const n2Attr = node2.attributes;

    // 속성의 개수가 다르다면 변경된 노드
    if (n1Attr.length !== n2Attr.length) {
        return true;
    }
    // 개수가 0개인데 내용이 다르다면 변경된 노드
    if (
        node1.children.length === 0 &&
        node2.children.length === 0 &&
        node1.textContent !== node2.textContent
    ) {
        return true;
    }
    // 속성 값이 틀리다면 변경된 노드
    const differentAttribute = Array.from(n1Attr).find(({ name }) => {
        return node1.getAttribute(name) !== node2.getAttribute(name);
    });
    if (differentAttribute) {
        return true;
    }

    return false;
};

const applyDiff = (parentNode, realNode, virtualNode) => {
    if (realNode && !virtualNode) {
        realNode.remove();
        return;
    }
    if (!realNode && virtualNode) {
        parentNode.appendChild(virtualNode);
        return;
    }
    if (isNodeChanged(realNode, virtualNode)) {
        realNode.replaceWith(virtualNode);
        return;
    }
    // 현재 노드에서의 변경점이 없다면
    // 모든 하위노드에 대하여 동일한 Diff 알고리즘으로 확인한다.
    const realNodeChildren = Array.from(realNode.children);
    const virtualNodeChildren = Array.from(virtualNode.children);

    const max = Math.max(realNodeChildren.length, virtualNodeChildren.length);
    for (let i = 0; i < max; i++) {
        applyDiff(realNode, realNodeChildren[i], virtualNodeChildren[i]);
    }
};

export default applyDiff;
