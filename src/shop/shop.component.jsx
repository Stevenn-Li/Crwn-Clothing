import SHOP_DATA from '../../shop-data.json';

const Shop = () => {
    return(
        <div>
            {SHOP_DATA.map( (item) =>{
                <div key = {item.id}>
                    <h1>{item.name}</h1>
                </div>
            })}
        </div>
    )
}

export default Shop;