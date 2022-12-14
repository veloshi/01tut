import ItemList from './ItemList';

const Content = ({ items, handleCheck, handleDelete }) => {
    return (
        <>
            { 
                <ItemList
                    items={items}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                />
            // ) : (
            //     <p style={{ marginTop: '2rem' }}>Your list is empty.</p>
            // )}
            }
            </>
    )
}

export default Content