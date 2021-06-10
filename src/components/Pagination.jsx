const Pagination = (props) => {

    const pagePrevious = () => {
        if(props.page > 1) {
            props.setPage(props.page - 1)
        } else {
            console.log('Page previous')
        }
    }

    const pageNext = () => {
        props.setPage(props.page + 1)
    }


    return (
        <div>
            <button onClick={() => pagePrevious()}>Previous</button>
            <button onClick={() => pageNext()}>Next</button>
        </div>
    )
}

export default Pagination;