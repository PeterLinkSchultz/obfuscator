import { AssignmentExpression, Identifier } from 'esprima'

import scope from "./scope";

const transformObject = (node) => {
    switch (node.object.type) {
        case 'Identifier':
            if (!node.computed) {
                const original = node.object.name;
                const property = node.property.name;
                const root = `${original}.${property}`;

                node.object.name = scope.findName(original);
                node.property.name = scope.findName(root)

                return root;
            }
            break;
        case 'MemberExpression':
            const root = transformObject(node.object)
            const name = `${root}.${node.property.name}`

            node.property.name = scope.findName(name);
            return name;
    }
}

const transformLeftPart = (part) => {
    switch (part.type) {
        case 'Identifier':
            part.name = scope.findName(part.name);
            break;
        case 'MemberExpression':
            transformObject(part)
            break;
    }
}

const transformRightPart = (part) => {
    console.debug('right', part)
}

const transformStatement = (expression) => {
    switch (expression.type) {
        case 'AssignmentExpression':
            transformLeftPart(expression.left)
            transformRightPart(expression.right)
            break;
    }
}

export default transformStatement