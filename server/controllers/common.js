module.exports.handleError = (object) => {
    const errors = [];
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            errors.push({
                title: key,
                detail: object[key].message
            });
            
        }
    }

    return errors;
}