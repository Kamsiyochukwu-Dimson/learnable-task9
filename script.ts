interface User {
    type: 'user';
    name: string;
    age: number;
    occupation: string;
}

interface Admin {
    type: 'admin';
    name: string;
    age: number;
    role: string;
}

type Person = User | Admin;

type UserFilterCriteria = Partial<Omit<User, 'type'>>;
type AdminFilterCriteria = Partial<Omit<Admin, 'type'>>;

const persons: Person[] = [
    { type: 'user', name: 'chidinma', age: 25, occupation: 'Doctor' },
    { type: 'admin', name: 'Clara', age: 32, role: 'Administrator' },
    { type: 'user', name: 'Charles', age: 23, occupation: 'Astronaut' },
    { type: 'admin', name: 'Tappi', age: 64, role: 'Administrator' },
    { type: 'user', name: 'Obi', age: 23, occupation: 'footBaller' },
    { type: 'admin', name: 'Chuka', age: 23, role: 'Administrator' }
];

function logPerson(person: Person) {
    console.log(- ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation});
}

function filterPersons<T extends 'user' | 'admin'>(
    persons: Person[],
    personType: T,
    criteria: T extends 'user' ? UserFilterCriteria : AdminFilterCriteria
): T extends 'user' ? User[] : Admin[] {
    return persons
        .filter((person): person is Extract<Person, { type: T }> => person.type === personType)
        .filter((person) => {
            const criteriaKeys = Object.keys(criteria) as (keyof typeof criteria)[];
            return criteriaKeys.every((fieldName) => person[fieldName] === criteria[fieldName]);
        }) as any;
}

const usersOfAge23 = filterPersons(persons, 'user', { age: 23 });
const adminsOfAge23 = filterPersons(persons, 'admin', { age: 23 });

console.log('Users of age 23:');
usersOfAge23.forEach(logPerson);
console.log();
console.log('Admins of age 23:');
adminsOfAge23.forEach(logPerson);