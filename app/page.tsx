import Link from "next/link"


const page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/dashboard">Start</Link>
    </div>
    
  )
}

export default page