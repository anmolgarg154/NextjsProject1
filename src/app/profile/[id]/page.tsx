export default function UserProfile({params}:any){
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1> Profile Page</h1> 
            <hr/>
         <p className="text-4xl">User profile Page 
         <span className="text-4xl rounded bg-orange-500">{params.id}</span>
         </p>
         

       
        </div>
    )
}