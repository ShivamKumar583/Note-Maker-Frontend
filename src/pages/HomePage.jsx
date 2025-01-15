
import Filter from "../components/Filter"
import NoteCardContainer from "../components/NoteCardContainer"

const HomePage = ({notes,handleFilterText, filterText}) => {
  return (
    <>
    <Filter handleFilterText={handleFilterText} />
    <NoteCardContainer notes={notes} />
    </>
  )
}

export default HomePage