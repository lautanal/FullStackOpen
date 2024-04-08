  
  const Inputform = ({newName, newNumber, handleNameChange, handleNumberChange, addPerson}) => {
    return (
        <form onSubmit={addPerson}>
            Name: <input value={newName} onChange={handleNameChange} /> Phone: <input type="number" value={newNumber} onChange={handleNumberChange} />
            <button type="submit">add</button>
        </form> 
    )
  }
  
export default Inputform