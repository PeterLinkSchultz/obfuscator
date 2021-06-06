const createStore = () => {
    const scope = {
        current: {},
        parent: {},
    }
    let i = 0;

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

    const replaceName = (name) => {
        scope.current[name] = `_0x21${i++}`

        return scope.current[name];
    }

    const replaceObject = (name, object) => {
        scope.current[name] = object;
    }

    const generateName = (name) => {
        return `_0x21${i++}`
    }

    return {
        down,
        up,
        findName,
        replaceName,
        replaceObject,
        generateName,
        printScope: () => {
            console.debug(scope)
            debugger
        }
    }
}

export default createStore()