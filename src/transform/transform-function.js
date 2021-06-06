import scope from "./scope";
import transformBlock from "./transform-block";

const transformFunctionDeclaration = (declaration) => {
    scope.down()
    declaration.id.name = scope.replaceName(declaration.id.name)
    transformBlock(declaration.body.body)
    scope.up()
}

export default transformFunctionDeclaration