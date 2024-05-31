// services/entityService.js

export const fetchEntities = async (apiUrl, entityName, extraDataFetch) => {
    const response = await fetch(`${apiUrl}/${entityName}`);
    const data = await response.json();

    if (extraDataFetch) {
        return await extraDataFetch(data);
    } else {
        return data;
    }
};

export const fetchRelatedData = async (apiUrl, relatedObjects = []) => {
    if (relatedObjects.length === 0) return {};
    
    const relatedPromises = relatedObjects.map(async obj => {
        const response = await fetch(`${apiUrl}/${obj.apiName}`);
        const data = await response.json();
        return { [obj.fieldName]: data };
    });

    const relatedResults = await Promise.all(relatedPromises);
    return relatedResults.reduce((acc, curr) => ({ ...acc, ...curr }), {});
};

export const updateEntity = async (apiUrl, entityName, updatedEntity) => {
    const response = await fetch(`${apiUrl}/${entityName}/${updatedEntity.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEntity),
    });


    if (!response.ok) {
        throw new Error('Error updating entity');
    }
};

export const createEntity = async (apiUrl, entityName, newEntity) => {
    const response = await fetch(`${apiUrl}/${entityName}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntity),
    });

    if (!response.ok) {
        throw new Error('Error creating entity');
    }

    return await response.json();
};

export const deleteEntity = async (apiUrl, entityName, id) => {
    const response = await fetch(`${apiUrl}/${entityName}/delete/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    });


    if (!response.ok) {
        throw new Error('Error deleting entity');
    }
};
