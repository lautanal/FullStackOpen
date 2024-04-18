const Phonebook = ({ persons, deletePerson }) => {
    return (
        <div>
            <table><tbody>
                {persons.map(person => <Person key={person.name} person={person} deletePerson={deletePerson}/>)}
            </tbody></table>
        </div>
    )
  }
  
  const Person = ({ person, deletePerson }) => {
  return (
        <tr><td width="100">{person.name}</td><td width="100">{person.number}</td>
        <td><button onClick={() => deletePerson(person.id, person.name)}>delete</button></td></tr>
  )
  }

  export default Phonebook
