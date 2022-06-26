const getDebouncedFunction = (func, wait) => {
    let timerId = null;

    return function debouncedFunction(...params) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func.apply(this,params)
        }, wait);
    }
}

export default getDebouncedFunction;