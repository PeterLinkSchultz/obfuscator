import { VariableDeclaration, FunctionDeclaration, ExpressionStatement, FunctionExpression, IfStatement } from 'esprima'

import transformVariableDeclaration from "./transform";
import transformExpression from "./transform-expression";
import transformStatement from "./transform-statement";
import transformFunctionDeclaration from "./transform-function";


const transformBlock = (tree) => {
    tree.forEach((node) => {
        switch (node.type) {
            case 'VariableDeclaration':
                transformVariableDeclaration(node.declarations)
                break
            case 'FunctionDeclaration':
                transformFunctionDeclaration(node)
                break
            case 'ExpressionStatement':
                transformStatement(node.expression)
                break
        }
    })

    return tree
}

export default transformBlock