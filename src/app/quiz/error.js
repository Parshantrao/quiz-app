'use client' // Error components must be Client Components
 
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
 
export default function Error({ error, reset }) {
    const router=useRouter()
  useEffect(() => {
    
    console.error(error)
    router.push("/")
  }, [error, router])
 
  return (
    <div className='h-full w-full flex items-center justify-center'>
      <h2 className='text-xl font-semibold'>Something went wrong!</h2>
    </div>
  )
}