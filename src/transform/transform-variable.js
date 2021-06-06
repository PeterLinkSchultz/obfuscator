import { omit } from 'lodash'


const scope = {
    current: {},
    parent: {},
}

const down = () => {
    const parent = { ...scope.parent }
    const current = { ...scope.current }

    scope.parent = {
        current,
        parent,
    }
    scope.current = {}
}

const up = () => {
    const parent = { ...scope.parent }

    scope.current = parent.current
    scope.parent = parent.parent;
}

const findInLocal = (local, name) => {
    if (local.current[name]) {
        return local.current[name]
    }

    return findInLocal(local.parent, name)
}

const findName = (name) => {
    return findInLocal(scope, name)
}

const values = {}
const localScope = {}
const globalScope = {}

const nameGenerator = () => {
    let i = 0;

    return (name) => {
        scope.current[name] = `_0x21${i++}`

        return scope.current[name];
    }
}

const getName = nameGenerator();

const transform = (tree) => {
    tree.forEach((node) => {
        console.log(node instanceof VariableDeclaration)
        switch (node.type) {
            case VARIABLE:
                node.declarations.forEach(replaceVariable);
                break;
            case FUNCTION:
                rename(node)

                transform(node.body.body);
                break;
            case EXPRESSION:
                replaceExpression(node.expression);
                break;
            case IFSTATEMENT:
                down()

                transform(node.consequent.body)
                replaceIfStatement(node.test);

                up()
                break;
            default:
                break;
        }
    })

    return tree
}

const rename = (node) => {
    scope.current[node.id.name] = getName(node.id.name)

    node.id.name =  scope.current[node.id.name]
}

const replaceVariable = (variable) => {
    switch (variable.init.type) {
        case 'Literal':
            rename(variable)
            break;
        case 'ArrowFunctionExpression':
        case 'FunctionExpression':
            rename(variable);
            transform(variable.init.body.body)
            //console.debug(variable)
            break;
    }
}

const replacePart = (part) => {
    part.name = findName(part.name)
}

const replaceExpression = (expression) => {
    switch (expression.type) {
        case EXPRESSION_TYPE.ASSIGN_EXP:
            const targetName = expression.left.name;
            console.debug(expression)
            expression.left.name = findName(targetName)

            if (expression.right.type) {

            }
            break;
        case EXPRESSION_TYPE.CALL_EXP:
            const fooName = expression.callee.name

            expression.callee.name = findName(fooName)

            break;
    }
}

const replaceIfStatement = (statement) => {
    if (statement.left.type === IDENTIFIER) {
        replacePart(statement.left)
    }
    if (statement.right.type === IDENTIFIER) {
        replacePart(statement.right)
    }
}

const VARIABLE = 'VariableDeclaration'
const FUNCTION = 'FunctionDeclaration'
const EXPRESSION = 'ExpressionStatement'
const IFSTATEMENT = 'IfStatement';
const IDENTIFIER = "Identifier";

const EXPRESSION_TYPE = {
    ASSIGN_EXP: "AssignmentExpression",
    CALL_EXP: "CallExpression"
}

export { scope, localScope }
export default transform