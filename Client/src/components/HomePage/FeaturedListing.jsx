import ListingCard from "../Listing/ListingCard"

export default function FeaturedListings(){
    const listings = [
        {_id:1,title:"RK complex", price: 15000, location: "Delhi", type: "PG", image: "../../assets/images/logo.png"},
         {_id:1,title:"RK complex", price: 15000, location: "Delhi", type: "PG", image: "../../assets/images/logo.png"},
         {_id:1,title:"RK complex", price: 15000, location: "Delhi", type: "PG", image: "../../assets/images/logo.png"},
         {_id:1,title:"RK complex", price: 15000, location: "Delhi", type: "PG", image: "../../assets/images/logo.png"},
         {_id:1,title:"RK complex", price: 15000, location: "Delhi", type: "PG", image: "../../assets/images/logo.png"},
         {_id:1,title:"RK complex", price: 15000, location: "Delhi", type: "PG", image: "../../assets/images/logo.png"},
         {_id:1,title:"RK complex", price: 15000, location: "Delhi", type: "PG", image: "../../assets/images/logo.png"}
    
    ]

    return(
        <div className="my-5">
            <h1 className="text-3xl font-bold  text-orange-400">
                Featured Near You
            </h1>
           
           
        </div>
    )
}