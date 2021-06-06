import { VariableDeclarator, ObjectExpression, Literal } from 'esprima'

import scope from "./scope";

const transformVariable = (declarator) => {
    declarator.id.name = scope.replaceName(declarator.id.name)
}

const transformProperties = (properties, rootName) => {
    properties.forEach(({ key, value }) => {
        const name = `${rootName}.${key.name}`;
        key.name = scope.replaceName(name)

        switch (value.type) {
            case 'Literal':
                break;
            case 'ObjectExpression':
                transformProperties(value.properties, name)
                break;
        }
    })
}

const transformVariableDeclaration = (declarations) => {
    declarations.forEach((declaration) => {

        console.debug('obj', declaration)
        switch (declaration.type) {
            case 'VariableDeclarator':
                transformInit(declaration)
                transformVariable(declaration)
                break
            case 'ObjectExpression':
                console.debug('obj', declaration)
                break
        }
    })
}

const transformInit = ({ init, id }) => {
    switch (init.type) {
        case 'Literal':
            break;
        case 'ObjectExpression':
            transformProperties(init.properties, id.name)
            //scope.printScope()
            break
    }
}

const transformIdentifier = () => {

}

export default transformVariableDeclaration