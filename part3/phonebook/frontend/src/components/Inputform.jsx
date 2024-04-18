  
  const Inputform = ({newName, newNumber, handleNameChange, handleNumberChange, addPerson}) => {
    return (
        <form onSubmit={addPerson}>
            Name: <input value={newName} onChange={handleNameChange} /> Phone: <input value={newNumber} pattern="\d*[-]\d*" onChange={handleNumberChange} />
            <button type="submit">add</button>
        </form> 
    )
  }
  
export default Inputform