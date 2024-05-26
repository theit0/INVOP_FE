export const getColumnValue = (entity, column) => {
    if (typeof entity[column] === 'object' && entity[column] !== null) {
        return entity[column].nombre || entity[column].id || '';
    }

    if (entity[column] === null || entity[column] === undefined) {
        return "-";
    }

    return entity[column];
};