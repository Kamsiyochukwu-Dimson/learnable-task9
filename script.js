var persons = [
    { type: 'user', name: 'chidinma', age: 25, occupation: 'Doctor' },
    { type: 'admin', name: 'Clara', age: 32, role: 'Administrator' },
    { type: 'user', name: 'Charles', age: 23, occupation: 'Astronaut' },
    { type: 'admin', name: 'Tappi', age: 64, role: 'Administrator' },
    { type: 'user', name: 'Obi', age: 23, occupation: 'footBaller' },
    { type: 'admin', name: 'Chuka', age: 23, role: 'Administrator' }
];
function logPerson(person) {
    console.log("- ".concat(person.name, ", ").concat(person.age, ", ").concat(person.type === 'admin' ? person.role : person.occupation));
}
function filterPersons(persons, personType, criteria) {
    return persons
        .filter(function (person) { return person.type === personType; })
        .filter(function (person) {
        var criteriaKeys = Object.keys(criteria);
        return criteriaKeys.every(function (fieldName) { return person[fieldName] === criteria[fieldName]; });
    });
}
var usersOfAge23 = filterPersons(persons, 'user', { age: 23 });
var adminsOfAge23 = filterPersons(persons, 'admin', { age: 23 });
console.log('Users of age 23:');
usersOfAge23.forEach(logPerson);
console.log();
console.log('Admins of age 23:');
adminsOfAge23.forEach(logPerson);